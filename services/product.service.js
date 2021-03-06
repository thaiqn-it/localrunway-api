const { SIZE_SPECS } = require("../models/enum");
const { unpackSizeSpecs } = require("../utils");
const { PRODUCT_TYPE } = require("../models/enum");
const { productMediaService } = require("./productmedia.service");
const { PRODUCT_STATUS } = require("../models/enum");
const { hashtagService } = require("./hashtag.service");
const { ProductHashtag } = require("../models/producthashtag.model");
const { excludeFields } = require("../utils");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

const indexingBulkSearch = async (id) => {
	let product = await Product.findById(id).populate("localbrand");
	let arr = [];
	arr.push(product.name);
	arr.push(product.color);
	let hashtags = await hashtagService.getAllByProductId(product.id);
	if (product.parentId) {
		hashtags = await hashtagService.getAllByProductId(product.parentId);
	}
	for (let hashtag of hashtags) {
		arr.push(hashtag.name);
	}
	arr.push(product.localbrand.name);
	const bulkSearch = arr.join(" ");
	product = await Product.findByIdAndUpdate(
		product.id,
		{
			bulkSearch,
		},
		{ new: true }
	);
	return product;
};

const unpackSizeSpecsForProduct = async (id) => {
	const product = await Product.findById(id);
	if (product.type === "DP") {
		const unpacked = unpackSizeSpecs(product.sizeSpecs);
		for (let prop in unpacked) {
			const { min, max } = unpacked[prop];
			const minProp =
				"min" + prop.charAt(0).toUpperCase() + prop.substr(1).toLowerCase();
			const maxProp =
				"max" + prop.charAt(0).toUpperCase() + prop.substr(1).toLowerCase();
			await Product.findByIdAndUpdate(product.id, {
				[minProp]: min,
				[maxProp]: max,
			});
		}
	}
	return await Product.findById(id);
};

const getById = async (id, { populates = [], ...options } = {}) => {
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
	if (product.parentId) {
		const parentProduct = await Product.findById(product.parentId).populate(
			"media"
		);
		product._doc.media = parentProduct.media;
		product._doc.hashtags = await hashtagService.getAllByProductId(
			parentProduct.id
		);
	}
	return {
		...product._doc,
		category: product.category,
		localbrand: product.localbrand,
		media: product._doc.media ?? product.media,
		rating: product.rating,
	};
};

const search = async ({ ...params }) => {
	const PAGE_LIMIT = 5;
	const {
		categoryId,
		parentId,
		sort,
		queryValue,
		sizes,
		page,
		brandIds,
		prices,
		type,
		measurement,
	} = params;
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
	if (parentId) {
		q = {
			...q,
			parentId,
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
		if (sort === "-name") {
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
	if (Object.values(PRODUCT_TYPE).includes(type)) {
		q = {
			...q,
			type,
		};
	}
	if (measurement) {
		if (measurement.weight) {
			q = {
				...q,
				minWeight: {
					$lte: measurement.weight + SIZE_SPECS.WEIGHT_DELTA,
				},
				maxWeight: {
					$gte: measurement.weight - SIZE_SPECS.WEIGHT_DELTA,
				},
			};
		}
		if (measurement.height) {
			q = {
				...q,
				minHeight: {
					$lte: measurement.height + SIZE_SPECS.HEIGHT_DELTA,
				},
				maxHeight: {
					$gte: measurement.height - SIZE_SPECS.HEIGHT_DELTA,
				},
			};
		}
		if (measurement.bust) {
			q = {
				...q,
				minBust: {
					$lte: measurement.bust + SIZE_SPECS.BUST_DELTA,
				},
				maxBust: {
					$gte: measurement.bust - SIZE_SPECS.BUST_DELTA,
				},
			};
		}
		if (measurement.waist) {
			q = {
				...q,
				minWaist: {
					$lte: measurement.waist + SIZE_SPECS.WAIST_DELTA,
				},
				maxWaist: {
					$gte: measurement.waist - SIZE_SPECS.WAIST_DELTA,
				},
			};
		}
		if (measurement.hip) {
			q = {
				...q,
				minHip: {
					$lte: measurement.hip + SIZE_SPECS.HIP_DELTA,
				},
				maxHip: {
					$gte: measurement.hip - SIZE_SPECS.HIP_DELTA,
				},
			};
		}
	}
	if (Array.isArray(prices) && prices.length === 2) {
		const [minPrice, maxPrice] = prices.map((x) => parseInt(x));
		if (minPrice < maxPrice) {
			q = {
				...q,
				price: {
					$gte: minPrice,
					$lte: maxPrice,
				},
			};
		}
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
		if (product.parentId) {
			product._doc.hashtags = await hashtagService.getAllByProductId(
				product.parentId
			);
		}
		product._doc.rating = product.rating;
	}

	if (sort === "-rating") {
		data.products.sort((x, y) => y.rating - x.rating);
	}

	if (sort === "+rating") {
		data.products.sort((x, y) => x.rating - y.rating);
	}

	return data;
};

const deleteById = async (id) => {
	const products = await Product.find({
		parentId: id,
	});
	for (let product of products) {
		await Product.findByIdAndUpdate(product.id, {
			status: PRODUCT_STATUS.INACTIVE,
		});
	}
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
	indexingBulkSearch,
	unpackSizeSpecsForProduct,
};
