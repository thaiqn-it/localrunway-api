const { paymentService } = require("./payment.service");
const { localBrandService } = require("./localbrand.service");
const { orderDetailService } = require("./orderdetail.service");
const { Order } = require("../models/order.model");

const createOne = async ({ ...data }) => {
	const order = await new Order(data).save();
	return order;
};

const getById = async (id) => {
	const order = await Order.findById(id);
	const brand = await localBrandService.getById(order.brandId);
	const payment = await paymentService.getById(order.paymentId);
	return {
		...order._doc,
		localbrand: brand,
		payment,
		total: await getTotalMoney(id),
	};
};

const getAllByCustomerId = async (customerId) => {
	const orders = await Order.find({ customerId });
	for (let order of orders) {
		const brand = await localBrandService.getById(order.brandId);
		const payment = await paymentService.getById(order.paymentId);
		const details = await orderDetailService.getByOrderId(order.id);
		let totalDetail = 0;
		for (let detail of details) {
			totalDetail += detail.quantity;
		}
		order._doc.localbrand = brand;
		order._doc.payment = payment;
		order._doc.total = await getTotalMoney(order.id);
		order._doc.totalDetail = totalDetail;
	}
	return orders;
};

const getByIdAndCustomerId = async (id, customerId) => {
	const order = await Order.findOne({ _id: id, customerId });
	return await getById(order.id);
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
	getAllByCustomerId,
};
