const mongoose = require("mongoose");
const { ORDER_STATUS } = require("./enum");

const orderDetailSchema = new mongoose.Schema(
	{
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Order",
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Product",
		},
		quantity: {
			type: Number,
			required: true,
		},
		unitPrice: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = { OrderDetail };
