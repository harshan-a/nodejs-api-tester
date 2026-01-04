const express = require("express");
const router = express.Router();

const {
  getMultipleRequests,
  getSingleRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestsController");


const asyncHandler = require("../middleware/async-handler");

router.route("/")
  .get(asyncHandler(getMultipleRequests))
  .post(asyncHandler(createRequest));

router.route("/:reqId")
  .get(asyncHandler(getSingleRequest))
  .patch(asyncHandler(updateRequest))
  .delete(asyncHandler(deleteRequest));



module.exports = router;