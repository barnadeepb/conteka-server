'use strict';

module.exports = {
    "QUERY_MODES": {
        "EQ": "$eq",
        "NEQ": "$ne",
        "GT": "$gt",
        "GTE": "$gte",
        "LT": "$lt",
        "LTE": "$lte",
        "RANGE": "$between",
        "SET_INCLUDE": "$in",
        "SET_EXCLUDE": "$nin",
        "CONTAINS": "$containsAny",
        "DATE": "$dteq"
    },
    "SORT_ORDER": {
        "ASCENDING": "asc",
        "DESCENDING": "desc"
    }
};
