// import MySQL connection
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  // create array for variables passed by GET
  var arr = [];
  //loop through vars
  for (var i = 0; i < num; i++) {
    // add vars to array
    arr.push("?");
  }
  //return array string
  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  // create array for objects passed
  var arr = [];
  // loop through object keys
  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }
  // return object array as string
  return arr.toString();
}

// SQL statement functions object
// create orm object
var orm = {
  // all method: select everything from requested table
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callback results
      cb(result);
    });
  },
  // create method: new record - insert into requested table
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      // callback results
      cb(result);
    });
  },
  // update method: update existing record in requested table in db
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callback result
      cb(result);
    });
  },
  // delete method: remove record from requested table
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callback results
      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
