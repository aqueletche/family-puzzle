/* ===================== TRIVIA ===================== */
// [pergunta, resposta certa, [erradas], categoria]
const TRIVIA = [
  [ // FÁCIL (crianças)
    ['Quantas patas tem uma aranha?', '8', ['6', '4', '10'], 'Bichos'],
    ['Qual animal é conhecido como o rei da selva?', 'Leão', ['Tigre', 'Elefante', 'Girafa'], 'Bichos'],
    ['Que cor se forma misturando azul e amarelo?', 'Verde', ['Roxo', 'Laranja', 'Marrom'], 'Cores'],
    ['Quantos dias tem uma semana?', '7', ['5', '6', '8'], 'Tempo'],
    ['Qual é o maior planeta do Sistema Solar?', 'Júpiter', ['Terra', 'Marte', 'Saturno'], 'Espaço'],
    ['Que animal faz "muuu"?', 'Vaca', ['Ovelha', 'Cavalo', 'Porco'], 'Bichos'],
    ['Quantas cores tem o arco-íris?', '7', ['5', '6', '8'], 'Natureza'],
    ['Qual estação do ano costuma ser a mais fria?', 'Inverno', ['Verão', 'Primavera', 'Outono'], 'Natureza'],
    ['O que a abelha produz?', 'Mel', ['Leite', 'Seda', 'Algodão'], 'Bichos'],
    ['Qual é a capital do Brasil?', 'Brasília', ['Rio de Janeiro', 'São Paulo', 'Salvador'], 'Brasil'],
    ['Quanto é 5 + 7?', '12', ['11', '13', '10'], 'Contas'],
    ['Qual é o animal mais alto do mundo?', 'Girafa', ['Elefante', 'Camelo', 'Avestruz'], 'Bichos'],
    ['Qual forma tem 3 lados?', 'Triângulo', ['Quadrado', 'Círculo', 'Retângulo'], 'Formas'],
    ['Quantos meses tem um ano?', '12', ['10', '11', '13'], 'Tempo'],
    ['A lagarta se transforma em...', 'Borboleta', ['Abelha', 'Joaninha', 'Libélula'], 'Bichos'],
    ['Qual fruta é amarela e comprida?', 'Banana', ['Maçã', 'Uva', 'Morango'], 'Comidas'],
    ['Onde os peixes vivem?', 'Na água', ['Nas árvores', 'No deserto', 'Nas nuvens'], 'Bichos'],
    ['Qual é o oposto de "quente"?', 'Frio', ['Morno', 'Grande', 'Rápido'], 'Palavras'],
    ['Quanto é 3 × 4?', '12', ['7', '10', '14'], 'Contas'],
    ['Em qual planeta nós moramos?', 'Terra', ['Marte', 'Vênus', 'Júpiter'], 'Espaço'],
    ['Qual animal tem uma tromba comprida?', 'Elefante', ['Rinoceronte', 'Hipopótamo', 'Girafa'], 'Bichos'],
    ['Quantas rodas tem uma bicicleta?', '2', ['3', '4', '1'], 'Coisas'],
    ['Qual destes animais é um mamífero?', 'Golfinho', ['Tubarão', 'Sardinha', 'Polvo'], 'Bichos'],
    ['Em qual país fica a maior parte da Floresta Amazônica?', 'Brasil', ['Argentina', 'México', 'Chile'], 'Brasil'],
    ['Qual é o maior oceano do planeta?', 'Pacífico', ['Atlântico', 'Índico', 'Ártico'], 'Natureza'],
    ['Quantos lados tem um hexágono?', '6', ['5', '7', '8'], 'Formas'],
    ['Qual instrumento tem teclas pretas e brancas?', 'Piano', ['Violão', 'Bateria', 'Flauta'], 'Música'],
    ['O Sol é um(a)...', 'Estrela', ['Planeta', 'Lua', 'Cometa'], 'Espaço'],
    ['Qual animal dorme de cabeça para baixo?', 'Morcego', ['Coruja', 'Macaco', 'Gato'], 'Bichos'],
    ['Quanto é 10 − 4?', '6', ['5', '7', '4'], 'Contas'],
    ['Qual é o filhote da vaca?', 'Bezerro', ['Potro', 'Cordeiro', 'Leitão'], 'Bichos'],
    ['Quantos minutos tem uma hora?', '60', ['30', '100', '50'], 'Tempo'],
    ['Qual animal tem listras pretas e brancas?', 'Zebra', ['Girafa', 'Onça', 'Leopardo'], 'Bichos'],
    ['Como se chama o satélite natural da Terra?', 'Lua', ['Sol', 'Marte', 'Vênus'], 'Espaço'],
    ['O que usamos para ver as horas?', 'Relógio', ['Termômetro', 'Bússola', 'Régua'], 'Coisas'],
    ['Qual destas aves NÃO voa?', 'Pinguim', ['Gaivota', 'Pardal', 'Papagaio'], 'Bichos'],
    ['Quanto é a metade de 20?', '10', ['5', '15', '12'], 'Contas'],
    ['Qual é a cor da esmeralda?', 'Verde', ['Azul', 'Vermelha', 'Amarela'], 'Cores'],
  ],
  [ // MÉDIO
    ['Quem pintou a Mona Lisa?', 'Leonardo da Vinci', ['Michelangelo', 'Van Gogh', 'Picasso'], 'Arte'],
    ['Qual é a fórmula química da água?', 'H₂O', ['CO₂', 'O₂', 'NaCl'], 'Ciência'],
    ['Em que ano os portugueses chegaram ao Brasil?', '1500', ['1492', '1822', '1600'], 'História'],
    ['Qual é o maior país do mundo em área?', 'Rússia', ['Canadá', 'China', 'Brasil'], 'Geografia'],
    ['Quantos ossos tem o corpo humano adulto?', '206', ['186', '226', '306'], 'Corpo humano'],
    ['Qual é a capital da Austrália?', 'Camberra', ['Sydney', 'Melbourne', 'Perth'], 'Geografia'],
    ['Quem escreveu "Dom Casmurro"?', 'Machado de Assis', ['José de Alencar', 'Monteiro Lobato', 'Carlos Drummond'], 'Literatura'],
    ['Qual é o "planeta vermelho"?', 'Marte', ['Vênus', 'Mercúrio', 'Júpiter'], 'Espaço'],
    ['Que gás as plantas absorvem na fotossíntese?', 'Gás carbônico', ['Oxigênio', 'Nitrogênio', 'Hélio'], 'Ciência'],
    ['Quantos jogadores de cada time ficam em campo no futebol?', '11', ['10', '9', '12'], 'Esportes'],
    ['Qual é a língua oficial do México?', 'Espanhol', ['Português', 'Inglês', 'Francês'], 'Geografia'],
    ['Qual é o maior órgão do corpo humano?', 'Pele', ['Fígado', 'Pulmão', 'Intestino'], 'Corpo humano'],
    ['Em que ano foi proclamada a Independência do Brasil?', '1822', ['1889', '1500', '1888'], 'História'],
    ['Qual rio é chamado de "Velho Chico"?', 'São Francisco', ['Amazonas', 'Paraná', 'Tietê'], 'Brasil'],
    ['Qual é a moeda do Japão?', 'Iene', ['Yuan', 'Won', 'Rúpia'], 'Geografia'],
    ['Qual metal tem o símbolo químico Au?', 'Ouro', ['Prata', 'Alumínio', 'Cobre'], 'Ciência'],
    ['Quantos estados tem o Brasil?', '26 e o Distrito Federal', ['25 e o Distrito Federal', '27 e o Distrito Federal', '24 e o Distrito Federal'], 'Brasil'],
    ['Quem foi o primeiro homem a pisar na Lua?', 'Neil Armstrong', ['Buzz Aldrin', 'Yuri Gagarin', 'Michael Collins'], 'Espaço'],
    ['Em qual continente fica o Egito?', 'África', ['Ásia', 'Europa', 'Oceania'], 'Geografia'],
    ['Qual é o maior animal do mundo?', 'Baleia-azul', ['Elefante-africano', 'Tubarão-baleia', 'Orca'], 'Bichos'],
    ['Quantos graus tem um ângulo reto?', '90°', ['45°', '180°', '60°'], 'Matemática'],
    ['Qual é a capital do Canadá?', 'Ottawa', ['Toronto', 'Vancouver', 'Montreal'], 'Geografia'],
    ['Em qual país ficam as pirâmides de Gizé?', 'Egito', ['México', 'Peru', 'Sudão'], 'História'],
    ['Qual a velocidade aproximada da luz no vácuo?', '300 mil km/s', ['30 mil km/s', '3 mil km/s', '3 milhões de km/s'], 'Ciência'],
    ['Quantos lados tem um octógono?', '8', ['6', '10', '12'], 'Matemática'],
    ['Quem compôs "Aquarela do Brasil"?', 'Ary Barroso', ['Tom Jobim', 'Noel Rosa', 'Cartola'], 'Música'],
    ['Qual é a fórmula da área do círculo?', 'π·r²', ['2·π·r', 'π·d', 'r²'], 'Matemática'],
    ['Qual é o menor país do mundo?', 'Vaticano', ['Mônaco', 'San Marino', 'Liechtenstein'], 'Geografia'],
    ['Qual é a principal matéria-prima do vidro?', 'Areia', ['Argila', 'Calcário', 'Sal'], 'Ciência'],
    ['Qual é o osso mais longo do corpo humano?', 'Fêmur', ['Tíbia', 'Úmero', 'Rádio'], 'Corpo humano'],
    ['Que instrumento mede a pressão atmosférica?', 'Barômetro', ['Termômetro', 'Higrômetro', 'Anemômetro'], 'Ciência'],
    ['Quantos segundos tem uma hora?', '3.600', ['600', '360', '6.000'], 'Matemática'],
    ['Como se chama a passagem da água líquida para vapor?', 'Evaporação', ['Condensação', 'Solidificação', 'Fusão'], 'Ciência'],
    ['Qual é a capital da Argentina?', 'Buenos Aires', ['Montevidéu', 'Santiago', 'Lima'], 'Geografia'],
    ['Quem formulou a teoria da relatividade?', 'Albert Einstein', ['Isaac Newton', 'Galileu Galilei', 'Nikola Tesla'], 'Ciência'],
    ['Qual planeta tem os anéis mais visíveis?', 'Saturno', ['Júpiter', 'Urano', 'Netuno'], 'Espaço'],
    ['Em que cidade fica o Cristo Redentor?', 'Rio de Janeiro', ['São Paulo', 'Salvador', 'Belo Horizonte'], 'Brasil'],
    ['Qual é o resultado de 15 × 4?', '60', ['45', '50', '64'], 'Matemática'],
  ],
  [ // DIFÍCIL (adultos)
    ['Qual é o elemento químico mais abundante no universo?', 'Hidrogênio', ['Hélio', 'Oxigênio', 'Carbono'], 'Ciência'],
    ['Em que ano caiu o Muro de Berlim?', '1989', ['1991', '1987', '1985'], 'História'],
    ['Quem escreveu "Cem Anos de Solidão"?', 'Gabriel García Márquez', ['Jorge Luis Borges', 'Mario Vargas Llosa', 'Julio Cortázar'], 'Literatura'],
    ['Qual é a capital da Mongólia?', 'Ulan Bator', ['Astana', 'Bishkek', 'Tashkent'], 'Geografia'],
    ['Qual é o número atômico do carbono?', '6', ['8', '12', '14'], 'Ciência'],
    ['Quantos corações tem um polvo?', '3', ['1', '2', '4'], 'Bichos'],
    ['Quem assinou a Lei Áurea?', 'Princesa Isabel', ['Dom Pedro II', 'Dom Pedro I', 'Deodoro da Fonseca'], 'História'],
    ['Qual é o planeta mais quente do Sistema Solar?', 'Vênus', ['Mercúrio', 'Marte', 'Júpiter'], 'Espaço'],
    ['Qual é a raiz quadrada de 169?', '13', ['12', '14', '17'], 'Matemática'],
    ['Quem pintou "A Noite Estrelada"?', 'Vincent van Gogh', ['Claude Monet', 'Salvador Dalí', 'Edvard Munch'], 'Arte'],
    ['Em que ano começou a Primeira Guerra Mundial?', '1914', ['1918', '1939', '1905'], 'História'],
    ['Qual cientista formulou as três leis do movimento?', 'Isaac Newton', ['Galileu Galilei', 'Johannes Kepler', 'Nicolau Copérnico'], 'Ciência'],
    ['Qual país tem mais fusos horários (contando territórios)?', 'França', ['Rússia', 'Estados Unidos', 'Reino Unido'], 'Geografia'],
    ['Qual é o maior deserto quente do mundo?', 'Saara', ['Gobi', 'Kalahari', 'Atacama'], 'Geografia'],
    ['Qual é a velocidade aproximada do som no ar?', '343 m/s', ['120 m/s', '1.000 m/s', '3.000 m/s'], 'Ciência'],
    ['Quem escreveu "Os Lusíadas"?', 'Luís de Camões', ['Fernando Pessoa', 'Eça de Queirós', 'José Saramago'], 'Literatura'],
    ['Quantos cromossomos tem uma célula humana comum?', '46', ['23', '44', '48'], 'Ciência'],
    ['Qual é a capital da Nova Zelândia?', 'Wellington', ['Auckland', 'Christchurch', 'Queenstown'], 'Geografia'],
    ['Em que ano o ser humano pisou na Lua pela primeira vez?', '1969', ['1965', '1972', '1961'], 'História'],
    ['Qual é o metal mais abundante na crosta terrestre?', 'Alumínio', ['Ferro', 'Cobre', 'Magnésio'], 'Ciência'],
    ['Na sequência 1, 1, 2, 3, 5, 8... qual vem depois?', '13', ['11', '12', '16'], 'Lógica'],
    ['Quem propôs a evolução por seleção natural?', 'Charles Darwin', ['Jean-Baptiste Lamarck', 'Gregor Mendel', 'Louis Pasteur'], 'Ciência'],
    ['Qual é o menor osso do corpo humano?', 'Estribo', ['Martelo', 'Bigorna', 'Falange'], 'Corpo humano'],
    ['Em que país nasceu Frida Kahlo?', 'México', ['Espanha', 'Colômbia', 'Argentina'], 'Arte'],
    ['Qual é a unidade de resistência elétrica?', 'Ohm', ['Volt', 'Ampère', 'Watt'], 'Ciência'],
    ['Quantos lados tem um dodecágono?', '12', ['10', '20', '14'], 'Matemática'],
    ['Qual foi o primeiro satélite artificial da história?', 'Sputnik 1', ['Explorer 1', 'Vostok 1', 'Apollo 11'], 'Espaço'],
    ['Qual destes países NÃO faz fronteira com o Brasil?', 'Chile', ['Peru', 'Bolívia', 'Colômbia'], 'Geografia'],
    ['Quanto é 2 elevado a 10?', '1.024', ['1.000', '512', '2.048'], 'Matemática'],
    ['Quem criou o Sítio do Picapau Amarelo?', 'Monteiro Lobato', ['Ziraldo', 'Mauricio de Sousa', 'Ruth Rocha'], 'Literatura'],
    ['Em qual camada da atmosfera fica a camada de ozônio?', 'Estratosfera', ['Troposfera', 'Mesosfera', 'Termosfera'], 'Ciência'],
    ['Qual é a capital da Turquia?', 'Ancara', ['Istambul', 'Esmirna', 'Antália'], 'Geografia'],
    ['Quem pintou o "Abaporu"?', 'Tarsila do Amaral', ['Anita Malfatti', 'Candido Portinari', 'Di Cavalcanti'], 'Arte'],
    ['Qual é o símbolo químico do sódio?', 'Na', ['So', 'Sd', 'S'], 'Ciência'],
    ['Em que ano foi proclamada a República no Brasil?', '1889', ['1822', '1891', '1888'], 'História'],
    ['Qual é a capital do Marrocos?', 'Rabat', ['Casablanca', 'Marrakech', 'Fez'], 'Geografia'],
    ['Qual é a montanha mais alta do mundo acima do nível do mar?', 'Everest', ['K2', 'Aconcágua', 'Kilimanjaro'], 'Geografia'],
    ['Qual é a menor unidade estrutural dos seres vivos?', 'Célula', ['Átomo', 'Molécula', 'Tecido'], 'Ciência'],
  ],
];
registerMode({
  id: 'trivia', name: 'Trivia', icon: '❓', bg: 'linear-gradient(135deg,#ee0979,#ff6a00)',
  desc: 'Perguntas de conhecimentos gerais',
  help: 'Responda 5 perguntas. Acerte 3 ou mais para passar de nível. As perguntas só se repetem depois que você vir o banco inteiro.',
  start(ctx) {
    const { diff, level } = ctx;
    // banco completo + sorteio de perguntas ainda não vistas (só repete quando o banco acaba)
    const bank = TRIVIA[diff].concat(TRIVIA_EXTRA[diff]);
    const N = 5, seenAll = Store.data.seenQ = Store.data.seenQ || {};
    let seen = new Set(seenAll[diff] || []);
    let pool = bank.filter(q => !seen.has(hashStr(q[0])));
    if (pool.length < N) { seen = new Set(); pool = bank.slice(); }
    const rnd = makeRng((Math.random() * 1e9) >>> 0);
    const qs = rnd.shuffle(pool).slice(0, N);
    qs.forEach(q => seen.add(hashStr(q[0])));
    seenAll[diff] = [...seen]; Store.save();
    const timeLimit = [0, 20, 15][diff];
    let idx = 0, right = 0, results = [], fifty = false, timer = null, left = 0;
    const wrap = h('div', { class: 'tv' }); ctx.stage.append(wrap);
    ctx.cleanup(() => clearInterval(timer));
    const f5 = ctx.tool('✂️ 50/50', b => {
      if (fifty || ctx.done || !show.cur) return; fifty = true; b.disabled = true;
      const wrong = show.cur.btns.filter(x => !x.right); ctx.rng.shuffle(wrong).slice(0, 2).forEach(x => x.el.style.visibility = 'hidden');
    });
    function show() {
      clearInterval(timer);
      const [q, ok, bad, cat] = qs[idx];
      const opts = ctx.rng.shuffle([ok, ...bad]);
      wrap.innerHTML = '';
      wrap.append(h('div', { class: 'tv-prog' }, qs.map((_, i) => h('i', { class: results[i] === true ? 'r' : results[i] === false ? 'w' : i === idx ? 'c' : '' }))));
      let bar = null;
      if (timeLimit) { bar = h('div'); wrap.append(h('div', { class: 'tv-timer' }, bar)); }
      wrap.append(h('div', { class: 'tv-cat' }, cat), h('div', { class: 'tv-q' }, q));
      let answered = false;
      const btns = opts.map(o => { const el = h('button', { class: 'tv-a' }, o); el.onclick = () => answer(o, el); wrap.append(el); return { el, right: o === ok }; });
      show.cur = { btns };
      function answer(o, el) {
        if (answered) return; answered = true; clearInterval(timer);
        const good = o === ok; results[idx] = good; if (good) right++;
        btns.forEach(b => { if (b.right) b.el.classList.add('r'); });
        if (el && !good) { el.classList.add('w'); ctx.shake(el); }
        ctx.sfx(good ? 'good' : 'bad');
        ctx.status('✅ ' + right + ' de ' + (idx + 1));
        ctx.timeout(() => { idx++; if (idx < N) show(); else finish(); }, good ? 900 : 1600);
      }
      if (timeLimit) {
        left = timeLimit * 10; bar.style.width = '100%';
        timer = setInterval(() => { left--; bar.style.width = (left / (timeLimit * 10) * 100) + '%'; if (left <= 0) { answer(null, null); ctx.toast('⏰ Tempo esgotado!', 900); } }, 100);
      }
      ctx.status('✅ ' + right + ' de ' + idx);
    }
    function finish() {
      if (right >= 3) ctx.win(right === 5 ? 3 : right === 4 ? 2 : 1, `Você acertou ${right} de ${N}!`);
      else ctx.fail(`Você acertou ${right} de ${N}. Precisa de 3 para passar.`);
    }
    show();
  }
});
