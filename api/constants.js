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
        "SETINCLUDE": "$in",
        "SETEXCLUDE": "$nin",
        "CONTAINS": "$containsAny",
        "DATE": "$dteq"
    },
    "SORT_ORDER": {
        "ASC": "ascending",
        "DESC": "descending"
    }
};
