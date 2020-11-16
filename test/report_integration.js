"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

let token = "";

describe('Reports', () => {
    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH report found', (done) => {
            chai.request(server)
                .get('/reports/week/1')
                .end((err, res) => {
                    // console.log("res:" , res);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Report found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('200 HAPPY PATH report found', (done) => {
            chai.request(server)
                .get('/reports/week/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Report found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/week/22', () => {
        it('should get 401 report not found', (done) => {
            chai.request(server)
                .get('/reports/week/22')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Report not found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports', () => {
        it('should get 200 HAPPY PATH reports found', (done) => {
            chai.request(server)
                .get('/reports')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Reports found");
                    res.body.data.data.should.be.an("array");
                    res.body.data.data.length.should.be.equal(7);
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /reports', () => {
        it('should get 401 as a token is not provided', (done) => {
            let reportUpdates = {
                kmom: "3",
                reportText: "Text for updating kmom03"
            };

            chai.request(server)
                .post('/reports')
                .send(reportUpdates)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("No token");

                    done();
                });
        });

        it('should get 500 as an unvalid token is provided', (done) => {
            let reportUpdates = {
                kmom: "3",
                reportText: "Text for updating kmom03"
            };

            chai.request(server)
                .post('/reports')
                .set('authorization', 't1e2s3t4')
                .send(reportUpdates)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Failed authentication");

                    done();
                });
        });

        it('should get 201 HAPPY PATH user successfully registered', (done) => {
            let user = {
                email: "test@reports.se",
                password: "Testingreports"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User successfully registered!");

                    done();
                });
        });

        it('should get 500 user registration failed due to double', (done) => {
            let user = {
                email: "test@reports.se",
                password: "Testingreports"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.equal("SQLITE_CONSTRAINT:" +
                                                        " UNIQUE constraint failed: users.email");

                    done();
                });
        });

        it('should get 200 HAPPY PATH user successfully logged in', (done) => {
            let user = {
                email: "test@reports.se",
                password: "Testingreports"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User logged in");
                    res.body.data.should.have.property("token");

                    token = res.body.data.token;
                    // console.log("token: ", token);

                    done();
                });
        });

        it('should get 201 HAPPY PATH updating kmom03', (done) => {
            let reportUpdates = {
                kmom: "3",
                reportText: "Text for updating kmom03"
            };

            chai.request(server)
                .post('/reports')
                .set('authorization', token)
                .send(reportUpdates)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Report successfully added/updated!");

                    done();
                });
        });
    });
});
