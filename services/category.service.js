const { Category } = require("../models/category.model");

const getById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const getAllSortByName = async () => {
  return await Category.find({}).sort({ name: 1 });
};

const createOne = async (name) => {
  return await new Category({ name }).save();
};

const updateById = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await Category.findByIdAndRemove(id);
};

module.exports = {
  categoryService: {
    getById,
    getAllSortByName,
    createOne,
    updateById,
    deleteById,
  },
};
