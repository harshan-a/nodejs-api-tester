const Request = require("../models/requestsModel.js");

const getMultipleRequests = async (req, res) => {
  const {all, reqIds} = req.query;
  let requests = [];
  if(all === 'true') {
    // console.log(all);
    requests = await Request.find({});

  } else if(all === "false" && reqIds) {
    // console.log("else")
    requests = await Request.find({
      _id: {$in: reqIds.split(",")}
    })
  }
  
  res.status(200).json({
    success: true,
    data: requests
  });
}


const getSingleRequest = async (req, res) => {
  const {reqId} = req.params;
  const request = await Request.findOne({_id: reqId});

  if(!request) {
    throw {
      success: false,
      statusCode: 404,
      message: "Request not found"
    }
  }

  // console.log(request);
  res.status(200).json({
    success: true,
    data: request
  })
}


const createRequest = async (req, res) => {
  const request = await Request.create(req.body);
  res.status(200).json({
    success: true,
    message: "Request successfull created",
    data: request
  })
}

const updateRequest = async (req, res) => {
  const {reqId} = req.params;
  const request = await Request.findOneAndUpdate({_id: reqId}, req.body, {
    new: true,
    runValidators: true
  });

  if(!request) {
    throw {
      statusCode: 404,
      success: false,
      message: "Request does not found for update"
    }
  }

  res.status(200).json({
    success: true,
    data: request,
    message: "Request successfully updated"
  })
}

const deleteRequest = async (req, res) => {
  const {reqId} = req.params;

  const request = await Request.findOneAndDelete({_id: reqId});

  if(!request) {
    throw {
      statusCode: 404,
      success: false,
      message: "Request does not found for delete"
    }
  }

  res.status(200).json({
    success: true,
    message: "Request successfully deleted",
    data: request
  })
}

module.exports = {
  getMultipleRequests,
  getSingleRequest,
  createRequest,
  updateRequest,
  deleteRequest,
}

