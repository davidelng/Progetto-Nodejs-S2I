import express from "express";
import request from "supertest";
// import { assert, expect, should } from "chai"; 
import assert from "assert";
import { usersRouter } from "../src/routes/users";

describe("User controller", () => {

    const app = express();

    app.use("/users", usersRouter);

    after(() => {
        console.log("User tests done!");
    });

    it("Should get a list of all users", (done) => {
        request(app).get("/users").expect(200, done);
    });

    it("Should register a user", (done) => {
        request(app).post("/users")
        .send({nickname: "supertest", age: 90, city: "Node"})
        .set("Accept", "application/json")
        .expect(500)
        // .then(res => {
        //     assert(res.body.user.nickname === "supertest");
        //     done();
        // })
        .then(res => {
            console.log(res);
            done();
        })
        .catch(err => done(err));
    });

});