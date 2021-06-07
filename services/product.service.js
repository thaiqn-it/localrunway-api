const { PRODUCT_STATUS } = require("../models/enum");
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

const deleteById = async (id) => {
	return await Product.findByIdAndUpdate(
		id,
		{
			status: PRODUCT_STATUS.INACTIVE,
		},
		{
			new: true,
		}
	);
};

const createOne = async ({ _id, ...data }) => {
	const product = new Product(data);
	return await product.save();
};

const updateById = async (id, { _id, ...data }) => {
	const product = await Product.findByIdAndUpdate(id, data, { new: true });
	return product;
};

const addProductHashtag = async ({ productId, hashtagId }) => {
	const hashtag = await new ProductHashtag({
		productId,
		hashtagId,
	}).save();
	return hashtag;
};

const deleteProductHashtag = async ({ productId, hashtagId }) => {
	console.log(await ProductHashtag.findOne({ productId, hashtagId }));
	return await ProductHashtag.findOneAndRemove({ productId, hashtagId });
};

exports.productService = {
	getById,
	search,
	deleteById,
	createOne,
	updateById,
	addProductHashtag,
	deleteProductHashtag,
};
