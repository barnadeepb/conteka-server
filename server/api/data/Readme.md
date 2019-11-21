<!-- This file will be used a quick lookup for removed code (To avoid having to go to GitHub and lookup commits.) -->


function getData(dbRef, objName, filterOptions, paginateOptions, sortOptions){
    let filteredRecords = dbRef[objName].chain();

    // Find the result-set
    if(Array.isArray(filterOptions)) {
        filterOptions.forEach( (filterOption) => {
            if ( Array.isArray(filterOption.values) && filterOption.mode && filterOption.fieldname ) {
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
                } else if(QUERY_MODES.SET_INCLUDE === comparator || QUERY_MODES.SET_EXCLUDE === comparator || QUERY_MODES.CONTAINS === comparator) {
                    value = filterOption.values;
                }
                let filter = {
                    [filterOption.fieldname]: {
                        [comparator]: value
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
        filteredRecords = (sortOptions.sortorder && (sortOptions.sortorder === SORT_ORDER.DESCENDING) && filteredRecords.data().reverse()) || filteredRecords.data();
    } else {
        filteredRecords = filteredRecords.data();
    }
    return filteredRecords;
}