const { localBrandService } = require("./localbrand.service");
const { Customer } = require("../models/customer.model");

const getOneByPhoneNumber = async (phoneNumber) => {
	return await Customer.findOne({ phoneNumber });
};

const getOne = async ({ ...data }) => {
	return await Customer.findOne(data);
};

const createOne = async ({ firstBoughtBrandIds, ...data }) => {
	if (Array.isArray(firstBoughtBrandIds)) {
		let firstBoughtBrands = "";
		for (let id of firstBoughtBrandIds) {
			const localBrand = await localBrandService.getOne({
				_id: id,
			});
			firstBoughtBrands += localBrand.name + " ";
		}
		data.firstBoughtBrands = firstBoughtBrands;
	}
	return await new Customer(data).save();
};

exports.customerService = {
	getOneByPhoneNumber,
	getOne,
	createOne,
};
