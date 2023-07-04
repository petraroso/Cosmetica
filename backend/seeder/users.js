const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    name: "Ivana",
    lastName: "Ivanić",
    email: "ivanaaa@gmail.com",
    password: bcrypt.hashSync("ivanaaa@gmail.com", 10),
  },
  {
    _id: new ObjectId("625add3d78fb449f9d9fe2ee"),
    name: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("john@doe.com", 10),
  },
  {
    name: "Ana",
    lastName: "Anić",
    email: "anaanic@gmail.com",
    password: bcrypt.hashSync("anaanic@gmail.com", 10),
  },
  {
    name: "Marko",
    lastName: "Marković",
    email: "marko.markovic@yahoo.com",
    password: bcrypt.hashSync("marko.markovic@yahoo.com", 10),
  },
  {
    name: "Elena",
    lastName: "Elezi",
    email: "elena.elezi@gmail.com",
    password: bcrypt.hashSync("elena.elezi@gmail.com", 10),
  },
  {
    name: "Ivan",
    lastName: "Ivanović",
    email: "ivan1234@gmail.com",
    password: bcrypt.hashSync("ivan1234@gmail.com", 10),
  },
  {
    name: "Lara",
    lastName: "Lukić",
    email: "lara.lukic@hotmail.com",
    password: bcrypt.hashSync("lara.lukic@hotmail.com", 10),
  },
  {
    name: "Petar",
    lastName: "Perić",
    email: "pera123@yahoo.com",
    password: bcrypt.hashSync("pera123@yahoo.com", 10),
  },
  {
    name: "Maja",
    lastName: "Majić",
    email: "maja.majic@gmail.com",
    password: bcrypt.hashSync("maja.majic@gmail.com", 10),
  },
];
module.exports = users;
