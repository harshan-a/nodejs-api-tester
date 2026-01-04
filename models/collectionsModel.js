const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  col_name: {
    type: String,
    required: [true, "Collection name does not defined"],
    trim: true
  },
  req_ids: {
    type: [String],
    default: []
  }
});

const Collection = mongoose.model("collection", collectionSchema);

module.exports = Collection;