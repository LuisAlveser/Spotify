import { Band, Status } from "@/app/generated/prisma";
import { prisma } from "../app/lib/prisma";

async function main() {
  const bands = [
    // --- NACIONAIS ---
    {
      name: "Roupa Nova",
      slug: "roupa-nova",
      status: Status.active,
      description: "Ícone do pop rock e MPB, famosa por suas trilhas sonoras de novelas e harmonia vocal impecável.",
      tracks: {
        create: [
          { title: "Dona", slug: "dona", duration_in_seconds: 244 },
          { title: "Linda Demais", slug: "linda-demais", duration_in_seconds: 281 }
        ]
      }
    },
    {
      name: "Legião Urbana",
      slug: "legiao-urbana",
      status: Status.active,
      description: "Uma das maiores bandas do rock brasíliaco, liderada pelo eterno Renato Russo, marcou gerações com letras poéticas e sociais.",
      tracks: {
        create: [
          { title: "Eduardo e Mônica", slug: "eduardo-e-monica", duration_in_seconds: 272 },
          { title: "Tempo Perdido", slug: "tempo-perdido", duration_in_seconds: 302 }
        ]
      }
    },
    {
      name: "Os Paralamas do Sucesso",
      slug: "os-paralamas-do-sucesso",
      status: Status.active,
      description: "Pioneiros do rock nacional dos anos 80, misturando perfeitamente o rock com ritmos caribenhos, reggae e ska.",
      tracks: {
        create: [
          { title: "Lanterna dos Afogados", slug: "lanterna-dos-afogados", duration_in_seconds: 208 },
          { title: "Alagados", slug: "alagados", duration_in_seconds: 300 }
        ]
      }
    },
    {
      name: "Skank",
      slug: "skank",
      status: Status.active,
      description: "Banda mineira que conquistou o Brasil misturando pop rock com dancehall, reggae e refrões extremamente marcantes.",
      tracks: {
        create: [
          { title: "Vou Deixar", slug: "vou-deixar", duration_in_seconds: 239 },
          { title: "Garota Nacional", slug: "garota-nacional", duration_in_seconds: 317 }
        ]
      }
    },
    {
      name: "Jota Quest",
      slug: "jota-quest",
      status: Status.active,
      description: "Referência no pop rock e pop-funk brasileiro, conhecida pela energia contagiante de seus shows e canções otimistas.",
      tracks: {
        create: [
          { title: "Dias Melhores", slug: "dias-melhores", duration_in_seconds: 283 },
          { title: "Só Hoje", slug: "so-hoje", duration_in_seconds: 211 }
        ]
      }
    },
    {
      name: "Titãs",
      slug: "titas",
      status: Status.active,
      description: "Uma das bandas mais versáteis do rock brasileiro, transitando entre o punk, a New Wave, o pop e o rock acústico.",
      tracks: {
        create: [
          { title: "Epitáfio", slug: "epitafio", duration_in_seconds: 177 },
          { title: "Enquanto Houver Sol", slug: "enquanto-houver-sol", duration_in_seconds: 182 }
        ]
      }
    },
    {
      name: "Charlie Brown Jr.",
      slug: "charlie-brown-jr",
      status: Status.active,
      description: "Mistura única de rock alternativo, skate punk, reggae e rap, eternizada pela voz e atitude de Chorão.",
      tracks: {
        create: [
          { title: "Só os Loucos Sabem", slug: "so-os-loucos-sabem", duration_in_seconds: 210 },
          { title: "Proibida pra Mim", slug: "proibida-pra-mim", duration_in_seconds: 168 }
        ]
      }
    },
    {
      name: "O Rappa",
      slug: "o-rappa",
      status: Status.active,
      description: "Banda carioca conhecida por suas letras de forte cunho social e sua mistura de rock, reggae, rap e dub.",
      tracks: {
        create: [
          { title: "Anjos (Pra Quem Tem Fé)", slug: "anjos-pra-quem-tem-fe", duration_in_seconds: 326 },
          { title: "Minha Alma (A Paz Que Eu Não Quero)", slug: "minha-alma", duration_in_seconds: 304 }
        ]
      }
    },
    {
      name: "CPM 22",
      slug: "cpm-22",
      status: Status.active,
      description: "Um dos maiores expoentes do hardcore melódico e do punk rock nacional nos anos 2000.",
      tracks: {
        create: [
          { title: "Um Minuto Para o Fim do Mundo", slug: "um-minuto-para-o-fim-do-mundo", duration_in_seconds: 198 },
          { title: "Dias Atrás", slug: "dias-atras", duration_in_seconds: 245 }
        ]
      }
    },
    {
      name: "Pitty",
      slug: "pitty",
      status: Status.active,
      description: "Liderada pela cantora baiana Pitty, tornou-se a cara do rock nacional dos anos 2000 com letras viscerais e atitude empoderada.",
      tracks: {
        create: [
          { title: "Equalize", slug: "equalize", duration_in_seconds: 232 },
          { title: "Me Adora", slug: "me-adora", duration_in_seconds: 271 }
        ]
      }
    },
    {
      name: "Barão Vermelho",
      slug: "barao-vermelho",
      status: Status.active,
      description: "Pilar fundamental do BRock, revelou Cazuza e Frejat, marcando a história com seu blues-rock contestador.",
      tracks: {
        create: [
          { title: "Pro Dia Nascer Feliz", slug: "pro-dia-nascer-feliz", duration_in_seconds: 266 },
          { title: "Maior Abandonado", slug: "maior-abandonado", duration_in_seconds: 163 }
        ]
      }
    },
    {
      name: "Capital Inicial",
      slug: "capital-inicial",
      status: Status.active,
      description: "Surgida do movimento pós-punk de Brasília, a banda liderada por Dinho Ouro Preto se consolidou como gigante do pop rock nacional.",
      tracks: {
        create: [
          { title: "Primeiros Erros", slug: "primeiros-erros", duration_in_seconds: 334 },
          { title: "Natasha", slug: "natasha", duration_in_seconds: 184 }
        ]
      }
    },
    {
      name: "Los Hermanos",
      slug: "los-hermanos",
      status: Status.active,
      description: "Banda que começou no hardcore/ska e evoluiu para um rock alternativo melancólico e MPB, arrastando multidões de fãs cultos.",
      tracks: {
        create: [
          { title: "Anna Julia", slug: "anna-julia", duration_in_seconds: 212 },
          { title: "O Vencedor", slug: "o-vencedor", duration_in_seconds: 200 }
        ]
      }
    },
    {
      name: "Engenheiros do Hawaii",
      slug: "engenheiros-do-hawaii",
      status: Status.active,
      description: "Ícone do rock gaúcho, famosa pelas letras repletas de ironia, trocadilhos e críticas filosóficas criadas por Humberto Gessinger.",
      tracks: {
        create: [
          { title: "Infinita Highway", slug: "infinita-highway", duration_in_seconds: 371 },
          { title: "Era Um Garoto Que Como Eu", slug: "era-um-garoto", duration_in_seconds: 265 }
        ]
      }
    },
    {
      name: "Raimundos",
      slug: "raimundos",
      status: Status.active,
      description: "Revolucionou os anos 90 misturando o peso do hardcore punk com a malícia e a sonoridade do forró e ritmos nordestinos.",
      tracks: {
        create: [
          { title: "Mulher de Fases", slug: "mulher-de-fases", duration_in_seconds: 212 },
          { title: "A Mais Pedida", slug: "a-mais-pedida", duration_in_seconds: 232 }
        ]
      }
    },
    {
      name: "Mamonas Assassinas",
      slug: "mamonas-assassinas",
      status: Status.active,
      description: "Fenômeno meteórico dos anos 90 que uniu rock pesado, paródias e humor escrachado, conquistando o coração de todo o país.",
      tracks: {
        create: [
          { title: "Pelados em Santos", slug: "pelados-em-santos", duration_in_seconds: 202 },
          { title: "Vira-Vira", slug: "vira-vira", duration_in_seconds: 143 }
        ]
      }
    },
    {
      name: "Rouge",
      slug: "rouge",
      status: Status.active,
      description: "O maior grupo pop feminino do Brasil, formado em 2002, que virou febre nacional com suas coreografias e hits chiclete.",
      tracks: {
        create: [
          { title: "Ragatanga", slug: "ragatanga", duration_in_seconds: 202 },
          { title: "Brilha la Luna", slug: "brilha-la-luna", duration_in_seconds: 210 }
        ]
      }
    },
    {
      name: "NX Zero",
      slug: "nx-zero",
      status: Status.active,
      description: "Banda pioneira do movimento Emocore no Brasil, liderando as paradas de sucesso nos anos 2000 com letras confessionais.",
      tracks: {
        create: [
          { title: "Cedo Ou Tarde", slug: "cedo-ou-tarde", duration_in_seconds: 233 },
          { title: "Razões e Emoções", slug: "razoes-e-emocoes", duration_in_seconds: 224 }
        ]
      }
    },
    {
      name: "Fresno",
      slug: "fresno",
      status: Status.active,
      description: "Referência do rock alternativo e emocional brasileiro, conhecida por sua evolução sonora constante e composições grandiosas.",
      tracks: {
        create: [
          { title: "Desde Quando Você Se Foi", slug: "desde-quando-voce-se-foi", duration_in_seconds: 214 },
          { title: "Milonga", slug: "milonga", duration_in_seconds: 247 }
        ]
      }
    },
    {
      name: "Natiruts",
      slug: "natiruts",
      status: Status.active,
      description: "Uma das bandas mais importantes do reggae nacional, levando vibrações positivas e a cultura de Brasília para o mundo.",
      tracks: {
        create: [
          { title: "Quero Ser Feliz Também", slug: "quero-ser-feliz-tambem", duration_in_seconds: 230 },
          { title: "Sorri, Sou Rei", slug: "sorri-sou-rei", duration_in_seconds: 284 }
        ]
      }
    },
    {
      name: "Melim",
      slug: "melim",
      status: Status.active,
      description: "Trio de irmãos fluminenses que conquistou o país com seu estilo 'good vibes', misturando pop, reggae e MPB.",
      tracks: {
        create: [
          { title: "Meu Abrigo", slug: "meu-abrigo", duration_in_seconds: 231 },
          { title: "Ouvi Dizer", slug: "ouvi-dizer", duration_in_seconds: 214 }
        ]
      }
    },
    {
      name: "Sepultura",
      slug: "sepultura",
      status: Status.active,
      description: "A banda brasileira de Heavy Metal de maior repercussão mundial, respeitada globalmente por sua agressividade e inovação.",
      tracks: {
        create: [
          { title: "Roots Bloody Roots", slug: "roots-bloody-roots", duration_in_seconds: 212 },
          { title: "Ratamahatta", slug: "ratamahatta", duration_in_seconds: 270 }
        ]
      }
    },
    {
      name: "Angra",
      slug: "angra",
      status: Status.active,
      description: "Ícone mundial do Power Metal e Metal Progressivo, famosa por unir o peso do metal à música clássica e ritmos brasileiros.",
      tracks: {
        create: [
          { title: "Carry On", slug: "carry-on", duration_in_seconds: 303 },
          { title: "Nova Era", slug: "nova-era", duration_in_seconds: 292 }
        ]
      }
    },
    {
      name: "BaianaSystem",
      slug: "baianasystem",
      status: Status.active,
      description: "Projeto musical revolucionário que une o som da guitarra baiana com soundsystem, dub, reggae e ritmos afro-latinos.",
      tracks: {
        create: [
          { title: "Sulamericano", slug: "sulamericano", duration_in_seconds: 264 },
          { title: "Playsom", slug: "playsom", duration_in_seconds: 218 }
        ]
      }
    },
    {
      name: "Liniker e os Caramelows",
      slug: "liniker-e-os-caramelows",
      status: Status.active,
      description: "Grupo que uniu a potência e a representatividade da MPB contemporânea com o molho do Soul e da Black Music.",
      tracks: {
        create: [
          { title: "Zero", slug: "zero", duration_in_seconds: 335 },
          { title: "Louise du Brésil", slug: "louise-du-bresil", duration_in_seconds: 234 }
        ]
      }
    },

    // --- INTERNACIONAIS ---
    {
      name: "Queen",
      slug: "queen",
      status: Status.active,
      description: "Uma das bandas mais lendárias da história do rock mundial, famosa pela genialidade teatral e voz inigualável de Freddie Mercury.",
      tracks: {
        create: [
          { title: "Bohemian Rhapsody", slug: "bohemian-rhapsody", duration_in_seconds: 355 },
          { title: "Don't Stop Me Now", slug: "dont-stop-me-now", duration_in_seconds: 209 }
        ]
      }
    },
    {
      name: "The Beatles",
      slug: "the-beatles",
      status: Status.active,
      description: "O quarteto de Liverpool que revolucionou a música pop, a cultura jovem e os métodos de gravação nos anos 1960.",
      tracks: {
        create: [
          { title: "Hey Jude", slug: "hey-jude", duration_in_seconds: 431 },
          { title: "Yesterday", slug: "yesterday", duration_in_seconds: 125 }
        ]
      }
    },
    {
      name: "Coldplay",
      slug: "coldplay",
      status: Status.active,
      description: "Banda britânica gigante do pop rock alternativo, aclamada por seus shows monumentais em estádios e hinos melódicos.",
      tracks: {
        create: [
          { title: "Yellow", slug: "yellow", duration_in_seconds: 269 },
          { title: "Viva La Vida", slug: "viva-la-vida", duration_in_seconds: 242 }
        ]
      }
    },
    {
      name: "Linkin Park",
      slug: "linkin-park",
      status: Status.active,
      description: "Pioneiros e maiores representantes do Nu Metal, unindo perfeitamente guitarras pesadas, rap, eletrônico e vocais viscerais.",
      tracks: {
        create: [
          { title: "In the End", slug: "in-the-end", duration_in_seconds: 216 },
          { title: "Numb", slug: "numb", duration_in_seconds: 187 }
        ]
      }
    },
    {
      name: "U2",
      slug: "u2",
      status: Status.active,
      description: "Grupo irlandês histórico liderado por Bono Vox, marcante pelas guitarras com delay de The Edge e forte ativismo político e social.",
      tracks: {
        create: [
          { title: "With or Without You", slug: "with-or-without-you", duration_in_seconds: 296 },
          { title: "Beautiful Day", slug: "beautiful-day", duration_in_seconds: 248 }
        ]
      }
    },
    {
      name: "Pink Floyd",
      slug: "pink-floyd",
      status: Status.active,
      description: "Gigantes do rock progressivo e psicodélico, famosos por seus álbuns conceituais, letras filosóficas e shows com visuais surreais.",
      tracks: {
        create: [
          { title: "Another Brick in the Wall", slug: "another-brick-in-the-wall", duration_in_seconds: 239 },
          { title: "Wish You Were Here", slug: "wish-you-were-here", duration_in_seconds: 334 }
        ]
      }
    },
    {
      name: "AC/DC",
      slug: "ac-dc",
      status: Status.active,
      description: "Lendas do Hard Rock australiano, conhecidos mundialmente pelos riffs inconfundíveis de Angus Young e sua energia eletrizante.",
      tracks: {
        create: [
          { title: "Back In Black", slug: "back-in-black", duration_in_seconds: 255 },
          { title: "Highway to Hell", slug: "highway-to-hell", duration_in_seconds: 208 }
        ]
      }
    },
    {
      name: "Metallica",
      slug: "metallica",
      status: Status.active,
      description: "Uma das bandas que compõem o 'Big Four' do Thrash Metal, moldando o metal moderno e arrastando legiões de fãs ao redor do globo.",
      tracks: {
        create: [
          { title: "Enter Sandman", slug: "enter-sandman", duration_in_seconds: 331 },
          { title: "Nothing Else Matters", slug: "nothing-else-matters", duration_in_seconds: 388 }
        ]
      }
    },
    {
      name: "Nirvana",
      slug: "nirvana",
      status: Status.active,
      description: "Liderada por Kurt Cobain, a banda de Seattle definiu o movimento Grunge nos anos 90 e mudou o rumo do rock alternativo para sempre.",
      tracks: {
        create: [
          { title: "Smells Like Teen Spirit", slug: "smells-like-teen-spirit", duration_in_seconds: 301 },
          { title: "Come as You Are", slug: "come-as-you-are", duration_in_seconds: 219 }
        ]
      }
    },
    {
      name: "Red Hot Chili Peppers",
      slug: "red-hot-chili-peppers",
      status: Status.active,
      description: "Banda californiana icônica que fundiu Funk com Rock Alternativo, sustentada pelo baixo groovado de Flea e hits atemporais.",
      tracks: {
        create: [
          { title: "Californication", slug: "californication", duration_in_seconds: 329 },
          { title: "Under the Bridge", slug: "under the-bridge", duration_in_seconds: 264 }
        ]
      }
    },
    {
      name: "Foo Fighters",
      slug: "foo-fighters",
      status: Status.active,
      description: "Formada por Dave Grohl após o fim do Nirvana, consolidou-se como uma das maiores forças do Post-Grunge e Rock de arena do mundo.",
      tracks: {
        create: [
          { title: "Everlong", slug: "everlong", duration_in_seconds: 250 },
          { title: "The Pretender", slug: "the-pretender", duration_in_seconds: 269 }
        ]
      }
    },
    {
      name: "Green Day",
      slug: "green-day",
      status: Status.active,
      description: "Trio californiano que reviveu o interesse do mainstream pelo Punk Rock nos anos 90 e criou óperas-rock icônicas nos anos 2000.",
      tracks: {
        create: [
          { title: "Basket Case", slug: "basket-case", duration_in_seconds: 181 },
          { title: "Boulevard of Broken Dreams", slug: "boulevard-of-broken-dreams", duration_in_seconds: 260 }
        ]
      }
    },
    {
      name: "Arctic Monkeys",
      slug: "arctic-monkeys",
      status: Status.active,
      description: "Expoente do Indie Rock britânico, estourou na internet nos anos 2000 com riffs afiados e composições maduras de Alex Turner.",
      tracks: {
        create: [
          { title: "Do I Wanna Know?", slug: "do-i-wanna-know", duration_in_seconds: 272 },
          { title: "R U Mine?", slug: "r-u-mine", duration_in_seconds: 201 }
        ]
      }
    },
    {
      name: "Maroon 5",
      slug: "maroon-5",
      status: Status.active,
      description: "Banda que começou focada no Pop Rock/Neo-Soul e se transformou em uma das maiores máquinas de hits Pop do planeta.",
      tracks: {
        create: [
          { title: "Sugar", slug: "sugar", duration_in_seconds: 235 },
          { title: "She Will Be Loved", slug: "she-will-be-loved", duration_in_seconds: 257 }
        ]
      }
    },
    {
      name: "Imagine Dragons",
      slug: "imagine-dragons",
      status: Status.active,
      description: "Banda de Las Vegas famosa por fundir Rock com Pop e Eletrônico, criando faixas épicas e repletas de percussão pesada.",
      tracks: {
        create: [
          { title: "Radioactive", slug: "radioactive", duration_in_seconds: 186 },
          { title: "Believer", slug: "believer", duration_in_seconds: 204 }
        ]
      }
    },
    {
      name: "Guns N' Roses",
      slug: "guns-n-roses",
      status: Status.active,
      description: "Símbolo do Hard Rock do final dos anos 80, marcou o mundo com a voz rasgada de Axl Rose e os solos lendários de Slash.",
      tracks: {
        create: [
          { title: "Sweet Child O' Mine", slug: "sweet-child-o-mine", duration_in_seconds: 356 },
          { title: "November Rain", slug: "november-rain", duration_in_seconds: 537 }
        ]
      }
    },
    {
      name: "Led Zeppelin",
      slug: "led-zeppelin",
      status: Status.active,
      description: "Considerada uma das bandas criadoras do Heavy Metal e Hard Rock, unindo Blues pesado, misticismo e virtuosismo musical.",
      tracks: {
        create: [
          { title: "Stairway to Heaven", slug: "stairway-to-heaven", duration_in_seconds: 482 },
          { title: "Whole Lotta Love", slug: "whole-lotta-love", duration_in_seconds: 334 }
        ]
      }
    },
    {
      name: "The Rolling Stones",
      slug: "the-rolling-stones",
      status: Status.active,
      description: "Sinônimo da longevidade no Rock 'n' Roll, a banda britânica liderada por Mick Jagger e Keith Richards moldou a atitude do gênero.",
      tracks: {
        create: [
          { title: "(I Can't Get No) Satisfaction", slug: "satisfaction", duration_in_seconds: 223 },
          { title: "Paint It Black", slug: "paint-it-black", duration_in_seconds: 222 }
        ]
      }
    },
    {
      name: "Radiohead",
      slug: "radiohead",
      status: Status.active,
      description: "Banda britânica aclamada pela crítica por sua constante experimentação artística, misturando Art Rock com música eletrônica e alternativa.",
      tracks: {
        create: [
          { title: "Creep", slug: "creep", duration_in_seconds: 236 },
          { title: "Karma Police", slug: "karma-police", duration_in_seconds: 261 }
        ]
      }
    },
    {
      name: "The Killers",
      slug: "the-killers",
      status: Status.active,
      description: "Direto de Las Vegas, o grupo revitalizou o Indie Rock e o Synth-pop nos anos 2000 com batidas dançantes e refrões grandiosos.",
      tracks: {
        create: [
          { title: "Mr. Brightside", slug: "mr-brightside", duration_in_seconds: 222 },
          { title: "Somebody Told Me", slug: "somebody-told-me", duration_in_seconds: 197 }
        ]
      }
    },
    {
      name: "Oasis",
      slug: "oasis",
      status: Status.active,
      description: "Gigantes do Britpop dos anos 90, conhecidos tanto por suas canções melódicas inesquecíveis quanto pelas brigas icônicas dos irmãos Gallagher.",
      tracks: {
        create: [
          { title: "Wonderwall", slug: "wonderwall", duration_in_seconds: 258 },
          { title: "Don't Look Back in Anger", slug: "dont-look-back-in-anger", duration_in_seconds: 288 }
        ]
      }
    },
    {
      name: "Gorillaz",
      slug: "gorillaz",
      status: Status.active,
      description: "A maior banda virtual do mundo, criada por Damon Albarn, misturando Hip-Hop, Eletrônico, Dub e Pop de forma genial.",
      tracks: {
        create: [
          { title: "Feel Good Inc.", slug: "feel-good-inc", duration_in_seconds: 221 },
          { title: "Clint Eastwood", slug: "clint-eastwood", duration_in_seconds: 340 }
        ]
      }
    },
    {
      name: "Evanescence",
      slug: "evanescence",
      status: Status.active,
      description: "Banda norte-americana que estourou nos anos 2000 combinando Rock/Metal Alternativo com vocais líricos poderosos de Amy Lee.",
      tracks: {
        create: [
          { title: "Bring Me To Life", slug: "bring-me-to-life", duration_in_seconds: 235 },
          { title: "My Immortal", slug: "my-immortal", duration_in_seconds: 264 }
        ]
      }
    },
    {
      name: "Blink-182",
      slug: "blink-182",
      status: Status.active,
      description: "Pioneiros do Pop Punk comercial nos anos 90 e 2000, influenciando toda uma geração com músicas rápidas, humor e angústia jovem.",
      tracks: {
        create: [
          { title: "All The Small Things", slug: "all-the-small-things", duration_in_seconds: 168 },
          { title: "I Miss You", slug: "i-miss-you", duration_in_seconds: 227 }
        ]
      }
    },
    {
      name: "Daft Punk",
      slug: "daft-punk",
      status: Status.active,
      description: "Duo francês icônico mascarado de robôs que revolucionou a música eletrônica, o French House e o Synthpop mundial.",
      tracks: {
        create: [
          { title: "Get Lucky", slug: "get-lucky", duration_in_seconds: 249 },
          { title: "One More Time", slug: "one-more-time", duration_in_seconds: 320 }
        ]
      }
    }
  ];

  console.log("Iniciando a inserção de 50 bandas...");

  for (const band of bands) {
    await prisma.band.create({
      data: band
    });
  }

  console.log("Inserção concluída com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });