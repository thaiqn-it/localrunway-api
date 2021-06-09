const { LocalBrand } = require("../models/localbrand.model");

const getAll = async () => {
	return await LocalBrand.find({});
};

const getById = async (id) => {
	const brand = await LocalBrand.findById(id);
	return brand._doc;
};

const createOne = async (data) => {
	return await new LocalBrand(data).save();
};

const deleteById = async (id) => {
	return await LocalBrand.findByIdAndUpdate(
		id,
		{
			status: "INACTIVE",
		},
		{ new: true }
	);
};

const updateOne = async (id, data) => {
	return await LocalBrand.findByIdAndUpdate(id, data, { new: true });
};

exports.localBrandService = {
	getAll,
	getById,
	createOne,
	deleteById,
	updateOne,
};
