const { Category } = require("../models/category.model");
const express = require("express");
const { NOT_FOUND, BAD_REQUEST } = require("http-status");
const { restError } = require("../errors/rest");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const categories = await Category.find({}).sort({ name: 1 });
  return res.json({ categories });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (category == null) {
    return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
  }
  return res.json({ category });
});

// express-validator

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  // check name exists, validate name
  const category = new Category({
    name,
  });
  await category.save();
  return res.json({
    category,
  });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  // validate
  try {
    const category = await Category.findById(id);
    category.name = name;
    await category.save();
    return res.json({
      category,
    });
  } catch (err) {
    res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
  }
});

module.exports = { categoryRouter: router };
