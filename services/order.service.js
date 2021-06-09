const { Order } = require("../models/order.model");

const createOne = async ({ ...data }) => {
	const order = await new Order(data).save();
	return order;
};

const getById = async (id) => {
	const order = await Order.findById(id);
	return order._doc;
};

const getByIdAndCustomerId = async (id, customerId) => {
	const order = await Order.findOne({ _id: id, customerId });
	console.log({ id, customerId });
	console.log(order);
	return order._doc;
};

exports.orderService = {
	createOne,
	getById,
	getByIdAndCustomerId,
};
