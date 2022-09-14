import express from "express";
import request from "supertest";
import { assert, expect, should } from "chai"; 
import { interactionRouter } from "../src/routes/interactions";

describe("Interaction controller", () => {

    const app = express();

    app.use("/interactions", interactionRouter);

    after(() => {
        console.log("Interaction tests done!");
    });

});