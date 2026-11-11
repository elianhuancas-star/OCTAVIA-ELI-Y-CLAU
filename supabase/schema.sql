-- ═══════════════════════════════════════════════════════════════
-- Octavia · base de datos en Supabase
-- Pégalo completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a ejecutar sin romper nada.
-- ═══════════════════════════════════════════════════════════════

-- 1) Una sola tabla de documentos, con las mismas rutas que ya usa la app:
--    alumnos/<id>, alumnos/<id>/obras/<obra>, alumnos/<id>/sesiones/<fecha>,
--    alumnos/<id>/rutinas/<lunes>, alumnos/<id>/evidencias/<id>, eventos/<id>
create table if not exists public.docs (
  path       text primary key,
  parent     text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create index if not exists docs_parent_idx on public.docs (parent);

create or replace function public.docs_touch() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;
drop trigger if exists docs_touch on public.docs;
create trigger docs_touch before update on public.docs
for each row execute function public.docs_touch();

-- 2) Profesoras: quien está en esta lista ve y edita a todos los alumnos.
create table if not exists public.profesoras (
  email text primary key
);
alter table public.profesoras enable row level security;   -- nadie la lee desde la app

create or replace function public.es_profesora() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profesoras
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.es_profesora() from public;
grant execute on function public.es_profesora() to authenticated;

-- ¿La ruta pertenece al alumno que inició sesión? (alumnos/<su id>/...)
create or replace function public.es_mio(p text) returns boolean
language sql stable as $$
  select split_part(p, '/', 1) = 'alumnos'
     and split_part(p, '/', 2) = coalesce(auth.uid()::text, '-');
$$;

-- 3) Reglas de acceso (RLS), iguales a las de la versión en Claude:
--    · cada alumno lee y escribe solo lo suyo
--    · la profesora lee y escribe todo
--    · «eventos» (calendario, plantillas y biblioteca) lo leen todos; solo la profesora escribe
alter table public.docs enable row level security;

drop policy if exists docs_leer   on public.docs;
drop policy if exists docs_crear  on public.docs;
drop policy if exists docs_cambiar on public.docs;
drop policy if exists docs_borrar on public.docs;

create policy docs_leer on public.docs for select to authenticated
  using (public.es_profesora() or public.es_mio(path) or split_part(path, '/', 1) = 'eventos');

create policy docs_crear on public.docs for insert to authenticated
  with check ((public.es_profesora() or public.es_mio(path))
              and parent = regexp_replace(path, '/[^/]+$', ''));

create policy docs_cambiar on public.docs for update to authenticated
  using (public.es_profesora() or public.es_mio(path))
  with check (public.es_profesora() or public.es_mio(path));

create policy docs_borrar on public.docs for delete to authenticated
  using (public.es_profesora() or public.es_mio(path));

-- 4) Cambios en vivo (la profesora ve el estudio sin recargar)
alter table public.docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null; end $$;

-- 5) PON AQUÍ EL CORREO DE LA PROFESORA (quita los dos guiones del inicio y ejecuta):
-- insert into public.profesoras (email) values ('correo.de.la.profesora@gmail.com') on conflict do nothing;
