let mysql      = require('mysql');
let {MY_SQL_DETAILS} = require("../constants");
let connection = mysql.createConnection({
  host     : MY_SQL_DETAILS.host,
  user     : MY_SQL_DETAILS.user,
  password : MY_SQL_DETAILS.password
});


connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});


module.exports = function(query, callback) {
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        // connected!
        callback(results);
      });
}