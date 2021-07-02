const { orderDetailService } = require("./orderdetail.service");
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
	return order._doc;
};

const updateOne = async (id, data) => {
	return await Order.findByIdAndUpdate(id, data, { new: true });
};

const getTotalMoney = async (orderId) => {
	const details = await orderDetailService.getByOrderId(orderId);
	let total = 0;
	for (let detail of details) {
		total += detail.unitTotal;
	}
	return total;
};

exports.orderService = {
	createOne,
	getById,
	getByIdAndCustomerId,
	updateOne,
	getTotalMoney,
};
