import express from "express";
import request from "supertest";
import { assert, expect, should } from "chai"; 
import { postRouter } from "../src/routes/posts";

describe("Post controller", () => {

    const app = express();

    app.use("/posts", postRouter);

    after(() => {
        console.log("Post tests done!");
    });

    it("Should get a list of all posts", (done) => {
        request(app).get("/posts").expect(200, done);
    });

});