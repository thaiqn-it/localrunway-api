const { Payment } = require("../models/payment.model");

const getAll = async () => {
	return await Payment.find({});
};

const getById = async (id) => {
	const payment = await Payment.findById(id);
	return payment._doc;
};

exports.paymentService = {
	getAll,
	getById,
};
