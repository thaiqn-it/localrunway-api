const express = require("express");
const { customerRouter } = require("./customer.route");
const { categoryRouter } = require("./category.route");
const { paymentRouter } = require("./payment.route");

const router = express.Router();

router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/payments", paymentRouter);

router.get("/", async (req, res) => {
  res.json({
    msg: "LocalRunway's Express Server",
  });
});

module.exports = { apiRouter: router };
