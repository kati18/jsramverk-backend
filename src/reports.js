"use strict";

module.exports = {

    getReport: getReport,
    getReports: getReports,
    updateReport: updateReport
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


//  * Shows specific entries in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function getReport(res, weekNo, status=200) {
    return new Promise(function(resolve) {
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
                throw err;
            }

            // console.log("row: ", row);
            // console.log("row.report_text: ", row.report_text);
            res.status(status).json(row);//alt:
            // res.status(status).json( { data: row } );//alt:
            // res.json( { data: rows } );
        });
    });
}

//  * Shows all entries in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function getReports(res, req, status=200) {
    return new Promise(function(resolve) {
        let sql = `
                SELECT
                    *
                FROM reports `;

        // sqliteDB.all(sql, (err, rows) => {
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
        sqliteDB.all(sql, function(err, rows) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                throw err;
            }

            // console.log("rows: ", rows);
            // res.status(status).json( { data: row } );//alt:
            res.json( { data: rows } );
        });
    });
}


//  * Updates a specific entry in the reports table.
// /**
//  * @async
//  * @returns void
//  */
function updateReport(res, body, status=204) {
    return new Promise(function(resolve, reject) {
        let data = [body.reportText, body.kmom];

        let sql = `
                UPDATE reports
                SET report_text = ?
                WHERE week_no = ?`;

        sqliteDB.run(sql, data, function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: body.path,
                        title: "The report couldn´t be updated.",
                        detail: err
                    }
                })
                reject(err.message);
                // throw err;
            } else {
                // console.log(`Row updated: ${this.changes}`);

                let message = "Report successfully uppdated!";
                // console.log("inget från route-filen: ", message);
                return res.status(204).json({ data: message});

                resolve(true);
            }

            // console.log(`Row updated: ${this.changes}`);
        })
        // console.log("body.kmom från src-filen: ", body.kmom);
        // console.log("body.report_text från src-filen: ", body.reportText);
        // console.log("Inifrån updateReport i src-fil");
    });
}
