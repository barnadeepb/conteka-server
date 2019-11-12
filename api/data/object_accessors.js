'use strict';

module.exports = {
    getData,
    insertOrUpdate,
    getAllCollectionNames
};

function getData(dbRef, objName, keyValuePair ){
    return dbRef[objName].find(keyValuePair);
}

function insertOrUpdate(dbRef, objName, record ){
    try{
        return dbRef[objName].insert(record);
    } catch(saveErr) {
        return dbRef[objName].update(record);
    }
}

function getAllCollectionNames(dbRef) {
    return Object.keys(dbRef);
}
