const express = require("express");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status");
const { restError } = require("../errors/rest");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { PUSH_NOTIFICATIONS } = require("../models/enum");
const { hashPassword } = require("../utils");
const { mapErrorArrayExpressValidator } = require("../utils");
const { validationResult } = require("express-validator");
const { validateVNPhoneNumber } = require("../utils");
const { CUSTOMER_GENDER } = require("../models/enum");
const { CUSTOMER_STATUS } = require("../models/enum");
const { body } = require("express-validator");
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

router.post(
	"/setExpoPushToken",
	[body("token").notEmpty().withMessage("Token should not be empty!")],
	customer_auth,
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(BAD_REQUEST).json(
					restError.BAD_REQUEST.extra({
						errorParams: mapErrorArrayExpressValidator(errors.array()),
					})
				);
			}
			const { token } = req.body;
			let customer = req.customer;
			customer = await customerService.updateOne(customer.id, {
				expoPushToken: token,
			});
			await customerService.sendPushNotification(token, [
				{
					title: PUSH_NOTIFICATIONS.TITLE.TIPS,
					body: PUSH_NOTIFICATIONS.BODY.SETTING_BODY_INDICES,
				},
				{
					title: PUSH_NOTIFICATIONS.TITLE.EXPLORING,
					body: PUSH_NOTIFICATIONS.BODY.EXPLORING_FEED,
				},
			]);
			return res.json({
				customer: excludePassword(customer),
			});
		} catch (err) {
			return res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
		}
	}
);

router.put(
	"/resetPassword",
	customer_auth,
	[
		body("password").isLength({ min: 8 }),
		body("newPassword").isLength({ min: 8 }),
	],
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(BAD_REQUEST).json(
					restError.BAD_REQUEST.extra({
						errorParams: mapErrorArrayExpressValidator(errors.array()),
					})
				);
			}
			let customer = await customerService.getOne({
				_id: req.customer.id,
			});
			const { password, newPassword } = req.body;
			if (!comparePassword(password, customer.password)) throw new Error();
			customer = await customerService.updateOne(customer.id, {
				password: hashPassword(newPassword),
			});
			return res.json({
				customer: excludePassword(customer),
			});
		} catch (err) {
			return res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
		}
	}
);

router.put(
	"/me",
	customer_auth,
	[
		body("email")
			.optional()
			.normalizeEmail()
			.isEmail()
			.withMessage("Email wrong format"),
		body("profileUrl").optional(),
		body("hobby").optional(),
		body("job").optional(),
		body("name").notEmpty().withMessage("Name should not be empty"),
		body("address").optional(),
		body("gender")
			.optional()
			.isIn(Object.values(CUSTOMER_GENDER))
			.withMessage(`Gender must be within ${Object.values(CUSTOMER_GENDER)}`),
	],
	async (req, res, next) => {
		try {
			const customerId = req.customer.id;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(BAD_REQUEST).json(
					restError.BAD_REQUEST.extra({
						errorParams: mapErrorArrayExpressValidator(errors.array()),
					})
				);
			}
			const data = req.body;
			const customer = await customerService.updateOne(customerId, {
				...data,
			});
			return res.json({
				customer: excludePassword(customer),
			});
		} catch (err) {
			return res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
		}
	}
);

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

router.post("/fbLogin", async (req, res, next) => {
	const { access_token } = req.body;
	try {
		const fbRes = await axios.get(
			`https://graph.facebook.com/me?access_token=${access_token}`
		);
		const { id: fb_userId } = fbRes.data;
		const customer = await customerService.getOne({
			fb_userId,
		});
		if (customer === null || !customer.fb_userId) throw new Error();
		const token = jwt.sign(
			{
				customerId: customer.id,
			},
			JWT_SECRET_KEY
		);
		return res.json({
			token,
		});
	} catch (err) {
		return res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
	}
});
//
// router.post("/fbRegister", async (req, res, next) => {
// 	const { access_token } = req.body;
// 	try {
// 		const fbRes = await axios.get(
// 			`https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,`
// 		);
// 		const { id: fb_userId } = fbRes.data;
// 	} catch (err) {
// 		return res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
// 	}
// });

router.post(
	"/register",
	[
		body("phoneNumber")
			.notEmpty()
			.withMessage("Phone Number should not be empty")
			.bail()
			.custom(validateVNPhoneNumber)
			.bail()
			.custom(async (phoneNumber) => {
				if (
					(await customerService.getOne({
						phoneNumber,
					})) !== null
				) {
					return Promise.reject("Phone Number have already existed");
				}
				return Promise.resolve();
			}),
		body("email")
			.optional()
			.normalizeEmail()
			.isEmail()
			.withMessage("Email wrong format"),
		body("password")
			.isLength({
				min: 8,
			})
			.withMessage("Password should be at least 8 chars"),
		body("hobby").optional(),
		body("job").optional(),
		body("name").notEmpty().withMessage("Name should not be empty"),
		body("fb_userId").optional(),
		body("status")
			.optional()
			.isIn(Object.values(CUSTOMER_STATUS))
			.withMessage(`Status must be within ${Object.values(CUSTOMER_STATUS)}`),
		body("address").optional(),
		body("gender")
			.optional()
			.isIn(Object.values(CUSTOMER_GENDER))
			.withMessage(`Gender must be within ${Object.values(CUSTOMER_GENDER)}`),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const data = req.body;
			const customer = await customerService.createOne({
				...data,
				password: hashPassword(data.password),
			});
			if (customer === null) throw new Error();
			return res.json({
				customer,
			});
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

module.exports = { customerRouter: router };
