let loki = require('lokijs');
let initialData = require('./mock-data');

let db = new loki('sandbox.db');
let collections = {};

// Setup initial data
Object.keys(initialData).forEach(key => {
    collections[key] = db.addCollection(key);
    if( initialData[key].length ) {
        initialData[key].forEach(record => {
            collections[key].insert(record);
        });
    }
});

module.exports = collections;