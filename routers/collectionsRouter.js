const express = require("express");
const router = express.Router();

const asyncHandler = require("../middleware/async-handler.js");
const {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection
} = require("../controllers/collectionsController.js");

router.route("/")
  .get(asyncHandler(getAllCollections))
  .post(asyncHandler(createCollection));

router.route("/:colId")
  .patch(asyncHandler(updateCollection))
  .delete(asyncHandler(deleteCollection));


module.exports = router;