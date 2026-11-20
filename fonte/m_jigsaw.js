/* ===================== QUEBRA-CABEÇA (troca de peças) ===================== */
const SCENES = [
  { sky: ['#7fd3ff', '#d8f3ff'], ground: '#5cc96b', big: '🦁', small: ['🌳', '🌼', '🦋', '☁️'], sun: '☀️' },
  { sky: ['#ff9a8b', '#ffe29f'], ground: '#f4a261', big: '🐪', small: ['🌵', '🌵', '🦂', '☁️'], sun: '☀️' },
  { sky: ['#0b1a4a', '#3a3a8a'], ground: '#253b6e', big: '🚀', small: ['⭐', '🌟', '🪐', '✨'], sun: '🌙' },
  { sky: ['#4fc3f7', '#b3e5fc'], ground: '#0277bd', big: '🐳', small: ['🐠', '🐙', '🫧', '🐟'], sun: '☀️' },
  { sky: ['#a1ffce', '#faffd1'], ground: '#7cb342', big: '🐸', small: ['🍄', '🌷', '🐞', '🌿'], sun: '🌤️' },
  { sky: ['#ffd1dc', '#fff0f5'], ground: '#f48fb1', big: '🦄', small: ['🌈', '🍭', '💖', '✨'], sun: '☀️' },
  { sky: ['#e0f7fa', '#ffffff'], ground: '#eceff1', big: '⛄', small: ['❄️', '🌲', '🐧', '❄️'], sun: '🌥️' },
  { sky: ['#ffcc80', '#fff3e0'], ground: '#8d6e63', big: '🏰', small: ['🐉', '🛡️', '🌲', '🦅'], sun: '☀️' },
  { sky: ['#90caf9', '#e3f2fd'], ground: '#9e9e9e', big: '🚂', small: ['🚗', '🚌', '🏠', '🌳'], sun: '☀️' },
  { sky: ['#b39ddb', '#ede7f6'], ground: '#6a1b9a', big: '🐼', small: ['🎋', '🎍', '🌸', '🦋'], sun: '🌕' },
  { sky: ['#81d4fa', '#fffde7'], ground: '#ffe082', big: '🏖️', small: ['🦀', '🐚', '⛱️', '🌴'], sun: '☀️' },
  { sky: ['#263238', '#546e7a'], ground: '#37474f', big: '🦉', small: ['🌙', '🍂', '🌲', '⭐'], sun: '🌕' },
];
function paintScene(S, rng) {
  const sc = rng.pick(SCENES);
  const c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, S); gr.addColorStop(0, sc.sky[0]); gr.addColorStop(1, sc.sky[1]);
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  // raios / padrão para diferenciar peças
  g.globalAlpha = .12; g.fillStyle = '#fff';
  for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(S * .8, S * .15); const a = i / 12 * Math.PI * 2, b = a + .14; g.lineTo(S * .8 + Math.cos(a) * S * 1.5, S * .15 + Math.sin(a) * S * 1.5); g.lineTo(S * .8 + Math.cos(b) * S * 1.5, S * .15 + Math.sin(b) * S * 1.5); g.fill(); }
  g.globalAlpha = 1;
  // colinas
  const hills = [[sc.ground, .72, .18], [shade(sc.ground, -25), .8, .12]];
  hills.forEach(([col, base, amp], k) => {
    g.fillStyle = col; g.beginPath(); g.moveTo(0, S);
    const ph = rng() * 6;
    for (let x = 0; x <= S; x += 4) g.lineTo(x, S * base - Math.sin(x / S * 5 + ph + k) * S * amp * .4 - Math.cos(x / S * 2.3 + ph) * S * amp * .3);
    g.lineTo(S, S); g.fill();
  });
  // bolinhas decorativas
  for (let i = 0; i < 18; i++) { g.fillStyle = `hsla(${rng.int(0, 360)},90%,70%,.55)`; g.beginPath(); g.arc(rng() * S, S * .75 + rng() * S * .25, S * (.01 + rng() * .02), 0, 7); g.fill(); }
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${S * .16}px serif`; g.fillText(sc.sun, S * .8, S * .15);
  const pos = [[.15, .2], [.18, .82], [.85, .78], [.5, .9], [.32, .12], [.1, .55], [.9, .45]];
  rng.shuffle(pos);
  pos.forEach(([x, y], i) => { g.font = `${S * (.09 + rng() * .06)}px serif`; g.fillText(sc.small[i % sc.small.length], S * x, S * y); });
  g.font = `${S * .42}px serif`; g.fillText(sc.big, S * .48, S * .52);
  // moldura numérica sutil nos cantos ajuda adultos? não: mantém imagem pura
  return c.toDataURL('image/png');
}
function shade(hex, p) { const n = parseInt(hex.slice(1), 16); const f = v => Math.max(0, Math.min(255, v + p)); return '#' + ((f(n >> 16) << 16) | (f(n >> 8 & 255) << 8) | f(n & 255)).toString(16).padStart(6, '0'); }

registerMode({
  id: 'jigsaw', name: 'Quebra-cabeça', icon: '🧩', bg: 'linear-gradient(135deg,#ff7a59,#ff4d8d)',
  desc: 'Monte a imagem trocando as peças',
  help: 'Toque em duas peças para trocá-las de lugar até formar a imagem.',
  start(ctx) {
    const { rng, diff, level } = ctx;
    const n = [3, 4, 5][diff] + (level > 15 ? 1 : 0);
    const W = ctx.W, H = ctx.H;
    const prevS = Math.min(90, H * .16);
    const S = Math.floor(Math.min(W - 20, H - prevS - 40) / n) * n;
    const ts = S / n;
    const img = paintScene(S, rng);
    // permutação sem peças já no lugar (desarranjo) para maior desafio
    let perm;
    do { perm = rng.shuffle([...Array(n * n).keys()]); } while (perm.some((v, i) => v === i) && rng() < .97);
    const minSwaps = (() => { const seen = new Set(); let cyc = 0; for (let i = 0; i < perm.length; i++) { if (seen.has(i)) continue; cyc++; let j = i; while (!seen.has(j)) { seen.add(j); j = perm[j]; } } return perm.length - cyc; })();
    let moves = 0, sel = -1;
    const wrap = h('div', { class: 'jg' });
    const prev = h('img', { class: 'jg-prev', src: img, style: { width: prevS + 'px', height: prevS + 'px' } });
    const board = h('div', { class: 'jg-board', style: { gridTemplateColumns: `repeat(${n},${ts - 2}px)` } });
    wrap.append(prev, board); ctx.stage.append(wrap);
    const tiles = [];
    const upd = () => ctx.status('Trocas: ' + moves, 'Meta ⭐⭐⭐: ' + (minSwaps + 2));
    function render() {
      perm.forEach((p, i) => {
        const t = tiles[i];
        t.style.backgroundPosition = `${-(p % n) * ts}px ${-Math.floor(p / n) * ts}px`;
        t.classList.toggle('sel', i === sel);
        t.style.boxShadow = (diff === 0 && p === i) ? 'inset 0 0 0 3px #3ecf8e' : '';
      });
    }
    for (let i = 0; i < n * n; i++) {
      const t = h('div', { class: 'jg-t', style: { width: ts - 2 + 'px', height: ts - 2 + 'px', backgroundImage: `url(${img})`, backgroundSize: `${S}px ${S}px` } });
      t.addEventListener('pointerdown', e => {
        e.preventDefault(); if (ctx.done) return;
        if (sel < 0) { sel = i; ctx.sfx('pick'); }
        else if (sel === i) { sel = -1; }
        else { [perm[sel], perm[i]] = [perm[i], perm[sel]]; sel = -1; moves++; ctx.sfx(perm[i] === i ? 'good' : 'drop'); upd(); }
        render();
        if (perm.every((v, k) => v === k)) { board.style.gap = '0'; ctx.win(moves <= minSwaps + 2 ? 3 : moves <= minSwaps * 1.5 + 4 ? 2 : 1); }
      });
      tiles.push(t); board.append(t);
    }
    render(); upd();
    ctx.tool('👁 Espiar', () => {
      const big = h('img', { src: img, style: { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: S + 'px', borderRadius: '10px', zIndex: 5, boxShadow: '0 0 0 4px #fff' } });
      ctx.stage.append(big); setTimeout(() => big.remove(), 1500);
    });
    ctx.tool('💡 Ajuda', () => {
      if (ctx.done) return;
      const i = perm.findIndex((v, k) => v !== k); if (i < 0) return;
      const j = perm.indexOf(i); [perm[i], perm[j]] = [perm[j], perm[i]]; moves += 2; sel = -1; upd(); render(); ctx.sfx('good');
      if (perm.every((v, k) => v === k)) ctx.win(1);
    });
  }
});
