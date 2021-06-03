const express = require("express");
const { restError } = require("../errors/rest");
const { productService } = require("../services/product.service");
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require("http-status");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const product = await productService.getById(id, true);
		return res.json({
			product,
		});
	} catch (err) {
		return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
	}
});

router.get("/", async (req, res, next) => {
	const { categoryId } = req.query;
	try {
		let products = await productService.search({ categoryId });
		return res.json({
			products,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.send(restError.INTERNAL_SERVER_ERROR.default());
	}
});

exports.productRouter = router;
