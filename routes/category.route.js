const { Category } = require("../models/category.model");
const express = require("express");
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("http-status");
const { restError } = require("../errors/rest");
const { body, validationResult } = require("express-validator");
const { categoryService } = require("../services/category.service");
const { mapErrorArrayExpressValidator } = require("../utils");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getAllSortByName();
    return res.json({
      categories,
    });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json(restError.INTERNAL_SERVER_ERROR.default());
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getById(id);
    if (category === null) throw new Error();
    return res.json({ category });
  } catch (err) {
    return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
  }
});

router.post(
  "/",
  body("name")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Category name should not be empty"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json(
        restError.BAD_REQUEST.extra({
          errorParams: mapErrorArrayExpressValidator(errors.array()),
        })
      );
    }
    const { name } = req.body;
    try {
      const category = await categoryService.createOne(name);
      return res.json({
        category,
      });
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(restError.INTERNAL_SERVER_ERROR.default());
    }
  }
);

router.put(
  "/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Category name should not be empty"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json(
        restError.BAD_REQUEST.extra({
          errorParams: mapErrorArrayExpressValidator(errors.array()),
        })
      );
    }

    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await categoryService.updateById(id, { name });
      if (category === null) throw new Error();
      return res.json({
        category,
      });
    } catch (err) {
      res.status(BAD_REQUEST).json(restError.BAD_REQUEST.default());
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await categoryService.deleteById(id);
    if (category === null) throw new Error();
    return res.json({
      category,
    });
  } catch (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json(restError.INTERNAL_SERVER_ERROR.default());
  }
});

module.exports = { categoryRouter: router };
