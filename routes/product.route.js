const express = require("express");
const { restError } = require("../errors/rest");
const { productService } = require("../services/product.service");
const { NOT_FOUND } = require("http-status");
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

exports.productRouter = router;
