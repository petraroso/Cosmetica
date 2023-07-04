//function for hashing user passwords
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10); //Synchronously generates a salt.

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePasswords = (inputPassword, hashPassword) =>
  bcrypt.compareSync(inputPassword, hashPassword);

module.exports = { hashPassword, comparePasswords };
