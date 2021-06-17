const express = require("express");
const { BAD_REQUEST } = require("http-status");
const { restError } = require("../errors/rest");
const jwt = require("jsonwebtoken");
const { excludePassword } = require("../utils");
const { comparePassword } = require("../utils");
const { JWT_SECRET_KEY } = require("../constants");
const { customerService } = require("../services/customer.service");
const { customer_auth } = require("../middlewares/jwt_auth");

const router = express.Router();

router.get("/me", customer_auth, async (req, res) => {
	const customer = req.customer;
	return res.json({
		...excludePassword(customer._doc),
	});
});

router.post("/login", async (req, res) => {
	const { password, phoneNumber } = req.body;
	try {
		const customer = await customerService.getOneByPhoneNumber(phoneNumber);
		if (comparePassword(password, customer.password)) {
			const token = jwt.sign(
				{
					customerId: customer.id,
				},
				JWT_SECRET_KEY
			);
			return res.json({
				token,
			});
		}
		throw new Error();
	} catch (err) {
		res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
	}
});

module.exports = { customerRouter: router };
