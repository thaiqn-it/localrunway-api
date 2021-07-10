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
	fb_userId: {
		type: String,
		default: "",
	},
	expoPushToken: {
		type: String,
	},
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
