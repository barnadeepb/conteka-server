'use strict';
let { QUERY_MODES, SORT_ORDER } = require("../constants");
let QUERY_RUNNER = require("./sql-connector");

module.exports = {
    getData,
    insertData,
    updateData,
    getAllCollectionNames
};

async function getData(objName, filterOptions, paginateOptions, sortOptions){
    let GET_QUERY = `Select * from conteka.${objName}`;
    let badQuery = false;
    if(Array.isArray(filterOptions)) {
        let clauseAppended = false;
        filterOptions.forEach( (filterOption) => {
            if ( Array.isArray(filterOption.values) && filterOption.mode && filterOption.fieldname ) {
                GET_QUERY = !clauseAppended ? 
                    `${GET_QUERY} where ${filterOption.fieldname}`
                    : `${GET_QUERY} and ${filterOption.fieldname}`;
                clauseAppended = true;
                const comparator = QUERY_MODES[filterOption.mode.toUpperCase()];
                switch(comparator) {
                    case QUERY_MODES.EQ:
                        GET_QUERY = `${GET_QUERY}='${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                        break;
                    case QUERY_MODES.NEQ:
                        GET_QUERY = `${GET_QUERY}<>'${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                        break;
                    case QUERY_MODES.GT:
                            GET_QUERY = `${GET_QUERY}>'${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                            break;
                    case QUERY_MODES.GTE:
                            GET_QUERY = `${GET_QUERY}>='${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                            break;
                    case QUERY_MODES.LT:
                            GET_QUERY = `${GET_QUERY}<'${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                            break;
                    case QUERY_MODES.LTE:
                            GET_QUERY = `${GET_QUERY}<='${( filterOption.values.length && filterOption.values[0] ) || undefined}'`;
                            break;
                    case QUERY_MODES.RANGE:
                        if(filterOption.values.length !== 2) {
                            badQuery = true;
                            break;
                        }
                        GET_QUERY = `${GET_QUERY} BETWEEN '${filterOption.values[0]}' AND '${filterOption.values[1]}'`;
                        break;
                    case QUERY_MODES.SET_INCLUDE:
                        GET_QUERY = `${GET_QUERY} in (`;
                        filterOption.values.forEach(val => {
                            GET_QUERY = `${GET_QUERY} '${val}',`;
                        });
                        GET_QUERY = `${GET_QUERY.substr(0,GET_QUERY.length-1)})`;
                        break;
                    case QUERY_MODES.SET_EXCLUDE:
                        GET_QUERY = `${GET_QUERY} not in (`;
                        filterOption.values.forEach(val => {
                            GET_QUERY = `${GET_QUERY} '${val}',`;
                        });
                        GET_QUERY = `${GET_QUERY.substr(0,GET_QUERY.length-1)})`;
                        break;
                    case QUERY_MODES.CONTAINS:
                        GET_QUERY = `${GET_QUERY} like '${( filterOption.values.length && filterOption.values[0] ) || undefined}%'`;
                        break;
                    default:
                        badQuery = true;
                        break;
                }

            }
        } );
    }
    return new Promise(function(resolve, reject) {
        if(!badQuery) {
            QUERY_RUNNER(GET_QUERY)
            .then((results) => resolve(results))
            .catch(err => reject(err));
        } else {
            reject("Invalid query -- Error in execution.");
        }
    });
}

function insertData(objName, record ){
    let SAVE_QUERY = `INSERT INTO conteka.${objName} (`;
    Object.keys(record).forEach(fieldname => {
        SAVE_QUERY = `${SAVE_QUERY}${fieldname},`
    });
    SAVE_QUERY = `${SAVE_QUERY.substr(0,SAVE_QUERY.length-1)}) VALUES (`;
    Object.keys(record).forEach(fieldname => {
        SAVE_QUERY = `${SAVE_QUERY}'${record[fieldname]}',`
    });
    SAVE_QUERY = `${SAVE_QUERY.substr(0,SAVE_QUERY.length-1)})`;
    return new Promise(function(resolve, reject) {
        QUERY_RUNNER(SAVE_QUERY)
        .then((results) => resolve(results))
        .catch(err => reject(err));
    });
};

function updateData(objName, record, idFieldName ){
    let SAVE_QUERY = `UPDATE conteka.${objName} SET `;
    Object.keys(record).forEach(fieldname => {
        SAVE_QUERY = `${SAVE_QUERY} ${fieldname}='${record[fieldname]}',`
    });
    SAVE_QUERY = `${SAVE_QUERY.substr(0,SAVE_QUERY.length-1)} WHERE ${idFieldName}='${record[idFieldName]}'`;
    return new Promise(function(resolve, reject) {
        QUERY_RUNNER(SAVE_QUERY)
        .then((results) => resolve(results))
        .catch(err => reject(err));
    });
};

async function getAllCollectionNames(dbRef) {
    return new Promise(function(resolve, reject) {
        QUERY_RUNNER(`SELECT TABLE_NAME, TABLE_SCHEMA FROM information_schema.tables WHERE TABLE_SCHEMA = "CONTEKA"`)
        .then((results) => resolve(results))
        .catch(err => reject(err));
    });
    // return Object.keys(dbRef);
}
