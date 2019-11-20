'use strict';
let queryExecutor = require("../data/query-executor");

module.exports = {
    executeSelect,
    executeInsert,
    executeUpdate,
    executeDelete
};

function checkAccess(req, res){
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

function executeSelect(req, res){
    (async () => {
        let tableName = req.swagger.params.tableName.value;
        let filterClause = req.swagger.params.filterClause.value;
        let optionsClause = req.swagger.params.optionsClause.value;
        if(checkAccess()) {
            let query = `SELECT * FROM conteka.${tableName}`;
            if (filterClause) {
                query = `${query} WHERE ${filterClause}`;
            }
            if (optionsClause) {
                query = `${query}  ${optionsClause}`;
            }
            const [err, result] = await queryExecutor.executeQuery(query);
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.json(result);
            }
        } else {
            res.status(403).send({message: "User is forbidden from accessing the specified object."});
        }
    })();
    return true;
}

function executeInsert(req, res){
    (async () => {
        let tableName = req.swagger.params.tableName.value;
        let values = req.swagger.params.recordDetails.value.values;
        let fields = req.swagger.params.recordDetails.value.fields;
        if(checkAccess()) {
            let query = `INSERT INTO conteka.${tableName} (${fields}) VALUES (${values})`;
            const [err, result] = await queryExecutor.executeQuery(query);
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.json(result);
            }
        } else {
            res.status(403).send({message: "User is forbidden from updating the specified object."});
        }
    })();
    return true;
}

function executeUpdate(req, res){
    (async () => {
        let tableName = req.swagger.params.tableName.value;
        let values = req.swagger.params.recordDetails.value.values;
        let filterClause = req.swagger.params.recordDetails.value.filterClause;
        if(checkAccess()) {
            let query = `UPDATE conteka.${tableName} SET ${values}`;
            if (filterClause) {
                query = `${query} WHERE ${filterClause}`;
            }
            const [err, result] = await queryExecutor.executeQuery(query);
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.json(result);
            }
        } else {
            res.status(403).send({message: "User is forbidden from updating the specified object."});
        }
    })();
    return true;
}

function executeDelete(req, res){
    (async () => {
        let tableName = req.swagger.params.tableName.value;
        let filterClause = req.swagger.params.filterClause.value;
        if(checkAccess()) {
            let query = `DELETE FROM conteka.${tableName}`;
            if (filterClause) {
                query = `${query} WHERE ${filterClause}`;
            }
            const [err, result] = await queryExecutor.executeQuery(query);
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.json(result);
            }
        } else {
            res.status(403).send({message: "User is forbidden from updating the specified object."});
        }
    })();
    return true;
}

