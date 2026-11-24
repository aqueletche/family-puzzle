# Gera o jogo (index.html + PWA) a partir dos fontes desta pasta.
# Uso: python fonte/build.py   (na raiz do repositório)
import os, base64, urllib.parse, shutil, time
SRC = os.path.dirname(os.path.abspath(__file__))   # pasta fonte/
OUT = os.path.dirname(SRC)                          # raiz do repositório
ICON = os.path.join(SRC, 'icon')
rd = lambda p: open(p, encoding='utf-8').read()
def wr(name, txt):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n') as f: f.write(txt)
css = rd(os.path.join(SRC, 'style.css'))
matter = rd(os.path.join(SRC, 'vendor', 'matter.min.js')).replace('</script', '<\\/script')
FILES = ['core.js', 'home.js', 'm_jigsaw.js', 'm_screws.js', 'm_arrows.js', 'm_blocks.js', 'm_logic.js', 'm_logic2.js', 'm_physics.js', 'm_words.js', 'm_trivia_data.js', 'm_trivia.js']
js = '\n'.join(rd(os.path.join(SRC, f)) for f in FILES)
svgicon = rd(os.path.join(ICON, 'icon.svg'))
icon = "data:image/svg+xml," + urllib.parse.quote(svgicon)
apple = "data:image/png;base64," + base64.b64encode(open(os.path.join(ICON, 'icon-180.png'), 'rb').read()).decode()
html=f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#2a1b6b">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Family Puzzle">
<title>Family Puzzle</title>
<link rel="icon" href="{icon}">
<link rel="apple-touch-icon" href="{apple}">
<link rel="manifest" href="manifest.json">
<style>{css}</style>
</head>
<body>
<div id="app"></div>
<script>/* matter-js 0.20.0 (MIT) */\n{matter}</script>
<script>
const APP_ICON = "{icon}";
{js}
App.init();
if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !/claude/.test(location.hostname)) {{
  navigator.serviceWorker.register('sw.js').catch(() => {{}});
}}
</script>
</body>
</html>'''
wr('index.html', html)
wr('manifest.json', '''{
  "name": "Family Puzzle",
  "short_name": "Family Puzzle",
  "start_url": "./index.html",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#2a1b6b",
  "theme_color": "#2a1b6b",
  "icons": [
    { "src": "icon.svg", "sizes": "any", "type": "image/svg+xml" },
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
''')
wr('sw.js', '''const C = 'familypuzzle-%s';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(e.request, cp)); return res; }))); });
''' % time.strftime('%Y%m%d%H%M'))
wr('icon.svg', svgicon)
for s in (192, 512): shutil.copy(os.path.join(ICON, f'icon-{s}.png'), os.path.join(OUT, f'icon-{s}.png'))
print('OK:', os.path.join(OUT, 'index.html'), len(html), 'bytes')
