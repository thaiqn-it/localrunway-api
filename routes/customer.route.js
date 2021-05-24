const express = require("express");
const { jwt_auth } = require("../middlewares/jwt_auth");
const router = express.Router();

// jwt_middleware, api/customers/me
router.get("/me", async (req, res, next) => {
  const customer = req.customer;
  return res.json({
    ...customer,
  });
});

module.exports = { customerRouter: router };
