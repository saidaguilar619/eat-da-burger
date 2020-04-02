const connection = require("./connection.js");

function printQuestionMarks(num) {
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objtoSql(ob) {
    const arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

var orm = {
    selectAll: function(tableName, cb) {
        let queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    insertOne: function(tableName, cols, vals, cb) {
        let queryString = "INSERT INTO " + tableName;

        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ") "

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    updateOne: function(tableName, objColVals, condition, cb) {
        let queryString = "UPDATE " + tableName;

        queryString += " SET " + objtoSql(objColVals);
        queryString += " WHERE " + condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    }
};

module.exports = orm;
