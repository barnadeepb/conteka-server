'use strict';
let accessor = require("../data/object_accessors");

module.exports = {
    getData,
    postData,
    getAllCollectionNames
};

function getData(req, res){
    let collection = req.swagger.params.collection.value;
    let filterOption = req.swagger.params.filteroption.value;
    let retVal = accessor.getData(req.db, collection, filterOption);
    res.json(retVal);
}

function postData(req, res){
    let collection = req.swagger.params.collection.value;
    let record = req.swagger.params.record.value;
    let retVal = accessor.postData(req.db, collection, record);
    res.json(retVal);
}

function getAllCollectionNames(req, res){
    let retVal = accessor.getAllCollectionNames(req.db);
    res.json(retVal);
}