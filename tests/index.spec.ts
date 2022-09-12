import express from "express";
import { assert, expect, should } from "chai"; 
import request from "supertest";

describe("Node REST API app", () => {

    const app = express();

    app.get("/", (req, res) => {
        res.status(200).send("OK");
    });

    app.use((req, res) => {
        res.status(404).send("Not found");
    });

    before((done) => {
        app.listen(3000, () => {
          done();
        });
    });

    after(() => {
        console.log("Tests done!");
    });

    it("Should create a server without errors", (done) => {
        request(app).get("/").expect(200, done);
    });

    it("Should handle undefined routes", (done) => {
        request(app).get("/asjdhk").expect(404, done);
    });

});