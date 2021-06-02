const { Payment } = require("../models/payment.model");

const getAll = async () => {
  return await Payment.find({});
};

exports.paymentService = {
  getAll,
};
