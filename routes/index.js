/**
 * Routes in kmom02 jsramverk.
 * When run locally in web browser all routes are preceeded by localhost:1337,
 * e. g. localhost:1337/, localhost:1337/data/ and so on.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const me = require("../src/me.js");


// /**
//  * @param Object req The request
//  * @param Object res The response
//  */
// router.get('/', async (req, res) => {
//     let katja = [];
//
//     console.log("katja innan: ", katja);
//
//     katja = await me.getMe(res);
//     console.log("katja efter: ", katja);
//     return res.json( { data: katja } );
// });


router.get('/', (req, res) => {
    me.getMe(res)
        .then((result) => {
            // console.log("result från routes index.js: ", result);
            res.status(200).json({
                data: {
                    status: 200,
                    type: "success",
                    message: "Info about me",
                    data: result
                }
            });
        })
        .catch((err) => {
            // console.log("err från routes index.js: ", err);
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








module.exports = router;
