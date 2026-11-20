/* ===================== PALAVRAS: Caça-palavras (ímpares) e Anagrama (pares) ===================== */
const WS_THEMES = {
  'Animais 🐾': 'GATO CACHORRO LEAO TIGRE ZEBRA GIRAFA MACACO COELHO TARTARUGA ELEFANTE CAVALO JACARE PANDA LOBO URSO RAPOSA CORUJA BALEIA GOLFINHO PINGUIM',
  'Frutas 🍓': 'BANANA MACA UVA MANGA LARANJA ABACAXI MELANCIA MORANGO LIMAO PERA KIWI GOIABA AMORA CEREJA MAMAO CAJU COCO PESSEGO ACEROLA JABUTICABA',
  'Cores 🎨': 'AZUL VERDE AMARELO VERMELHO ROXO ROSA LARANJA BRANCO PRETO CINZA MARROM VIOLETA DOURADO PRATEADO BEGE LILAS CIANO TURQUESA',
  'Escola 🏫': 'LAPIS CADERNO BORRACHA MOCHILA ESTOJO REGUA LIVRO QUADRO RECREIO PROFESSOR ALUNO PROVA TESOURA COLA GIZ CANETA AGENDA MAPA',
  'Esportes ⚽': 'FUTEBOL VOLEI BASQUETE TENIS NATACAO JUDO SURFE CORRIDA SKATE XADREZ BOXE GOLFE HANDEBOL CICLISMO REMO KARATE ESGRIMA',
  'Profissões 👩‍⚕️': 'MEDICO DENTISTA BOMBEIRO PILOTO PADEIRO ENGENHEIRO PROFESSOR ADVOGADO COZINHEIRO MOTORISTA PINTOR CARTEIRO ATOR CANTOR POLICIAL ARQUITETO',
  'Casa 🏠': 'SOFA CAMA MESA CADEIRA JANELA PORTA COZINHA ESPELHO TAPETE ARMARIO GELADEIRA FOGAO VARANDA TELHADO ESCADA QUARTO BANHEIRO',
  'Natureza 🌳': 'ARVORE FLOR RIO MAR MONTANHA FLORESTA CHUVA SOL NUVEM PEDRA AREIA LAGO CACHOEIRA VULCAO PRAIA ILHA DESERTO NEVE',
  'Espaço 🚀': 'PLANETA ESTRELA LUA SOL COMETA GALAXIA FOGUETE ASTRONAUTA MARTE TERRA SATURNO JUPITER ORBITA ECLIPSE METEORO TELESCOPIO',
  'Comidas 🍕': 'PIZZA ARROZ FEIJAO MACARRAO BOLO PAO QUEIJO OVO SOPA SALADA PIPOCA BRIGADEIRO PASTEL COXINHA TAPIOCA LASANHA PUDIM',
  'Transportes 🚗': 'CARRO ONIBUS TREM AVIAO NAVIO BICICLETA MOTO METRO BARCO CAMINHAO HELICOPTERO PATINETE TAXI CANOA BALAO',
  'Corpo 🖐️': 'CABECA OLHO NARIZ BOCA ORELHA BRACO PERNA JOELHO DEDO MAO PE OMBRO COTOVELO CORACAO PESCOCO CABELO',
  'Música 🎵': 'VIOLAO PIANO BATERIA FLAUTA GUITARRA TAMBOR VIOLINO SAMBA FORRO ROCK MELODIA RITMO CANTOR PANDEIRO SANFONA',
  'Brasil 🇧🇷': 'AMAZONAS BAHIA RECIFE BRASILIA PANTANAL CARNAVAL CAPOEIRA FREVO SAMBA PAMPA CERRADO RIO NORDESTE MINAS SERTAO',
};
const ANAGRAMS = [
  // [palavra, emoji, dificuldade 0-2]
  ['GATO', '🐱', 0], ['SOL', '☀️', 0], ['LUA', '🌙', 0], ['PATO', '🦆', 0], ['BOLA', '⚽', 0], ['CASA', '🏠', 0], ['FLOR', '🌸', 0], ['PEIXE', '🐟', 0], ['UVA', '🍇', 0], ['BOLO', '🎂', 0], ['VACA', '🐮', 0], ['SAPO', '🐸', 0], ['RATO', '🐭', 0], ['MAR', '🌊', 0], ['PIPA', '🪁', 0], ['URSO', '🐻', 0], ['LEAO', '🦁', 0], ['OVO', '🥚', 0], ['PAO', '🍞', 0], ['CHUVA', '🌧️', 0], ['NAVIO', '🚢', 0], ['MILHO', '🌽', 0], ['FOGO', '🔥', 0], ['ABELHA', '🐝', 0],
  ['BANANA', '🍌', 1], ['CAVALO', '🐴', 1], ['CENOURA', '🥕', 1], ['FOGUETE', '🚀', 1], ['CAMELO', '🐫', 1], ['PALHACO', '🤡', 1], ['TOMATE', '🍅', 1], ['GIRAFA', '🦒', 1], ['COELHO', '🐰', 1], ['CASTELO', '🏰', 1], ['ESTRELA', '⭐', 1], ['MACACO', '🐵', 1], ['SORVETE', '🍦', 1], ['TUBARAO', '🦈', 1], ['PIRATA', '🏴‍☠️', 1], ['ABACAXI', '🍍', 1], ['VULCAO', '🌋', 1], ['GUITARRA', '🎸', 1], ['ROBO', '🤖', 1], ['PINGUIM', '🐧', 1], ['ARCOIRIS', '🌈', 1], ['PANDA', '🐼', 1], ['CORUJA', '🦉', 1], ['DRAGAO', '🐉', 1],
  ['BORBOLETA', '🦋', 2], ['ELEFANTE', '🐘', 2], ['HELICOPTERO', '🚁', 2], ['ASTRONAUTA', '👨‍🚀', 2], ['MELANCIA', '🍉', 2], ['TARTARUGA', '🐢', 2], ['DINOSSAURO', '🦕', 2], ['TELESCOPIO', '🔭', 2], ['AMPULHETA', '⏳', 2], ['CHOCOLATE', '🍫', 2], ['BICICLETA', '🚲', 2], ['COMPUTADOR', '💻', 2], ['MICROSCOPIO', '🔬', 2], ['CAMALEAO', '🦎', 2], ['FLAMINGO', '🦩', 2], ['GUARDACHUVA', '☂️', 2], ['TROMPETE', '🎺', 2], ['ESCORPIAO', '🦂', 2], ['CACHOEIRA', '🏞️', 2], ['TELEFONE', '☎️', 2], ['PARAQUEDAS', '🪂', 2], ['BUMERANGUE', '🪃', 2], ['LAGOSTA', '🦞', 2], ['CANGURU', '🦘', 2],
];
const LETTER_POOL = 'AAAAAEEEEEIIIOOOOUUBCCDDFGHJLLMMNNPPQRRRSSSTTVXZ';
const WS_COLS = ['#ff8fab', '#80ed99', '#ffd166', '#90dbf4', '#cdb4db', '#ffb4a2', '#a0c4ff', '#fdffb6', '#caffbf', '#ffc6ff'];

function playWordSearch(ctx) {
  const { rng, diff, level } = ctx;
  const n = [8, 10, 11][diff], nWords = [5, 7, 9][diff];
  const dirs = [[[1, 0], [0, 1]], [[1, 0], [0, 1], [1, 1], [1, -1]], [[1, 0], [0, 1], [1, 1], [1, -1], [-1, 0], [0, -1], [-1, -1], [-1, 1]]][diff];
  const themes = Object.keys(WS_THEMES);
  const theme = themes[(level * 7 + diff * 3 + rng.int(0, 2)) % themes.length];
  const pool = rng.shuffle(WS_THEMES[theme].split(' ').filter(w => w.length <= n && w.length >= 3));
  const grid = Array.from({ length: n }, () => Array(n).fill(''));
  const placed = [];
  for (const w of pool) {
    if (placed.length >= nWords) break;
    for (let t = 0; t < 120; t++) {
      const [dx, dy] = rng.pick(dirs);
      const x0 = rng.int(0, n - 1), y0 = rng.int(0, n - 1), x1 = x0 + dx * (w.length - 1), y1 = y0 + dy * (w.length - 1);
      if (x1 < 0 || y1 < 0 || x1 >= n || y1 >= n) continue;
      let ok = true; for (let i = 0; i < w.length; i++) { const c = grid[y0 + dy * i][x0 + dx * i]; if (c && c !== w[i]) { ok = false; break; } }
      if (!ok) continue;
      for (let i = 0; i < w.length; i++) grid[y0 + dy * i][x0 + dx * i] = w[i];
      placed.push({ w, x0, y0, dx, dy, found: false }); break;
    }
  }
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!grid[y][x]) grid[y][x] = rng.pick(LETTER_POOL);
  let hints = 0;
  const wrap = h('div', { class: 'ws' });
  const listH = Math.ceil(placed.length / 3) * 22 + 20;
  const size = Math.min(ctx.W - 20, ctx.H - 60 - listH), cs = size / n;
  const board = h('div', { style: { position: 'relative', width: size + 'px', height: size + 'px', background: '#fff', borderRadius: '12px', boxShadow: '0 3px 0 #f0d9a8', touchAction: 'none' } });
  const list = h('div', { class: 'ws-list' });
  wrap.append(h('div', { class: 'ws-theme' }, theme), board, list); ctx.stage.append(wrap);
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const el = h('div', { style: { position: 'absolute', left: x * cs + 'px', top: y * cs + 'px', width: cs + 'px', height: cs + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: cs * .55 + 'px', borderRadius: cs * .3 + 'px', transition: 'background .15s' } }, grid[y][x]);
    cells.push(el); board.append(el);
  }
  const found = new Map(); // idx -> color
  let start = null, curSel = [];
  const cellAt = e => { const r = board.getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / cs), y = Math.floor((e.clientY - r.top) / cs); return x >= 0 && y >= 0 && x < n && y < n ? [x, y] : null; };
  function line(a, b) {
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.max(Math.abs(dx), Math.abs(dy));
    if (len === 0) return [a];
    // encaixa na direção mais próxima de 8
    const ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * Math.PI / 4;
    const sx = Math.round(Math.cos(ang)), sy = Math.round(Math.sin(ang));
    const out = []; for (let i = 0; i <= len; i++) { const x = a[0] + sx * i, y = a[1] + sy * i; if (x < 0 || y < 0 || x >= n || y >= n) break; out.push([x, y]); }
    return out;
  }
  function paint() {
    cells.forEach((el, i) => { el.style.background = found.get(i) || ''; });
    curSel.forEach(([x, y]) => cells[y * n + x].style.background = '#ffe066');
    list.innerHTML = ''; placed.forEach(p => list.append(h('span', { class: p.found ? 'f' : '' }, p.w)));
    ctx.status('🔎 Encontradas: ' + placed.filter(p => p.found).length + '/' + placed.length);
  }
  onDrag(board, {
    start: e => { if (ctx.done) return false; start = cellAt(e); if (!start) return false; curSel = [start]; ctx.sfx('tap'); paint(); },
    move: e => { const c = cellAt(e); if (!c) return; const nl = line(start, c); if (nl.length !== curSel.length) { curSel = nl; paint(); } },
    end: () => {
      const s = curSel.map(([x, y]) => grid[y][x]).join(''), r = [...s].reverse().join('');
      const p = placed.find(p => !p.found && (p.w === s || p.w === r) && curSel.length === p.w.length);
      if (p) {
        // confirma posição (pode haver repetição de letras em outro lugar; aceitamos qualquer ocorrência com a palavra)
        p.found = true; const col = WS_COLS[placed.indexOf(p) % WS_COLS.length];
        curSel.forEach(([x, y]) => found.set(y * n + x, col)); ctx.sfx('good');
      } else if (curSel.length > 1) ctx.sfx('bad');
      curSel = []; paint();
      if (placed.every(p => p.found)) ctx.win(3 - hints);
    }
  });
  paint();
  ctx.tool('💡 Dica', () => {
    const p = placed.find(p => !p.found); if (!p) return; hints++;
    const el = cells[p.y0 * n + p.x0]; el.style.background = '#ff6b6b'; setTimeout(paint, 1300);
  });
}
function playAnagram(ctx) {
  const { rng, diff, level } = ctx;
  const pool = ANAGRAMS.filter(a => a[2] === diff);
  const words = rng.shuffle(pool.slice()).slice(0, [3, 4, 4][diff]);
  let idx = 0, mistakes = 0, hints = 0;
  const wrap = h('div', { class: 'an' }); ctx.stage.append(wrap);
  function show() {
    const [word, emo] = words[idx];
    let letters; do { letters = rng.shuffle([...word]); } while (letters.join('') === word && word.length > 1);
    const used = Array(letters.length).fill(false), slots = [];
    wrap.innerHTML = '';
    const lsz = Math.min(48, Math.floor((ctx.W - 30) / Math.min(letters.length, 7)) - 6);
    const emoEl = h('div', { class: 'an-emo' }, diff === 2 && level % 4 === 0 ? '❓' : emo);
    const slotRow = h('div', { class: 'an-slots' }), letRow = h('div', { class: 'an-letters' });
    wrap.append(h('div', { style: { fontWeight: 800, opacity: .7 } }, `Palavra ${idx + 1} de ${words.length}`), emoEl, slotRow, letRow);
    function draw() {
      slotRow.innerHTML = ''; letRow.innerHTML = '';
      word.split('').forEach((_, i) => { const s = h('div', { class: 'an-slot', style: { width: lsz - 6 + 'px', fontSize: lsz * .55 + 'px' } }, slots[i] != null ? letters[slots[i]] : ''); s.onclick = () => { if (slots[i] == null || ctx.done) return; used[slots[i]] = false; slots.splice(i, 1); ctx.sfx('tap'); draw(); }; slotRow.append(s); });
      letters.forEach((l, i) => { const b = h('button', { class: 'an-l' + (used[i] ? ' used' : ''), style: { width: lsz + 'px', height: lsz + 6 + 'px', fontSize: lsz * .55 + 'px' } }, l); b.onclick = () => { if (used[i] || ctx.done) return; used[i] = true; slots.push(i); ctx.sfx('tap'); draw(); check(); }; letRow.append(b); });
      ctx.status('🔤 Anagrama', 'Erros: ' + mistakes);
    }
    function check() {
      if (slots.length < word.length) return;
      const guess = slots.map(i => letters[i]).join('');
      if (guess === word) {
        ctx.sfx('good'); emoEl.textContent = emo; slotRow.style.color = '#2a9d5c';
        setTimeout(() => { idx++; if (idx >= words.length) ctx.win(hints ? 1 : mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1); else show(); }, 700);
      } else { mistakes++; ctx.sfx('bad'); ctx.shake(slotRow); setTimeout(() => { slots.length = 0; used.fill(false); draw(); }, 400); }
    }
    draw();
    show.hint = () => { // coloca a próxima letra correta
      const k = slots.findIndex((s, i) => letters[s] !== word[i]);
      if (k >= 0) { slots.splice(k).forEach(s => used[s] = false); }
      const pos = slots.length; if (pos >= word.length) return;
      const li = letters.findIndex((l, i) => !used[i] && l === word[pos]);
      used[li] = true; slots.push(li); hints++; draw(); check();
    };
  }
  show();
  ctx.tool('💡 Próxima letra', () => !ctx.done && show.hint && show.hint());
  ctx.tool('🔀 Embaralhar', () => { if (!ctx.done) show(); });
}
registerMode({
  id: 'words', name: 'Palavras', icon: '🔤', bg: 'linear-gradient(135deg,#00b4db,#0083b0)',
  desc: 'Caça-palavras e anagramas',
  help: 'Níveis ímpares: arraste o dedo sobre as letras para achar as palavras. Pares: monte a palavra com as letras embaralhadas.',
  start(ctx) { (ctx.level % 2 ? playWordSearch : playAnagram)(ctx); }
});
