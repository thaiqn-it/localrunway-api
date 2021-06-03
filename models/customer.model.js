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
	token: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: [CUSTOMER_STATUS.ACTIVE, CUSTOMER_STATUS.INACTIVE],
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
		enum: [CUSTOMER_GENDER.MALE, CUSTOMER_GENDER.FEMALE, CUSTOMER_GENDER.OTHER],
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
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
