'use strict';
let accessor = require("../data/object_accessors");

module.exports = {
    getData,
    postData,
    getAllCollectionNames
};

function getData(req, res){
    // change here
    let collection = req.swagger.params.collection.value;
    let retVal = accessor.getData(
        req.db,
        collection,
        (req.swagger.params.filteroptions && req.swagger.params.filteroptions.value) || null,
        (req.swagger.params.paginateOptions && req.swagger.params.paginateOptions.value) || null,
        (req.swagger.params.sortOptions && req.swagger.params.sortOptions.value) || null);
    res.json(retVal);
}

function postData(req, res){
    let collection = req.swagger.params.collection.value;
    let record = req.swagger.params.record.value;
    let retVal = accessor.insertOrUpdate(req.db, collection, record);
    res.json(retVal);
}

function getAllCollectionNames(req, res){
    let retVal = accessor.getAllCollectionNames(req.db);
    res.json(retVal);
}