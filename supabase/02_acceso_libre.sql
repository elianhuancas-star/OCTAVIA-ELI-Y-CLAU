-- ═══════════════════════════════════════════════════════════════
-- Octavia · acceso libre (sin correo ni contraseña)
-- Pégalo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a ejecutar sin romper nada.
-- ═══════════════════════════════════════════════════════════════

-- Profesoras reconocidas por su cuenta del dispositivo (además de por correo)
create table if not exists public.profesoras_uid (
  uid    uuid primary key,
  creado timestamptz not null default now()
);
alter table public.profesoras_uid enable row level security;   -- nadie la lee desde la app

-- Ajustes privados (aquí vive el código secreto de la profesora)
create table if not exists public.ajustes (
  clave text primary key,
  valor text not null
);
alter table public.ajustes enable row level security;          -- nadie la lee desde la app

-- ¿Quien inició sesión es profesora? (por correo o por código ya validado)
create or replace function public.es_profesora() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profesoras
                 where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')))
      or exists (select 1 from public.profesoras_uid where uid = auth.uid());
$$;
revoke all on function public.es_profesora() from public;
grant execute on function public.es_profesora() to authenticated;

-- La profesora escribe su código una vez en cada dispositivo
create or replace function public.entrar_como_profesora(codigo text) returns boolean
language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  if auth.uid() is null then return false; end if;
  select exists (select 1 from public.ajustes
                 where clave = 'codigo_profesora' and length(valor) >= 8 and valor = codigo)
    into ok;
  if ok then
    insert into public.profesoras_uid (uid) values (auth.uid()) on conflict do nothing;
  end if;
  return ok;
end $$;
revoke all on function public.entrar_como_profesora(text) from public;
grant execute on function public.entrar_como_profesora(text) to authenticated;

-- PON AQUÍ EL CÓDIGO SECRETO DE LA PROFESORA (mínimo 8 caracteres, difícil de adivinar).
-- Cambia CAMBIA-ESTE-CODIGO, quita los dos guiones del inicio y ejecuta:
-- insert into public.ajustes (clave, valor) values ('codigo_profesora', 'CAMBIA-ESTE-CODIGO') on conflict (clave) do update set valor = excluded.valor;
