import express from "express";
import request from "supertest";
import { interactionsRouter } from "../src/routes/interactions";

describe("Interaction controller", () => {

  const app = express();
  app.use(express.json());
  app.use("/interactions", interactionsRouter);

});