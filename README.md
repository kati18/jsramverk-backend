# Me API

[![Build Status](https://travis-ci.org/kati18/jsramverk-backend.svg?branch=master)](https://travis-ci.org/kati18/jsramverk-backend)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend/build-status/master)

## The project

This project, backend RESTful API and SQLite database for fetching and storing data, is released as an assignment and a part of a University course [DV1612 JavaScript-baserade webbramverk](https://jsramverk.se/) at BTH(Blekinge Institute of Technology) 2020.

## Installations/dependencies

    - bcryptjs
    - cors
    - express
    - jwtwebtoken
    - morgan
    - sqlite3

## Development server

Run `npm start` for a dev server. Server starts up at `http://localhost:1337/`.

## Production server

Run `npm run production` for a prod server. Server starts up at `http://localhost:1337/`.

## Further help and information

Available routes in the RESTful API are:

    - GET / - presents me
    - GET /reports - presents all reports
    - GET /reports/week/:week_no - presents a specific report
    - POST /register - adds a specific user
    - POST /login - logs in a registered user
    - POST /reports - after logging in enables adding and updating a specific report

Passwords are saved encrypted and user authentication is handled with JSON Web Tokens. Tokens are passed in on header key authorization.

## GitHub

The course repository for the Me API is available at [My Github repo Me API](https://github.com/kati18/jsramverk-backend.git)<br>
A frontend SPA developed in Angular is available at [My GitHub repo](https://github.com/kati18/jsramverk-frontend.git)
