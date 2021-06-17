const { Customer } = require("../models/customer.model");

const getOneByPhoneNumber = async (phoneNumber) => {
	return await Customer.findOne({ phoneNumber });
};

const getOne = async ({ ...data }) => {
	return await Customer.findOne(data);
};

exports.customerService = {
	getOneByPhoneNumber,
	getOne,
};
