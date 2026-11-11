/* Octavia · conexión con Supabase
   Copia estos dos datos de Supabase → Project Settings → API:
   · Project URL  → url
   · anon public  → anonKey   (es pública: los datos los protegen las reglas RLS de supabase/schema.sql)
   Mientras diga TU_..., Octavia funciona en modo local (datos solo en ese navegador). */
window.OCTAVIA_SUPABASE = {
  url: 'TU_URL_DE_SUPABASE',
  anonKey: 'TU_ANON_KEY'
};
