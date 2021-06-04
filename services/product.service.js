const { hashtagService } = require("./hashtag.service");
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
	if (product === null) return Promise.reject();
	const hashtags = await hashtagService.getAllByProductId(product.id);
	return {
		...product._doc,
		category: product.category,
		localbrand: product.localbrand,
		hashtags,
	};
};

const search = async ({ ...params }) => {
	const { categoryId, sort } = params;
	let q = {};
	let s = {};
	if (categoryId) {
		q = {
			...q,
			categoryId,
		};
	}
	if (sort) {
		if (sort === "+price") {
			s = {
				...s,
				price: 1,
			};
		}
		if (sort === "-price") {
			s = {
				...s,
				price: -1,
			};
		}
		if (sort === "+name") {
			s = {
				...s,
				name: 1,
			};
		}
		if (s === "-name") {
			s = {
				...s,
				name: -1,
			};
		}
	}
	const products = await Product.find(q).sort(s);
	return products;
};

exports.productService = {
	getById,
	search,
};
