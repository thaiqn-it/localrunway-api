const mongoose = require("mongoose");
const { ORDERDETAIL_STATUS } = require("./enum");
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
		status: {
			type: String,
			enum: Object.values(ORDERDETAIL_STATUS),
			required: true,
			default: ORDERDETAIL_STATUS.ACTIVE,
		},
	},
	{
		timestamps: true,
	}
);

orderDetailSchema.virtual("product", {
	ref: "Product",
	localField: "productId",
	foreignField: "_id",
	justOne: true,
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = { OrderDetail };
