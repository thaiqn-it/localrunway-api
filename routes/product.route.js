const express = require("express");
const { ProductHashtag } = require("../models/producthashtag.model");
const { mapErrorArrayExpressValidator } = require("../utils");
const { validationResult } = require("express-validator");
const { categoryService } = require("../services/category.service");
const { localBrandService } = require("../services/localbrand.service");
const { PRODUCT_TYPE } = require("../models/enum");
const { PRODUCT_STATUS } = require("../models/enum");
const { body } = require("express-validator");
const { hashtagService } = require("../services/hashtag.service");
const { restError } = require("../errors/rest");
const { productService } = require("../services/product.service");
const {
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
} = require("http-status");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { populates } = req.query;
	try {
		const product = await productService.getById(id, {
			populates: populates ?? [],
		});
		return res.json({
			product,
		});
	} catch (err) {
		return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
	}
});

router.get("/:id/hashtags", async (req, res, next) => {
	const { id } = req.params;
	try {
		const hashtags = await hashtagService.getAllByProductId(id);
		return res.json({
			hashtags,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.post("/:id/hashtags", async (req, res, next) => {
	const { id: productId } = req.params;
	const { hashtagId } = req.body;
	try {
		let productHashtag = await hashtagService.getProductHashtag({
			productId,
			hashtagId,
		});
		if (productHashtag === null) {
			productHashtag = await productService.addProductHashtag({
				productId,
				hashtagId,
			});
		}
		return res.json({
			productHashtag,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.delete("/:id/hashtags/:hashtagId", async (req, res, next) => {
	const { id: productId, hashtagId } = req.params;
	try {
		const productHashtag = await productService.deleteProductHashtag({
			productId,
			hashtagId,
		});
		if (productHashtag === null) throw new Error();
		return res.json({
			productHashtag,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.get("/", async (req, res, next) => {
	const { categoryId, sort, queryValue, sizes, page, brandIds, prices } =
		req.query;
	try {
		let data = await productService.search({
			categoryId,
			sort,
			queryValue,
			sizes,
			page,
			brandIds,
			prices,
		});
		return res.json(data);
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.send(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const product = await productService.deleteById(id);
		return res.json({ product });
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});

router.post(
	"/",
	[
		body("name").notEmpty(),
		body("color").notEmpty(),
		body("size").notEmpty(),
		body("price").notEmpty().isInt(),
		body("quantity").notEmpty().isInt(),
		body("status").notEmpty().isIn(Object.values(PRODUCT_STATUS)),
		body("type").notEmpty().isIn(Object.values(PRODUCT_TYPE)),
		body("description").notEmpty(),
		body("thumbnailUrl").notEmpty().isURL(),
		body("media").notEmpty().isArray({ min: 1 }),
		body("brandId").custom(async (brandId) => {
			return (await localBrandService.getById(brandId)) !== null;
		}),
		body("categoryId").custom(async (categoryId) => {
			return (await categoryService.getById(categoryId)) !== null;
		}),
	],
	async (req, res, next) => {
		const data = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const product = await productService.createOne(data);
			return res.json({ product });
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
		body("name").notEmpty(),
		body("color").notEmpty(),
		body("size").notEmpty(),
		body("price").notEmpty().isInt(),
		body("quantity").notEmpty().isInt(),
		body("status").notEmpty().isIn(Object.values(PRODUCT_STATUS)),
		body("type").notEmpty().isIn(Object.values(PRODUCT_TYPE)),
		body("thumbnailUrl").notEmpty().isURL(),
		body("media").notEmpty().isArray({ min: 1 }),
		body("description").notEmpty(),
		body("brandId").custom(async (brandId) => {
			return (await localBrandService.getById(brandId)) !== null;
		}),
		body("categoryId").custom(async (categoryId) => {
			return (await categoryService.getById(categoryId)) !== null;
		}),
	],
	async (req, res, next) => {
		const data = req.body;
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
			const product = await productService.updateById(id, data);
			return res.json({ product });
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

exports.productRouter = router;
