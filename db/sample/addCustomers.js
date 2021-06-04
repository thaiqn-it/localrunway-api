const { mongooseConnection } = require("../index");
const { Customer } = require("../../models/customer.model");
const { customers } = require("./constants");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../../utils");
const { BCRYPT_SALT_ROUND } = require("../../constants");

const { NGUYEN } = customers;

(async () => {
	await mongooseConnection;
	const customers = await Customer.find({});
	for (let customer of customers) {
		await Customer.findByIdAndUpdate(customer.id, {
			password: hashPassword(customer.password),
		});
	}
	process.exit();
})();
