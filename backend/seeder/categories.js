const categories = [
  {
    name: "Parfemi",
    description: "Širok izbor mirisnih parfema za svaku prigodu.",
    image: "/images/parfemi-category.jpg",
    attrs: [
      {
        key: "Vrsta mirisa",
        value: ["cvjetni", "voćni", "drveni", "orijentalni"],
      },
      { key: "Količina", value: ["30ml", "50ml", "100ml"] },
    ],
  },
  {
    name: "Make-up",
    description: "Kozmetika za šminkanje koja naglašava vašu prirodnu ljepotu.",
    image: "/images/makeup-category.jpg",
    attrs: [
      {
        key: "Vrsta proizvoda",
        value: ["ruž za usne", "maskara", "rumenilo", "puder"],
      },
      { key: "Boja", value: ["crvena", "crna", "roza", "nude"] },
    ],
  },
  {
    name: "Kosa",
    description: "Proizvodi za njegu kose koji pružaju sjaj i vitalnost.",
    image: "/images/kosa-category.jpg",
    attrs: [
      { key: "Tip kose", value: ["suha", "masna", "normalna", "oštećena"] },
      { key: "Proizvod", value: ["šampon", "regenerator", "ulje", "maska"] },
    ],
  },
  {
    name: "Lice",
    description:
      "Kozmetika za njegu lica koja održava kožu zdravom i blistavom.",
    image: "/images/lice-category.jpg",
    attrs: [
      { key: "Tip kože", value: ["masna", "suh", "normalna", "osjetljiva"] },
      { key: "Proizvod", value: ["krema", "losion", "maska", "serum"] },
      { key: "SPF", value: ["15", "30", "50"] },
    ],
  },
  {
    name: "Tijelo",
    description:
      "Proizvodi za njegu tijela koji hidratiziraju i omekšavaju kožu.",
    image: "/images/tijelo-category.jpg",
    attrs: [
      {
        key: "Tip kože",
        value: ["osjetljiva", "normalna", "suha", "problematična"],
      },
      { key: "Proizvod", value: ["losion", "ulje", "gel", "krema"] },
      { key: "Miris", value: ["cvjetni", "voćni", "svježi"] },
    ],
  },
  {
    name: "Zubi",
    description:
      "Proizvodi za oralnu higijenu koji pružaju svjež dah i bijele zube.",
    image: "/images/zubi-category.jpg",
    attrs: [
      {
        key: "Vrsta proizvoda",
        value: [
          "četkica za zube",
          "zubna pasta",
          "tekućina za ispiranje",
          "niti za čišćenje",
        ],
      },
      { key: "Boja", value: ["bijela", "plava", "zelena", "crvena"] },
    ],
  },
  {
    name: "Muškarci",
    description:
      "Kozmetika i proizvodi za njegu posebno dizajnirani za muškarce.",
    image: "/images/muska-kozmetika-category.jpg",
    attrs: [
      {
        key: "Vrsta proizvoda",
        value: [
          "losion za brijanje",
          "dezodorans",
          "krema za lice",
          "gel za tuširanje",
        ],
      },
      { key: "Namjena", value: ["hidratacija", "osvježenje", "nega brade"] },
    ],
  },
  {
    name: "Dermo",
    description:
      "Dermokozmetički proizvodi za njegu osjetljive i problematične kože.",
    image: "/images/dermo-category.png",
    attrs: [
      {
        key: "Proizvod",
        value: ["krema za lice", "serum", "krema za tijelo", "losion"],
      },
      {
        key: "Tip kože",
        value: ["suha", "osjetljiva", "problematična", "atopijska"],
      },
    ],
  },
  {
    name: "Majka i dijete",
    description:
      "Njega za trudnice, bebe i djecu kako bi njihova koža bila meka i zaštićena.",
    image: "/images/majka-dijete-category.jpg",
    attrs: [
      {
        key: "Proizvod",
        value: [
          "kreme za trudnice",
          "ulja za masažu",
          "puder za bebe",
          "šampon za djecu",
        ],
      },
      { key: "Tip kože", value: ["osjetljiva", "suha", "normalna"] },
      { key: "Hipoalergeno", value: ["da", "ne"] },
    ],
  },
];

module.exports = categories;
