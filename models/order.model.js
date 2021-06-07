const mongoose = require("mongoose");
const { ORDER_STATUS } = require("./enum");

const orderSchema = new mongoose.Schema(
	{
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "LocalBrand",
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(ORDER_STATUS),
		},
		paymentId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Payment",
		},
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Customer",
		},
		address: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		recipientName: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
