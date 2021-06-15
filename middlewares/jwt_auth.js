const { BAD_REQUEST } = require("http-status");
const jwt = require("jsonwebtoken");
const { LocalBrand } = require("../models/localbrand.model");
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
		res.status(BAD_REQUEST).json(
			restError.BAD_REQUEST.extra({
				error: "Wrong Authentication",
			})
		);
	}
};

const brand_auth =
	(skip = false) =>
	async (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const data = jwt.verify(token, JWT_SECRET_KEY);
			const brandId = data.brandId;
			const brand = await LocalBrand.findById(brandId);
			req.localBrand = brand;
			next();
		} catch (err) {
			if (skip) {
				return next();
			}
			res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					error: "Wrong Authentication",
				})
			);
		}
	};

module.exports = { customer_auth, brand_auth };
