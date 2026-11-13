-- ═══════════════════════════════════════════════════════════════
-- Octavia · registro con correo y contraseña + aprobación de la profesora
-- Pégalo en Supabase → SQL Editor → New query → Run. Se puede repetir sin problema.
-- ═══════════════════════════════════════════════════════════════

-- 1) Nadie se aprueba a sí mismo: si quien guarda su perfil (alumnos/<id>) no es profesora,
--    el estado se queda como estaba («pendiente» al registrarse).
create or replace function public.docs_proteger_estado() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.parent = 'alumnos' and not public.es_profesora() then
    if tg_op = 'INSERT' then
      new.data := jsonb_set(new.data, '{estado}', '"pendiente"'::jsonb);
    else
      new.data := jsonb_set(new.data, '{estado}', coalesce(old.data -> 'estado', '"aprobado"'::jsonb));
    end if;
  end if;
  return new;
end $$;

drop trigger if exists docs_proteger_estado on public.docs;
create trigger docs_proteger_estado before insert or update on public.docs
for each row execute function public.docs_proteger_estado();

-- 2) La profesora que aprueba (entra con este correo)
-- Cambia el correo y quita los dos guiones del inicio:
-- insert into public.profesoras (email) values ('correo.de.la.profesora@gmail.com') on conflict do nothing;
