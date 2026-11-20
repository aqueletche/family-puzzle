/* ===================== FÍSICA: Acorde a Caixa ===================== */
const PW_W = 360, PW_H = 560, PAD_Y = 520;
function physBuild(spec) {
  const { Engine, Bodies, Composite } = Matter;
  const engine = Engine.create({ enableSleeping: false });
  engine.positionIterations = 8; engine.velocityIterations = 6;
  const list = [];
  for (const s of spec) {
    let b;
    const common = { angle: s.a || 0, friction: .6, restitution: .05 };
    if (s.k === 'pad' || s.k === 'ledge' || s.k === 'ramp') b = Bodies.rectangle(s.x, s.y, s.w, s.h, { ...common, isStatic: true });
    else if (s.k === 'box') b = Bodies.rectangle(s.x, s.y, s.w, s.h, { ...common, chamfer: { radius: 6 }, density: .002 });
    else if (s.k === 'ball') b = Bodies.circle(s.x, s.y, s.w / 2, { ...common, density: .002, friction: .3 });
    else b = Bodies.rectangle(s.x, s.y, s.w, s.h, { ...common, density: s.k === 'stone' ? .004 : .0015 });
    b.spec = s; list.push(b);
  }
  Composite.add(engine.world, list);
  return { engine, list, box: list.find(b => b.spec.k === 'box'), pad: list.find(b => b.spec.k === 'pad'), wood: list.filter(b => b.spec.k === 'wood') };
}
function physState(W, padSpec) {
  const b = W.box, p = b.position;
  if (p.y > PW_H + 60 || p.x < -80 || p.x > PW_W + 80) return 'lose';
  const onPad = p.x > padSpec.x - padSpec.w / 2 - 6 && p.x < padSpec.x + padSpec.w / 2 + 6 && p.y < PAD_Y - 10 && p.y > PAD_Y - 10 - 36;
  return onPad && b.speed < .35 && Math.abs(b.angularVelocity) < .02 ? 'pad' : 'none';
}
function physSim(spec, first, rng) {
  // retorna nº de remoções até vencer, ou -1
  const W = physBuild(spec), padSpec = spec.find(s => s.k === 'pad');
  const step = n => { for (let i = 0; i < n; i++) Matter.Engine.update(W.engine, 1000 / 60); };
  let padFrames = 0, taps = 0;
  const run = n => { for (let i = 0; i < n; i++) { Matter.Engine.update(W.engine, 1000 / 60); const st = physState(W, padSpec); if (st === 'lose') return 'lose'; padFrames = st === 'pad' ? padFrames + 1 : 0; if (padFrames > 30) return 'win'; } return 'none'; };
  step(1);
  const remaining = W.wood.slice();
  for (let t = 0; t < 14; t++) {
    if (!remaining.length) break;
    // prioriza blocos perto/abaixo da caixa
    let pick;
    if (t === 0 && first != null) pick = remaining.find(b => b.spec.id === first);
    else { remaining.sort((a, b) => Math.hypot(a.position.x - W.box.position.x, a.position.y - W.box.position.y) - Math.hypot(b.position.x - W.box.position.x, b.position.y - W.box.position.y)); pick = remaining[Math.min(remaining.length - 1, Math.floor(rng() * rng() * remaining.length))]; }
    if (!pick) break;
    remaining.splice(remaining.indexOf(pick), 1); Matter.Composite.remove(W.engine.world, pick); taps++;
    const r = run(70); if (r === 'win') return { taps, seq: null }; if (r === 'lose') return null;
  }
  const r = run(240);
  return r === 'win' ? { taps } : null;
}
function genPhysics(rng, diff, level) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const spec = []; let id = 0;
    const padW = rng.int([120, 100, 80][diff], [150, 130, 110][diff]);
    const pad = { k: 'pad', x: rng.int(padW / 2 + 10, PW_W - padW / 2 - 10), y: PAD_Y + 10, w: padW, h: 20 };
    spec.push(pad);
    const bases = [{ x: pad.x, top: PAD_Y, w: padW }];
    const nLedges = rng.int(diff === 0 ? 0 : 1, diff + 1);
    for (let i = 0; i < nLedges; i++) {
      const w = rng.int(70, 130), x = rng.int(w / 2 + 6, PW_W - w / 2 - 6), top = rng.int(300, 460);
      if (Math.abs(x - pad.x) < (w + padW) / 2 + 10 && top > PAD_Y - 120) continue;
      if (bases.some(b => b !== bases[0] && Math.abs(b.x - x) < (b.w + w) / 2 + 10)) continue;
      spec.push({ k: 'ledge', x, y: top + 8, w, h: 16 }); bases.push({ x, top, w });
    }
    if (diff > 0 && rng() < .5) { const a = (rng() < .5 ? -1 : 1) * rng.int(14, 28) * Math.PI / 180; spec.push({ k: 'ramp', x: rng.int(90, 270), y: rng.int(330, 440), w: rng.int(90, 140), h: 12, a }); }
    // pilhas
    const tops = [];
    for (const b of bases) {
      const layers = rng.int(diff === 0 ? 2 : 2, [3, 4, 5][diff]);
      let top = b.top, cx = b.x, lastW = b.w;
      for (let l = 0; l < layers; l++) {
        const w = rng.int(30, Math.min(110, lastW + 30)), hh = rng.int(18, 46);
        const x = Math.max(w / 2, Math.min(PW_W - w / 2, cx + rng.int(-18, 18)));
        const kind = diff > 0 && rng() < [0, .15, .25][diff] ? 'stone' : 'wood';
        spec.push({ k: kind, id: id++, x, y: top - hh / 2, w, h: hh }); top -= hh; cx = x; lastW = w;
        if (top < 120) break;
      }
      tops.push({ x: cx, top, w: lastW });
    }
    if (diff === 2 && rng() < .4) { const t = rng.pick(tops); spec.push({ k: 'wood', id: id++, x: t.x, y: t.top - 9, w: Math.min(140, t.w + 60), h: 18 }); t.top -= 18; t.w = Math.min(140, t.w + 60); }
    const t = tops.reduce((a, b) => (rng() < .5 ? a : b));
    const box = { k: 'box', x: t.x + rng.int(-6, 6), y: t.top - 20, w: 40, h: 40 };
    if (box.x < 24 || box.x > PW_W - 24) continue;
    spec.push(box);
    if (diff > 0 && rng() < .3) { const t2 = rng.pick(tops); if (t2 !== t) spec.push({ k: 'ball', x: t2.x, y: t2.top - 14, w: 28, h: 28 }); }
    // estabilidade: nada pode se mexer muito sem toque
    const W = physBuild(spec);
    for (let i = 0; i < 150; i++) Matter.Engine.update(W.engine, 1000 / 60);
    if (W.list.some(b => !b.isStatic && Math.hypot(b.position.x - b.spec.x, b.position.y - b.spec.y) > 6)) continue;
    if (physState(W, pad) !== 'none') continue;
    if (!spec.some(s => s.k === 'wood')) continue;
    // tenta resolver
    let wins = 0, best = 99;
    const tries = 24;
    for (let k = 0; k < tries; k++) { const r = physSim(spec, null, rng); if (r) { wins++; best = Math.min(best, r.taps); } }
    if (!wins) continue;
    const rate = wins / tries;
    if (diff === 1 && (best < 2 && attempt < 40 || rate > .85)) continue;
    if (diff === 2 && (rate > .5 || best < 2) && attempt < 50) continue;
    return { spec, best };
  }
  // fallback simples garantido: torre sobre a plataforma
  const spec = [{ k: 'pad', x: 180, y: PAD_Y + 10, w: 140, h: 20 }, { k: 'wood', id: 0, x: 180, y: PAD_Y - 25, w: 90, h: 50 }, { k: 'wood', id: 1, x: 180, y: PAD_Y - 70, w: 60, h: 40 }, { k: 'box', x: 180, y: PAD_Y - 110, w: 40, h: 40 }];
  return { spec, best: 2 };
}
registerMode({
  id: 'physics', name: 'Acorde a Caixa', icon: '📦', bg: 'linear-gradient(135deg,#f6d365,#fda085)',
  desc: 'Física: leve a caixa até o despertador',
  help: 'Toque nos blocos de madeira para removê-los. Leve a caixa dorminhoca até a plataforma verde ⏰ sem deixá-la cair!',
  start(ctx) {
    const loading = h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, background: '#8fd3fe' } }, 'Montando a fase...');
    ctx.stage.append(loading);
    ctx.timeout(() => { loading.remove(); run(ctx); }, 30);
  }
});
function run(ctx) {
  const G = genPhysics(ctx.rng, ctx.diff, ctx.level);
  let W = physBuild(G.spec), taps = 0, padFrames = 0, raf, ended = false, hintUsed = false;
  const padSpec = G.spec.find(s => s.k === 'pad');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const scale = Math.min(ctx.W / PW_W, ctx.H / PW_H);
  const cv = h('canvas', { style: { position: 'absolute', left: (ctx.W - PW_W * scale) / 2 + 'px', top: (ctx.H - PW_H * scale) + 'px', width: PW_W * scale + 'px', height: PW_H * scale + 'px' } });
  cv.width = PW_W * scale * dpr; cv.height = PW_H * scale * dpr;
  const wb = 15 * scale; ctx.stage.style.background = `linear-gradient(180deg,#8fd3fe,#d9f2ff calc(100% - ${wb}px),#5b9bd5 calc(100% - ${wb}px))`;
  ctx.stage.append(cv);
  const g = cv.getContext('2d');
  const upd = () => ctx.status('Toques: ' + taps, 'Meta ⭐⭐⭐: ' + G.best);
  upd();
  function poly(b) { const v = b.vertices; g.beginPath(); g.moveTo(v[0].x, v[0].y); for (let i = 1; i < v.length; i++) g.lineTo(v[i].x, v[i].y); g.closePath(); }
  let t0 = 0;
  function draw(t) {
    g.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    g.clearRect(0, 0, PW_W, PW_H);
    // nuvens
    g.fillStyle = 'rgba(255,255,255,.8)';
    [[60, 70], [250, 110], [170, 40]].forEach(([x, y], i) => { const xx = (x + t * .01 * (i + 1)) % (PW_W + 80) - 40; g.beginPath(); g.arc(xx, y, 16, 0, 7); g.arc(xx + 18, y - 8, 20, 0, 7); g.arc(xx + 38, y, 15, 0, 7); g.fill(); });
    // água
    g.fillStyle = '#5b9bd5'; g.beginPath(); g.moveTo(0, PW_H); for (let x = 0; x <= PW_W; x += 10) g.lineTo(x, PW_H - 18 + Math.sin(x / 20 + t / 400) * 4); g.lineTo(PW_W, PW_H); g.fill();
    for (const b of W.list) {
      const k = b.spec.k;
      if (k === 'box') continue;
      if (k === 'ball') { g.fillStyle = '#e74c3c'; g.beginPath(); g.arc(b.position.x, b.position.y, b.spec.w / 2, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 3; g.beginPath(); g.arc(b.position.x, b.position.y, b.spec.w / 4, b.angle, b.angle + 2); g.stroke(); continue; }
      poly(b);
      g.fillStyle = { pad: '#3ecf8e', ledge: '#5d6d7e', ramp: '#5d6d7e', wood: '#d9a066', stone: '#9aa5ad' }[k];
      g.fill(); g.lineWidth = 2.5; g.strokeStyle = { pad: '#23965f', ledge: '#34495e', ramp: '#34495e', wood: '#8b5a2b', stone: '#5f6a72' }[k]; g.stroke();
      if (k === 'wood') { g.save(); g.translate(b.position.x, b.position.y); g.rotate(b.angle); g.strokeStyle = 'rgba(139,90,43,.45)'; g.lineWidth = 1.5; const w = b.spec.w, hh = b.spec.h; for (let y = -hh / 2 + 7; y < hh / 2 - 3; y += 8) { g.beginPath(); g.moveTo(-w / 2 + 5, y); g.lineTo(w / 2 - 5, y + 1); g.stroke(); } g.restore(); }
      if (k === 'stone') { g.save(); g.translate(b.position.x, b.position.y); g.rotate(b.angle); g.fillStyle = 'rgba(0,0,0,.15)'; g.beginPath(); g.arc(-b.spec.w / 5, -2, 3, 0, 7); g.arc(b.spec.w / 6, 4, 2, 0, 7); g.fill(); g.restore(); }
      if (k === 'ledge' || k === 'ramp') { g.save(); g.translate(b.position.x, b.position.y); g.rotate(b.angle); g.fillStyle = '#6ab04c'; g.fillRect(-b.spec.w / 2, -b.spec.h / 2 - 2, b.spec.w, 5); g.restore(); }
      if (k === 'pad') { g.font = '20px serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('⏰', b.position.x, b.position.y + 1); }
    }
    // caixa
    const b = W.box, awake = ctx.done && !ended;
    g.save(); g.translate(b.position.x, b.position.y); g.rotate(b.angle);
    g.fillStyle = '#ff9f43'; g.strokeStyle = '#c0661b'; g.lineWidth = 3;
    g.beginPath(); g.roundRect ? g.roundRect(-20, -20, 40, 40, 7) : g.rect(-20, -20, 40, 40); g.fill(); g.stroke();
    g.strokeStyle = '#4a2a0a'; g.fillStyle = '#4a2a0a'; g.lineWidth = 2.5; g.lineCap = 'round';
    if (awake || padFrames > 5) { g.beginPath(); g.arc(-8, -4, 4, 0, 7); g.arc(8, -4, 4, 0, 7); g.fill(); g.beginPath(); g.arc(0, 5, 7, .2, Math.PI - .2); g.stroke(); }
    else { g.beginPath(); g.arc(-8, -4, 4, .2, Math.PI - .2); g.stroke(); g.beginPath(); g.arc(8, -4, 4, .2, Math.PI - .2); g.stroke(); g.beginPath(); g.moveTo(-4, 9); g.lineTo(4, 9); g.stroke(); }
    g.fillStyle = 'rgba(255,120,120,.5)'; g.beginPath(); g.arc(-13, 4, 3, 0, 7); g.arc(13, 4, 3, 0, 7); g.fill();
    g.restore();
    if (!(awake || padFrames > 5)) { g.fillStyle = '#2a1b6b'; g.font = 'bold 14px sans-serif'; const z = (t / 600) % 1; g.globalAlpha = 1 - z; g.fillText('z', b.position.x + 22 + z * 10, b.position.y - 22 - z * 20); g.font = 'bold 10px sans-serif'; g.fillText('z', b.position.x + 30 + z * 8, b.position.y - 32 - z * 22); g.globalAlpha = 1; }
  }
  let acc = 0, last = performance.now();
  function loop(now) {
    raf = requestAnimationFrame(loop);
    acc += Math.min(100, now - last); last = now;
    while (acc >= 1000 / 60) {
      acc -= 1000 / 60; Matter.Engine.update(W.engine, 1000 / 60);
      if (!ctx.done) {
        const st = physState(W, padSpec);
        if (st === 'lose') { ended = true; ctx.fail('A caixa caiu na água! 💦'); }
        padFrames = st === 'pad' ? padFrames + 1 : 0;
        if (padFrames > 30) ctx.win(hintUsed ? 1 : taps <= G.best ? 3 : taps <= G.best + 2 ? 2 : 1, 'A caixa acordou! ⏰');
      }
    }
    draw(now);
  }
  raf = requestAnimationFrame(loop);
  ctx.cleanup(() => cancelAnimationFrame(raf));
  cv.addEventListener('pointerdown', e => {
    e.preventDefault(); if (ctx.done) return;
    const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / scale, y = (e.clientY - r.top) / scale;
    let hit = Matter.Query.point(W.wood, { x, y })[0];
    if (!hit) { // tolerância para dedos
      let bd = 14; for (const b of W.wood) { const bb = b.bounds; const dx = Math.max(bb.min.x - x, 0, x - bb.max.x), dy = Math.max(bb.min.y - y, 0, y - bb.max.y); const d = Math.hypot(dx, dy); if (d < bd) { bd = d; hit = b; } }
    }
    if (!hit) { const st = W.list.filter(b => b.spec.k === 'stone' || b.spec.k === 'box'); if (Matter.Query.point(st, { x, y }).length) { ctx.sfx('bad'); ctx.toast('Esse não sai! Só madeira 🪵', 900); } return; }
    Matter.Composite.remove(W.engine.world, hit); W.wood.splice(W.wood.indexOf(hit), 1); W.list.splice(W.list.indexOf(hit), 1);
    taps++; ctx.sfx('pop'); upd();
  });
  ctx.tool('💡 Dica', () => {
    if (ctx.done) return;
    hintUsed = true;
    const cur = W.list.map(b => ({ ...b.spec, x: b.position.x, y: b.position.y, a: b.angle }));
    const rng = makeRng(taps * 7 + 11);
    const cands = W.wood.slice().sort((a, b) => Math.hypot(a.position.x - W.box.position.x, a.position.y - W.box.position.y) - Math.hypot(b.position.x - W.box.position.x, b.position.y - W.box.position.y));
    let best = null, bestScore = -1;
    for (const c of cands.slice(0, 8)) {
      let wins = 0; for (let k = 0; k < 5; k++) if (physSim(cur, c.spec.id, rng)) wins++;
      if (wins > bestScore) { bestScore = wins; best = c; }
      if (wins >= 4) break;
    }
    const cand = best || cands[0];
    if (cand) { const hx = cand.position.x * scale + parseFloat(cv.style.left), hy = cand.position.y * scale + parseFloat(cv.style.top); const m = h('div', { style: { position: 'absolute', left: hx - 22 + 'px', top: hy - 22 + 'px', width: '44px', height: '44px', borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 0 12px #fff', pointerEvents: 'none', animation: 'pulse .6s 3' } }); ctx.stage.append(m); setTimeout(() => m.remove(), 1900); }
  });
}
