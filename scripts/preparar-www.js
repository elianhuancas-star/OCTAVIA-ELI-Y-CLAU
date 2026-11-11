// Prepara la carpeta www/ para el APK y, si hay OCTAVIA_URL, hace que la app abra el sitio de Vercel
// (así el APK siempre muestra la última versión sin volver a instalarlo).
const fs = require('fs');
const path = require('path');
const raiz = path.join(__dirname, '..');
const www = path.join(raiz, 'www');
fs.mkdirSync(www, { recursive: true });
for (const f of ['index.html', 'config.js']) fs.copyFileSync(path.join(raiz, f), path.join(www, f));
const cfgPath = path.join(raiz, 'capacitor.config.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const url = (process.env.OCTAVIA_URL || '').trim();
cfg.server = { androidScheme: 'https' };
if (url) {
  if (!/^https:\/\//.test(url)) throw new Error('OCTAVIA_URL debe empezar con https://');
  cfg.server.url = url;
  cfg.server.allowNavigation = [new URL(url).host, '*.supabase.co'];
  console.log('El APK abrirá ' + url);
} else {
  console.log('Sin OCTAVIA_URL: el APK usará la copia incluida en www/ (con config.js).');
}
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
