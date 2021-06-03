const { ProductHashtag } = require("../models/producthashtag.model");
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
	return {
		...product._doc,
		category: product.category,
		localbrand: product.localbrand,
	};
};

const search = async ({ ...params }) => {
	const { categoryId } = params;
	let q = {};
	if (categoryId) {
		q = {
			...q,
			categoryId,
		};
	}
	const products = await Product.find(q);
	return products;
};

exports.productService = {
	getById,
	search,
};
