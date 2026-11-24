/* ===================== TANGRAM ===================== */
const TG_BASE = {
  LT: [[0, 0], [4, 0], [2, 2]], MT: [[4, 4], [4, 2], [2, 4]], ST: [[4, 0], [4, 2], [3, 1]],
  SQ: [[2, 2], [3, 1], [4, 2], [3, 3]], PA: [[1, 3], [3, 3], [2, 4], [0, 4]],
};
const TG_COLS = { LT: ['#ff5c8a', '#2f80ff'], MT: ['#ffb020'], ST: ['#22b573', '#9b5cff'], SQ: ['#ff7a45'], PA: ['#00a8c6'] };
const tgCenter = vs => [vs.reduce((a, v) => a + v[0], 0) / vs.length, vs.reduce((a, v) => a + v[1], 0) / vs.length];
const tgArea = vs => vs.reduce((a, [x, y], i) => { const [u, v] = vs[(i + 1) % vs.length]; return a + x * v - u * y; }, 0) / 2;
const TG_LOCAL = Object.fromEntries(Object.entries(TG_BASE).map(([k, vs]) => { const [cx, cy] = tgCenter(vs); let l = vs.map(([x, y]) => [x - cx, y - cy]); if (tgArea(l) < 0) l.reverse(); return [k, l]; }));
function tgVerts(type, rot, flip, x, y) {
  const a = rot * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a);
  const out = TG_LOCAL[type].map(([px, py]) => { if (flip) px = -px; return [px * c - py * sn + x, px * sn + py * c + y]; });
  return flip ? out.reverse() : out;
}
function tgOverlap(A, B) { // SAT para polígonos convexos, tolera contato
  for (const P of [A, B]) for (let i = 0; i < P.length; i++) {
    const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % P.length], nx = y1 - y2, ny = x2 - x1;
    let a0 = Infinity, a1 = -Infinity, b0 = Infinity, b1 = -Infinity;
    for (const [x, y] of A) { const d = x * nx + y * ny; a0 = Math.min(a0, d); a1 = Math.max(a1, d); }
    for (const [x, y] of B) { const d = x * nx + y * ny; b0 = Math.min(b0, d); b1 = Math.max(b1, d); }
    if (a1 <= b0 + 1e-6 || b1 <= a0 + 1e-6) return false;
  }
  return true;
}
function genTangram(rng, diff) {
  const types = diff === 0 ? ['LT', 'LT', 'MT', 'SQ', 'ST'] : ['LT', 'LT', 'MT', 'ST', 'ST', 'SQ', 'PA'];
  const order = [types[0], ...rng.shuffle(types.slice(1))];
  const placed = [{ type: order[0], verts: tgVerts(order[0], rng.int(0, 7), false, 0, 0) }];
  const keep = [.5, .3, .2][diff];
  for (const type of order.slice(1)) {
    const cands = [];
    for (let rot = 0; rot < 8; rot++) for (const flip of type === 'PA' ? [false, true] : [false]) {
      const base = tgVerts(type, rot, flip, 0, 0);
      for (const P of placed) for (let i = 0; i < P.verts.length; i++) {
        const a = P.verts[i], b = P.verts[(i + 1) % P.verts.length], lab = Math.hypot(b[0] - a[0], b[1] - a[1]);
        for (let j = 0; j < base.length; j++) {
          const c = base[j], d = base[(j + 1) % base.length], lcd = Math.hypot(d[0] - c[0], d[1] - c[1]);
          if (lcd > lab + 1e-6) continue;
          // cd precisa ser anti-paralelo a ab
          const ux = (b[0] - a[0]) / lab, uy = (b[1] - a[1]) / lab, vx = (d[0] - c[0]) / lcd, vy = (d[1] - c[1]) / lcd;
          if (Math.abs(ux + vx) > 1e-6 || Math.abs(uy + vy) > 1e-6) continue;
          const anchors = Math.abs(lcd - lab) < 1e-6 ? [[b, c]] : [[b, c], [a, d]];
          for (const [to, from] of anchors) {
            const tx = to[0] - from[0], ty = to[1] - from[1];
            const vs = base.map(([x, y]) => [x + tx, y + ty]);
            if (placed.some(q => tgOverlap(q.verts, vs))) continue;
            const all = placed.flatMap(q => q.verts).concat(vs);
            const xs = all.map(v => v[0]), ys = all.map(v => v[1]);
            const w = Math.max(...xs) - Math.min(...xs), hh = Math.max(...ys) - Math.min(...ys);
            cands.push({ vs, score: w * hh + Math.abs(w - hh) * 2 + rng() * 3 });
          }
        }
      }
    }
    if (!cands.length) return null;
    cands.sort((p, q) => p.score - q.score);
    const pick = cands[Math.floor(rng() * Math.max(1, cands.length * keep))];
    placed.push({ type, verts: pick.vs });
  }
  // normaliza (canto superior esquerdo em 0,0)
  const all = placed.flatMap(q => q.verts), mx = Math.min(...all.map(v => v[0])), my = Math.min(...all.map(v => v[1]));
  placed.forEach(q => q.verts = q.verts.map(([x, y]) => [x - mx, y - my]));
  return { slots: placed, w: Math.max(...all.map(v => v[0])) - mx, h: Math.max(...all.map(v => v[1])) - my };
}
function playTangram(ctx) {
  const { rng, diff } = ctx;
  let T = null; while (!T) T = genTangram(rng, diff);
  const W = ctx.W, H = ctx.H;
  const cols = 3, rows = Math.ceil(T.slots.length / cols);
  const Vw = Math.max(T.w + 2, 13, (T.h + 2.2 + rows * 3.6) * W / H), Vh = Vw * H / W;
  const ox = (Vw - T.w) / 2, oy = .8;
  T.slots.forEach(sl => { sl.verts = sl.verts.map(([x, y]) => [x + ox, y + oy]); sl.c = tgCenter(sl.verts); });
  const svg = s('svg', { viewBox: `0 0 ${Vw} ${Vh}`, width: W, height: H, style: 'position:absolute;inset:0;touch-action:none;background:#fff8ec' });
  ctx.stage.append(svg);
  const toPath = vs => 'M' + vs.map(v => v[0].toFixed(3) + ',' + v[1].toFixed(3)).join('L') + 'Z';
  const sil = s('g', {});
  T.slots.forEach(sl => sil.append(s('path', { d: toPath(sl.verts), fill: '#3d2f7a', stroke: diff === 0 ? '#7a6bc4' : '#3d2f7a', 'stroke-width': diff === 0 ? .05 : .04, 'stroke-linejoin': 'round' })));
  svg.append(sil);
  // peças na bandeja
  const trayY = oy + T.h + .9, trayH = Vh - trayY - .3;
  const cnt = {};
  const pieces = rng.shuffle(T.slots.map(sl => sl.type)).map((type, i) => {
    cnt[type] = (cnt[type] || 0) + 1;
    const cx = Vw / cols * (i % cols + .5), cy = trayY + trayH / rows * (Math.floor(i / cols) + .5);
    const ref = T.slots.find(sl => sl.type === type);
    // fácil: mesma orientação da solução
    let rot = 0, flip = false;
    if (diff === 0) { for (let r = 0; r < 8; r++) if (sameShape(tgVerts(type, r, false, 0, 0), ref.verts)) { rot = r; break; } }
    else { rot = rng.int(0, 7); flip = type === 'PA' && diff === 2 && rng() < .5; }
    const el = s('path', { fill: TG_COLS[type][cnt[type] - 1], stroke: '#1b1340', 'stroke-width': .06, 'stroke-linejoin': 'round', style: 'cursor:grab' });
    svg.append(el);
    const P = { type, rot, flip, x: cx, y: cy, el, slot: null };
    const vs = tgVerts(type, rot, flip, cx, cy), xs = vs.map(v => v[0]), ys = vs.map(v => v[1]);
    P.x += Math.max(0, .25 - Math.min(...xs)) - Math.max(0, Math.max(...xs) - (Vw - .25));
    P.y += Math.max(0, trayY - Math.min(...ys)) - Math.max(0, Math.max(...ys) - (Vh - .25));
    return P;
  });
  function sameShape(A, B) { const ca = tgCenter(A), cb = tgCenter(B); return A.every(([x, y]) => B.some(([u, v]) => Math.hypot(x - ca[0] - (u - cb[0]), y - ca[1] - (v - cb[1])) < .06)); }
  let last = pieces[0], hints = 0, moves = 0;
  const verts = p => tgVerts(p.type, p.rot, p.flip, p.x, p.y);
  const render = p => p.el.setAttribute('d', toPath(verts(p)));
  pieces.forEach(render);
  const upd = () => ctx.status('🧩 Tangram', 'Encaixadas: ' + pieces.filter(p => p.slot).length + '/' + pieces.length);
  function clamp(p) { // mantém a peça dentro da tela
    const vs = verts(p), xs = vs.map(v => v[0]), ys = vs.map(v => v[1]);
    p.x += Math.max(0, .1 - Math.min(...xs)) - Math.max(0, Math.max(...xs) - (Vw - .1));
    p.y += Math.max(0, .1 - Math.min(...ys)) - Math.max(0, Math.max(...ys) - (Vh - .1));
  }
  function snap(p) {
    p.slot = null;
    const vs = verts(p), c = tgCenter(vs);
    for (const sl of T.slots) {
      if (sl.type !== p.type || pieces.some(q => q !== p && q.slot === sl)) continue;
      if (Math.hypot(sl.c[0] - c[0], sl.c[1] - c[1]) < .75 && sameShape(vs, sl.verts)) { p.x += sl.c[0] - c[0]; p.y += sl.c[1] - c[1]; p.slot = sl; ctx.sfx('good'); break; }
    }
    render(p);
  }
  function covered() { // aceita soluções alternativas
    let tgt = 0, bad = 0;
    const pv = pieces.map(verts);
    for (let x = ox + .05; x < ox + T.w; x += .1) for (let y = oy + .05; y < oy + T.h; y += .1) {
      const inT = T.slots.some(sl => inPoly(x, y, sl.verts)), inP = pv.some(v => inPoly(x, y, v));
      if (inT) tgt++; if (inT !== inP) bad++;
    }
    const inside = pv.every(v => { const c = tgCenter(v); return c[0] > ox - .2 && c[0] < ox + T.w + .2 && c[1] > oy - .2 && c[1] < oy + T.h + .2; });
    return inside && bad / tgt < .02;
  }
  function check() {
    upd();
    if (pieces.every(p => p.slot) || covered()) ctx.win(hints ? Math.max(1, 3 - hints) : moves <= pieces.length * 3 ? 3 : 2);
  }
  pieces.forEach(p => {
    let sx, sy, moved, px, py;
    onDrag(p.el, {
      start: e => { if (ctx.done) return false; sx = e.clientX; sy = e.clientY; moved = false; px = p.x; py = p.y; svg.append(p.el); last = p; p.slot = null; },
      move: e => {
        if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) < 6) return;
        moved = true; const k = Vw / svg.getBoundingClientRect().width;
        p.x = px + (e.clientX - sx) * k; p.y = py + (e.clientY - sy) * k; render(p);
      },
      end: () => { moves++; if (!moved) { p.rot = (p.rot + 1) % 8; ctx.sfx('tap'); } clamp(p); snap(p); check(); }
    });
  });
  upd();
  ctx.tool('↔ Virar', () => { if (ctx.done || !last) return; last.flip = !last.flip; snap(last); check(); });
  ctx.tool('💡 Dica', () => {
    if (ctx.done) return;
    const p = pieces.find(p => !p.slot); if (!p) return;
    const sl = T.slots.find(sl => sl.type === p.type && !pieces.some(q => q.slot === sl)); if (!sl) return;
    hints++;
    for (const flip of [false, true]) for (let r = 0; r < 8; r++) if (sameShape(tgVerts(p.type, r, flip, 0, 0), sl.verts)) { p.rot = r; p.flip = flip; p.x = sl.c[0]; p.y = sl.c[1]; snap(p); check(); return; }
  });
}
registerMode({
  id: 'tangram', parent: 'logic', name: 'Tangram', icon: '🔷',
  help: 'Arraste as peças para cobrir a figura escura. Toque numa peça para girar; use "Virar" para espelhar.',
  start: playTangram,
});

/* ===================== TORRE DE HANÓI ===================== */
function playHanoi(ctx) {
  const { rng, diff, level } = ctx;
  const n = [3, 4, 5][diff] + (level >= [8, 6, 5][diff] ? 1 : 0) + (diff === 2 && level >= 12 ? 1 : 0);
  const N3 = 3 ** n;
  const enc = st => st.reduce((a, p, i) => a + p * 3 ** i, 0); // st[i] = pino do disco i (0 = menor)
  const dec = c => Array.from({ length: n }, (_, i) => Math.floor(c / 3 ** i) % 3);
  const neighbors = c => {
    const st = dec(c), top = [n, n, n]; for (let i = n - 1; i >= 0; i--) top[st[i]] = i;
    const out = []; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) if (a !== b && top[a] < top[b]) { const ns = st.slice(); ns[top[a]] = b; out.push([enc(ns), a, b]); }
    return out;
  };
  const classic = diff === 0 && level <= 2 || level === 1;
  const goalPeg = classic ? 2 : rng.int(0, 2);
  const goal = enc(Array(n).fill(goalPeg));
  const dist = new Int16Array(N3).fill(-1); dist[goal] = 0; const q = [goal];
  for (let i = 0; i < q.length; i++) for (const [m] of neighbors(q[i])) if (dist[m] < 0) { dist[m] = dist[q[i]] + 1; q.push(m); }
  let start;
  if (classic) start = enc(Array(n).fill(0));
  else { const minD = Math.floor((2 ** n - 1) * .55); let t = 0; do { start = rng.int(0, N3 - 1); } while (dist[start] < minD && ++t < 500); }
  let cur = start, sel = -1, moves = 0, hints = 0; const opt = dist[start];
  const wrap = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px 6px 30px', background: 'linear-gradient(180deg,#ffe9c7,#ffd28a)' } });
  ctx.stage.append(wrap);
  const pegW = (ctx.W - 24) / 3, maxDW = pegW - 8, dh = Math.min(34, (ctx.H - 120) / (n + 1));
  const DCOL = ['#ff5c8a', '#ffb020', '#22b573', '#2f80ff', '#9b5cff', '#ff7a45', '#00a8c6'];
  const pegs = [0, 1, 2].map(i => {
    const el = h('div', { style: { position: 'relative', width: pegW + 'px', height: (dh * (n + 1.6)) + 'px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', cursor: 'pointer' } });
    el.addEventListener('pointerdown', e => { e.preventDefault(); tap(i); });
    wrap.append(el); return el;
  });
  function render(hl) {
    const st = dec(cur);
    pegs.forEach((el, p) => {
      el.innerHTML = '';
      el.append(h('div', { style: { position: 'absolute', bottom: 0, left: '50%', width: '12px', marginLeft: '-6px', height: '100%', borderRadius: '6px', background: p === goalPeg ? '#8b5a2b' : '#a87444' } }));
      el.append(h('div', { style: { position: 'absolute', bottom: '-12px', left: '4px', right: '4px', height: '12px', borderRadius: '6px', background: '#6d4320' } }));
      el.append(h('div', { style: { position: 'absolute', top: '-26px', left: 0, right: 0, textAlign: 'center', fontSize: '20px' } }, p === goalPeg ? '🏁' : ''));
      if (hl && (hl[0] === p || hl[1] === p)) el.append(h('div', { style: { position: 'absolute', inset: '-4px', borderRadius: '12px', border: `4px dashed ${hl[0] === p ? '#e23b5a' : '#22b573'}`, pointerEvents: 'none' } }));
      const discs = []; for (let i = n - 1; i >= 0; i--) if (st[i] === p) discs.push(i);
      discs.forEach((d, k) => {
        const lifted = sel === p && k === discs.length - 1;
        el.append(h('div', { style: { position: 'relative', zIndex: 2, width: (maxDW * (.3 + .7 * (d + 1) / n)) + 'px', height: dh - 3 + 'px', marginBottom: k === 0 ? '0' : '3px', borderRadius: dh / 2 + 'px', background: DCOL[d % DCOL.length], boxShadow: 'inset 0 -4px 0 rgba(0,0,0,.2)', transform: lifted ? `translateY(-${dh * 1.2}px)` : '', transition: 'transform .12s' } }));
      });
    });
    ctx.status('🗼 Hanói: ' + n + ' discos', 'Jogadas: ' + moves + ' (meta ' + opt + ')');
  }
  function tap(p) {
    if (ctx.done) return;
    const st = dec(cur), top = [n, n, n]; for (let i = n - 1; i >= 0; i--) top[st[i]] = i;
    if (sel < 0) { if (top[p] < n) { sel = p; ctx.sfx('pick'); } render(); return; }
    if (p === sel) { sel = -1; render(); return; }
    if (top[sel] < top[p]) { const ns = st.slice(); ns[top[sel]] = p; cur = enc(ns); moves++; ctx.sfx('drop'); sel = -1; render(); if (cur === goal) ctx.win(hints ? 1 : moves <= opt ? 3 : moves <= opt * 1.5 + 2 ? 2 : 1, `Feito em ${moves} jogadas (mínimo ${opt}).`); }
    else { ctx.sfx('bad'); ctx.shake(pegs[p]); ctx.toast('Disco maior não vai sobre um menor!', 1000); sel = -1; render(); }
  }
  render();
  ctx.tool('💡 Dica', () => { if (ctx.done) return; const nb = neighbors(cur).find(([m]) => dist[m] === dist[cur] - 1); if (!nb) return; hints++; sel = -1; render([nb[1], nb[2]]); });
}
registerMode({
  id: 'hanoi', parent: 'logic', name: 'Torre de Hanói', icon: '🗼',
  help: 'Leve todos os discos para o pino 🏁. Mova um disco por vez e nunca coloque um disco maior sobre um menor.',
  start: playHanoi,
});
