const { productMediaService } = require("./productmedia.service");
const { PRODUCT_STATUS } = require("../models/enum");
const { hashtagService } = require("./hashtag.service");
const { ProductHashtag } = require("../models/producthashtag.model");
const { excludeFields } = require("../utils");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

const getById = async (id, { populates, ...options }) => {
	let product = Product.findOne({ _id: id });
	if (populates.includes("all")) {
		populates = ["category", "localbrand", "media"];
	}
	if (populates.includes("category")) {
		product = product.populate("category");
	}
	if (populates.includes("localbrand")) {
		product = product.populate("localbrand");
	}
	if (populates.includes("media")) {
		product = product.populate("media");
	}
	product = await product;
	if (product === null) return Promise.reject();
	const hashtags = await hashtagService.getAllByProductId(product.id);
	return {
		...product._doc,
		category: product.category,
		media: product.media,
		localbrand: product.localbrand,
		hashtags,
	};
};

const search = async ({ ...params }) => {
	const PAGE_LIMIT = 5;
	const { categoryId, sort, queryValue, sizes, page, brandIds } = params;
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
	if (Array.isArray(sizes) && brandIds.length > 0) {
		q = {
			...q,
			size: {
				$in: sizes,
			},
		};
	}
	if (Array.isArray(brandIds) && brandIds.length > 0) {
		q = {
			...q,
			brandId: {
				$in: brandIds,
			},
		};
	}
	let data = await Product.paginate(q, {
		sort: s,
		limit: PAGE_LIMIT,
		populate: ["localbrand"],
		page: page ?? 1,
		customLabels: {
			docs: "products",
			totalDocs: "totalItems",
		},
	});

	for (let product of data.products) {
		product._doc.brandName = product.localbrand.name;
		product._doc.hashtags = await hashtagService.getAllByProductId(product.id);
	}

	return data;
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

const createOne = async ({ _id, media, ...data }) => {
	const product = await new Product(data).save();
	await productMediaService.resetProductMedia(product.id, media);
	return await product.save();
};

const updateById = async (id, { _id, media, ...data }) => {
	await Product.findByIdAndUpdate(id, data, { new: true });
	await productMediaService.resetProductMedia(id, media);
	return await getById(id, {
		populates: ["all"],
	});
};

const addProductHashtag = async ({ productId, hashtagId }) => {
	const hashtag = await new ProductHashtag({
		productId,
		hashtagId,
	}).save();
	return hashtag;
};

const deleteProductHashtag = async ({ productId, hashtagId }) => {
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
