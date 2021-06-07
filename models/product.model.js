const mongoose = require("mongoose");
const { PRODUCT_TYPE } = require("./enum");
const { PRODUCT_STATUS } = require("./enum");
const { Category } = require("./category.model");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
	{
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "LocalBrand",
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(PRODUCT_STATUS),
			default: PRODUCT_STATUS.ACTIVE,
		},
		price: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
		size: {
			type: String,
		},
		type: {
			type: String,
			required: true,
			enum: Object.values(PRODUCT_TYPE),
		},
	},
	{
		timestamps: true,
		collation: {
			locale: "vi",
			strength: 1,
		},
	}
);

productSchema.virtual("category", {
	ref: "Category",
	localField: "categoryId",
	foreignField: "_id",
	justOne: true,
});

productSchema.virtual("localbrand", {
	ref: "LocalBrand",
	localField: "brandId",
	foreignField: "_id",
	justOne: true,
});

productSchema.virtual("producthashtags", {
	ref: "ProductHashtag",
	localField: "_id",
	foreignField: "productId",
});

productSchema.index({ name: "text", color: "text" });

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
