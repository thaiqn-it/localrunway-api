const { styleRouter } = require("./style.route");
const express = require("express");
const { authRouter } = require("./auth");
const { customerRouter } = require("./customer.route");
const { customer_auth } = require("../middlewares/jwt_auth");
const { categoryRouter } = require("./category.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/customers", customer_auth, customerRouter);
router.use("/categories", categoryRouter);
router.use("/categories/:categoryId/styles", styleRouter);

router.get("/", async (req, res) => {
  res.json({
    msg: "LocalRunway's Express Server",
  });
});

module.exports = { apiRouter: router };
