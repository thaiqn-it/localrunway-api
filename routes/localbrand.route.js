const express = require("express");
const { excludePassword } = require("../utils");
const { hashPassword } = require("../utils");
const { isMobilePhone } = require("validator");
const { mapErrorArrayExpressValidator } = require("../utils");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const { restError } = require("../errors/rest");
const { localBrandService } = require("../services/localbrand.service");
const {
	NOT_FOUND,
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
} = require("http-status");
const router = express.Router();

const validateVNPhoneNumber = (value) => {
	if (!isMobilePhone(value, "vi-VN")) {
		return Promise.reject(
			"Phone Number should be from VN. Prefix +84, 84, 0 is OK"
		);
	}
	return Promise.resolve();
};

router.get("/", async (req, res, next) => {
	const localBrands = await localBrandService.getAll();
	return res.json({
		localBrands: localBrands.map((x) => excludePassword(x)),
	});
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const localBrand = await localBrandService.getById(id);
		if (localBrand === null) throw new Error();
		return res.json({
			localBrand: excludePassword(localBrand),
		});
	} catch (err) {
		return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
	}
});

router.post(
	"/",
	[
		body("name").notEmpty().withMessage("Name should not be empty"),
		body("address").notEmpty().withMessage("Address should not be empty"),
		body("description")
			.notEmpty()
			.withMessage("Description should not be empty"),
		body("phoneNumber")
			.notEmpty()
			.withMessage("Phone Number should not be empty")
			.bail()
			.custom(validateVNPhoneNumber),
		body("username")
			.notEmpty()
			.withMessage("Username should not be empty")
			.bail()
			.isLength({ min: 8 })
			.withMessage("Username must be at least 8 chars"),
		body("password")
			.notEmpty()
			.withMessage("Password must be at least 8 chars")
			.bail()
			.isLength({ min: 8 }),
		body("logoUrl").notEmpty().withMessage("Logo URL should not be empty"),
	],
	async (req, res, next) => {
		const {
			name,
			address,
			phoneNumber,
			description,
			username,
			password,
			logoUrl,
		} = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const localBrand = await localBrandService.createOne({
				name,
				address,
				phoneNumber,
				username,
				password: hashPassword(password),
				description,
				logoUrl,
			});
			return res.json({
				localBrand: excludePassword(localBrand),
			});
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

router.put(
	"/:id",
	[
		body("name").notEmpty().withMessage("Name should not be empty"),
		body("address").notEmpty().withMessage("Address should not be empty"),
		body("description")
			.notEmpty()
			.withMessage("Description should not be empty"),
		body("phoneNumber")
			.notEmpty()
			.withMessage("Phone Number should not be empty")
			.bail()
			.custom(validateVNPhoneNumber),
		body("username")
			.notEmpty()
			.withMessage("Username should not be empty")
			.bail()
			.isLength({ min: 8 })
			.withMessage("Username must be at least 8 chars"),
		body("password")
			.notEmpty()
			.withMessage("Password must not be empty")
			.bail()
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 chars"),
		body("logoUrl").notEmpty().withMessage("Logo URL should not be empty"),
	],
	async (req, res, next) => {
		const {
			name,
			address,
			phoneNumber,
			description,
			username,
			password,
			logoUrl,
		} = req.body;
		const { id } = req.params;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const localBrand = await localBrandService.updateOne(id, {
				name,
				address,
				phoneNumber,
				username,
				password: hashPassword(password),
				description,
				logoUrl,
			});
			return res.json({
				localBrand: excludePassword(localBrand),
			});
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const localBrand = await localBrandService.deleteById(id);
		if (localBrand === null) throw new Error();
		return res.json({
			localBrand: excludePassword(localBrand),
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

exports.localBrandRouter = router;
