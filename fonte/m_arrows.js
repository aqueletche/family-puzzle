/* ===================== SETAS (setas com curvas formando desenhos) ===================== */
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // cima, direita, baixo, esquerda
function inPoly(px, py, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; } return c; }
const starPoly = (() => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? .42 : 1; p.push([Math.cos(a) * r, Math.sin(a) * r + .08]); } return p; })();
// formas em coordenadas normalizadas u,v ∈ [-1,1] (v para baixo)
const ARROW_SHAPES = [
  { name: 'Seta', emo: '⬆️', f: (u, v) => (v < -.05 && Math.abs(u) <= (v + 1.02) * 1.05) || (v >= -.05 && Math.abs(u) <= .42) },
  { name: 'Coração', emo: '❤️', f: (u, v) => { const x = u * 1.25, y = -v * 1.25 + .3; return Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y <= 0; } },
  { name: 'Estrela', emo: '⭐', f: (u, v) => inPoly(u, v, starPoly) },
  { name: 'Casa', emo: '🏠', f: (u, v) => inPoly(u, v, [[0, -1.02], [1.02, -.12], [-1.02, -.12]]) || (Math.abs(u) <= .78 && v >= -.15) },
  { name: 'Árvore', emo: '🎄', f: (u, v) => inPoly(u, v, [[0, -1.02], [.55, -.45], [-.55, -.45]]) || inPoly(u, v, [[0, -.7], [.8, .1], [-.8, .1]]) || inPoly(u, v, [[0, -.3], [1.02, .62], [-1.02, .62]]) || (Math.abs(u) <= .2 && v > .5) },
  { name: 'Peixe', emo: '🐟', f: (u, v) => ((u + .2) ** 2 / .72 ** 2 + (v * 1.05) ** 2 / .62 ** 2 <= 1) || (u > .4 && Math.abs(v) <= (u - .4) * 1.1) },
  { name: 'Diamante', emo: '💎', f: (u, v) => v < -.4 ? Math.abs(u) <= .55 + (v + 1.02) * .75 : Math.abs(u) <= (1.02 - v) * .72 },
  { name: 'Gato', emo: '🐱', f: (u, v) => (u * u + (v - .18) ** 2 <= .8 ** 2) || inPoly(u, v, [[-.82, -1.02], [-.25, -.5], [-.8, -.2]]) || inPoly(u, v, [[.82, -1.02], [.25, -.5], [.8, -.2]]) },
  { name: 'Foguete', emo: '🚀', f: (u, v) => inPoly(u, v, [[0, -1.02], [.42, -.45], [.42, .55], [-.42, .55], [-.42, -.45]]) || inPoly(u, v, [[.42, .05], [.9, .75], [.42, .55]]) || inPoly(u, v, [[-.42, .05], [-.9, .75], [-.42, .55]]) || (Math.abs(u) <= .25 && v > .5 && v < .85) },
  { name: 'Lua', emo: '🌙', f: (u, v) => (u * u + v * v <= 1.02) && ((u - .45) ** 2 + (v + .2) ** 2 > .62) },
  { name: 'Cruz', emo: '➕', f: (u, v) => Math.abs(u) <= .36 || Math.abs(v) <= .36 },
  { name: 'Borboleta', emo: '🦋', f: (u, v) => ((Math.abs(u) - .5) ** 2 / .5 ** 2 + (v + .35) ** 2 / .55 ** 2 <= 1) || ((Math.abs(u) - .42) ** 2 / .4 ** 2 + (v - .45) ** 2 / .45 ** 2 <= 1) || (Math.abs(u) < .12 && Math.abs(v) < .9) },
];
const SNAKE_COLS = ['#ff5c8a', '#2f80ff', '#ffb020', '#22b573', '#9b5cff', '#ff7a45', '#00a8c6', '#e84393', '#5f6bd8', '#c99200'];

function genArrowLevel(rng, diff, level) {
  const n = Math.min([11, 14, 17][diff] + Math.floor(level / 6), [13, 17, 20][diff]);
  const shape = ARROW_SHAPES[(level - 1 + diff * 5) % ARROW_SHAPES.length];
  const mask = Array.from({ length: n }, (_, y) => Array.from({ length: n }, (_, x) => shape.f((x + .5) / n * 2 - 1, (y + .5) / n * 2 - 1)));
  const [minL, maxL] = [[3, 6], [4, 10], [5, 15]][diff];
  const inB = (x, y) => x >= 0 && y >= 0 && x < n && y < n;
  const own = Array.from({ length: n }, () => Array(n).fill(-1));
  // 1) particiona o desenho inteiro em caminhos (cobras)
  let paths = [];
  const freeNb = (x, y) => DIRS.filter(([dx, dy]) => inB(x + dx, y + dy) && mask[y + dy][x + dx] && own[y + dy][x + dx] < 0).length;
  for (;;) {
    const fr = []; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (mask[y][x] && own[y][x] < 0) fr.push([x, y]);
    if (!fr.length) break;
    fr.sort((a, b) => freeNb(...a) - freeNb(...b) || rng() - .5);
    const id = paths.length, target = rng.int(minL, maxL);
    let [cx, cy] = fr[0], dir = -1; const cells = [[cx, cy]]; own[cy][cx] = id;
    while (cells.length < target) {
      const opts = [0, 1, 2, 3].filter(k => { const nx = cx + DIRS[k][0], ny = cy + DIRS[k][1]; return inB(nx, ny) && mask[ny][nx] && own[ny][nx] < 0; });
      if (!opts.length) break;
      const k = dir >= 0 && opts.includes(dir) && rng() < .6 ? dir : rng.pick(opts);
      cx += DIRS[k][0]; cy += DIRS[k][1]; dir = k; cells.push([cx, cy]); own[cy][cx] = id;
    }
    paths.push(cells);
  }
  // casas soltas: gruda na ponta de um caminho vizinho
  paths.forEach((p, i) => {
    if (p.length !== 1) return;
    const [x, y] = p[0];
    for (const [dx, dy] of DIRS) {
      const nx = x + dx, ny = y + dy; if (!inB(nx, ny) || own[ny][nx] < 0 || own[ny][nx] === i) continue;
      const q = paths[own[ny][nx]]; if (q.length < 2) continue;
      if (q[0][0] === nx && q[0][1] === ny) { q.unshift([x, y]); own[y][x] = own[ny][nx]; p.length = 0; break; }
      const e = q[q.length - 1]; if (e[0] === nx && e[1] === ny) { q.push([x, y]); own[y][x] = own[ny][nx]; p.length = 0; break; }
    }
  });
  paths = paths.filter(p => p.length);
  // 2) simula a retirada: escolhe pontas que conseguem sair; se travar, corta uma cobra
  const occ = Array.from({ length: n }, () => Array(n).fill(-1));
  let live = paths.map((cells, i) => ({ cells, i }));
  live.forEach(sn => sn.cells.forEach(([x, y]) => occ[y][x] = sn.i));
  let nextId = paths.length;
  const exitDir = (cells, end) => { // direção natural da ponta
    if (cells.length === 1) return null;
    const a = end ? cells[cells.length - 1] : cells[0], b = end ? cells[cells.length - 2] : cells[1];
    return DIRS.findIndex(([dx, dy]) => dx === a[0] - b[0] && dy === a[1] - b[1]);
  };
  const rayFree = (x, y, d) => { let cx = x + DIRS[d][0], cy = y + DIRS[d][1]; while (inB(cx, cy)) { if (occ[cy][cx] >= 0) return false; cx += DIRS[d][0]; cy += DIRS[d][1]; } return true; };
  const snakes = [];
  let guard = 0;
  while (live.length && guard++ < 5000) {
    const moves = [];
    for (const sn of live) {
      if (sn.cells.length === 1) { for (let d = 0; d < 4; d++) if (rayFree(sn.cells[0][0], sn.cells[0][1], d)) moves.push({ sn, cells: sn.cells, d }); }
      else for (const end of [true, false]) {
        const cells = end ? sn.cells : sn.cells.slice().reverse(), d = exitDir(cells, true), [hx, hy] = cells[cells.length - 1];
        if (rayFree(hx, hy, d)) moves.push({ sn, cells, d });
      }
    }
    if (moves.length) {
      const m = rng.pick(moves);
      m.sn.cells.forEach(([x, y]) => occ[y][x] = -1);
      live.splice(live.indexOf(m.sn), 1);
      snakes.push({ cells: m.cells, d: m.d });
    } else {
      // corta a maior cobra em duas
      const sn = live.slice().sort((a, b) => b.cells.length - a.cells.length)[0];
      const k = rng.int(1, sn.cells.length - 1);
      const tail = { cells: sn.cells.slice(k), i: nextId++ }; sn.cells = sn.cells.slice(0, k);
      tail.cells.forEach(([x, y]) => occ[y][x] = tail.i); live.push(tail);
    }
  }
  snakes.forEach((sn, i) => { sn.id = i; sn.alive = true; });
  const grid = Array.from({ length: n }, () => Array(n).fill(-1));
  snakes.forEach(sn => sn.cells.forEach(([x, y]) => grid[y][x] = sn.id));
  rng.shuffle(snakes.map(sn => sn.id)); // ordem da solução não importa para o jogador
  return { n, shape, snakes, occ: grid };
}

registerMode({
  id: 'arrows', name: 'Setas', icon: '➡️', bg: 'linear-gradient(135deg,#11998e,#38ef7d)',
  desc: 'Solte as setas e revele o desenho',
  help: 'Toque numa seta: ela desliza pelo próprio caminho na direção da ponta. Se a frente estiver bloqueada, ela bate e você perde uma vida!',
  start(ctx) {
    const G = genArrowLevel(ctx.rng, ctx.diff, ctx.level), { n, snakes, occ } = G;
    let lives = 3, hints = 0, count = snakes.length;
    const size = Math.min(ctx.W - 12, ctx.H - 12);
    const wrap = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f5ff' } });
    const svg = s('svg', { viewBox: `-0.5 -0.5 ${n + 1} ${n + 1}`, width: size, height: size, style: 'touch-action:none;overflow:visible' });
    wrap.append(svg); ctx.stage.append(wrap);
    const sw = n > 14 ? .26 : .3;
    const upd = () => ctx.status('❤️'.repeat(lives) + '🖤'.repeat(3 - lives), G.shape.emo + ' ' + G.shape.name, 'Setas: ' + count);
    // caminho de saída: corpo + raio até fora do tabuleiro
    snakes.forEach(sn => {
      const [hx, hy] = sn.cells[sn.cells.length - 1], [dx, dy] = DIRS[sn.d];
      sn.path = sn.cells.map(([x, y]) => [x + .5, y + .5]);
      let edge = 0; while (hx + dx * (edge + 1) >= 0 && hy + dy * (edge + 1) >= 0 && hx + dx * (edge + 1) < n && hy + dy * (edge + 1) < n) edge++;
      for (let k = 1; k <= edge + sn.cells.length + 2; k++) sn.path.push([hx + dx * k + .5, hy + dy * k + .5]);
      sn.col = SNAKE_COLS[sn.id % SNAKE_COLS.length];
      sn.g = s('g', {});
      sn.line = s('polyline', { fill: 'none', stroke: sn.col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      sn.head = s('path', { fill: sn.col });
      sn.g.append(sn.line, sn.head); svg.append(sn.g);
      draw(sn, 0);
    });
    function at(path, t) { const i = Math.max(0, Math.min(path.length - 2, Math.floor(t))), f = t - i; return [path[i][0] + (path[i + 1][0] - path[i][0]) * f, path[i][1] + (path[i + 1][1] - path[i][1]) * f]; }
    function draw(sn, p) {
      const L = sn.cells.length - 1, pts = [at(sn.path, p)];
      for (let i = Math.floor(p) + 1; i < p + L; i++) pts.push(sn.path[i]);
      const end = at(sn.path, p + L); pts.push(end);
      // encurta a linha para a ponta da flecha
      const [dx, dy] = DIRS[sn.d];
      let dirx = dx, diry = dy;
      if (pts.length >= 2) { const a = pts[pts.length - 2]; const len = Math.hypot(end[0] - a[0], end[1] - a[1]); if (len > .01) { dirx = (end[0] - a[0]) / len; diry = (end[1] - a[1]) / len; } }
      const tip = [end[0] + dirx * .38, end[1] + diry * .38];
      sn.line.setAttribute('points', (L === 0 ? [[end[0] - dirx * .3, end[1] - diry * .3], end] : pts).map(q => q[0].toFixed(3) + ',' + q[1].toFixed(3)).join(' '));
      const px = -diry, py = dirx, w = .36, b = [end[0] - dirx * .12, end[1] - diry * .12];
      sn.head.setAttribute('d', `M${tip[0]},${tip[1]} L${b[0] + px * w},${b[1] + py * w} L${b[0] - px * w},${b[1] - py * w} Z`);
    }
    function animate(sn, from, to, dur, done) {
      const t0 = performance.now();
      const step = now => { const k = Math.min(1, (now - t0) / dur), e = k < 1 ? (to > from ? k * k * (3 - 2 * k) * .3 + k * .7 : 1 - (1 - k) * (1 - k)) : 1; draw(sn, from + (to - from) * e); if (k < 1) sn.raf = requestAnimationFrame(step); else done && done(); };
      sn.raf = requestAnimationFrame(step);
    }
    ctx.cleanup(() => snakes.forEach(sn => cancelAnimationFrame(sn.raf)));
    function blockedAt(sn) { // nº de casas livres até bater, ou -1 se livre
      const [hx, hy] = sn.cells[sn.cells.length - 1], [dx, dy] = DIRS[sn.d];
      let k = 0, x = hx + dx, y = hy + dy;
      while (x >= 0 && y >= 0 && x < n && y < n) { if (occ[y][x] >= 0) return { k, other: snakes[occ[y][x]] }; k++; x += dx; y += dy; }
      return null;
    }
    function tap(sn) {
      if (ctx.done || !sn.alive || sn.busy) return;
      const b = blockedAt(sn);
      if (!b) {
        sn.alive = false; count--; ctx.sfx('pop'); upd();
        sn.cells.forEach(([x, y]) => occ[y][x] = -1);
        const dist = sn.path.length - sn.cells.length;
        animate(sn, 0, dist, 180 + dist * 28, () => sn.g.remove());
        if (!count) ctx.win(hints ? Math.min(2, lives) : lives);
      } else {
        sn.busy = true; lives--; ctx.sfx('bad'); upd();
        sn.line.setAttribute('stroke', '#e23b5a'); sn.head.setAttribute('fill', '#e23b5a');
        const flash = b.other; flash.line.setAttribute('stroke-width', sw * 1.6);
        animate(sn, 0, b.k + .25, 120 + b.k * 30, () => animate(sn, b.k + .25, 0, 220, () => { sn.busy = false; sn.line.setAttribute('stroke', sn.col); sn.head.setAttribute('fill', sn.col); flash.line.setAttribute('stroke-width', sw); }));
        if (lives <= 0) ctx.fail('As setas bateram 3 vezes. Olhe bem o caminho da ponta antes de tocar!');
      }
    }
    svg.addEventListener('pointerdown', e => {
      e.preventDefault(); if (ctx.done) return;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const lp = pt.matrixTransform(svg.getScreenCTM().inverse());
      let best = null, bd = .75;
      for (const sn of snakes) if (sn.alive) for (const [x, y] of sn.cells) { const d = Math.hypot(x + .5 - lp.x, y + .5 - lp.y); if (d < bd) { bd = d; best = sn; } }
      if (best) tap(best);
    });
    upd();
    ctx.tool('💡 Dica', () => {
      const sn = snakes.find(sn => sn.alive && !sn.busy && !blockedAt(sn)); if (!sn) return;
      hints++; sn.line.setAttribute('stroke-width', sw * 1.9); sn.line.setAttribute('stroke-opacity', .9);
      setTimeout(() => sn.line.setAttribute('stroke-width', sw), 1300);
    });
  }
});
