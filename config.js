/* Octavia · conexión con Supabase
   Copia estos dos datos de Supabase → Project Settings → API:
   · Project URL  → url
   · anon public  → anonKey   (es pública: los datos los protegen las reglas RLS de supabase/schema.sql)
   Mientras diga TU_..., Octavia funciona en modo local (datos solo en ese navegador). */
window.OCTAVIA_SUPABASE = {
  url: 'https://soeplzwgznwhzixswjsj.supabase.co',
  anonKey: 'sb_publishable_o7fUwSRQG6GIvOC3n_zITQ_JAd61rnM',
  // 'libre': el alumno entra solo con su nombre (cuenta anónima en su celular).
  // 'correo': entra con un código que llega a su Gmail.
  acceso: 'libre'
};
