const { Payment } = require("../models/payment.model");
const express = require("express");
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("http-status");
const { restError } = require("../errors/rest");
const { body, validationResult } = require("express-validator");
const { categoryService } = require("../services/category.service");
const { mapErrorArrayExpressValidator } = require("../utils");
const { paymentService } = require("../services/payment.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const payments = await paymentService.getAll();
  return res.json({
    payments,
  });
});

exports.paymentRouter = router;
