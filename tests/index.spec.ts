import express from "express";
import { assert, expect, should } from "chai"; 
import request from "supertest";

describe("Node REST API app", () => {

    const app = express();

    before((done) => {
        app.listen(3000, () => {
          done();
        });

        app.get("/", (req, res) => {
            res.status(200).send("OK");
        });
    });

    after(() => {
        console.log("Tests done!");
    });

    it("Should create a server without errors", (done) => {
        request(app).get("/").expect(200, done);
    });

});