const mongoose = require("mongoose");
const { CUSTOMER_GENDER } = require("./enum");
const { CUSTOMER_STATUS } = require("./enum");

const customerSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: Object.values(CUSTOMER_STATUS),
		default: CUSTOMER_STATUS.ACTIVE,
	},
	hobby: {
		type: String,
	},
	job: {
		type: String,
	},
	gender: {
		type: String,
		enum: Object.values(CUSTOMER_GENDER),
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	waist: {
		type: Number,
	},
	hip: {
		type: Number,
	},
	bust: {
		type: Number,
	},
	fb_userId: {
		type: String,
	},
	firstBoughtBrands: {
		type: String,
		default: "",
	},
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
