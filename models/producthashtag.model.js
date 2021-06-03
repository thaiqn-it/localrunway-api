const mongoose = require("mongoose");

const productHashtagSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Product",
	},
	hashtagId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Hashtag",
	},
});

productHashtagSchema.virtual("hashtag", {
	ref: "Hashtag",
	localField: "hashtagId",
	foreignField: "_id",
	justOne: true,
});

const ProductHashtag = mongoose.model("ProductHashtag", productHashtagSchema);

module.exports = { ProductHashtag };
