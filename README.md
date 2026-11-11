# Octavia

Acompañamiento de estudio para pianistas clásicos (ciclos I a X). *Classroom controla entregas; Octavia acompaña el proceso de estudio.*

La app es **un solo archivo** (`index.html`). Funciona de tres formas:

| Dónde se abre | Datos | Cómo entra la gente |
|---|---|---|
| Sitio en **Vercel** y **APK** de Android | **Supabase**, compartido | Correo de Gmail: enlace o código de 6 dígitos |
| Doble clic en `index.html` sin configurar | Solo ese navegador (modo local) | Sin cuenta, con atril de prueba |
| Dentro de Claude (artifact) | Base del artifact | Cuenta de Claude |

---

## Puesta en marcha (una sola vez)

### 1. Crea las tres cuentas
- **GitHub:** https://github.com/signup
- **Supabase:** https://supabase.com, botón «Start your project» (puedes entrar con GitHub).
- **Vercel:** https://vercel.com/signup, con «Continue with GitHub».

### 2. Supabase: la base de datos
1. **New project** → nombre `octavia`, una contraseña de base de datos (guárdala) y la región **South America (São Paulo)**.
2. Ve a **SQL Editor → New query**, pega todo `supabase/schema.sql` y pulsa **Run**.
3. Al final del archivo está la línea de la profesora. Cambia el correo, quita los `--` del inicio y ejecútala:
   ```sql
   insert into public.profesoras (email) values ('correo.de.la.profesora@gmail.com') on conflict do nothing;
   ```
4. Ve a **Authentication → Sign In / Providers → Email** y deja **Enable Email provider** activado.
5. Ve a **Authentication → Emails → Magic Link** y cambia el texto del correo para que traiga también el código:
   ```html
   <h2>Entra a Octavia</h2>
   <p><a href="{{ .ConfirmationURL }}">Entrar a mi atril</a></p>
   <p>O escribe este código en la app: <b>{{ .Token }}</b></p>
   ```
   Haz lo mismo en **Confirm signup**. El código es lo que usarán en el APK.
6. Ve a **Project Settings → API** y copia **Project URL** y la clave **anon public** en `config.js`:
   ```js
   window.OCTAVIA_SUPABASE = { url: 'https://xxxx.supabase.co', anonKey: 'eyJhbGciOi...' };
   ```
   La clave *anon* es pública a propósito: lo que protege los datos son las reglas de `schema.sql`.

### 3. GitHub: subir el código
1. En GitHub crea un repositorio **privado** llamado `octavia`, sin README.
2. En esta carpeta, ejecuta (cambia `TU_USUARIO`):
   ```bash
   git remote add origin https://github.com/TU_USUARIO/octavia.git
   git push -u origin main
   ```
   Se abrirá el navegador para que inicies sesión en GitHub.

### 4. Vercel: publicar el sitio
1. **Add New → Project →** importa el repositorio `octavia`.
2. En **Framework Preset** elige **Other**. Deja vacíos Build Command y Output Directory y pulsa **Deploy**.
3. Copia la dirección que te da (por ejemplo `https://octavia-xxxx.vercel.app`).
4. Vuelve a Supabase, a **Authentication → URL Configuration**:
   - **Site URL:** tu dirección de Vercel.
   - **Redirect URLs:** agrega la misma dirección.

Desde ahora, cada `git push` publica la nueva versión sola.

### 5. APK de Android
1. En GitHub ve al repositorio **Settings → Secrets and variables → Actions → Variables** y crea la variable `OCTAVIA_URL` con tu dirección de Vercel.
2. Ve a **Actions → «APK de Android» → Run workflow**. Tarda unos 5 minutos.
3. Abre la ejecución terminada y descarga **octavia-apk** (en *Artifacts*). Dentro está `app-debug.apk`.
4. Pásalo al celular e instálalo. Android pedirá permitir «instalar apps de origen desconocido».

El APK abre el sitio de Vercel, así que **se actualiza solo** con cada `git push`. Solo hay que volver a generarlo si cambias el nombre, el ícono o `capacitor.config.json`.

---

## Límites a tener en cuenta
- **Correos:** el plan gratis de Supabase envía pocos correos por hora con su servidor de prueba. Para todo un grupo de alumnos configura un SMTP propio, por ejemplo Resend (gratis hasta 3000 correos al mes), en **Authentication → Emails → SMTP Settings**.
- **APK de prueba:** es una versión *debug*. Sirve para instalarla a mano en celulares. Para subirla a Google Play hace falta firmarla (cuenta de desarrollador de 25 USD).
- **Ícono:** por ahora el APK usa el ícono genérico de Capacitor, hasta que exista el logotipo definitivo.

## Archivos
- `index.html`: la app completa.
- `config.js`: los datos de conexión a Supabase.
- `supabase/schema.sql`: la tabla, las reglas de acceso y la profesora.
- `vercel.json`, `.vercelignore`: la publicación en Vercel.
- `package.json`, `capacitor.config.json`, `scripts/preparar-www.js`, `.github/workflows/apk.yml`: el APK.
- `OCTAVIA_contexto.md`: el contexto completo del proyecto y su método.
- `capturas/`: capturas de la pantalla Hoy.
