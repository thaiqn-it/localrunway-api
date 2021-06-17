const { Customer } = require("../models/customer.model");

const getOneByPhoneNumber = async (phoneNumber) => {
	return await Customer.findOne({ phoneNumber });
};

const getOne = async ({ ...data }) => {
	return await Customer.findOne(data);
};

const createOne = async ({ ...data }) => {
	return await new Customer(data).save();
};

exports.customerService = {
	getOneByPhoneNumber,
	getOne,
	createOne,
};
