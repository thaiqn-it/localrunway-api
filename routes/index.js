const express = require("express");
const { authRouter } = require("./auth");
const { customerRouter } = require("./customer.route");
const { customer_auth } = require("../middlewares/jwt_auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/customers", customer_auth, customerRouter);

router.get("/", (req, res, next) => {
  res.json({
    msg: "LocalRunway's Express Server",
  });
});

module.exports = { apiRouter: router };
