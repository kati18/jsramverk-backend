"use strict";

module.exports = {

    getReport: getReport,
    getReports: getReports,
    updateReport: updateReport
};

// const sqlite3 = require('sqlite3').verbose();
//
// let sqliteDB;
//
// /**
// * Main function
// * @async
// * @returns void
// */
// (async function() {
//     sqliteDB = await new sqlite3.Database('./db/texts.sqlite');
//
//     process.on("exit", () => {
//         sqliteDB.close();
//     });
// })();

const sqliteDB = require("../db/database.js");


//  * Shows specific entries in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function getReport(req, res, weekNo) {
    return new Promise(function(resolve, reject) {
        let sql = `
                SELECT
                    *
                FROM reports
                WHERE week_no = ? `;

        // sqliteDB.all(sql, (err, rows) => {
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
        sqliteDB.get(sql, weekNo, function(err, row) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                // return res.status(500).json({
                //     errors: {
                //         status: 500,
                //         source:  "/reports/week/" + weekNo,
                //         title: "Database error",
                //         detail: err.message
                //     }
                // });
                // throw err;
                reject(err.message);
            } else if (row === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/reports/week/" + weekNo,
                        title: "Report not found",
                        detail: "Report with provided week number not found."
                    }
                });
            }

            // console.log("row: ", row);
            // console.log("row.report_text: ", row.report_text);
            // res.status(status).json(row);//alt:
            // res.status(status).json( { data: row } );//alt:
            // res.json( { data: rows } );
            resolve(row);
        });
    });
}

//  * Shows all entries in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function getReports(res) {
    return new Promise(function(resolve, reject) {
        let sql = `
                SELECT
                    *
                FROM reports `;

        // sqliteDB.all(sql, (err, rows) => {
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
        sqliteDB.all(sql, function(err, rows) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                // return res.status(500).json({
                // res.status(500).json({
                //     errors: {
                //         status: 500,
                //         source:  "/reports",
                //         title: "Database error",
                //         detail: err.message
                //     }
                // });
                // throw err;
                reject(err.message);
            } else if (rows.length == 0) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/reports",
                        title: "Reports not found",
                        detail: "Reports not found."
                    }
                });
            }

            // console.log("rows: ", rows);
            // res.status(status).json( { data: row } );//alt:
            // res.stauts(status).json( { data: rows } );

            resolve(rows);
        });
    });
}


//  * Updates a specific entry in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function updateReport(res, body) {
    return new Promise(function(resolve, reject) {
        let kmomNumber = ["1", "2", "3", "4", "5", "6", "10"];
        let data = [body.reportText, body.kmom];

        let sql = `
                UPDATE reports
                SET report_text = ?
                WHERE week_no = ?`;

        sqliteDB.run(sql, data, function(err) {
            // console.log("data[1] ", data[1]);
            if (err) {
                // return res.status(500).json({
                //     errors: {
                //         status: 500,
                //         source: "/reports",
                //         title: "Database error",
                //         detail: err.message
                //     }
                // });
                reject(err.message);
                // throw err;
            } else if (!(kmomNumber.includes(data[1]))) {
                res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/reports/week/" + data[1],
                        title: "Report not found",
                        detail: "Report with provided week number not found."
                    }
                });
            } else {
                // let message = "Report successfully added/updated!";

                // // console.log("inget från route-filen: ", message);
                // res.status(status).json({ data: message});

                resolve(true);
            }

            // console.log(`Row updated: ${this.changes}`);
        });
        // console.log("body.kmom från src-filen: ", body.kmom);
        // console.log("body.report_text från src-filen: ", body.reportText);
        // console.log("Inifrån updateReport i src-fil");
    });
}
