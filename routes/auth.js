const express = require("express");
const { Customer } = require("../models/customer.model");
const bcrypt = require("bcrypt");
const { BAD_REQUEST } = require("http-status");
const { restError } = require("../errors/rest");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { password, phoneNumber } = req.body;
  try {
    const customer = await Customer.findOne({ phoneNumber });
    if (bcrypt.compareSync(password, customer.password)) {
      const token = jwt.sign(
        {
          userId: customer.id,
        },
        JWT_SECRET_KEY
      );
      res.json({
        token,
      });
    }
  } catch (err) {
    res.status(BAD_REQUEST).json(
      restError.BAD_REQUEST.extra({
        error: "Wrong Authentication!",
      })
    );
  }
});

module.exports = { authRouter: router };
