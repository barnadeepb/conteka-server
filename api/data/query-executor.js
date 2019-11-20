'use strict';
let QUERY_RUNNER = require("./sql-connector");

module.exports = {
    executeQuery
};

async function executeQuery(query) {
    try {
       return [null, await QUERY_RUNNER(query)];
    } catch(error) {
        return [error, null];
    }
    
}