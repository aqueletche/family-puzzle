/* ===================== ARROWS (setas que saem do tabuleiro) ===================== */
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // cima, direita, baixo, esquerda
const DIR_COL = ['#ff5c8a', '#3ecf8e', '#2f80ff', '#ffb020'];
registerMode({
  id: 'arrows', name: 'Setas', icon: '➡️', bg: 'linear-gradient(135deg,#11998e,#38ef7d)',
  desc: 'Tire as setas na ordem certa',
  help: 'Toque numa seta para ela voar na direção que aponta. Se bater em outra, você perde uma vida!',
  start(ctx) {
    const { rng, diff, level } = ctx;
    const n = Math.min([5, 7, 9][diff] + Math.floor(level / 8), [6, 8, 10][diff]);
    const grid = Array.from({ length: n }, () => Array(n).fill(-1));
    const cells = rng.shuffle([...Array(n * n).keys()]);
    const clear = (x, y, d) => { let cx = x + DIRS[d][0], cy = y + DIRS[d][1]; while (cx >= 0 && cy >= 0 && cx < n && cy < n) { if (grid[cy][cx] >= 0) return false; cx += DIRS[d][0]; cy += DIRS[d][1]; } return true; };
    // construção reversa: cada nova seta precisa ter caminho livre entre as já colocadas
    for (const c of cells) {
      const x = c % n, y = Math.floor(c / n);
      const opts = rng.shuffle([0, 1, 2, 3]).filter(d => clear(x, y, d));
      if (opts.length && rng() < (diff === 0 ? .8 : .95)) grid[y][x] = opts[0];
    }
    let lives = 3, hints = 0, count = grid.flat().filter(v => v >= 0).length;
    const size = Math.min(ctx.W - 16, ctx.H - 16), cs = size / n;
    const wrap = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f2b2b' } });
    const board = h('div', { style: { position: 'relative', width: size + 'px', height: size + 'px', background: 'repeating-linear-gradient(0deg,transparent 0 ' + (cs - 1) + 'px,rgba(255,255,255,.05) ' + (cs - 1) + 'px ' + cs + 'px),repeating-linear-gradient(90deg,transparent 0 ' + (cs - 1) + 'px,rgba(255,255,255,.05) ' + (cs - 1) + 'px ' + cs + 'px)', borderRadius: '12px' } });
    wrap.append(board); ctx.stage.append(wrap);
    const els = {};
    const upd = () => ctx.status('❤️'.repeat(lives) + '🖤'.repeat(3 - lives), 'Setas: ' + count);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const d = grid[y][x]; if (d < 0) continue;
      const el = h('div', { style: { position: 'absolute', left: x * cs + 'px', top: y * cs + 'px', width: cs + 'px', height: cs + 'px', padding: (cs * .08) + 'px', transition: 'transform .35s ease-in, opacity .35s' } },
        h('div', { style: { width: '100%', height: '100%', borderRadius: (cs * .22) + 'px', background: DIR_COL[d], boxShadow: '0 3px 0 rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }, html: `<svg viewBox="0 0 24 24" width="70%" height="70%" style="transform:rotate(${d * 90}deg)"><path d="M12 3 L20 12 H15 V21 H9 V12 H4 Z" fill="#fff"/></svg>` }));
      el.addEventListener('pointerdown', e => { e.preventDefault(); tap(x, y); });
      board.append(el); els[y * n + x] = el;
    }
    function tap(x, y) {
      if (ctx.done) return;
      const d = grid[y][x]; if (d < 0) return;
      const el = els[y * n + x];
      if (clear(x, y, d)) {
        grid[y][x] = -1; count--; ctx.sfx('pop');
        el.style.transform = `translate(${DIRS[d][0] * size * 1.2}px,${DIRS[d][1] * size * 1.2}px)`; el.style.opacity = 0;
        el.style.pointerEvents = 'none';
        upd();
        if (!count) ctx.win(hints ? Math.min(2, lives) : lives);
      } else {
        // anda até o bloqueio e volta
        let k = 0, cx = x + DIRS[d][0], cy = y + DIRS[d][1];
        while (grid[cy][cx] < 0) { k++; cx += DIRS[d][0]; cy += DIRS[d][1]; }
        const off = (k * cs) + cs * .25;
        el.style.transition = 'transform .15s'; el.style.transform = `translate(${DIRS[d][0] * off}px,${DIRS[d][1] * off}px)`;
        setTimeout(() => { el.style.transform = ''; ctx.shake(els[cy * n + cx]); setTimeout(() => el.style.transition = 'transform .35s ease-in, opacity .35s', 160); }, 160);
        lives--; ctx.sfx('bad'); upd();
        if (lives <= 0) ctx.fail('As setas bateram 3 vezes. Observe o caminho antes de tocar!');
      }
    }
    upd();
    ctx.tool('💡 Dica', () => {
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (grid[y][x] >= 0 && clear(x, y, grid[y][x])) {
        hints++; const inner = els[y * n + x].firstChild; inner.style.outline = '4px solid #fff'; setTimeout(() => inner.style.outline = '', 1200); return;
      }
    });
  }
});
