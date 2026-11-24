/* ===================== TRIVIA: banco ampliado ===================== */
// formato: pergunta|certa|errada1|errada2|errada3|categoria
const TRIVIA_EXTRA = [`
Qual animal pula e carrega o filhote numa bolsa na barriga?|Canguru|Coala|Coelho|Sapo|Bichos
Qual é o maior animal terrestre?|Elefante|Girafa|Hipopótamo|Rinoceronte|Bichos
Que animal faz "au au"?|Cachorro|Gato|Pato|Galinha|Bichos
Qual destes animais vive na Antártida?|Pinguim|Urso-polar|Camelo|Leão|Bichos
Quantas patas tem um inseto?|6|4|8|10|Bichos
Qual animal carrega uma carapaça nas costas e anda devagar?|Tartaruga|Coelho|Guepardo|Cavalo|Bichos
Qual é o animal mais rápido em terra?|Guepardo|Leão|Cavalo|Zebra|Bichos
O que as vacas comem principalmente?|Capim|Carne|Peixe|Insetos|Bichos
Qual destes animais bota ovos?|Galinha|Vaca|Cachorro|Gato|Bichos
Qual é o filhote do cavalo?|Potro|Bezerro|Cordeiro|Leitão|Bichos
Qual é o filhote da galinha?|Pintinho|Patinho|Cabrito|Potro|Bichos
Qual animal macho tem uma grande juba?|Leão|Tigre|Urso|Lobo|Bichos
Qual animal é famoso por mudar de cor?|Camaleão|Sapo|Cobra|Tartaruga|Bichos
Qual destes animais é um réptil?|Jacaré|Sapo|Golfinho|Pato|Bichos
Com qual parte do corpo sentimos cheiro?|Nariz|Orelha|Boca|Mão|Corpo
Com qual parte do corpo ouvimos?|Orelhas|Olhos|Nariz|Joelhos|Corpo
Quantos dedos temos em uma mão?|5|4|6|10|Corpo
Qual órgão bombeia o sangue pelo corpo?|Coração|Pulmão|Estômago|Cérebro|Corpo
Para que servem os dentes?|Mastigar|Ouvir|Enxergar|Respirar|Corpo
Que cor se forma misturando vermelho e amarelo?|Laranja|Verde|Roxo|Rosa|Cores
Que cor se forma misturando vermelho e azul?|Roxo|Verde|Laranja|Amarelo|Cores
Que cor se forma misturando branco e vermelho?|Rosa|Laranja|Roxo|Cinza|Cores
De que cor é a banana madura?|Amarela|Azul|Roxa|Vermelha|Cores
De que cor é o sangue?|Vermelho|Azul|Verde|Amarelo|Cores
Quantos lados tem um quadrado?|4|3|5|6|Formas
Qual destas formas não tem cantos?|Círculo|Quadrado|Triângulo|Retângulo|Formas
Quantos lados tem um pentágono?|5|4|6|8|Formas
Uma bola de futebol tem forma de...|Esfera|Cubo|Cone|Pirâmide|Formas
Um dado de jogo tem forma de...|Cubo|Esfera|Cilindro|Cone|Formas
Quanto é 2 + 2?|4|3|5|6|Contas
Quanto é 9 + 6?|15|14|16|13|Contas
Quanto é 20 − 8?|12|11|13|10|Contas
Quanto é 6 × 2?|12|8|10|14|Contas
Quanto é 5 × 5?|25|20|30|15|Contas
Quanto é o dobro de 7?|14|12|16|17|Contas
Quanto é 100 − 1?|99|98|90|101|Contas
Que número vem depois do 19?|20|18|21|29|Contas
Quanto é 8 + 8?|16|15|18|14|Contas
Quanto é 12 ÷ 3?|4|3|6|9|Contas
Quantos centavos tem 1 real?|100|10|50|1.000|Contas
Quantas horas tem um dia?|24|12|20|48|Tempo
Qual mês vem depois de janeiro?|Fevereiro|Março|Dezembro|Abril|Tempo
Quantos dias tem fevereiro num ano comum?|28|30|31|29|Tempo
Quantos meses tem meio ano?|6|4|5|8|Tempo
Quantas estações do ano existem?|4|2|3|5|Tempo
Em que estação muitas árvores perdem as folhas?|Outono|Verão|Primavera|Inverno|Natureza
Em que estação do ano as flores costumam desabrochar?|Primavera|Inverno|Outono|Verão|Natureza
O que aparece no céu quando faz sol depois da chuva?|Arco-íris|Cometa|Eclipse|Aurora|Natureza
O gelo é água no estado...|Sólido|Líquido|Gasoso|Quente|Natureza
O vapor é água no estado...|Gasoso|Sólido|Líquido|Congelado|Natureza
Do que uma planta precisa para crescer?|Água e luz do sol|Só escuridão|Refrigerante|Areia seca|Natureza
Qual parte da planta fica debaixo da terra?|Raiz|Flor|Folha|Fruto|Natureza
De que cor são as folhas da maioria das árvores?|Verdes|Azuis|Roxas|Pretas|Natureza
Qual destes NÃO é uma fruta?|Cenoura|Maçã|Uva|Pera|Comidas
De qual fruta se faz o guacamole?|Abacate|Maçã|Banana|Manga|Comidas
De qual animal vem o leite mais consumido no Brasil?|Vaca|Galinha|Porco|Peixe|Comidas
Qual alimento é feito de milho estourado?|Pipoca|Pão|Bolo|Arroz|Comidas
Qual destas é uma verdura de folha?|Alface|Cenoura|Batata|Beterraba|Comidas
O chocolate é feito a partir de qual fruto?|Cacau|Café|Coco|Amendoim|Comidas
O pão francês é feito principalmente de...|Farinha de trigo|Arroz|Açúcar|Leite|Comidas
Qual fruta tem casca verde e polpa vermelha com sementes pretas?|Melancia|Kiwi|Mamão|Abacate|Comidas
Qual é o maior estado do Brasil em área?|Amazonas|Pará|Mato Grosso|Bahia|Brasil
Quais são as cores da bandeira do Brasil?|Verde, amarelo, azul e branco|Vermelho e branco|Azul e branco|Verde e vermelho|Brasil
Qual destes é um instrumento de cordas?|Violão|Tambor|Flauta|Trompete|Música
Qual instrumento se toca com baquetas?|Bateria|Violino|Piano|Flauta|Música
Quantas cordas tem um violão comum?|6|4|5|8|Música
O que usamos para escrever no quadro-negro?|Giz|Tesoura|Cola|Régua|Escola
Para que serve o guarda-chuva?|Proteger da chuva|Medir a temperatura|Ver as horas|Cozinhar|Coisas
Qual meio de transporte anda sobre trilhos?|Trem|Avião|Navio|Bicicleta|Transportes
Qual destes meios de transporte voa?|Avião|Carro|Trem|Navio|Transportes
O que os astronautas usam para ir ao espaço?|Foguete|Submarino|Balão|Trem|Espaço
Quem apaga incêndios?|Bombeiro|Médico|Padeiro|Carteiro|Profissões
Quem cuida dos nossos dentes?|Dentista|Veterinário|Professor|Pintor|Profissões
Quem cuida da saúde dos animais?|Veterinário|Dentista|Piloto|Arquiteto|Profissões
Quem pilota um avião?|Piloto|Motorista|Marinheiro|Maquinista|Profissões
Onde vivem as abelhas?|Colmeia|Ninho|Toca|Aquário|Bichos
O que a aranha tece?|Teia|Ninho|Casulo|Colmeia|Bichos
Qual animal solta tinta para fugir dos inimigos?|Polvo|Peixe-palhaço|Tartaruga|Golfinho|Bichos
Qual é o maior peixe do mundo?|Tubarão-baleia|Baleia-azul|Tubarão-branco|Atum|Bichos
Qual destes animais é um anfíbio?|Sapo|Jacaré|Cobra|Lagarto|Bichos
Quantas asas tem uma borboleta?|4|2|6|8|Bichos
A arara é um tipo de...|Ave|Peixe|Mamífero|Réptil|Bichos
Qual animal tem espinhos para se proteger?|Porco-espinho|Coelho|Esquilo|Hamster|Bichos
Qual destes animais costuma ficar acordado à noite?|Coruja|Galinha|Borboleta|Abelha|Bichos
Qual animal é chamado de "melhor amigo do homem"?|Cachorro|Gato|Cavalo|Papagaio|Bichos
Quantas patas tem um cachorro?|4|2|6|8|Bichos
A Terra gira em torno do...|Sol|Lua|Marte|Júpiter|Espaço
Quantos planetas há no Sistema Solar?|8|9|7|10|Espaço
Qual planeta é o mais próximo do Sol?|Mercúrio|Vênus|Terra|Marte|Espaço
Qual é o oposto de "alto"?|Baixo|Grande|Largo|Gordo|Palavras
Qual é o oposto de "dia"?|Noite|Tarde|Manhã|Sol|Palavras
Qual destas palavras rima com "pão"?|Mão|Pé|Sol|Casa|Palavras
Quantas letras tem o alfabeto da língua portuguesa?|26|23|24|30|Palavras
Qual é a primeira letra do alfabeto?|A|B|Z|E|Palavras
Qual é a última letra do alfabeto?|Z|Y|X|W|Palavras
Quantas vogais existem no alfabeto?|5|4|6|7|Palavras
Qual destas palavras começa com a letra B?|Bola|Casa|Dado|Pato|Palavras
Qual é o plural de "pão"?|Pães|Pãos|Pões|Pãoes|Palavras
Qual brinquedo sobe ao céu com o vento, preso por uma linha?|Pipa|Pião|Bola|Ioiô|Brincadeiras
Qual esporte se joga com raquete e bolinha amarela?|Tênis|Futebol|Basquete|Vôlei|Esportes
Em qual esporte se arremessa a bola numa cesta?|Basquete|Futebol|Natação|Judô|Esportes
Qual festa brasileira tem fantasias e desfiles de escolas de samba?|Carnaval|Festa Junina|Natal|Páscoa|Festas
Em qual festa se dança quadrilha?|Festa Junina|Carnaval|Ano-Novo|Halloween|Festas
Na Páscoa é tradição ganhar ovos de...|Chocolate|Pato|Madeira|Avestruz|Festas
Qual personagem traz presentes no Natal?|Papai Noel|Coelho da Páscoa|Saci|Curupira|Festas
Qual personagem do folclore tem uma perna só e usa gorro vermelho?|Saci-Pererê|Curupira|Boitatá|Iara|Folclore
Qual personagem do folclore tem os pés virados para trás?|Curupira|Saci-Pererê|Mula sem cabeça|Iara|Folclore
Qual personagem do folclore é uma sereia dos rios?|Iara|Cuca|Boitatá|Curupira|Folclore
O que usamos para medir a temperatura do corpo?|Termômetro|Régua|Balança|Relógio|Coisas
O que usamos para saber o nosso peso?|Balança|Régua|Termômetro|Bússola|Coisas
Quantos jogadores formam uma dupla?|2|3|4|1|Contas
Qual é o animal que tem um "chifre" no nariz?|Rinoceronte|Elefante|Hipopótamo|Girafa|Bichos
O que a vaca nos dá para beber?|Leite|Suco|Mel|Água de coco|Bichos
`, `
Qual animal aparece na nota de 2 reais?|Tartaruga-marinha|Arara|Onça-pintada|Garça|Brasil
Qual animal aparece na nota de 200 reais?|Lobo-guará|Onça-pintada|Mico-leão-dourado|Tamanduá|Brasil
Qual animal aparece na nota de 50 reais?|Onça-pintada|Garoupa|Arara|Lobo-guará|Brasil
Qual é a capital de Portugal?|Lisboa|Porto|Coimbra|Madri|Geografia
Qual é a capital da França?|Paris|Lyon|Marselha|Nice|Geografia
Qual é a capital da Itália?|Roma|Milão|Veneza|Nápoles|Geografia
Qual é a capital do Japão?|Tóquio|Quioto|Osaka|Pequim|Geografia
Qual é a capital do Chile?|Santiago|Valparaíso|Lima|Bogotá|Geografia
Qual é a capital da Bahia?|Salvador|Feira de Santana|Ilhéus|Recife|Brasil
Qual é a capital do Rio Grande do Sul?|Porto Alegre|Caxias do Sul|Pelotas|Florianópolis|Brasil
Qual é a capital de Minas Gerais?|Belo Horizonte|Uberlândia|Juiz de Fora|Ouro Preto|Brasil
Qual é a capital do Amazonas?|Manaus|Belém|Porto Velho|Rio Branco|Brasil
Qual é a capital do Paraná?|Curitiba|Londrina|Maringá|Foz do Iguaçu|Brasil
Qual é a capital de Pernambuco?|Recife|Olinda|Caruaru|Natal|Brasil
Qual é a capital do Ceará?|Fortaleza|Natal|São Luís|Teresina|Brasil
Qual é a capital de Santa Catarina?|Florianópolis|Joinville|Blumenau|Curitiba|Brasil
Em qual país fica a Torre Eiffel?|França|Itália|Inglaterra|Bélgica|Geografia
Em qual cidade fica o Coliseu?|Roma|Atenas|Paris|Madri|História
Em qual país fica Machu Picchu?|Peru|Bolívia|México|Chile|Geografia
Qual oceano banha o litoral brasileiro?|Atlântico|Pacífico|Índico|Ártico|Geografia
Qual é o país mais populoso da América do Sul?|Brasil|Argentina|Colômbia|Peru|Geografia
Em qual continente fica a Austrália?|Oceania|Ásia|África|Europa|Geografia
Qual país é conhecido como "Terra do Sol Nascente"?|Japão|China|Coreia do Sul|Tailândia|Geografia
Qual é a moeda dos Estados Unidos?|Dólar|Euro|Libra|Peso|Geografia
Qual é a moeda usada na maior parte da União Europeia?|Euro|Dólar|Libra|Franco|Geografia
Qual é a língua oficial de Angola?|Português|Inglês|Francês|Espanhol|Geografia
Qual cordilheira atravessa a América do Sul de norte a sul?|Andes|Alpes|Himalaia|Rochosas|Geografia
Qual é o maior rio do mundo em volume de água?|Amazonas|Nilo|Mississippi|Yangtzé|Geografia
Qual é o ponto mais alto do Brasil?|Pico da Neblina|Pico da Bandeira|Monte Roraima|Pico Paraná|Brasil
Em qual estado ficam as Cataratas do Iguaçu, do lado brasileiro?|Paraná|Santa Catarina|Mato Grosso do Sul|São Paulo|Brasil
Qual bioma brasileiro é uma das maiores planícies alagáveis do mundo?|Pantanal|Cerrado|Caatinga|Pampa|Brasil
Qual bioma é típico do sertão nordestino?|Caatinga|Pampa|Mata Atlântica|Pantanal|Brasil
Quem foi o primeiro presidente do Brasil?|Deodoro da Fonseca|Getúlio Vargas|Floriano Peixoto|Prudente de Morais|História
Quem proclamou a Independência do Brasil?|Dom Pedro I|Dom Pedro II|Tiradentes|Dom João VI|História
O apelido "Tiradentes" vem de qual atividade que ele exercia?|Arrancar dentes|Dar tiros|Puxar carroças|Tirar sal|História
Quem descobriu a penicilina?|Alexander Fleming|Louis Pasteur|Marie Curie|Oswaldo Cruz|Ciência
Quem é o autor de "O Pequeno Príncipe"?|Antoine de Saint-Exupéry|Júlio Verne|Victor Hugo|Charles Perrault|Literatura
Quem escreveu "Romeu e Julieta"?|William Shakespeare|Charles Dickens|Jane Austen|Miguel de Cervantes|Literatura
Quem escreveu "Dom Quixote"?|Miguel de Cervantes|William Shakespeare|Dante Alighieri|Luís de Camões|Literatura
Quem criou a Turma da Mônica?|Mauricio de Sousa|Ziraldo|Monteiro Lobato|Henfil|Literatura
Quem criou "O Menino Maluquinho"?|Ziraldo|Mauricio de Sousa|Monteiro Lobato|Ruth Rocha|Literatura
Quem pintou "O Grito"?|Edvard Munch|Van Gogh|Pablo Picasso|Salvador Dalí|Arte
Quem pintou o teto da Capela Sistina?|Michelangelo|Leonardo da Vinci|Rafael|Donatello|Arte
Qual artista é famoso pelos relógios "derretendo"?|Salvador Dalí|Pablo Picasso|Claude Monet|Andy Warhol|Arte
Quem pintou "Operários"?|Tarsila do Amaral|Candido Portinari|Anita Malfatti|Di Cavalcanti|Arte
Qual é o gás mais abundante na atmosfera da Terra?|Nitrogênio|Oxigênio|Gás carbônico|Argônio|Ciência
Qual é a estrela mais próxima da Terra?|Sol|Alfa Centauri|Sirius|Estrela Polar|Espaço
Quanto tempo a Terra leva para dar uma volta em torno do Sol?|Cerca de 365 dias|24 horas|30 dias|12 anos|Espaço
O que causa principalmente as marés dos oceanos?|A Lua|O vento|Os peixes|Os rios|Ciência
Qual parte do olho dá cor a ele?|Íris|Pupila|Retina|Córnea|Corpo humano
Qual vitamina o corpo produz com a luz do sol?|Vitamina D|Vitamina C|Vitamina A|Vitamina B12|Corpo humano
Qual órgão filtra o sangue e produz a urina?|Rins|Fígado|Pulmões|Estômago|Corpo humano
Quantos dentes tem a dentição completa de um adulto?|32|28|30|36|Corpo humano
Qual tipo sanguíneo é conhecido como "doador universal"?|O negativo|AB positivo|A positivo|B negativo|Corpo humano
Onde é absorvida a maior parte dos nutrientes dos alimentos?|Intestino delgado|Estômago|Boca|Esôfago|Corpo humano
Qual é o único mamífero capaz de voar de verdade?|Morcego|Esquilo-voador|Pinguim|Avestruz|Bichos
A baleia é um...|Mamífero|Peixe|Anfíbio|Réptil|Bichos
Qual ave é a mais rápida do mundo em mergulho?|Falcão-peregrino|Águia-real|Avestruz|Beija-flor|Bichos
Qual é a maior ave do mundo?|Avestruz|Emu|Condor|Albatroz|Bichos
Como se chama o filhote do sapo?|Girino|Alevino|Lagarta|Pintinho|Bichos
Qual é o maior felino do mundo?|Tigre|Leão|Onça-pintada|Leopardo|Bichos
Qual é o maior felino das Américas?|Onça-pintada|Puma|Jaguatirica|Leopardo|Bichos
O que é um animal herbívoro?|Que come plantas|Que come carne|Que come de tudo|Que não come|Bichos
Qual destes mamíferos bota ovos?|Ornitorrinco|Morcego|Golfinho|Canguru|Bichos
Quantos quilos tem uma tonelada?|1.000|100|10.000|500|Matemática
Quantos centímetros tem um metro?|100|10|1.000|50|Matemática
Quanto é 25% de 200?|50|25|75|100|Matemática
Qual é o próximo número primo depois de 7?|11|9|13|8|Matemática
Quanto é 7 × 8?|56|54|48|64|Matemática
Quanto é 144 ÷ 12?|12|11|14|10|Matemática
Quantos minutos há em 2 horas e meia?|150|120|130|250|Matemática
Quanto é 3 ao quadrado?|9|6|12|27|Matemática
Qual número romano representa 10?|X|V|L|C|Matemática
Qual número romano representa 50?|L|C|D|X|Matemática
Quanto mede a soma dos ângulos internos de um triângulo?|180°|90°|360°|270°|Matemática
Quantos zeros tem o número um milhão?|6|5|7|9|Matemática
Quantos anos tem uma década?|10|100|5|1.000|Tempo
Quantos anos tem um século?|100|10|1.000|50|Tempo
Em que ano começou o século XXI?|2001|2000|1999|2010|Tempo
Quantos jogadores de cada time ficam em quadra no vôlei?|6|5|7|11|Esportes
Quantos jogadores de cada time ficam em quadra no basquete?|5|6|7|4|Esportes
De quantos em quantos anos acontecem os Jogos Olímpicos de Verão?|4|2|3|5|Esportes
Quantos anéis tem o símbolo olímpico?|5|4|6|7|Esportes
Em qual jogo existe o "xeque-mate"?|Xadrez|Damas|Tênis|Golfe|Esportes
Qual esporte é praticado no tatame, com quimono e faixas coloridas?|Judô|Esgrima|Remo|Polo|Esportes
Em qual país surgiu o futebol moderno?|Inglaterra|Brasil|Itália|Espanha|Esportes
Quem é conhecido como "Rei do Futebol"?|Pelé|Garrincha|Zico|Maradona|Esportes
Quem é conhecido como "Rei do Baião"?|Luiz Gonzaga|Dominguinhos|Gilberto Gil|Jackson do Pandeiro|Música
Quem é conhecido como "Rei do Pop"?|Michael Jackson|Elvis Presley|Prince|Freddie Mercury|Música
Quem é conhecido como "Rei do Rock"?|Elvis Presley|Michael Jackson|Chuck Berry|Mick Jagger|Música
Qual banda britânica gravou "Hey Jude"?|The Beatles|Rolling Stones|Queen|Pink Floyd|Música
Qual estilo musical tem João Gilberto e Tom Jobim como ícones?|Bossa nova|Forró|Frevo|Axé|Música
O frevo é um ritmo típico de qual estado?|Pernambuco|Bahia|Ceará|Maranhão|Música
Quantas notas musicais há na escala de dó a si?|7|8|5|12|Música
Qual instrumento do samba é um pequeno tambor com platinelas?|Pandeiro|Cuíca|Agogô|Surdo|Música
O festival do Boi-Bumbá de Parintins acontece em qual estado?|Amazonas|Pará|Maranhão|Acre|Brasil
Qual cidade foi capital do Brasil antes de Brasília?|Rio de Janeiro|Salvador|São Paulo|Belo Horizonte|História
Qual foi a primeira capital do Brasil?|Salvador|Rio de Janeiro|Recife|São Vicente|História
Em que ano Brasília foi inaugurada?|1960|1950|1964|1945|História
Qual arquiteto projetou os principais prédios de Brasília?|Oscar Niemeyer|Lúcio Costa|Burle Marx|Lina Bo Bardi|Arte
Qual é a cidade mais populosa do Brasil?|São Paulo|Rio de Janeiro|Brasília|Salvador|Brasil
Qual país vizinho tem Montevidéu como capital?|Uruguai|Paraguai|Argentina|Chile|Geografia
Qual é o símbolo químico do ferro?|Fe|F|Fr|Ir|Ciência
Qual é o símbolo químico do oxigênio?|O|Ox|Og|Oi|Ciência
A quantos graus Celsius a água ferve ao nível do mar?|100 °C|90 °C|80 °C|120 °C|Ciência
A quantos graus Celsius a água congela?|0 °C|10 °C|−10 °C|4 °C|Ciência
Qual instrumento indica a direção norte?|Bússola|Barômetro|Telescópio|Termômetro|Ciência
Qual cientista ficou famoso pela história da maçã e da gravidade?|Isaac Newton|Albert Einstein|Galileu Galilei|Charles Darwin|Ciência
Quem foi a primeira mulher a ganhar um Prêmio Nobel?|Marie Curie|Rosalind Franklin|Ada Lovelace|Florence Nightingale|Ciência
Quem é chamado de "Pai da Aviação" no Brasil?|Santos Dumont|Irmãos Wright|Bartolomeu de Gusmão|Gago Coutinho|História
Qual o nome do avião de Santos Dumont que voou em Paris em 1906?|14-Bis|Demoiselle|Flyer|Spirit of St. Louis|História
Qual empresa criou o iPhone?|Apple|Samsung|Microsoft|Google|Tecnologia
O que significa a sigla "www"?|World Wide Web|World Web Work|Wide World Web|Web World Wide|Tecnologia
Qual metal é líquido em temperatura ambiente?|Mercúrio|Chumbo|Ferro|Alumínio|Ciência
Qual planeta tem a famosa Grande Mancha Vermelha?|Júpiter|Marte|Saturno|Netuno|Espaço
Em qual continente fica o deserto do Saara?|África|Ásia|Oceania|América|Geografia
Qual país tem formato parecido com uma bota?|Itália|Espanha|Grécia|Portugal|Geografia
Qual cor resulta da mistura de todas as cores da luz?|Branco|Preto|Marrom|Cinza|Ciência
`, `
Qual elemento químico tem o símbolo K?|Potássio|Criptônio|Cálcio|Carbono|Ciência
Qual é o símbolo químico da prata?|Ag|Au|Pt|Pb|Ciência
Qual é o símbolo químico do chumbo?|Pb|Ch|Cb|Pl|Ciência
Qual é o pH da água pura a 25 °C?|7|0|14|5|Ciência
Qual partícula do átomo tem carga negativa?|Elétron|Próton|Nêutron|Fóton|Ciência
Quem organizou a tabela periódica em 1869?|Dmitri Mendeleiev|Antoine Lavoisier|John Dalton|Niels Bohr|Ciência
Quem é considerado o pai da química moderna?|Antoine Lavoisier|Dmitri Mendeleiev|Robert Boyle|John Dalton|Ciência
Qual é a fórmula do gás carbônico?|CO₂|CO|CH₄|O₃|Ciência
O que mede a escala Richter?|Magnitude de terremotos|Velocidade do vento|Dureza de minerais|Intensidade da luz|Ciência
O que mede a escala de Mohs?|Dureza de minerais|Terremotos|Acidez|Temperatura|Ciência
Qual é o mineral mais duro da escala de Mohs?|Diamante|Quartzo|Topázio|Coríndon|Ciência
Qual organela é responsável pela respiração celular?|Mitocôndria|Ribossomo|Complexo de Golgi|Lisossomo|Ciência
Qual molécula carrega a informação genética?|DNA|ATP|Glicose|Hemoglobina|Ciência
Quem descobriu as leis da hereditariedade estudando ervilhas?|Gregor Mendel|Charles Darwin|Louis Pasteur|Jean-Baptiste Lamarck|Ciência
Qual é o maior órgão interno do corpo humano?|Fígado|Pulmão|Intestino|Coração|Corpo humano
Quantas cavidades tem o coração humano?|4|2|3|6|Corpo humano
Qual hormônio, produzido pelo pâncreas, regula a glicose no sangue?|Insulina|Adrenalina|Cortisol|Melatonina|Corpo humano
Qual osso forma a testa?|Frontal|Occipital|Temporal|Parietal|Corpo humano
Qual planeta tem a rotação mais lenta, com o dia mais longo?|Vênus|Mercúrio|Marte|Netuno|Espaço
Qual planeta gira "deitado", com o eixo muito inclinado?|Urano|Netuno|Saturno|Júpiter|Espaço
Qual é a maior lua de Saturno?|Titã|Europa|Ganimedes|Io|Espaço
Qual é a maior lua do Sistema Solar?|Ganimedes|Titã|Lua|Calisto|Espaço
Como se chama a galáxia em que vivemos?|Via Láctea|Andrômeda|Triângulo|Sombrero|Espaço
Quanto tempo, aproximadamente, a luz do Sol leva para chegar à Terra?|8 minutos|8 segundos|1 hora|1 dia|Espaço
Quem foi o primeiro ser humano a ir ao espaço?|Yuri Gagarin|Neil Armstrong|Valentina Tereshkova|Alan Shepard|Espaço
Quem foi o primeiro brasileiro a ir ao espaço?|Marcos Pontes|Santos Dumont|César Lattes|Ayrton Senna|Espaço
Em que ano terminou a Segunda Guerra Mundial?|1945|1944|1939|1950|História
Em que ano começou a Revolução Francesa?|1789|1776|1815|1848|História
Em que ano Cristóvão Colombo chegou à América?|1492|1500|1498|1453|História
Qual navegador português chegou à Índia por mar em 1498?|Vasco da Gama|Pedro Álvares Cabral|Fernão de Magalhães|Bartolomeu Dias|História
Quem comandou a expedição da primeira volta ao mundo por mar?|Fernão de Magalhães|Vasco da Gama|Cristóvão Colombo|Américo Vespúcio|História
Qual tratado de 1494 dividiu as novas terras entre Portugal e Espanha?|Tratado de Tordesilhas|Tratado de Madri|Tratado de Versalhes|Tratado de Paris|História
Qual presidente brasileiro criou a CLT?|Getúlio Vargas|Juscelino Kubitschek|João Goulart|Eurico Dutra|História
Qual presidente construiu Brasília?|Juscelino Kubitschek|Getúlio Vargas|Jânio Quadros|Café Filho|História
Em que ano foi promulgada a atual Constituição do Brasil?|1988|1985|1967|1990|História
Quem foi o último imperador do Brasil?|Dom Pedro II|Dom Pedro I|Dom João VI|Dom Miguel|História
Qual civilização construiu Machu Picchu?|Inca|Asteca|Maia|Olmeca|História
Qual civilização tinha Tenochtitlán como capital?|Asteca|Inca|Maia|Tolteca|História
Quem foi o primeiro imperador romano?|Augusto|Júlio César|Nero|Calígula|História
Em qual cidade grega surgiu a democracia?|Atenas|Esparta|Tebas|Corinto|História
Quem escreveu "1984"?|George Orwell|Aldous Huxley|Ray Bradbury|H. G. Wells|Literatura
Quem escreveu "Grande Sertão: Veredas"?|João Guimarães Rosa|Graciliano Ramos|Jorge Amado|Clarice Lispector|Literatura
Quem escreveu "Vidas Secas"?|Graciliano Ramos|Rachel de Queiroz|Jorge Amado|José Lins do Rego|Literatura
Quem escreveu "A Hora da Estrela"?|Clarice Lispector|Cecília Meireles|Lygia Fagundes Telles|Rachel de Queiroz|Literatura
Quem escreveu "O Cortiço"?|Aluísio Azevedo|Machado de Assis|José de Alencar|Lima Barreto|Literatura
Quem escreveu "Iracema"?|José de Alencar|Machado de Assis|Gonçalves Dias|Castro Alves|Literatura
Qual poeta ficou conhecido como "Poeta dos Escravos"?|Castro Alves|Gonçalves Dias|Álvares de Azevedo|Olavo Bilac|Literatura
Quem escreveu "Memórias Póstumas de Brás Cubas"?|Machado de Assis|Lima Barreto|Raul Pompeia|Euclides da Cunha|Literatura
Quem escreveu "Os Sertões"?|Euclides da Cunha|Graciliano Ramos|Guimarães Rosa|Monteiro Lobato|Literatura
Quem escreveu "A Divina Comédia"?|Dante Alighieri|Petrarca|Boccaccio|Virgílio|Literatura
Quem escreveu "Guerra e Paz"?|Liev Tolstói|Fiódor Dostoiévski|Anton Tchekhov|Ivan Turguêniev|Literatura
Quem escreveu "Crime e Castigo"?|Fiódor Dostoiévski|Liev Tolstói|Nikolai Gógol|Aleksandr Púchkin|Literatura
Quem escreveu "Ensaio sobre a Cegueira"?|José Saramago|Fernando Pessoa|Mia Couto|Eça de Queirós|Literatura
Qual escritor brasileiro escreveu "O Alquimista"?|Paulo Coelho|Jorge Amado|Erico Verissimo|Rubem Fonseca|Literatura
Quem escreveu "O Tempo e o Vento"?|Erico Verissimo|Jorge Amado|Graciliano Ramos|Mario Quintana|Literatura
Qual filósofo grego foi professor de Alexandre, o Grande?|Aristóteles|Platão|Sócrates|Pitágoras|Filosofia
Quem escreveu "O Príncipe"?|Nicolau Maquiavel|Thomas Hobbes|John Locke|Jean-Jacques Rousseau|Filosofia
Qual filósofo escreveu "Penso, logo existo"?|René Descartes|Immanuel Kant|Baruch Spinoza|Voltaire|Filosofia
Quem compôs as "Bachianas Brasileiras"?|Heitor Villa-Lobos|Carlos Gomes|Tom Jobim|Chiquinha Gonzaga|Música
Quem compôs a ópera "O Guarani"?|Carlos Gomes|Heitor Villa-Lobos|Ernesto Nazareth|Chiquinha Gonzaga|Música
Quem compôs a Nona Sinfonia, com o "Hino à Alegria"?|Ludwig van Beethoven|Wolfgang Amadeus Mozart|Johann Sebastian Bach|Johannes Brahms|Música
Quem compôs "As Quatro Estações"?|Antonio Vivaldi|Johann Sebastian Bach|Georg Friedrich Händel|Joseph Haydn|Música
Quem pintou "Guernica"?|Pablo Picasso|Joan Miró|Salvador Dalí|Francisco Goya|Arte
Quem pintou "Moça com Brinco de Pérola"?|Johannes Vermeer|Rembrandt|Peter Paul Rubens|Jan van Eyck|Arte
Quem esculpiu "O Pensador"?|Auguste Rodin|Michelangelo|Gian Lorenzo Bernini|Donatello|Arte
Quem pintou "O Nascimento de Vênus"?|Sandro Botticelli|Rafael|Ticiano|Caravaggio|Arte
Qual pintor brasileiro criou os painéis "Guerra e Paz" da sede da ONU?|Candido Portinari|Di Cavalcanti|Tarsila do Amaral|Alfredo Volpi|Arte
Qual movimento artístico teve a Semana de 1922 como marco no Brasil?|Modernismo|Barroco|Romantismo|Realismo|Arte
Qual é o rio mais longo da Europa?|Volga|Danúbio|Reno|Sena|Geografia
Qual é a capital da Suíça?|Berna|Zurique|Genebra|Basileia|Geografia
Qual é a capital do Vietnã?|Hanói|Ho Chi Minh|Bangcoc|Phnom Penh|Geografia
Qual é a capital do Paquistão?|Islamabad|Karachi|Lahore|Cabul|Geografia
Qual é a capital da Nigéria?|Abuja|Lagos|Acra|Nairóbi|Geografia
Qual é a capital do Cazaquistão?|Astana|Almaty|Tashkent|Bishkek|Geografia
Qual cidade é a sede do governo da Bolívia?|La Paz|Sucre|Santa Cruz de la Sierra|Cochabamba|Geografia
Qual é a capital do Equador?|Quito|Guayaquil|Bogotá|Lima|Geografia
Qual é o menor estado brasileiro em área?|Sergipe|Alagoas|Espírito Santo|Rio de Janeiro|Brasil
Com quantos países o Brasil faz fronteira?|10|8|9|11|Brasil
Qual estreito separa a Europa da África?|Gibraltar|Bósforo|Magalhães|Ormuz|Geografia
Qual canal liga o Mar Mediterrâneo ao Mar Vermelho?|Canal de Suez|Canal do Panamá|Canal de Corinto|Canal da Mancha|Geografia
Qual é o maior país da África em área?|Argélia|Sudão|República Democrática do Congo|Egito|Geografia
Qual é o ponto mais profundo dos oceanos?|Fossa das Marianas|Fossa de Porto Rico|Fossa de Java|Fossa de Tonga|Geografia
Qual é o deserto não polar mais seco do mundo?|Atacama|Saara|Gobi|Kalahari|Geografia
Em qual país ficam as ruínas de Petra?|Jordânia|Egito|Israel|Síria|Geografia
Em qual país fica o templo de Angkor Wat?|Camboja|Tailândia|Vietnã|Laos|Geografia
Qual é a moeda do Reino Unido?|Libra esterlina|Euro|Dólar|Coroa|Geografia
Qual é a moeda da Índia?|Rupia|Iene|Rublo|Baht|Geografia
Qual é a moeda da Suíça?|Franco suíço|Euro|Coroa|Marco|Geografia
Quanto é 15% de 80?|12|15|10|8|Matemática
Qual é o valor aproximado de π (pi)?|3,14|3,41|2,71|1,61|Matemática
Qual é a derivada de x²?|2x|x|x³/3|2|Matemática
Quanto é 0,5 × 0,5?|0,25|1|0,5|2,5|Matemática
Qual é o mínimo múltiplo comum de 4 e 6?|12|24|2|10|Matemática
Quantas diagonais tem um hexágono?|9|6|12|8|Matemática
Quanto é 7! (fatorial de 7)?|5.040|720|40.320|2.520|Matemática
Quanto vale o logaritmo de 1.000 na base 10?|3|10|100|30|Matemática
Qual número romano representa 1.000?|M|D|C|K|Matemática
Quantos bits tem um byte?|8|4|16|10|Tecnologia
Qual linguagem é usada para estruturar páginas da web?|HTML|SQL|Python|C|Tecnologia
Quem é considerada a primeira programadora da história?|Ada Lovelace|Grace Hopper|Marie Curie|Hedy Lamarr|Tecnologia
Qual matemático britânico ajudou a decifrar o código Enigma na Segunda Guerra?|Alan Turing|Isaac Newton|Charles Babbage|Bertrand Russell|Tecnologia
Em que ano o Brasil sediou uma Copa do Mundo pela primeira vez?|1950|1958|1970|2014|Esportes
Em qual cidade foram realizados os Jogos Olímpicos de 2016?|Rio de Janeiro|Londres|Tóquio|Pequim|Esportes
Qual piloto brasileiro foi campeão de Fórmula 1 em 1988, 1990 e 1991?|Ayrton Senna|Nelson Piquet|Emerson Fittipaldi|Rubens Barrichello|Esportes
Quantas casas tem um tabuleiro de xadrez?|64|81|100|49|Esportes
No xadrez, qual peça se move em "L"?|Cavalo|Bispo|Torre|Dama|Esportes
Qual é a distância oficial de uma maratona?|42,195 km|40 km|21,1 km|50 km|Esportes
Em qual país surgiram os Jogos Olímpicos da Antiguidade?|Grécia|Itália|Egito|Turquia|Esportes
Qual é o osso do braço que vai do ombro ao cotovelo?|Úmero|Rádio|Ulna|Clavícula|Corpo humano
Qual é o nome científico do ser humano moderno?|Homo sapiens|Homo erectus|Homo habilis|Australopithecus|Ciência
Qual é o maior mamífero terrestre nativo da América do Sul?|Anta|Onça-pintada|Capivara|Tamanduá-bandeira|Bichos
Qual é o maior roedor do mundo?|Capivara|Castor|Paca|Porco-espinho|Bichos
Qual mosquito transmite a dengue?|Aedes aegypti|Anopheles|Barbeiro|Mosca tsé-tsé|Ciência
Qual cientista brasileiro liderou o combate à febre amarela no Rio no início do século XX?|Oswaldo Cruz|Carlos Chagas|Vital Brazil|Adolfo Lutz|Ciência
A doença de Chagas recebeu o nome de qual cientista brasileiro?|Carlos Chagas|Oswaldo Cruz|Vital Brazil|Emílio Ribas|Ciência
Qual país deu a Estátua da Liberdade de presente aos Estados Unidos?|França|Inglaterra|Espanha|Holanda|História
Qual idioma tem mais falantes nativos no mundo?|Mandarim|Inglês|Espanhol|Hindi|Geografia
`].map(block => block.trim().split('\n').map(l => { const p = l.split('|'); return [p[0], p[1], [p[2], p[3], p[4]], p[5]]; }));
