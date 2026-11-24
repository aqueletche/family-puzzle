/* ===================== LÓGICA: Sudoku (níveis ímpares) e Apague as Luzes (pares) ===================== */
function sudokuDims(diff) { return [[4, 2, 2], [6, 2, 3], [9, 3, 3]][diff]; } // n, boxH, boxW
function sudokuSolveCount(grid, n, bh, bw, limit = 2) {
  const g = grid.slice(), full = (1 << n) - 1;
  const rows = Array(n).fill(0), cols = Array(n).fill(0), boxes = Array(n).fill(0);
  const bi = (r, c) => Math.floor(r / bh) * (n / bw) + Math.floor(c / bw);
  for (let i = 0; i < n * n; i++) if (g[i]) { const r = i / n | 0, c = i % n, b = 1 << (g[i] - 1); rows[r] |= b; cols[c] |= b; boxes[bi(r, c)] |= b; }
  let count = 0;
  (function rec() {
    if (count >= limit) return;
    let best = -1, bestMask = 0, bestN = 99;
    for (let i = 0; i < n * n; i++) if (!g[i]) {
      const r = i / n | 0, c = i % n, m = full & ~(rows[r] | cols[c] | boxes[bi(r, c)]);
      let k = 0, t = m; while (t) { t &= t - 1; k++; }
      if (k < bestN) { bestN = k; best = i; bestMask = m; if (!k) return; }
    }
    if (best < 0) { count++; return; }
    const r = best / n | 0, c = best % n, b = bi(r, c);
    for (let v = 0; v < n; v++) if (bestMask & (1 << v)) {
      const bit = 1 << v; g[best] = v + 1; rows[r] |= bit; cols[c] |= bit; boxes[b] |= bit;
      rec();
      g[best] = 0; rows[r] &= ~bit; cols[c] &= ~bit; boxes[b] &= ~bit;
      if (count >= limit) return;
    }
  })();
  return count;
}
function genSudoku(rng, diff, level) {
  const [n, bh, bw] = sudokuDims(diff);
  const pat = (r, c) => (bw * (r % bh) + Math.floor(r / bh) + c) % n;
  const shufGroups = (groups, size) => rng.shuffle([...Array(groups).keys()]).flatMap(g => rng.shuffle([...Array(size).keys()]).map(k => g * size + k));
  const rows = shufGroups(n / bh, bh), cols = shufGroups(n / bw, bw), nums = rng.shuffle([...Array(n).keys()].map(v => v + 1));
  const sol = []; for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) sol.push(nums[pat(rows[r], cols[c])]);
  const puz = sol.slice();
  const maxHoles = [[7, 9, 10], [16, 19, 21], [42, 48, 54]][diff][Math.min(2, Math.floor(level / 6))];
  let holes = 0;
  for (const i of rng.shuffle([...Array(n * n).keys()])) {
    if (holes >= maxHoles) break;
    const v = puz[i]; puz[i] = 0;
    if (sudokuSolveCount(puz, n, bh, bw) !== 1) puz[i] = v; else holes++;
  }
  return { n, bh, bw, sol, puz };
}
function playSudoku(ctx) {
  const S = genSudoku(ctx.rng, ctx.diff, ctx.level), { n, bh, bw } = S;
  const cur = S.puz.slice(); let sel = -1, errors = 0, hints = 0;
  const padRows = Math.ceil((n + 1) / 5), size = Math.min(ctx.W - 20, ctx.H - padRows * 58 - 34), cs = Math.floor(size / n);
  const wrap = h('div', { class: 'sd' });
  const grid = h('div', { class: 'sd-g', style: { gridTemplateColumns: `repeat(${n},${cs}px)`, gridAutoRows: cs + 'px' } });
  const pad = h('div', { class: 'sd-pad' });
  wrap.append(grid, pad); ctx.stage.append(wrap);
  const cells = [];
  for (let i = 0; i < n * n; i++) {
    const r = i / n | 0, c = i % n;
    const el = h('div', { class: 'sd-c' + (S.puz[i] ? ' giv' : ''), style: { fontSize: cs * .55 + 'px', marginRight: (c % bw === bw - 1 && c < n - 1) ? '2px' : '0', marginBottom: (r % bh === bh - 1 && r < n - 1) ? '2px' : '0' } });
    el.addEventListener('pointerdown', e => { e.preventDefault(); sel = i; ctx.sfx('tap'); render(); });
    cells.push(el); grid.append(el);
  }
  for (let v = 1; v <= n; v++) pad.append(h('button', { onclick: () => input(v) }, String(v)));
  pad.append(h('button', { style: { background: '#c2185b' }, onclick: () => input(0) }, '⌫'));
  function input(v) {
    if (ctx.done || sel < 0 || S.puz[sel]) return;
    cur[sel] = v;
    if (v && v !== S.sol[sel]) { errors++; ctx.sfx('bad'); ctx.shake(cells[sel]); } else if (v) ctx.sfx('good');
    render();
    if (cur.every((x, i) => x === S.sol[i])) ctx.win(hints ? 1 : errors === 0 ? 3 : errors <= 2 ? 2 : 1);
  }
  function render() {
    const sv = sel >= 0 ? cur[sel] : 0;
    cells.forEach((el, i) => {
      el.textContent = cur[i] || '';
      el.classList.toggle('sel', i === sel);
      el.classList.toggle('same', i !== sel && sv && cur[i] === sv);
      el.classList.toggle('err', !!cur[i] && cur[i] !== S.sol[i]);
    });
    ctx.status('🧠 Sudoku ' + n + 'x' + n, 'Erros: ' + errors);
  }
  render();
  ctx.tool('💡 Revelar 1', () => {
    if (ctx.done) return;
    let i = sel >= 0 && cur[sel] !== S.sol[sel] ? sel : cur.findIndex((x, k) => x !== S.sol[k]);
    if (i < 0) return; hints++; sel = i; input(S.sol[i]);
  });
}
function playLights(ctx) {
  const { rng, diff, level } = ctx;
  const n = Math.min([3, 4, 5][diff] + Math.floor(level / 10), 6);
  const k = Math.min(n * n - 1, [rng.int(2, 4), rng.int(5, 7), rng.int(8, 12)][diff]);
  const on = Array(n * n).fill(false), need = new Set();
  const press = (i, arr) => { const x = i % n, y = i / n | 0;[[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const a = x + dx, b = y + dy; if (a >= 0 && b >= 0 && a < n && b < n) arr[b * n + a] = !arr[b * n + a]; }); };
  rng.shuffle([...Array(n * n).keys()]).slice(0, k).forEach(i => { press(i, on); need.add(i); });
  if (on.every(v => !v)) { press(0, on); need.add(0); }
  let moves = 0, hints = 0; const par = need.size;
  const size = Math.min(ctx.W - 30, ctx.H - 30), cs = (size - (n - 1) * 8) / n;
  const wrap = h('div', { class: 'lo' }), g = h('div', { class: 'lo-g', style: { gridTemplateColumns: `repeat(${n},${cs}px)`, gridAutoRows: cs + 'px' } });
  wrap.append(g); ctx.stage.append(wrap);
  const els = [];
  for (let i = 0; i < n * n; i++) {
    const el = h('div', { class: 'lo-c' });
    el.addEventListener('pointerdown', e => {
      e.preventDefault(); if (ctx.done) return;
      press(i, on); need.has(i) ? need.delete(i) : need.add(i); moves++; ctx.sfx('tap'); render();
      if (on.every(v => !v)) ctx.win(hints ? 1 : moves <= par ? 3 : moves <= par * 2 + 2 ? 2 : 1);
    });
    els.push(el); g.append(el);
  }
  function render() { els.forEach((el, i) => { el.classList.toggle('on', on[i]); el.style.outline = ''; }); ctx.status('💡 Apague todas as luzes', 'Toques: ' + moves + ' (meta ' + par + ')'); }
  render();
  ctx.tool('💡 Dica', () => { const i = [...need][0]; if (i == null) return; hints++; els[i].style.outline = '4px solid #3ecf8e'; });
}
registerMode({
  id: 'logic', name: 'Lógica', icon: '🧠', bg: 'linear-gradient(135deg,#f7971e,#ffd200)',
  desc: 'Sudoku, Luzes, Tangram e Hanói', subs: ['sudoku', 'lights', 'tangram', 'hanoi'],
});
registerMode({
  id: 'sudoku', parent: 'logic', name: 'Sudoku', icon: '🔢',
  help: 'Complete a grade: cada número aparece uma vez em cada linha, coluna e bloco.',
  start: playSudoku,
});
registerMode({
  id: 'lights', parent: 'logic', name: 'Luzes', icon: '💡',
  help: 'Toque numa lâmpada para inverter ela e as vizinhas. Apague todas!',
  start: playLights,
});
