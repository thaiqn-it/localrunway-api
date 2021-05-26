const { Category } = require("../models/category.model");

const getById = async (categoryId) => {
  return await Category.findById(categoryId);
};

module.exports = {
  categoryService: {
    getById,
  },
};
