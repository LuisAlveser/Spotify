import { Band, Status } from "@/app/generated/prisma";
import  {prisma} from "../app/lib/prisma"





async function main() {
  const bands = [
    
    {
      name: "Roupa Nova",
      slug: "roupa-nova",
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
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
      data: band as any 
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