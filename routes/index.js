const express = require("express");
const { mediaRouter } = require("./media.route");
const { orderRouter } = require("./order.route");
const { productRouter } = require("./product.route");
const { localBrandRouter } = require("./localbrand.route");
const { hashtagRouter } = require("./hashtag.route");
const { customerRouter } = require("./customer.route");
const { categoryRouter } = require("./category.route");
const { paymentRouter } = require("./payment.route");

const router = express.Router();

router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/payments", paymentRouter);
router.use("/hashtags", hashtagRouter);
router.use("/localbrands", localBrandRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/media", mediaRouter);

router.get("/", async (req, res) => {
	res.json({
		msg: "LocalRunway's Express Server",
	});
});

module.exports = { apiRouter: router };
