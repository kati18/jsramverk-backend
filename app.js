//Kmom02 jsramverk

"use strict";

const port = 1337;
const path    = require("path");
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();

const routeServerIndex = require("./routes/index.js");
const routeServerReports = require("./routes/reports.js");
const routeServerRegister = require("./routes/register.js");
const routeServerLogin = require("./routes/login.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 4);
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use("/", routeServerIndex);
app.use("/reports", routeServerReports);
app.use("/register", routeServerRegister);
app.use("/login", routeServerLogin);


/**
 * Below code concerns routes and what happens if a
 * route that doesn´t exists geet called, e g
 * http://localhost:1337/none
 */
// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});
/**
 * End of below code concerns routes and what happens if a
 * route that doesn´t exists geet called, e g
 * http://localhost:1337/none
 */


// Start up server
app.listen(port, () => console.log(`Me API listening on port ${port}!`));
