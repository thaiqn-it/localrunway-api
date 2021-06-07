const mongoose = require("mongoose");
const { LOCALBRAND_STATUS } = require("./enum");

const localBrandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(LOCALBRAND_STATUS),
			default: LOCALBRAND_STATUS.ACTIVE,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		logoUrl: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const LocalBrand = mongoose.model("LocalBrand", localBrandSchema);

module.exports = { LocalBrand };
