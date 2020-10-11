/**
 * Routes in kmom02 jsramverk.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const reports = require("../src/reports.js");
const login = require("../src/login.js");


/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/week/:week_no', (req, res) => {
    // console.log(req.params.week_no);
    // console.log(typeof req.params.week_no);// string

    reports.getReport(res, req.params.week_no);

});


/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/', (req, res) => {
    reports.getReports(res, req);
});



/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/',
    (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {

        reports.updateReport(res, req.body)
        .then(() => {
            let message = "Report successfully uppdated!";
            // console.log("message: ", message);
            // res.status(204).json({ data: message});
        })
        .catch((err) => {

            // res.status(500).json({
            //     errors: {
            //         status: 500,
            //         source: "/reports",
            //         title: "The report couldn´t be updated.",
            //         detail: err
            //     }
            // });

            // console.log("error från catch error: ", err);
            throw err;
        });
    }
);


module.exports = router;
