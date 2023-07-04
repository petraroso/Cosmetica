const products = [
  {
    name: "Parfem Miris proljeća",
    description:
      "Ekskluzivan parfem s osvježavajućim notama cvijeća i voća, savršen za svakodnevno nošenje.",
    count: 10,
    price: 350,
    category: "Parfemi",
    images: [{ path: "/images/parfem1.jpg" }],
    rating: 5,
    reviewsNumber: 25,
    reviews: [],
    sales:10,
    attrs: [
      { key: "Vrsta mirisa", value: "cvjetni" },
      { key: "Količina", value: "50 ml" },
    ],
  },
  {
    name: "Make-up Set Profesionalni",
    description:
      "Komplet profesionalnog make-upa s nijansama za sve prigode. Savršen za šminkanje kod kuće ili u salonu.",
    count: 5,
    price: 500,
    category: "Make-up",
    images: [{ path: "/images/makeup1.jpeg" }],
    rating: 5,
    reviewsNumber: 15,
    reviews: [],
    attrs: [
      { key: "Set uključuje", value: "ruževe, sjenila, puder" },
      { key: "Boje", value: "različite nijanse" },
    ],
  },
  {
    name: "Šampon za njegu kose",
    description:
      "Hranjivi šampon koji dubinski njeguje i hidratizira kosu. Pruža sjaj, mekoću i obnovu oštećenih vlasi.",
    count: 20,
    price: 50,
    category: "Kosa",
    images: [{ path: "/images/kosa1.jpg" }],
    rating: 4,
    reviewsNumber: 10,
    reviews: [],
    attrs: [
      { key: "Tip kose", value: "sve vrste kose" },
      { key: "Volumen", value: "300 ml" },
    ],
  },
  {
    name: "Krema za lice Anti-age",
    description:
      "Revitalizirajuća krema s anti-age svojstvima. Smanjuje bore i poboljšava elastičnost kože.",
    count: 15,
    price: 200,
    category: "Lice",
    images: [{ path: "/images/lice1.jpg" }],
    rating: 5,
    reviewsNumber: 12,
    reviews: [],
    sales:10,
    attrs: [
      { key: "Tip kože", value: "sve tipove kože" },
      { key: "Količina", value: "50 ml" },
    ],
  },
  {
    name: "Losion za tijelo Hidratantni",
    description:
      "Hidratantni losion koji pruža intenzivnu hidrataciju kože tijela. Brzo se upija i ostavlja kožu glatkom i mekom.",
    count: 30,
    price: 40,
    category: "Tijelo",
    images: [{ path: "/images/tijelo1.jpg" }],
    rating: 5,
    reviewsNumber: 18,
    reviews: [],
    attrs: [
      { key: "Tip kože", value: "sve tipove kože" },
      { key: "Količina", value: "200 ml" },
    ],
  },
  {
    name: "Četkica za zube Električna",
    description:
      "Inovativna električna četkica za zube s vibracijom koja uklanja plak i pruža dubinsko čišćenje zubi.",
    count: 25,
    price: 80,
    category: "Zubi",
    images: [{ path: "/images/zubi1.jpg" }],
    rating: 5,
    reviewsNumber: 20,
    reviews: [],
    attrs: [
      { key: "Vrsta četkice", value: "električna" },
      { key: "Boja", value: "bijela" },
    ],
  },
  {
    name: "Gel za tuširanje Muški",
    description:
      "Osvježavajući gel za tuširanje s muževnim mirisom. Pruža ugodnu njegu i čistoću kože muškaraca.",
    count: 50,
    price: 30,
    category: "Muškarci",
    images: [{ path: "/images/muskarci1.jpg" }],
    rating: 4,
    reviewsNumber: 8,
    reviews: [],
    attrs: [
      { key: "Vrsta proizvoda", value: "gel za tuširanje" },
      { key: "Količina", value: "250 ml" },
    ],
  },
  {
    name: "Krema za osjetljivu kožu",
    description:
      "Hipoalergena krema za njegu osjetljive kože. Smanjuje crvenilo i smiruje iritacije.",
    count: 12,
    price: 150,
    category: "Dermo",
    images: [{ path: "/images/dermo1.jpg" }],
    rating: 4,
    reviewsNumber: 6,
    reviews: [],
    attrs: [
      { key: "Tip kože", value: "osjetljiva koža" },
      { key: "Količina", value: "50 ml" },
    ],
  },
  {
    name: "Krema za njegu dojke",
    description:
      "Posebno formulirana krema za njegu dojke. Hidratizira i poboljšava tonus kože, pružajući joj optimalnu njegu.",
    count: 8,
    price: 180,
    category: "Majka i dijete",
    images: [{ path: "/images/majkaiDijete1.jpg" }],
    rating: 5,
    reviewsNumber: 4,
    reviews: [],
    attrs: [
      { key: "Namjena", value: "njega dojki" },
      { key: "Količina", value: "100 ml" },
    ],
  },
  {
    name: "Parfem Večernji sjaj",
    description:
      "Elegantan parfem s intenzivnim notama vanilije i mošusa. Savršen za večernje izlaske i posebne prigode.",
    count: 10,
    price: 450,
    category: "Parfemi",
    images: [{ path: "/images/parfem2.jpg" }],
    rating: 5,
    reviewsNumber: 20,
    reviews: [],
    attrs: [
      { key: "Vrsta mirisa", value: "orijentalni" },
      { key: "Količina", value: "100 ml" },
    ],
  },
  {
    name: "Ruž za usne Mat Luxe",
    description:
      "Mat ruž za usne s dugotrajnom formulom koja pruža intenzivnu boju i postojanost tijekom cijelog dana.",
    count: 15,
    price: 80,
    category: "Make-up",
    images: [{ path: "/images/makeup2.jpg" }],
    rating: 4,
    reviewsNumber: 15,
    reviews: [],
    attrs: [
      { key: "Boja", value: "crvena" },
      { key: "Vrsta ruža", value: "mat" },
    ],
  },
  {
    name: "Regenerator za kosu",
    description:
      "Hranjivi regenerator koji omekšava i obnavlja kosu. Pruža zaštitu od oštećenja i olakšava raščešljavanje.",
    count: 20,
    price: 60,
    category: "Kosa",
    images: [{ path: "/images/kosa2.jpg" }],
    rating: 3,
    reviewsNumber: 10,
    reviews: [],
    attrs: [
      { key: "Tip kose", value: "sve vrste kose" },
      { key: "Volumen", value: "250 ml" },
    ],
  },
  {
    name: "Serum za lice Hidratantni",
    description:
      "Intenzivni hidratantni serum koji dubinski hidratizira kožu lica. Pruža svježinu i blistavost koži.",
    count: 18,
    price: 180,
    category: "Lice",
    images: [{ path: "/images/lice2.jpg" }],
    rating: 2,
    reviewsNumber: 12,
    reviews: [],
    attrs: [
      { key: "Tip kože", value: "sve tipove kože" },
      { key: "Količina", value: "30 ml" },
    ],
  },
  {
    name: "Losion za tijelo Miris lavande",
    description:
      "Relaksirajući losion za tijelo s mirisom lavande. Hidratizira kožu i pruža osjećaj ugode i opuštanja.",
    count: 25,
    price: 45,
    category: "Tijelo",
    images: [{ path: "/images/tijelo2.jpg" }],
    rating: 3,
    reviewsNumber: 8,
    reviews: [],
    attrs: [
      { key: "Mirisi", value: "lavanda" },
      { key: "Količina", value: "200 ml" },
    ],
  },
  {
    name: "Četkica za zube Električna Lux",
    description:
      "Premium električna četkica za zube s naprednim tehnologijama čišćenja. Osigurava vrhunsku oralnu higijenu.",
    count: 30,
    price: 120,
    category: "Zubi",
    images: [{ path: "/images/zubi2.jpg" }],
    rating: 4,
    reviewsNumber: 20,
    reviews: [],
    attrs: [
      { key: "Vrsta četkice", value: "električna" },
      { key: "Boja", value: "crna" },
    ],
  },
  {
    name: "Losion poslije brijanja",
    description:
      "Osnažujući losion poslije brijanja koji umiruje i hidratizira kožu nakon brijanja. Sprječava iritacije i crvenilo.",
    count: 40,
    price: 50,
    category: "Muškarci",
    images: [{ path: "/images/muskarci2.png" }],
    rating: 5,
    reviewsNumber: 12,
    reviews: [],
    attrs: [
      { key: "Vrsta proizvoda", value: "losion poslije brijanja" },
      { key: "Količina", value: "100 ml" },
    ],
  },
  {
    name: "Krema za osjetljivu kožu SPF 50+",
    description:
      "Zaštitna krema s visokim faktorom zaštite od sunca. Posebno formulirana za osjetljivu kožu s tendencijom crvenila.",
    count: 15,
    price: 200,
    category: "Dermo",
    images: [{ path: "/images/dermo2.jpg" }],
    rating: 3,
    reviewsNumber: 10,
    reviews: [],
    attrs: [
      { key: "Tip kože", value: "osjetljiva koža" },
      { key: "Količina", value: "50 ml" },
    ],
  },
  {
    name: "Ulje za njegu trbuha u trudnoći",
    description:
      "Posebno formulirano ulje za njegu trbuha tijekom trudnoće. Hidratizira i pomaže u održavanju elastičnosti kože.",
    count: 10,
    price: 120,
    category: "Majka i dijete",
    images: [{ path: "/images/majkaiDijete2.jpg" }],
    rating: 1,
    reviewsNumber: 6,
    reviews: [],
    attrs: [
      { key: "Namjena", value: "njega trbuha" },
      { key: "Količina", value: "150 ml" },
    ],
  },
];

module.exports = products;
