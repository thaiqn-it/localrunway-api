const express = require("express");
const { isContainSpace } = require("../utils");
const { mapErrorArrayExpressValidator } = require("../utils");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const { restError } = require("../errors/rest");
const { hashtagService } = require("../services/hashtag.service");
const {
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
} = require("http-status");

const router = express.Router();

const validateHashtagNameContainSpaces = (value) => {
	if (isContainSpace(value)) {
		return Promise.reject("Hashtag name must not contain spaces");
	}
	return Promise.resolve();
};

router.get("/", async (req, res, next) => {
	const hashtags = await hashtagService.getAll();
	return res.json({
		hashtags,
	});
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const hashtag = await hashtagService.getById(id);
		if (!hashtag) throw new Error();
		return res.json({
			hashtag,
		});
	} catch (err) {
		return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
	}
});

router.post(
	"/",
	[
		body("name")
			.notEmpty()
			.withMessage("Hashtag name should not be empty")
			.bail()
			.custom(validateHashtagNameContainSpaces),
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
		const { name } = req.body;
		try {
			const hashtag = await hashtagService.createOne({ name });
			return res.json({
				hashtag,
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
		const hashtag = await hashtagService.deleteById(id);
		if (hashtag === null) throw new Error();
		return res.json({
			hashtag,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.put(
	"/:id",
	[
		body("name")
			.notEmpty()
			.withMessage("Hashtag name should not be empty")
			.bail()
			.custom(validateHashtagNameContainSpaces),
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
		const { id } = req.params;
		const { name } = req.body;
		try {
			const hashtag = await hashtagService.updateById(id, { name });
			if (hashtag === null) throw new Error();
			return res.json({
				hashtag,
			});
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

exports.hashtagRouter = router;
