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

    reports.getReport(req, res, req.params.week_no)
        .then((result) => {
            // console.log("result från routes reports.js: ", result);
            res.status(200).json({
                data: {
                    status: 200,
                    type: "success",
                    message: "Report found",
                    data: result
                }
            });
        })
        .catch((err) => {
            // console.log("err från routes reports.js: ", err);
            res.status(500).json({
                errors: {
                    status: 500,
                    source: "/",
                    title: "Database error",
                    detail: err
                }
            });
            throw err;
        });
});


/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/', (req, res) => {
    reports.getReports(res)
        .then((result) => {
            // console.log("result från routes reports.js: ", result);
            res.status(200).json({
                data: {
                    status: 200,
                    type: "success",
                    message: "Reports found",
                    data: result
                }
            });
        })
        .catch((err) => {
            // console.log("err från routes reports.js: ", err);
            res.status(500).json({
                errors: {
                    status: 500,
                    source: "/",
                    title: "Database error",
                    detail: err
                }
            });
            throw err;
        });
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
                res.status(201).json({
                    data: {
                        status: 201,
                        type: "success",
                        message: "Report successfully added/updated!"
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err
                    }
                });
                // console.log("error från catch error: ", err);
                // throw err;
            });
    }
);


module.exports = router;
