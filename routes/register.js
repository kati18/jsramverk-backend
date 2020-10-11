/**
 * Routes in kmom02 jsramverk.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const register = require("../src/register.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let myPlaintextPassword;


/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).json({
            errors: {
                status: 401,
                source: "/register",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).json({
                errors: {
                    status: 500,
                    source: "/register",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
        }

        register.addUser(res, req.body, hash)
        .then(() => {
            let message = "User successfully registrered!";
            // console.log("message från route-filen: ", message);
            res.status(201).json({ data: message});
        })
        .catch((err) => {

            res.status(500).json({
                errors: {
                    status: 500,
                    source: "/register",
                    title: "A user with this email already exists.",
                    detail: err
                }
            });
            // console.log("error från catch error: ", err);
            throw err;
        });
    })
});


module.exports = router;
