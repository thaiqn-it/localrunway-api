const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

const Style = mongoose.model("Style", styleSchema);

module.exports = { Style };
