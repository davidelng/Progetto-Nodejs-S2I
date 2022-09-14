import express from "express";
import request from "supertest";
import { assert, expect, should } from "chai"; 
import { userRouter } from "../src/routes/users";

describe("User controller", () => {

    const app = express();

    app.use("/users", userRouter);

    after(() => {
        console.log("User tests done!");
    });

    it("Should get a list of all users", (done) => {
        request(app).get("/users").expect(200, done);
    });

});