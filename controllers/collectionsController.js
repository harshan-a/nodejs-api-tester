const Collection = require("../models/collectionsModel.js");

const createCollection = async (req, res) => {
  const collection = await Collection.create(req.body);
  res.status(200).json({
    success: true,
    data: collection,
    message: "Collection successfully Created"
  });
}

const getAllCollections = async (req, res) => {
  const collections = await Collection.find({});
  res.status(200).json({
    success: true,
    data: collections
  });
}

const updateCollection = async (req, res) => {
  const {colId} = req.params;
  const {op:operation} = req.query;
  const {reqId} = req.body;
  // const operation = op.trim().toLowerCase();

  let collection;
  if(operation === "pull") {
    collection = await Collection.findOneAndUpdate({_id: colId}, {
      $pull: {req_ids: reqId} 
    }, {runValidators: true, new: true});
    
  } else if(operation === "push") {
    collection = await Collection.findOneAndUpdate({_id: colId}, {
      $push: {req_ids: reqId} 
    },{runValidators: true, new: true});
  }

  if(!collection) {
    throw {statusCode: 404, message: "Collection does not found to update", success: false};
  }

  res.status(200).json({
    success: true,
    data: collection,
    message: "Collection successfully Updated"
  });
}

const deleteCollection = async (req, res) => {
  const {colId} = req.params;


  const collection = await Collection.findOneAndDelete({_id: colId});

  if(!collection) {
    throw {statusCode: 404, message: "Collection does not found to delete", success: true};
  }

  res.status(200).json({
    success: true,
    data: collection,
    message: "Collection successfully deleted"
  });
}

module.exports = {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection
}