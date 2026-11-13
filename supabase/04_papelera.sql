-- ═══════════════════════════════════════════════════════════════
-- Octavia · papelera de alumnos: eliminar definitivamente
-- Pégalo en Supabase → SQL Editor → New query → Run. Se puede repetir sin problema.
-- ═══════════════════════════════════════════════════════════════
-- Solo la profesora puede usarla, y solo con alumnos que ya están en la papelera.
-- Borra todos sus datos (atril, sesiones, rutinas, evidencias) y su cuenta de acceso.
create or replace function public.borrar_alumno(alumno uuid) returns boolean
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.es_profesora() then
    raise exception 'Solo la profesora puede eliminar alumnos';
  end if;
  if alumno = auth.uid() then
    raise exception 'No puedes eliminar tu propia cuenta';
  end if;
  if coalesce((select data ->> 'estado' from public.docs where path = 'alumnos/' || alumno::text), '') <> 'papelera' then
    raise exception 'Primero mueve al alumno a la papelera';
  end if;
  delete from public.docs
   where split_part(path, '/', 1) = 'alumnos' and split_part(path, '/', 2) = alumno::text;
  delete from auth.users where id = alumno;
  return true;
end $$;
revoke all on function public.borrar_alumno(uuid) from public;
grant execute on function public.borrar_alumno(uuid) to authenticated;
