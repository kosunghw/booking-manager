const bcrypt = require('bcrypt');
const saltRounds = 10;

const validPassword = (password, hash, salt) => {
  return bcrypt.compareSync(password, hash);
};

const generatePassword = (password) => {
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  return passwordHash;
};

module.exports = {
  validPassword,
  generatePassword,
};
