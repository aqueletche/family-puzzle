/* ===================== PARAFUSOS ===================== */
const SCREW_COLS = [['#ff4d4d', 'Vermelho'], ['#2f80ff', 'Azul'], ['#ffd23f', 'Amarelo'], ['#2ecc71', 'Verde'], ['#b05cff', 'Roxo'], ['#ff8c1a', 'Laranja']];
const PLATE_COLS = ['#f4c27a', '#e8a87c', '#9ad0ec', '#c3aed6', '#a8e6cf', '#ffd3b6', '#ffaaa5', '#dcedc1', '#b5c7ff'];
const SVGNS = 'http://www.w3.org/2000/svg';
function s(tag, attrs) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }

function genScrewLevel(rng, diff, level) {
  const BW = 360, BH = 420, PW = 36;
  const nPlates = Math.min([6, 9, 13][diff], [3, 5, 8][diff] + Math.floor(level / 4));
  const nCols = [3, 4, 5][diff];
  const plates = [], screws = [];
  for (let i = 0; i < nPlates; i++) {
    for (let tries = 0; tries < 80; tries++) {
      const L = rng.int(110, diff === 0 ? 190 : 240);
      const ang = rng.pick([0, 90, 45, -45, 0, 90, rng.int(-80, 80)]) * Math.PI / 180;
      const dx = Math.cos(ang), dy = Math.sin(ang);
      const hx = Math.abs(dx) * L / 2 + 20, hy = Math.abs(dy) * L / 2 + 20;
      const cx = rng.int(Math.ceil(hx), Math.floor(BW - hx)), cy = rng.int(Math.ceil(hy), Math.floor(BH - hy));
      const d = L / 2 - PW / 2;
      const pts = [[cx - dx * d, cy - dy * d], [cx + dx * d, cy + dy * d]];
      if (L > 170 && rng() < .5) pts.push([cx, cy]);
      // parafusos não podem ficar colados em outros
      if (pts.some(([x, y]) => screws.some(q => Math.hypot(q.x - x, q.y - y) < 34))) continue;
      const pid = plates.length; const p = { id: pid, cx, cy, L, ang, col: PLATE_COLS[(pid + rng.int(0, 8)) % PLATE_COLS.length], screws: [], alive: true };
      pts.forEach(([x, y]) => { const sc = { id: screws.length, plate: pid, x, y, alive: true }; screws.push(sc); p.screws.push(sc); });
      plates.push(p); break;
    }
  }
  // total múltiplo de 3: adiciona parafusos no centro de placas sem centro, ou remove parafusos extras (placas com 3)
  const reindex = () => screws.forEach((q, k) => q.id = k);
  for (let guard = 0; guard < 20 && screws.length % 3; guard++) {
    const r = screws.length % 3;
    const threes = plates.filter(p => p.screws.length === 3);
    const cand = plates.filter(p => p.screws.length === 2 && !screws.some(q => Math.hypot(q.x - p.cx, q.y - p.cy) < 34));
    if (threes.length >= r) { for (let k = 0; k < r; k++) { const sc = threes[k].screws.pop(); screws.splice(screws.indexOf(sc), 1); } }
    else if (cand.length >= 3 - r) { for (let k = 0; k < 3 - r; k++) { const p = cand[k]; const sc = { id: 0, plate: p.id, x: p.cx, y: p.cy, alive: true }; screws.push(sc); p.screws.push(sc); } }
    else { const p = plates.pop(); p.screws.forEach(sc => screws.splice(screws.indexOf(sc), 1)); }
    reindex();
  }
  reindex();
  // ordem de remoção válida aleatória -> sequência de cores com folga
  const covered = (sc, alivePlates) => plates.some(p => p.id > sc.plate && alivePlates.has(p.id) && coversPt(p, sc.x, sc.y));
  const alivePl = new Set(plates.map(p => p.id)), left = new Set(screws.map(q => q.id)), order = [];
  while (left.size) {
    const free = [...left].filter(id => !covered(screws[id], alivePl));
    if (!free.length) break;
    const id = rng.pick(free); left.delete(id); order.push(id);
    const pl = plates[screws[id].plate]; if (pl.screws.every(q => !left.has(q.id))) alivePl.delete(pl.id);
  }
  const nBoxes = order.length / 3, boxQueue = [];
  for (let b = 0; b < nBoxes; b++) boxQueue.push(b < nCols ? b : rng.int(0, nCols - 1));
  rng.shuffle(boxQueue);
  // cores na ordem de remoção, intercalando as 2 caixas ativas
  const seq = []; const act = [0, 1].filter(i => i < nBoxes); let nextB = act.length; const fill = act.map(() => 0);
  while (seq.length < order.length) {
    const k = rng.int(0, act.length - 1); seq.push(boxQueue[act[k]]); fill[k]++;
    if (fill[k] === 3) { if (nextB < nBoxes) { act[k] = nextB++; fill[k] = 0; } else { act.splice(k, 1); fill.splice(k, 1); } }
  }
  // embaralha localmente dentro da folga
  const slack = [2, 3, 3][diff];
  for (let i = 0; i < seq.length - 1; i++) { const j = Math.min(seq.length - 1, i + rng.int(0, slack)); [seq[i], seq[j]] = [seq[j], seq[i]]; }
  order.forEach((id, k) => screws[id].color = seq[k]);
  return { BW, BH, PW, plates, screws, boxQueue, buffer: [5, 5, 4][diff] };
}
function coversPt(p, x, y) {
  const dx = x - p.cx, dy = y - p.cy, c = Math.cos(-p.ang), sn = Math.sin(-p.ang);
  const lx = dx * c - dy * sn, ly = dx * sn + dy * c;
  return Math.abs(lx) < p.L / 2 + 4 && Math.abs(ly) < 36 / 2 + 4;
}

registerMode({
  id: 'screws', name: 'Parafusos', icon: '🔩', bg: 'linear-gradient(135deg,#8e9eab,#5d6d7e)',
  desc: 'Solte parafusos e derrube as placas',
  help: 'Toque nos parafusos livres. Eles vão para a caixa da mesma cor. Cuidado para não lotar a bandeja!',
  start(ctx) {
    const L = genScrewLevel(ctx.rng, ctx.diff, ctx.level);
    let bufMax = L.buffer, hints = 0, peak = 0;
    const buffer = []; // cores
    const queue = [...L.boxQueue];
    const boxes = [queue.shift(), queue.shift()].filter(v => v != null).map(c => ({ c, n: 0 }));
    const wrap = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at 50% 40%,#5d6d7e,#2c3e50)' } });
    const top = h('div', { style: { padding: '10px 8px 4px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' } });
    const boxRow = h('div', { style: { display: 'flex', gap: '14px' } });
    const bufRow = h('div', { style: { display: 'flex', gap: '6px', background: 'rgba(0,0,0,.25)', padding: '6px 8px', borderRadius: '14px' } });
    top.append(boxRow, bufRow);
    const svg = s('svg', { viewBox: `-6 -6 ${L.BW + 12} ${L.BH + 12}`, style: 'flex:1;width:100%;min-height:0;touch-action:none' });
    wrap.append(top, svg); ctx.stage.append(wrap);
    const dot = (col, sz = 26) => h('div', { style: { width: sz + 'px', height: sz + 'px', borderRadius: '50%', background: col || 'rgba(255,255,255,.12)', boxShadow: col ? 'inset 0 -3px 0 rgba(0,0,0,.25),0 0 0 2px #fff' : 'inset 0 0 0 2px rgba(255,255,255,.2)', transition: 'transform .2s' } });
    function drawTop() {
      boxRow.innerHTML = '';
      boxes.forEach(b => {
        const col = SCREW_COLS[b.c][0];
        boxRow.append(h('div', { style: { background: col, padding: '8px 10px', borderRadius: '14px', display: 'flex', gap: '6px', boxShadow: '0 4px 0 rgba(0,0,0,.3)' } },
          [0, 1, 2].map(i => i < b.n ? dot('#fff', 22) : h('div', { style: { width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0,0,0,.25)' } }))));
      });
      if (!boxes.length) boxRow.append(h('div', { style: { padding: '12px', fontWeight: 800 } }, '✔'));
      bufRow.innerHTML = '';
      for (let i = 0; i < bufMax; i++) bufRow.append(dot(buffer[i] != null ? SCREW_COLS[buffer[i]][0] : null));
      ctx.status('Caixas restantes: ' + (queue.length + boxes.length), 'Bandeja: ' + buffer.length + '/' + bufMax);
    }
    // desenho
    const pEls = {}, sEls = {};
    L.plates.forEach(p => {
      const g = s('g', { style: `transform:translate(${p.cx}px,${p.cy}px) rotate(${p.ang * 180 / Math.PI}deg);transition:transform .7s ease-in,opacity .7s` });
      g.append(s('rect', { x: -p.L / 2, y: -L.PW / 2, width: p.L, height: L.PW, rx: 12, fill: p.col, 'fill-opacity': .88, stroke: 'rgba(0,0,0,.35)', 'stroke-width': 2 }));
      p.screws.forEach(q => {
        const dx = q.x - p.cx, dy = q.y - p.cy, c = Math.cos(-p.ang), sn = Math.sin(-p.ang);
        g.append(s('circle', { cx: dx * c - dy * sn, cy: dx * sn + dy * c, r: 13, fill: 'rgba(0,0,0,.35)' }));
      });
      svg.append(g); pEls[p.id] = g;
      p.screws.forEach(q => {
        const sg = s('g', { style: `transform:translate(${q.x}px,${q.y}px);transition:transform .35s ease-in,opacity .35s` });
        sg.append(s('circle', { r: 11, fill: SCREW_COLS[q.color][0], stroke: '#fff', 'stroke-width': 2.5 }));
        sg.append(s('path', { d: 'M-5 -5L5 5M5 -5L-5 5', stroke: 'rgba(0,0,0,.5)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }));
        svg.append(sg); sEls[q.id] = sg;
      });
    });
    const covered = q => L.plates.some(p => p.id > q.plate && p.alive && coversPt(p, q.x, q.y));
    function place(color) {
      const b = boxes.find(b => b.c === color && b.n < 3);
      if (b) { b.n++; return true; }
      if (buffer.length < bufMax) { buffer.push(color); peak = Math.max(peak, buffer.length); return true; }
      return false;
    }
    function settleBoxes() {
      let changed = true;
      while (changed) {
        changed = false;
        for (let i = 0; i < boxes.length; i++) if (boxes[i].n >= 3) {
          ctx.sfx('good');
          if (queue.length) boxes[i] = { c: queue.shift(), n: 0 }; else { boxes.splice(i, 1); i--; }
          changed = true;
        }
        // puxa da bandeja
        for (let k = 0; k < buffer.length; k++) {
          const b = boxes.find(b => b.c === buffer[k] && b.n < 3);
          if (b) { b.n++; buffer.splice(k, 1); k--; changed = true; }
        }
      }
    }
    svg.addEventListener('pointerdown', e => {
      e.preventDefault(); if (ctx.done) return;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const lp = pt.matrixTransform(svg.getScreenCTM().inverse());
      const hit = L.screws.filter(q => q.alive && Math.hypot(q.x - lp.x, q.y - lp.y) < 20).sort((a, b) => b.plate - a.plate)[0];
      if (!hit) return;
      if (covered(hit)) { ctx.sfx('bad'); const el = sEls[hit.id]; el.style.transform = `translate(${hit.x + 4}px,${hit.y}px)`; setTimeout(() => el.style.transform = `translate(${hit.x}px,${hit.y}px)`, 120); return; }
      if (!place(hit.color)) { ctx.sfx('bad'); return; }
      hit.alive = false; ctx.sfx('pop');
      const el = sEls[hit.id]; el.style.transform = `translate(${hit.x}px,${hit.y - 40}px) rotate(360deg) scale(.3)`; el.style.opacity = 0;
      const p = L.plates[hit.plate];
      if (p.screws.every(q => !q.alive)) {
        p.alive = false; const g = pEls[p.id];
        g.style.transform = `translate(${p.cx}px,${p.cy + 600}px) rotate(${p.ang * 180 / Math.PI + 40}deg)`; g.style.opacity = 0;
        setTimeout(() => ctx.sfx('drop'), 150);
      }
      settleBoxes(); drawTop();
      if (L.screws.every(q => !q.alive)) { ctx.win(hints ? 1 : peak <= Math.ceil(bufMax / 2) ? 3 : 2); return; }
      if (buffer.length >= bufMax && !L.screws.some(q => q.alive && !covered(q) && boxes.some(b => b.c === q.color && b.n < 3))) {
        ctx.timeout(() => ctx.fail('A bandeja lotou! Pense antes de soltar cada parafuso.'), 400);
      }
    });
    drawTop();
    ctx.tool('➕ Vaga extra', b => { if (ctx.done) return; bufMax++; hints++; b.disabled = true; drawTop(); });
  }
});
