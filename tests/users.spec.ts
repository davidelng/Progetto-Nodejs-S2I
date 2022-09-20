import express from "express";
import request from "supertest";
// import { assert, expect, should } from "chai"; 
import assert from "assert";
import { usersRouter } from "../src/routes/users";

describe("User controller", () => {

    const app = express();

    app.use(express.json());

    app.use("/users", usersRouter);

    describe("GET /users", () => {
        it("Should get a list of all users", (done) => {
            request(app).get("/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
        });

        it("Should get a user by id", (done) => {
            request(app).get("/users/2")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                assert(res.body.id, "2");
                done();
            });
        });
    });

    describe("POST /users", () => {
        it("Should register a user", (done) => {
            request(app).post("/users")
            .send({nickname: "supertest", age: 25, city: "Node.js"})
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                assert(res.body.user.nickname, "supertest");
                done();
            });
        });
    });

    describe("PUT /users", () => {
        it("Should update a user", (done) => {
            request(app).put("/users/14")
            .send({nickname: "sssupertest"})
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                assert(res.body.user.nickname, "sssupertest");
                done();
            });
        });
    });

    describe("DELETE /users", () => {
        it("Should delete a user", (done) => {
            request(app).delete("/users/14")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                assert(res.body.deletedUser.id, "14");
                done();
            });
        });
    });

});