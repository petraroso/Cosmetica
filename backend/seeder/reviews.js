const ObjectId = require("mongodb").ObjectId;

const reviews = [
  {
    comment:
      "Ovaj proizvod je fantastičan! Stvarno mi je pomogao u poboljšanju izgleda kože. Preporučujem ga svima!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Jessa Rodmell" },
  },
  {
    comment:
      "Nisam bio impresioniran ovim proizvodom. Mislio sam da će dati bolje rezultate, ali nisam primijetio nikakvu razliku.",
    rating: 3,
    user: { _id: new ObjectId(), name: "Nye Kinnock" },
  },
  {
    comment:
      "Savršen proizvod za njegu kose! Moja kosa je postala mekana i sjajna nakon korištenja ovog proizvoda. Definitivno ću ga ponovno kupiti!",
    rating: 4,
    user: { _id: new ObjectId(), name: "Lara Babić" },
  },
  {
    comment:
      "Ovaj proizvod za njegu lica je transformirao moju kožu! Smanjio je vidljivost pora i učinio ju glatkom i blistavom. Oduševljena sam rezultatima!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Mateo Novak" },
  },
  {
    comment:
      "Proizvod za njegu tijela koji mi je postao omiljeni. Miris je predivan, a tekstura je vrlo hidratantna. Koža je meka i svilenkasta nakon upotrebe.",
    rating: 5,
    user: { _id: new ObjectId(), name: "Elena Horvat" },
  },
  {
    comment:
      "Nisam primijetila neku veliku razliku nakon korištenja ovog proizvoda za zube. Možda nije za mene, ali možda će drugima odgovarati.",
    rating: 3,
    user: { _id: new ObjectId(), name: "Filip Matić" },
  },
  {
    comment:
      "Ovaj parfem ima predivan miris koji traje cijeli dan. Dobila sam mnogo komplimenata otkako ga koristim. Preporučujem ga svima!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Mia Horvat" },
  },
  {
    comment:
      "Proizvod za njegu kože koji je učinio čuda za moju suhu kožu. Sada je hidratizirana i meka, bez osjećaja zatezanja. Jako sam zadovoljna!",
    rating: 4,
    user: { _id: new ObjectId(), name: "Ivan Jurić" },
  },
  {
    comment:
      "Ovaj make-up proizvod je odličan! Sjajno se blenda i daje prirodan izgled. Dugotrajan je i ne izaziva iritaciju kože. Preporučujem ga svima!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Ema Kovač" },
  },
  {
    comment:
      "Nisam vidjela neki veliki učinak nakon korištenja ovog dermo proizvoda. Možda treba više vremena za vidljive rezultate.",
    rating: 3,
    user: { _id: new ObjectId(), name: "Marko Tadić" },
  },
  {
    comment:
      "Proizvod za majke i djecu koji je postao neizostavan dio naše svakodnevne rutine. Siguran je za bebe i nježan prema njihovoj koži. Toplo preporučujem!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Ana Vuković" },
  },
  {
    comment:
      "Ovaj proizvod za njegu kose je razočaravajući. Nisam primijetila nikakav učinak na moju kosu, a očekivala sam poboljšanje.",
    rating: 2,
    user: { _id: new ObjectId(), name: "Luka Novosel" },
  },
  {
    comment:
      "Proizvod za njegu lica koji je učinio čuda za moje akne. Smanjio je upale i poboljšao izgled moje kože. Oduševljena sam!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Nina Kralj" },
  },
  {
    comment:
      "Ovaj proizvod za njegu tijela ima predivan miris koji traje dugo. Koža je hidratizirana i glatka nakon korištenja. Preporučujem ga svima!",
    rating: 4,
    user: { _id: new ObjectId(), name: "Petar Horvat" },
  },
  {
    comment:
      "Proizvod za zube koji mi je donio vidljive rezultate. Bijeli su i sjajni, a osjećaj svježine traje cijeli dan. Jako sam zadovoljan!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Lea Babić" },
  },
  {
    comment:
      "Ovaj parfem ima jedinstven miris koji me osvaja svaki put kad ga nosim. Ljudi me često pitaju koji parfem koristim. Definitivno ga preporučujem!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Igor Novak" },
  },
  {
    comment:
      "Proizvod za njegu kože koji je transformirao moju suhu kožu. Sada je meka, hidratizirana i bez perutanja. Oduševljena sam!",
    rating: 4,
    user: { _id: new ObjectId(), name: "Lara Jurić" },
  },
  {
    comment:
      "Ovaj make-up proizvod je vrhunski! Lagane teksture, a ipak pruža odličnu pokrivenost. Savršen za svakodnevno korištenje.",
    rating: 5,
    user: { _id: new ObjectId(), name: "Ivan Kovač" },
  },
  {
    comment:
      "Nisam primijetila nikakav učinak na moju kožu nakon korištenja ovog dermo proizvoda. Možda nije odgovarajući za moj tip kože.",
    rating: 2,
    user: { _id: new ObjectId(), name: "Ema Tadić" },
  },
  {
    comment:
      "Proizvod za majke i djecu koji mi je olakšao njegu moje bebe. Nježan je prema koži i vrlo učinkovit. Sve pohvale!",
    rating: 5,
    user: { _id: new ObjectId(), name: "Marko Vuković" },
  },
];

module.exports = reviews;
