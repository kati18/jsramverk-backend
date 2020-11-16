--
-- By kati18 for course jsramverk, webbprogrammering BTH.
-- 2020-10-11

-- Commands for Cygwin terminal to create/restore database from scratch:
-- cd db
-- sqlite3 texts.sqlite
-- .read migrate.sql
-- .exit


-- Drop tables if already exists:
DROP TABLE IF EXISTS me;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS users;

-- Creates table me in database texts.sqlite:
CREATE TABLE IF NOT EXISTS me (
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

-- Creates table users in database texts.sqlite:
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

-- Creates table reports in database texts.sqlite:
CREATE TABLE IF NOT EXISTS reports (
    week_no INT(4) NOT NULL,
    report_text VARCHAR(1000) NOT NULL
);

-- Inserts data into table me in database texts.sqlite:
INSERT INTO me VALUES('Katja Tibe', 'Växjö', 'Tjänstledig småländsk sjukgymnast och IT-utbildare som när hon inte kämpar med kursen jsramverk gärna plockar kantareller och lingon, lagar god mat och ser på film och hockey.');

-- Inserts data into table reports in database texts.sqlite:
INSERT INTO reports
    (week_no, report_text)
VALUES
    (01, '# MeAngular

    I have chosen Angular as framework and platform for my Me-application. Although I have heard it´s big and hard to learn I really like the fact that its supposed to be very clear, strictly structured with lots of built-in features and therefore hopefully also used in the same way by different developers.

    This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.
    After installing the Angular CLI I used the command ng new me-angular --routing to generate a basic Angular app with an app routing module(AppRoutingModule).
    I also installed ngx-markdown library to be able to parse the static markdown in README.md directly from the HTML markup in the report component.

    ## Development server

    Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

    ## Code scaffolding

    Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

    ## Build

    Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

    ## Running unit tests

    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

    ## Running end-to-end tests

    Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

    ## Further help

    To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

    ## GitHub

    [My GitHub repo](https://github.com/kati18/jsramverk-frontend.git)'),
    (02, '# Me API

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
    A frontend SPA developed in Angular is available at [My GitHub repo](https://github.com/kati18/jsramverk-frontend.git)'),
    (03, ' '),
    (04, ' '),
    (05, ' '),
    (06, ' '),
    (10, ' ');
