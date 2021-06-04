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
	const PAGE_LIMIT = 5;
	const { categoryId, sort, queryValue, sizes, page } = params;
	let q = {};
	let s = {};
	if (categoryId) {
		q = {
			...q,
			categoryId,
		};
	}
	if (queryValue) {
		q = {
			...q,
			$text: {
				$search: queryValue,
			},
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
	if (Array.isArray(sizes)) {
		q = {
			...q,
			size: {
				$in: sizes,
			},
		};
	}
	const products = await Product.paginate(q, {
		sort: s,
		limit: PAGE_LIMIT,
		page: page ?? 1,
		customLabels: {
			docs: "products",
			totalDocs: "totalItems",
		},
	});
	return products;
};

exports.productService = {
	getById,
	search,
};
