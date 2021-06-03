const { excludeFields } = require("../utils");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

const getById = async (id, populateDetail = false) => {
	if (populateDetail === false) {
		return await Product.findById(id);
	}
	let product = await Product.findOne({ _id: id })
		.populate("category")
		.populate("localbrand");
	if (product === null) {
		return Promise.reject();
	}
	return {
		...product._doc,
		category: product.category,
		localbrand: product.localbrand,
	};
};

exports.productService = {
	getById,
};
