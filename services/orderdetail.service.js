const { OrderDetail } = require("../models/orderdetail.model");

const createOne = async ({ ...data }) => {
	return await new OrderDetail(data).save();
};

const getByIdAndOrderId = async (id, orderId) => {
	const orderDetail = await OrderDetail.findOne({ _id: id, orderId })
		.populate("product")
		.exec();
	return {
		...orderDetail._doc,
		product: orderDetail.product,
	};
};

exports.orderDetailService = {
	createOne,
	getByIdAndOrderId,
};
