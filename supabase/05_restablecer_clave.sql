-- ═══════════════════════════════════════════════════════════════
-- Octavia · la profesora pone una contraseña temporal a un alumno
-- Pégalo en Supabase → SQL Editor → New query → Run. Se puede repetir sin problema.
-- ═══════════════════════════════════════════════════════════════
-- Las contraseñas nunca se pueden ver: Supabase solo guarda un cifrado de una vía.
-- Esta función reemplaza la contraseña por una nueva (cifrada) y marca el perfil para
-- que el alumno la cambie al entrar. Solo la profesora puede usarla.
create or replace function public.restablecer_clave(alumno uuid, nueva text) returns boolean
language plpgsql security definer set search_path = public, auth, extensions as $$
begin
  if not public.es_profesora() then
    raise exception 'Solo la profesora puede restablecer contraseñas';
  end if;
  if alumno = auth.uid() then
    raise exception 'Para tu propia contraseña usa «Cambiar mi contraseña»';
  end if;
  if length(coalesce(nueva, '')) < 6 then
    raise exception 'La contraseña debe tener al menos 6 caracteres';
  end if;
  if not exists (select 1 from auth.users where id = alumno and email is not null) then
    raise exception 'Ese alumno no tiene correo: primero debe agregar correo y contraseña';
  end if;
  update auth.users
     set encrypted_password = extensions.crypt(nueva, extensions.gen_salt('bf')),
         updated_at = now()
   where id = alumno;
  update public.docs
     set data = jsonb_set(data, '{claveTemporal}', 'true'::jsonb)
   where path = 'alumnos/' || alumno::text;
  return true;
end $$;
revoke all on function public.restablecer_clave(uuid, text) from public;
grant execute on function public.restablecer_clave(uuid, text) to authenticated;
