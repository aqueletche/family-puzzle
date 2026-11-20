'use strict';
/* ===================== UTILIDADES ===================== */
const $ = (s, el = document) => el.querySelector(s);
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(c));
  return el;
}
function hashStr(s) { let h1 = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h1 = Math.imul(h1 ^ s.charCodeAt(i), 3432918353); h1 = h1 << 13 | h1 >>> 19; } h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507); h1 = Math.imul(h1 ^ h1 >>> 13, 3266489909); return (h1 ^= h1 >>> 16) >>> 0; }
function makeRng(seed) {
  let a = seed >>> 0;
  const r = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  r.int = (lo, hi) => lo + Math.floor(r() * (hi - lo + 1)); // inclusive
  r.pick = arr => arr[Math.floor(r() * arr.length)];
  r.shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
  return r;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ===================== ARMAZENAMENTO ===================== */
const Store = {
  key: 'quebracuca.v1',
  data: { stars: {}, sound: true, diff: 0 },
  load() { try { const d = JSON.parse(localStorage.getItem(this.key)); if (d) Object.assign(this.data, d); } catch (e) {} },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) {} },
  k(m, d, l) { return m + ':' + d + ':' + l; },
  stars(m, d, l) { return this.data.stars[this.k(m, d, l)] || 0; },
  setStars(m, d, l, n) { const k = this.k(m, d, l); if (n > (this.data.stars[k] || 0)) { this.data.stars[k] = n; this.save(); } },
  unlocked(m, d) { let l = 1; while (this.stars(m, d, l) > 0) l++; return l; },
  total(m) { let t = 0; for (const k in this.data.stars) if (!m || k.startsWith(m + ':')) t += this.data.stars[k]; return t; },
};

/* ===================== SOM ===================== */
const Sound = {
  ctx: null,
  tone(freq, dur, type = 'sine', vol = .15, when = 0, slide) {
    if (!Store.data.sound) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const c = this.ctx, t = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .02);
    } catch (e) {}
  },
  play(n) {
    switch (n) {
      case 'tap': this.tone(660, .06, 'triangle', .1); break;
      case 'pick': this.tone(520, .08, 'triangle', .12, 0, 780); break;
      case 'drop': this.tone(300, .1, 'triangle', .14, 0, 200); break;
      case 'good': this.tone(660, .1, 'sine', .14); this.tone(990, .14, 'sine', .14, .08); break;
      case 'bad': this.tone(220, .22, 'sawtooth', .08, 0, 110); if (navigator.vibrate) navigator.vibrate(60); break;
      case 'win': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, .22, 'triangle', .14, i * .11)); if (navigator.vibrate) navigator.vibrate([30, 40, 30]); break;
      case 'lose': [392, 330, 262].forEach((f, i) => this.tone(f, .25, 'triangle', .12, i * .14)); break;
      case 'pop': this.tone(880, .07, 'square', .06, 0, 1400); break;
    }
  }
};

/* ===================== MODOS ===================== */
const DIFFS = ['Fácil', 'Médio', 'Difícil'];
const MODES = [];
function registerMode(m) { MODES.push(m); }
function modeById(id) { return MODES.find(m => m.id === id); }

/* ===================== APP ===================== */
const App = {
  root: null, cleanups: [], timers: [],
  init() {
    Store.load();
    this.root = $('#app');
    window.addEventListener('popstate', () => this.back && this.back());
    this.home();
  },
  clear() {
    this.cleanups.forEach(f => { try { f(); } catch (e) { console.error(e); } });
    this.cleanups = []; this.timers.forEach(clearTimeout); this.timers = [];
    this.root.innerHTML = '';
  },
  toast(msg, ms = 1500) {
    const t = h('div', { class: 'toast' }, msg); this.root.append(t);
    setTimeout(() => t.remove(), ms);
  },

  home() {
    this.clear(); this.back = null;
    const total = Store.total();
    const scr = h('div', { class: 'screen' },
      h('div', { class: 'home-top' },
        h('img', { src: APP_ICON, alt: '', style: { width: '72px', height: '72px', marginBottom: '8px', filter: 'drop-shadow(0 4px 0 #170e3c)' } }),
        h('div', { class: 'logo' }, 'Family ', h('span', null, 'Puzzle')),
        h('div', { class: 'tag' }, 'Diversão para toda a família • 8 tipos de desafio'),
        h('div', { class: 'chips' },
          h('div', { class: 'chip' }, '⭐ ' + total),
          h('button', { class: 'chip', onclick: () => { Store.data.sound = !Store.data.sound; Store.save(); this.home(); } }, Store.data.sound ? '🔊 Som' : '🔇 Mudo')
        )
      ),
      h('div', { class: 'scroll' },
        h('button', { class: 'big-btn', onclick: () => this.surprise() }, '🎲 Surpresa! Jogar agora'),
        h('div', { class: 'grid-modes' }, MODES.map(m => {
          const d = Store.data.diff || 0;
          return h('button', { class: 'mode-card', style: { background: m.bg }, onclick: () => { Sound.play('tap'); this.levels(m.id); } },
            h('div', { class: 'ic' }, m.icon),
            h('div', { class: 'nm' }, m.name),
            h('div', { class: 'ds' }, m.desc),
            h('div', { class: 'pr' }, '⭐ ' + Store.total(m.id) + '  •  Nv ' + Store.unlocked(m.id, d) + ' ' + DIFFS[d][0])
          );
        })),
        h('div', { class: 'foot' }, 'Dica: adicione à tela inicial para jogar sem internet.')
      )
    );
    this.root.append(scr);
  },

  surprise() {
    const m = MODES[Math.floor(Math.random() * MODES.length)];
    const d = Store.data.diff || 0;
    this.play(m.id, d, Store.unlocked(m.id, d));
  },

  levels(modeId, diff) {
    this.clear();
    const m = modeById(modeId);
    if (diff == null) diff = Store.data.diff || 0;
    Store.data.diff = diff; Store.save();
    this.back = () => this.home();
    const unl = Store.unlocked(modeId, diff);
    const count = Math.max(30, Math.ceil((unl + 5) / 5) * 5);
    const grid = h('div', { class: 'grid-lv' });
    for (let l = 1; l <= count; l++) {
      const s = Store.stars(modeId, diff, l);
      const cls = 'lv ' + (s ? 'done' : l === unl ? 'next' : l > unl ? 'lock' : '');
      grid.append(h('button', { class: cls, onclick: () => { if (l > unl) { Sound.play('bad'); this.toast('🔒 Complete o nível ' + (l - 1)); return; } this.play(modeId, diff, l); } },
        l > unl ? '🔒' : String(l), s ? h('small', null, '★'.repeat(s)) : null));
    }
    this.root.append(h('div', { class: 'screen' },
      h('div', { class: 'bar' },
        h('button', { class: 'ibtn', onclick: () => this.home() }, '‹'),
        h('h2', null, m.icon + ' ' + m.name),
        h('div', { class: 'ibtn', style: { background: 'none' } }, '')),
      h('div', { style: { textAlign: 'center', fontSize: '13px', opacity: .8, padding: '0 16px 8px' } }, m.help),
      h('div', { class: 'tabs' }, DIFFS.map((n, i) => h('button', { class: 'tab' + (i === diff ? ' on' : ''), onclick: () => this.levels(modeId, i) }, n))),
      h('div', { class: 'scroll' }, grid)
    ));
    const nx = $('.lv.next', this.root); if (nx) nx.scrollIntoView({ block: 'center' });
  },

  play(modeId, diff, level) {
    this.clear();
    const m = modeById(modeId);
    this.back = () => this.levels(modeId, diff);
    const status = h('div', { class: 'status' });
    const stage = h('div', { class: 'stage' });
    const tools = h('div', { class: 'tools' });
    const scr = h('div', { class: 'screen' },
      h('div', { class: 'bar' },
        h('button', { class: 'ibtn', onclick: () => this.levels(modeId, diff) }, '‹'),
        h('h2', null, m.icon + ' ' + m.name + ' • ' + level),
        h('button', { class: 'ibtn', onclick: () => { Sound.play('tap'); this.play(modeId, diff, level); } }, '↻')),
      status, stage, tools);
    this.root.append(scr);
    let done = false;
    const ctx = {
      diff, level, stage,
      rng: makeRng(hashStr(modeId + '|' + diff + '|' + level)),
      get W() { return stage.clientWidth; }, get H() { return stage.clientHeight; },
      status: (...items) => { status.innerHTML = ''; items.filter(Boolean).forEach(t => status.append(h('div', { class: 'chip' }, t))); },
      tool: (label, fn) => { const b = h('button', { class: 'tool', onclick: () => { Sound.play('tap'); fn(b); } }, label); tools.append(b); return b; },
      cleanup: fn => this.cleanups.push(fn),
      timeout: (fn, ms) => { const t = setTimeout(fn, ms); this.timers.push(t); return t; },
      sfx: n => Sound.play(n),
      toast: (msg, ms) => this.toast(msg, ms),
      shake: el => { el = el || stage; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); },
      get done() { return done; },
      win: (stars = 3, msg) => {
        if (done) return; done = true;
        stars = Math.max(1, Math.min(3, stars));
        Store.setStars(modeId, diff, level, stars);
        Sound.play('win');
        this.timers.push(setTimeout(() => this.result(true, stars, msg, modeId, diff, level), 450));
      },
      fail: msg => {
        if (done) return; done = true;
        Sound.play('lose');
        this.timers.push(setTimeout(() => this.result(false, 0, msg, modeId, diff, level), 450));
      },
    };
    // espera layout para medir o palco
    requestAnimationFrame(() => { try { m.start(ctx); } catch (e) { console.error(e); stage.append(h('div', { style: { padding: '20px' } }, 'Erro: ' + e.message)); } });
  },

  result(win, stars, msg, modeId, diff, level) {
    const praise = ['Muito bem!', 'Mandou bem!', 'Incrível!', 'Show!', 'Genial!', 'Perfeito!'];
    const ov = h('div', { class: 'ov' }, h('div', { class: 'card' },
      h('h3', null, win ? (stars === 3 ? praise[Math.floor(Math.random() * praise.length)] : 'Nível completo!') : 'Quase lá!'),
      win ? h('div', { class: 'stars' }, [0, 1, 2].map(i => h('span', { class: 's' + (i < stars ? '' : ' off'), style: { animationDelay: (i * .15) + 's' } }, '⭐'))) : h('div', { class: 'stars' }, '😅'),
      h('p', null, msg || (win ? (stars < 3 ? 'Tente de novo para fazer 3 estrelas!' : 'Pronto para o próximo?') : 'Tente de novo, você consegue!')),
      h('div', { class: 'row' },
        h('button', { onclick: () => this.levels(modeId, diff) }, '☰'),
        h('button', { onclick: () => this.play(modeId, diff, level) }, '↻ Repetir'),
        win ? h('button', { class: 'pri', onclick: () => this.play(modeId, diff, level + 1) }, 'Próximo ›') : null
      )));
    this.root.append(ov);
  }
};

/* Arraste genérico por ponteiro (mouse/toque) */
function onDrag(el, { start, move, end }) {
  el.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    const r = start && start(e); if (r === false) return;
    e.preventDefault();
    const mv = ev => move && move(ev);
    const up = ev => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); end && end(ev); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  });
}
