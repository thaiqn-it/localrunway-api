const { mongooseConnection } = require("../index");
const { Customer } = require("../../models/customer.model");
const { customers } = require("./constants");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUND } = require("../../constants");

const { NGUYEN } = customers;

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, BCRYPT_SALT_ROUND);
};

(async () => {
  await mongooseConnection;
  NGUYEN.password = encryptPassword(NGUYEN.password);
  const { phoneNumber, password } = NGUYEN;
  await new Customer({
    phoneNumber,
    password,
  }).save();
  process.exit();
})();
