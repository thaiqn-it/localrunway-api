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
		default: "",
	},
	job: {
		type: String,
		default: "",
	},
	gender: {
		type: String,
		enum: Object.values(CUSTOMER_GENDER),
		default: CUSTOMER_GENDER.OTHER,
	},
	height: {
		type: Number,
		default: 0,
	},
	weight: {
		type: Number,
		default: 0,
	},
	waist: {
		type: Number,
		default: 0,
	},
	hip: {
		type: Number,
		default: 0,
	},
	bust: {
		type: Number,
		default: 0,
	},
	fb_userId: {
		type: String,
		default: "",
	},
	firstBoughtBrands: {
		type: String,
		default: "",
	},
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
