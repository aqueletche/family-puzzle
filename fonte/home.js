/* ===================== DESAFIO DO DIA ===================== */
const Daily = {
  get() {
    const p = Store.data, t = todayStr();
    if (!p.daily || p.daily.date !== t) {
      const rng = makeRng(hashStr('daily|' + t));
      const ids = rng.shuffle(playable().map(m => m.id)).slice(0, 3);
      p.daily = { date: t, games: ids, done: [0, 0, 0], diff: p.diff || 0 };
      Store.save();
    }
    return p.daily;
  },
  nextIndex() { const d = this.get(); return d.done.findIndex(v => !v); },
  play(i) { const d = this.get(); App.play(d.games[i], d.diff, 3 + i, { daily: i }); },
  complete(i, stars) {
    const d = this.get(), p = Store.data, before = d.done[i];
    if (stars > before) { p.bonus += (stars - before) * 2; d.done[i] = stars; }
    if (!before && d.done.every(Boolean)) p.dailyDone++;
    Store.save();
  },
};

/* ===================== CONQUISTAS ===================== */
const TOP_OF = id => { const m = modeById(id); return m && m.parent ? m.parent : id; };
const ACHS = [
  ['first', '🌱', 'Primeiros passos', 'Complete o primeiro nível', p => [Object.keys(p.stars).length, 1]],
  ['explorer', '🧭', 'Explorador', 'Complete um nível em cada um dos 8 jogos', p => [new Set(Object.keys(p.stars).map(k => TOP_OF(k.split(':')[0]))).size, 8]],
  ['stars50', '⭐', 'Colecionador', 'Junte 50 estrelas', p => [Store.total(null, p), 50]],
  ['stars200', '🌟', 'Constelação', 'Junte 200 estrelas', p => [Store.total(null, p), 200]],
  ['stars500', '🌌', 'Galáxia', 'Junte 500 estrelas', p => [Store.total(null, p), 500]],
  ['perfect10', '💯', 'Perfeccionista', 'Faça 3 estrelas em 10 níveis', p => [Object.values(p.stars).filter(v => v === 3).length, 10]],
  ['perfect50', '👑', 'Lenda', 'Faça 3 estrelas em 50 níveis', p => [Object.values(p.stars).filter(v => v === 3).length, 50]],
  ['levels100', '🏃', 'Maratonista', 'Complete 100 níveis', p => [Object.keys(p.stars).length, 100]],
  ['streak3', '🔥', 'Em chamas', 'Jogue 3 dias seguidos', p => [Math.max(p.bestStreak || 0, Store.streak(p)), 3]],
  ['streak7', '📅', 'Fiel escudeiro', 'Jogue 7 dias seguidos', p => [Math.max(p.bestStreak || 0, Store.streak(p)), 7]],
  ['daily1', '🎁', 'Desafiante', 'Complete um Desafio do dia', p => [p.dailyDone, 1]],
  ['daily7', '🏅', 'Rotina de campeão', 'Complete 7 Desafios do dia', p => [p.dailyDone, 7]],
  ['logic4', '🧠', 'Mestre da lógica', 'Complete um nível em cada jogo de Lógica', p => [['sudoku', 'lights', 'tangram', 'hanoi'].filter(id => Store.total(id, p) > 0).length, 4]],
  ['hard10', '💪', 'Sem medo', 'Complete 10 níveis no Difícil', p => [Object.keys(p.stars).filter(k => k.split(':')[1] === '2').length, 10]],
  ['trivia10', '🤓', 'Sabichão', 'Vença 10 rodadas de Trivia', p => [p.wins.trivia || 0, 10]],
].map(([id, icon, name, desc, fn]) => ({ id, icon, name, desc, fn }));
const Achievements = {
  status(p = Store.data) { return ACHS.map(a => { const [cur, goal] = a.fn(p); return { ...a, cur: Math.min(cur, goal), goal, ok: cur >= goal }; }); },
  count(p = Store.data) { return this.status(p).filter(a => a.ok).length; },
  check() {
    const p = Store.data, news = this.status().filter(a => a.ok && !p.ach.includes(a.id));
    if (!news.length) return;
    news.forEach(a => p.ach.push(a.id)); Store.save();
    news.forEach((a, i) => setTimeout(() => { App.toast(a.icon + ' Conquista: ' + a.name + '!', 2200); Sound.play('good'); }, 900 + i * 2400));
  },
};

/* ===================== TELA INICIAL (cartas) ===================== */
Object.assign(App, {
  tab: 'inicio',
  home(tab) {
    if (tab) this.tab = tab;
    this.clear(); this.back = null;
    const body = h('div', { class: 'hb-body' });
    const scr = h('div', { class: 'screen hb' }, body, this.tabbar());
    this.root.append(scr);
    ({ inicio: () => this.homeStart(body), conquistas: () => this.homeAch(body), familia: () => this.homeFamily(body), ajustes: () => this.homeSettings(body) })[this.tab]();
  },
  tabbar() {
    const it = (id, ic, label) => h('button', { class: 'tb' + (this.tab === id ? ' on' : ''), onclick: () => { Sound.play('tap'); this.home(id); } }, h('span', null, ic), label);
    return h('div', { class: 'tabbar' },
      it('inicio', '🏠', 'Início'), it('conquistas', '🏆', 'Conquistas'),
      h('button', { class: 'fab', 'aria-label': 'Jogo surpresa', onclick: () => { Sound.play('pick'); this.surprise(); } }, '🎲'),
      it('familia', '👨‍👩‍👧', 'Família'), it('ajustes', '⚙️', 'Ajustes'));
  },
  surprise() {
    const pl = playable(), m = pl[Math.floor(Math.random() * pl.length)];
    const d = Store.data.diff || 0;
    this.play(m.id, d, Store.unlocked(m.id, d));
  },
  homeStart(body) {
    const p = Store.data, hr = new Date().getHours();
    const greet = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    const D = Daily.get(), nx = D.done.findIndex(v => !v);
    body.append(
      h('div', { class: 'hb-hello' },
        h('div', null, h('small', null, `${greet}, ${p.name}! 👋`), h('h2', null, 'O que vamos ', h('br'), 'jogar hoje?')),
        h('button', { class: 'hb-ava', onclick: () => this.home('familia') }, p.avatar)),
      h('div', { class: 'hb-stats' },
        h('div', null, '⭐ ', h('b', null, Store.total()), Store.total() === 1 ? ' estrela' : ' estrelas'),
        h('div', null, '🔥 ', h('b', null, Store.streak()), Store.streak() === 1 ? ' dia' : ' dias'),
        h('button', { onclick: () => this.home('conquistas') }, '🏆 ', h('b', null, Achievements.count()))),
      h('button', { class: 'hb-daily' + (nx < 0 ? ' done' : ''), onclick: () => { if (nx >= 0) { Sound.play('pick'); Daily.play(nx); } } },
        h('div', { class: 'gift' }, nx < 0 ? '🎉' : '🎁'),
        h('div', { class: 'txt' }, h('b', null, 'Desafio do dia'),
          h('div', { class: 'mini' }, D.games.map((id, i) => h('span', { class: D.done[i] ? 'ok' : '' }, modeById(id).icon))),
          h('small', null, nx < 0 ? 'Completo! Volte amanhã 😉' : 'Estrelas em dobro!')),
        nx >= 0 ? h('div', { class: 'go' }, nx ? 'Continuar' : 'Jogar') : null)
    );
    // baralho de cartas
    const tops = MODES.filter(m => !m.parent);
    const deck = h('div', { class: 'deck' }), dots = h('div', { class: 'dots' });
    body.append(deck, dots);
    const W = body.clientWidth || 360;
    const cw = Math.min(250, Math.round(W * .64));
    deck.style.paddingInline = (W - cw) / 2 + 'px';
    const cards = tops.map((m, i) => {
      const sid = subOf(m), sm = modeById(sid), d = p.diff || 0, unl = Store.unlocked(sid, d);
      const done = unl - 1, medal = Math.floor(done / 10) * 10 + 10;
      const card = h('div', { class: 'gcard', style: { width: cw + 'px', background: m.bg } },
        h('div', { class: 'em' }, m.icon),
        h('h3', null, m.name),
        h('p', null, m.subs ? m.subs.map(id => modeById(id).icon + ' ' + modeById(id).name).join(' • ') : m.desc),
        h('div', { class: 'meta' }, '⭐ ' + groupStars(m), h('span', null, DIFFS[d])),
        h('div', { class: 'bar' }, h('i', { style: { width: (done % 10) * 10 + '%' } })),
        h('small', { class: 'medal' }, '🏅 Próxima medalha: nível ' + medal),
        h('button', { class: 'btn', onclick: e => { e.stopPropagation(); Sound.play('pick'); p.lastCard = i; Store.save(); this.play(sid, d, unl); } }, '▶ Jogar • ' + (m.subs ? sm.name + ' ' : 'Nível ') + unl));
      card.addEventListener('click', () => { Sound.play('tap'); p.lastCard = i; Store.save(); this.levels(sid); });
      deck.append(card); dots.append(h('i', { onclick: () => deck.scrollTo({ left: i * (cw + 14), behavior: 'smooth' }) }));
      return card;
    });
    const fx = () => {
      const c = deck.scrollLeft + deck.clientWidth / 2; let best = 0, bd = 1e9;
      cards.forEach((el, i) => {
        const mid = el.offsetLeft + el.offsetWidth / 2, off = (mid - c) / deck.clientWidth;
        const k = Math.min(1, Math.abs(off) * 1.6);
        el.style.transform = `scale(${1 - k * .14}) rotate(${off * 10}deg)`; el.style.opacity = 1 - k * .35;
        if (Math.abs(mid - c) < bd) { bd = Math.abs(mid - c); best = i; }
      });
      [...dots.children].forEach((d, i) => d.classList.toggle('on', i === best));
    };
    deck.addEventListener('scroll', () => requestAnimationFrame(fx), { passive: true });
    requestAnimationFrame(() => { deck.scrollLeft = (p.lastCard || 0) * (cw + 14); fx(); });
  },
  homeAch(body) {
    const st = Achievements.status(), n = st.filter(a => a.ok).length;
    body.append(h('div', { class: 'hb-title' }, h('h2', null, '🏆 Conquistas'), h('small', null, `${n} de ${st.length} • ${Store.data.avatar} ${Store.data.name}`)),
      h('div', { class: 'hb-scroll' }, h('div', { class: 'achs' }, st.map(a => h('div', { class: 'ach' + (a.ok ? ' ok' : '') },
        h('div', { class: 'ic' }, a.icon),
        h('div', { class: 'tx' }, h('b', null, a.name), h('small', null, a.desc),
          h('div', { class: 'bar' }, h('i', { style: { width: (a.cur / a.goal * 100) + '%' } }))),
        h('div', { class: 'cnt' }, a.ok ? '✔' : a.cur + '/' + a.goal))))));
  },
  homeFamily(body) {
    const R = Store.root, ids = Object.keys(R.profiles);
    body.append(h('div', { class: 'hb-title' }, h('h2', null, '👨‍👩‍👧 Família'), h('small', null, 'Cada jogador tem seu próprio progresso')),
      h('div', { class: 'hb-scroll' }, h('div', { class: 'fam' },
        ids.map(id => {
          const p = R.profiles[id], on = id === R.active;
          return h('div', { class: 'prof' + (on ? ' on' : ''), onclick: () => { if (on) return; R.active = id; Store.save(); Sound.play('good'); this.toast(p.avatar + ' Agora joga: ' + p.name); this.home('inicio'); } },
            h('div', { class: 'av' }, p.avatar),
            h('b', null, p.name),
            h('small', null, '⭐ ' + Store.total(null, p) + '  🔥 ' + Store.streak(p)),
            on ? h('div', { class: 'now' }, 'Jogando agora') : h('div', { class: 'now off' }, 'Tocar para jogar'),
            h('button', { class: 'ed', 'aria-label': 'Editar', onclick: e => { e.stopPropagation(); this.profileForm(id); } }, '✎'));
        }),
        ids.length < 6 ? h('button', { class: 'prof add', onclick: () => this.profileForm(null) }, h('div', { class: 'av' }, '＋'), h('b', null, 'Novo jogador')) : null)));
  },
  profileForm(id) {
    const R = Store.root, p = id ? R.profiles[id] : null;
    let av = p ? p.avatar : AVATARS.find(a => !Object.values(R.profiles).some(q => q.avatar === a)) || AVATARS[0];
    const name = h('input', { class: 'inp', maxlength: 14, placeholder: 'Nome do jogador', value: p ? p.name : '' });
    const grid = h('div', { class: 'avs' });
    const drawAv = () => { grid.innerHTML = ''; AVATARS.forEach(a => grid.append(h('button', { class: a === av ? 'on' : '', onclick: () => { av = a; drawAv(); } }, a))); };
    drawAv();
    const close = () => ov.remove();
    const ov = h('div', { class: 'ov' }, h('div', { class: 'card' },
      h('h3', null, p ? 'Editar jogador' : 'Novo jogador'), name, grid,
      h('div', { class: 'row' },
        h('button', { onclick: close }, 'Cancelar'),
        h('button', { class: 'pri', onclick: () => {
          const nm = name.value.trim(); if (!nm) { name.focus(); this.toast('Digite um nome'); return; }
          if (p) { p.name = nm; p.avatar = av; } else { const nid = 'p' + Date.now().toString(36); R.profiles[nid] = newProfile(nm, av); R.active = nid; }
          Store.save(); close(); this.home(p ? 'familia' : 'inicio');
        } }, 'Salvar')),
      p && Object.keys(R.profiles).length > 1 ? h('button', { class: 'danger', onclick: () => this.confirm(`Excluir ${p.name} e todo o progresso?`, () => { delete R.profiles[id]; if (R.active === id) R.active = Object.keys(R.profiles)[0]; Store.save(); close(); this.home('familia'); }) }, '🗑 Excluir jogador') : null));
    this.root.append(ov); if (!p) setTimeout(() => name.focus(), 50);
  },
  confirm(msg, yes) {
    const ov = h('div', { class: 'ov', style: { zIndex: 70 } }, h('div', { class: 'card' }, h('h3', null, 'Tem certeza?'), h('p', null, msg),
      h('div', { class: 'row' }, h('button', { onclick: () => ov.remove() }, 'Não'), h('button', { class: 'pri red', onclick: () => { ov.remove(); yes(); } }, 'Sim'))));
    this.root.append(ov);
  },
  homeSettings(body) {
    const R = Store.root, p = Store.data;
    const sw = (label, on, fn) => h('button', { class: 'set', onclick: () => { fn(); Store.save(); this.home('ajustes'); } }, h('span', null, label), h('i', { class: 'sw' + (on ? ' on' : '') }));
    body.append(h('div', { class: 'hb-title' }, h('h2', null, '⚙️ Ajustes')),
      h('div', { class: 'hb-scroll' },
        h('div', { class: 'sets' },
          sw('🔊 Sons', R.sound, () => R.sound = !R.sound),
          sw('📳 Vibração', R.vibe, () => R.vibe = !R.vibe),
          h('div', { class: 'set col' }, h('span', null, '🎯 Dificuldade de ' + p.name),
            h('div', { class: 'seg' }, DIFFS.map((n, i) => h('button', { class: i === (p.diff || 0) ? 'on' : '', onclick: () => { p.diff = i; Store.save(); this.home('ajustes'); } }, n)))),
          h('button', { class: 'set', onclick: () => this.confirm(`Apagar todas as estrelas, conquistas e sequência de ${p.name}?`, () => { const keep = { name: p.name, avatar: p.avatar }; R.profiles[R.active] = Object.assign(newProfile(keep.name, keep.avatar)); Store.save(); this.toast('Progresso zerado'); this.home('ajustes'); }) }, h('span', null, '🧹 Zerar progresso de ' + p.name), h('i', null, '›'))),
        h('div', { class: 'about' }, h('img', { src: APP_ICON, alt: '' }), h('b', null, 'Family Puzzle'), h('small', null, 'Versão 2.0 • 8 tipos de desafio • joga sem internet'),
          h('small', null, 'Dica: no navegador do celular, use "Adicionar à tela inicial" para abrir como um app.'))));
  },
});
