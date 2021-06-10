const mongoose = require("mongoose");

const productMediaSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	mediaUrl: {
		type: String,
		required: true,
	},
	rank: {
		type: Number,
		required: true,
	},
});

const ProductMedia = mongoose.model("ProductMedia", productMediaSchema);

module.exports = { ProductMedia };
