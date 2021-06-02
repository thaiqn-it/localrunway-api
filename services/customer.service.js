const { Customer } = require("../models/customer.model");

const getOneByPhoneNumber = async (phoneNumber) => {
  return await Customer.findOne({ phoneNumber });
};

exports.customerService = {
  getOneByPhoneNumber,
};
