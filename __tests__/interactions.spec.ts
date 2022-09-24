import express from "express";
import request from "supertest";
import { interactionsRouter } from "../src/routes/interactions";
import { prismaMock } from "../src/utils/prismamock";

describe("Testing: INTERACTIONS", () => {

  const app = express();
  app.use(express.json());
  app.use("/interactions", interactionsRouter);

  describe("POST", () => {

    test("Should create an interaction", async () => {
      const fakeInteraction = { id: 1, createdAt: new Date, type: "commento", userId: 1, postId: 1 };
      prismaMock.interaction.create.mockResolvedValue(fakeInteraction);

      const res = await request(app)
        .post("/interactions/1")
        .send({ type: "commento", userId: 1 })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("interaction");
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("commento aggiunto!");
    });

    test("Should not create an invalid interaction", async () => {
      const res = await request(app)
        .post("/interactions/1")
        .send({ type: "upvote", userId: 1 })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Non un'interazione di tipo valido, deve essere 'like' o 'commento'");
    });

  });

  describe("PUT", () => {

    test("Should update an interaction", async () => {
      const fakeInteraction = { id: 1, createdAt: new Date, type: "like", userId: 1, postId: 1 };
      prismaMock.interaction.update.mockResolvedValue(fakeInteraction);

      const res = await request(app)
        .put("/interactions/1")
        .send({ type: "like"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("interaction");
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Modificato in like!");
    });

    test("Should update an interaction", async () => {
      prismaMock.interaction.update.mockRejectedValue(new Error);

      const res = await request(app)
        .put("/interactions/1")
        .send({ type: "like"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Impossibile modificare");
    });
  });

  describe("DELETE", () => {
    
    test("Should delete an interaction", async () => {
      const fakeInteraction = { id: 1, createdAt: new Date, type: "like", userId: 1, postId: 1 };
      prismaMock.interaction.delete.mockResolvedValue(fakeInteraction);

      const res = await request(app)
        .delete("/interactions/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("deleted");
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Interazione eliminata correttamente");
    });

    test("Should not delete non-existing interactions", async () => {
      prismaMock.interaction.delete.mockRejectedValue(new Error);

      const res = await request(app)
        .delete("/interactions/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Nessuna interazione da cancellare con questo id");
    });

  });

});