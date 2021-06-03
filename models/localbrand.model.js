const mongoose = require("mongoose");

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
			enum: ["ACTIVE", "INACTIVE", "REQUEST"],
			default: "ACTIVE",
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
