const express = require("express");
const { BAD_REQUEST } = require("http-status");
const { restError } = require("../errors/rest");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");
const { customerService } = require("../services/customer.service");
const router = express.Router();

// jwt_middleware, api/customers/me
router.get("/me", async (req, res) => {
  const customer = req.customer;
  return res.json({
    ...customer,
  });
});

router.post("/login", async (req, res) => {
  const { password, phoneNumber } = req.body;
  try {
    const customer = await customerService.getOneByPhoneNumber(phoneNumber);
    if (password === customer.password) {
      const token = jwt.sign(
        {
          customerId: customer.id,
        },
        JWT_SECRET_KEY
      );
      return res.json({
        token,
      });
    }
  } catch (err) {
    res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
  }
});

module.exports = { customerRouter: router };
