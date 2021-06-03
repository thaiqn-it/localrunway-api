const express = require("express");
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

router.get("/", async (req, res) => {
	res.json({
		msg: "LocalRunway's Express Server",
	});
});

module.exports = { apiRouter: router };
