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
    let searchOptions = req.swagger.params.searchoptions && req.swagger.params.searchoptions.value;
    let retVal = accessor.getData(collection, searchOptions.filteroptions, searchOptions.paginateOptions, searchOptions.sortOptions);
    return retVal.then(results => {
        return res.json(results)
    }).catch(err => {
        return res.status(500).send({message: err.message})
    });
}

function postData(req, res){
    let collection = req.swagger.params.collection.value;
    let record = req.swagger.params.record.value;
    let retVal = accessor.insertOrUpdate(req.db, collection, record);
    res.json(retVal);
}

function getAllCollectionNames(req, res){
    accessor.getAllCollectionNames().then(results => {
        res.json(results);
    }).catch(err => {
        return res.status(500).send({message: err.message})
    });
}