const { Hashtag } = require("../models/hashtag.model");
const { ProductHashtag } = require("../models/producthashtag.model");

const getAll = async () => {
	return await Hashtag.find({});
};

const getById = async (id) => {
	return await Hashtag.findById(id);
};

const getAllByProductId = async (productId) => {
	const productHashtags = await ProductHashtag.find({
		productId,
	}).populate("hashtag");
	return productHashtags.map((x) => x.hashtag);
};

const createOne = async (data) => {
	return await new Hashtag(data).save();
};

const deleteById = async (id) => {
	return await Hashtag.findByIdAndRemove(id);
};

const updateById = async (id, data) => {
	return await Hashtag.findByIdAndUpdate(id, data, { new: true });
};

exports.hashtagService = {
	getAll,
	getById,
	createOne,
	deleteById,
	updateById,
	getAllByProductId,
};
