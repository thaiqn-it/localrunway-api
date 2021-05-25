const { Style } = require("../models/style.model");
const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req, res, next) => {
  const { categoryId, id } = req.params;
  const style = await Style.findOne({
    categoryId,
    _id: id,
  });
  return res.json({ style });
});
// post
// put
// delete

// hastag (foreign key = style)
module.exports = { styleRouter: router };
