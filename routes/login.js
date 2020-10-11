/**
 * Routes in kmom02 jsramverk.
 * When run locally in web browser all routes are preceeded by localhost:1337, e. g. localhost:1337/, localhost:1337/data/ and so on.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const login = require("../src/login.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config;

try {
    config = require('../config/config.js');
} catch (error) {
    console.error(error);
}

const jwtSecret = config.jwtSecret;
// const jwtSecret = process.env.JWT_SECRET || config.jwtSecret;
// const saltRounds = 10;
// const myPlaintextPassword;


/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/', (req, res) => {
    console.log("Från router.post /login i route/login-filen");
    const email = req.body.email;
    console.log("email från route-filen: ", email);
    const password = req.body.password;
    console.log("password från route-filen: ", password);

    if (!req.body.email || !req.body.password) {
        res.status(401).json({
            errors: {
                status: 401,
                source: "/",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    login.getUser(res, req.body)
    .then((dbUserInfo) => {
        console.log("dbUserInfo från route login.js: ", dbUserInfo);
        bcrypt.compare(req.body.password, dbUserInfo.password, (err, result) => {
            if (err) { //i e if the comparison goes wrong/doesn´t work I think...
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            if(result) {
                let payload = {email: dbUserInfo.email};
                console.log("dbUserInfo.email från route login.js:", payload);
                let jwtToken = jwt.sign(payload, jwtSecret, {expiresIn: '15m'});

                    return res.json({
                        data: {
                            type: "success",
                            message: "User logged in",
                            user: payload,
                            token: jwtToken,
                            expiresIn: 15
                        }
                    });

                }

            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Wrong password",
                    detail: "Password is incorrect."
                }
            });
        })
    });
});


module.exports = router;
