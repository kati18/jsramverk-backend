"use strict";

module.exports = {
    
    getMe: getMe
};


const sqlite3 = require('sqlite3').verbose();

let sqliteDB;


/**
* Main function
* @async
* @returns void
*/
(async function() {
    sqliteDB = await new sqlite3.Database('./db/texts.sqlite');

    process.on("exit", () => {
    sqliteDB.close();
    });
})();




function getMe() {
    let resultList = [];

/** Below creates a Promise that is responsible for executing a database query,
 * asynchronous code is surrounded by a Promise in order to get sequential code
 * execution
 */
    return new Promise(function (resolve) { // alt.:
    // return new Promise((resolve) => {
        sqliteDB.all("SELECT * FROM me", function(err, rows) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach(function(row) { // alt.:
            // rows.forEach((row) => {
                resultList.push(row);
            });

            console.log("resultList: ", resultList);
// This function call passes the resultList back to the route-file
            resolve(resultList);
        });
    });
}
