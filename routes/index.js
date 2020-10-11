/**
 * Routes in kmom02 jsramverk.
 * When run locally in web browser all routes are preceeded by localhost:1337, e. g. localhost:1337/, localhost:1337/data/ and so on.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const me = require("../src/me.js");


/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/', async (req, res) => {
    let katja = [];
    console.log("katja innan: ", katja);

    katja = await me.getMe();
    console.log("katja efter: ", katja);
    return res.json( { data: katja } );
});

module.exports = router;
