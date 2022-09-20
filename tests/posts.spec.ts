import express from "express";
import request from "supertest";
import { postsRouter } from "../src/routes/posts";

describe("Post controller", () => {

    const app = express();

    app.use("/posts", postsRouter);

});