const { BAD_REQUEST } = require("http-status");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");
const { Customer } = require("../models/customer.model");
const { restError } = require("../errors/rest");

const customer_auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const data = jwt.verify(token, JWT_SECRET_KEY);
		const customerId = data.customerId;
		const customer = await Customer.findById(customerId);
		req.customer = customer;
		next();
	} catch (err) {
		res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
	}
};

module.exports = { customer_auth };
