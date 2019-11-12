'use strict';
let { QUERY_MODES, SORT_ORDER } = require("../constants");

module.exports = {
    getData,
    insertOrUpdate,
    getAllCollectionNames
};

function getData(dbRef, objName, filterOptions, paginateOptions, sortOptions){
    let filteredRecords = dbRef[objName];

    // Find the result-set
    if(Array.isArray(filterOptions)) {
        filterOptions.forEach( (filterOption) => {
            if ( Arrya.isArray(filterOption.values) && filterOption.mode && filterOption.fieldname ) {
                const comparator = QUERY_MODES[filterOption.mode.toUpperCase()];
                let value = null;
                if ([
                    QUERY_MODES.EQ,
                    QUERY_MODES.NEQ,
                    QUERY_MODES.GT,
                    QUERY_MODES.GTE,
                    QUERY_MODES.LT,
                    QUERY_MODES.LTE,
                    QUERY_MODES.DATE
                ].includes( comparator ) ) {
                    value = ( filterOption.values.length && filterOption.values[0] ) || undefined;
                } else if(QUERY_MODES.RANGE === comparator ) {
                    value = 
                        (filterOption.values.length === 2 && [filterOption.values[0], filterOption.values[1]])
                        || (filterOption.values.length && [filterOption.values[0], filterOption.values[0]])
                        || undefined;
                } else if(QUERY_MODES.SETINCLUDE === comparator || QUERY_MODES.SETEXCLUDE === comparator || QUERY_MODES.CONTAINS === comparator) {
                    value = filterOption.values;
                }
                let filter = {
                    [filterOption.fieldname]: {
                        comparator: value
                    }
                };
                filteredRecords = filteredRecords.find(filter);
            }
        } )
    } else {
        filteredRecords = filteredRecords.find();
    }

    // Paginate
    if (paginateOptions) {
        filteredRecords = (paginateOptions.offset && filteredRecords.offset(paginateOptions.offset)) || filteredRecords;
        filteredRecords = (paginateOptions.limit && filteredRecords.limit(paginateOptions.limit)) || filteredRecords;
    }

    // SORT and return
    if (sortOptions) {
        filteredRecords = (sortOptions.fieldname && filteredRecords.simplesort(sortOptions.fieldname)) || filteredRecords;
    }
    return (paginateOptions.sortorder && (paginateOptions.sortorder.toUpperCase() === SORT_ORDER.DESC) && filteredRecords.data.reverse())  || filteredRecords.data();
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
