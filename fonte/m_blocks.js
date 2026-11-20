/* ===================== BLOCOS (encaixe tipo tetris) ===================== */
const BLOCK_COLS = ['#ff5c8a', '#2f80ff', '#ffb020', '#3ecf8e', '#b05cff', '#ff7a45', '#00c2d1', '#e84393', '#6c5ce7', '#fdcb6e', '#55efc4', '#d63031'];
function normCells(cells) { const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(([x, y]) => [x - mx, y - my]); }
function rotCells(cells) { return normCells(cells.map(([x, y]) => [-y, x])); }
function genBlocks(rng, diff, level) {
  const big = level > 8 ? 1 : 0;
  const [R, C] = [[4, 4 + big], [5, 5 + big], [6, 6 + big]][diff];
  const [mn, mx] = [[3, 4], [3, 5], [4, 5]][diff];
  const own = Array.from({ length: R }, () => Array(C).fill(-1));
  const pieces = [];
  const nb = (x, y) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < C && b < R);
  const free = () => { const f = []; for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) if (own[y][x] < 0) f.push([x, y]); return f; };
  let f;
  while ((f = free()).length) {
    // começa pela célula livre mais "apertada"
    f.sort((a, b) => nb(...a).filter(([x, y]) => own[y][x] < 0).length - nb(...b).filter(([x, y]) => own[y][x] < 0).length || rng() - .5);
    const id = pieces.length, target = rng.int(mn, mx), cells = [f[0]];
    own[f[0][1]][f[0][0]] = id;
    while (cells.length < target) {
      const fr = []; cells.forEach(([x, y]) => nb(x, y).forEach(([a, b]) => { if (own[b][a] < 0) fr.push([a, b]); }));
      if (!fr.length) break;
      const [a, b] = rng.pick(fr); own[b][a] = id; cells.push([a, b]);
    }
    pieces.push({ id, cells });
  }
  // peças pequenas demais são fundidas com um vizinho
  for (const p of pieces) {
    if (!p.cells.length || p.cells.length >= 2) continue;
    const [x, y] = p.cells[0];
    const opts = nb(x, y).map(([a, b]) => pieces[own[b][a]]).filter(q => q !== p).sort((a, b) => a.cells.length - b.cells.length);
    const q = opts[0]; q.cells.push([x, y]); own[y][x] = q.id; p.cells = [];
  }
  const list = pieces.filter(p => p.cells.length).map((p, i) => {
    const ox = Math.min(...p.cells.map(c => c[0])), oy = Math.min(...p.cells.map(c => c[1]));
    return { sol: { x: ox, y: oy, cells: normCells(p.cells) }, cells: normCells(p.cells), col: BLOCK_COLS[i % BLOCK_COLS.length] };
  });
  rng.shuffle(list);
  if (diff > 0) list.forEach(p => { const r = rng.int(0, 3); for (let i = 0; i < r; i++) p.cells = rotCells(p.cells); });
  return { R, C, pieces: list, canRotate: diff > 0 };
}
registerMode({
  id: 'blocks', name: 'Encaixe', icon: '🟦', bg: 'linear-gradient(135deg,#4776e6,#8e54e9)',
  desc: 'Preencha o quadro com as peças',
  help: 'Arraste as peças para o quadro até preencher tudo. Toque numa peça para girá-la (Médio/Difícil).',
  start(ctx) {
    const G = genBlocks(ctx.rng, ctx.diff, ctx.level);
    const { R, C } = G;
    const W = ctx.W, H = ctx.H;
    const cs = Math.floor(Math.min((W - 24) / C, H * .52 / R));
    const tcs = Math.max(14, Math.floor(cs * .48));
    const occ = Array.from({ length: R }, () => Array(C).fill(-1));
    let hints = 0, moves = 0;
    G.pieces.forEach((p, i) => { p.i = i; p.placed = null; });
    const wrap = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#1d1b4b', paddingTop: '12px' } });
    const board = h('div', { style: { position: 'relative', width: C * cs + 'px', height: R * cs + 'px', background: '#0f0d33', borderRadius: '10px', boxShadow: '0 0 0 4px #3b3880' } });
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) board.append(h('div', { style: { position: 'absolute', left: x * cs + 2 + 'px', top: y * cs + 2 + 'px', width: cs - 4 + 'px', height: cs - 4 + 'px', borderRadius: '6px', background: 'rgba(255,255,255,.06)' } }));
    const tray = h('div', { style: { flex: 1, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', alignContent: 'center', gap: '16px', padding: '10px' } });
    wrap.append(board, tray); ctx.stage.append(wrap);
    const pieceEl = (cells, sz, col) => {
      const w = Math.max(...cells.map(c => c[0])) + 1, hh = Math.max(...cells.map(c => c[1])) + 1;
      const el = h('div', { style: { position: 'relative', width: w * sz + 'px', height: hh * sz + 'px' } });
      cells.forEach(([x, y]) => el.append(h('div', { style: { position: 'absolute', left: x * sz + 'px', top: y * sz + 'px', width: sz - 2 + 'px', height: sz - 2 + 'px', background: col, borderRadius: Math.max(3, sz * .18) + 'px', boxShadow: `inset 0 -${Math.max(2, sz * .1)}px 0 rgba(0,0,0,.25), inset 0 ${Math.max(1, sz * .06)}px 0 rgba(255,255,255,.35)` } })));
      return el;
    };
    const fits = (p, cells, gx, gy) => cells.every(([x, y]) => { const a = gx + x, b = gy + y; return a >= 0 && b >= 0 && a < C && b < R && (occ[b][a] < 0 || occ[b][a] === p.i); });
    function setOcc(p, v) { if (!p.placed) return; p.cells.forEach(([x, y]) => occ[p.placed.y + y][p.placed.x + x] = v); }
    function render() {
      tray.innerHTML = ''; board.querySelectorAll('.bp').forEach(e => e.remove());
      G.pieces.forEach(p => {
        if (p.placed) {
          const el = pieceEl(p.cells, cs, p.col); el.classList.add('bp');
          Object.assign(el.style, { position: 'absolute', left: p.placed.x * cs + 1 + 'px', top: p.placed.y * cs + 1 + 'px' });
          board.append(el); bind(el, p);
        } else {
          const el = pieceEl(p.cells, tcs, p.col); el.style.cursor = 'grab';
          tray.append(el); bind(el, p);
        }
      });
      ctx.status('Peças: ' + G.pieces.filter(p => p.placed).length + '/' + G.pieces.length, G.canRotate ? '↻ toque para girar' : '');
    }
    function bind(el, p) {
      let sx, sy, drag = null, offX, offY, lift;
      onDrag(el, {
        start: e => { if (ctx.done) return false; sx = e.clientX; sy = e.clientY; drag = null; },
        move: e => {
          if (!drag && Math.hypot(e.clientX - sx, e.clientY - sy) < 8) return;
          const sr = ctx.stage.getBoundingClientRect();
          if (!drag) {
            setOcc(p, -1); const wasPlaced = p.placed; p.placed = null; p._was = wasPlaced;
            el.style.visibility = 'hidden';
            drag = pieceEl(p.cells, cs, p.col);
            Object.assign(drag.style, { position: 'absolute', zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 8px 10px rgba(0,0,0,.5))' });
            ctx.stage.append(drag); ctx.sfx('pick');
            const w = parseFloat(drag.style.width), hh = parseFloat(drag.style.height);
            lift = e.pointerType === 'touch' ? hh / 2 + 30 : hh / 2;
            offX = w / 2; offY = lift;
          }
          drag.style.left = (e.clientX - sr.left - offX) + 'px'; drag.style.top = (e.clientY - sr.top - offY) + 'px';
        },
        end: e => {
          if (!drag) { // toque = girar
            if (G.canRotate) {
              if (p.placed) { setOcc(p, -1); const nc = rotCells(p.cells); if (fits(p, nc, p.placed.x, p.placed.y)) p.cells = nc; else { p.placed = null; p.cells = nc; } setOcc(p, p.i); }
              else p.cells = rotCells(p.cells);
              ctx.sfx('tap');
            } else if (p.placed) { setOcc(p, -1); p.placed = null; ctx.sfx('tap'); }
            render(); return;
          }
          const br = board.getBoundingClientRect(), dr = drag.getBoundingClientRect();
          const gx = Math.round((dr.left - br.left) / cs), gy = Math.round((dr.top - br.top) / cs);
          drag.remove();
          if (fits(p, p.cells, gx, gy)) { p.placed = { x: gx, y: gy }; setOcc(p, p.i); moves++; ctx.sfx('drop'); }
          else ctx.sfx(dr.top < br.bottom ? 'bad' : 'tap');
          render(); check();
        }
      });
    }
    function check() {
      if (occ.every(r => r.every(v => v >= 0))) ctx.win(3 - hints);
    }
    render();
    ctx.tool('💡 Dica', () => {
      if (ctx.done) return;
      const p = G.pieces.find(p => !(p.placed && p.placed.x === p.sol.x && p.placed.y === p.sol.y && JSON.stringify(p.cells) === JSON.stringify(p.sol.cells)));
      if (!p) return;
      hints++;
      setOcc(p, -1); p.cells = p.sol.cells; p.placed = null;
      // remove peças que ocupam o lugar da solução
      p.cells.forEach(([x, y]) => { const o = occ[p.sol.y + y][p.sol.x + x]; if (o >= 0) { const q = G.pieces[o]; setOcc(q, -1); q.placed = null; } });
      p.placed = { x: p.sol.x, y: p.sol.y }; setOcc(p, p.i); ctx.sfx('good'); render(); check();
    });
    ctx.tool('↺ Limpar', () => { G.pieces.forEach(p => { setOcc(p, -1); p.placed = null; }); render(); });
  }
});
