import { prisma } from "@prisma/client";
import express from "express";
import request from "supertest";
import { postsRouter } from "../src/routes/posts";
import { prismaMock } from "../src/utils/prismamock";

describe("Testing: POSTS", () => {

  const app = express();
  app.use(express.json());
  app.use("/posts", postsRouter);

  describe("GET", () => {

    test("Should get a list of all posts", async () =>{
      const date = new Date;
      const fakePosts = [
        {id: 1, createdAt: date, updatedAt: date, title: "fake post", interactions: []}, 
        {id: 2, createdAt: date, updatedAt: date, title: "fake post 2", interactions: []}, 
      ];
      prismaMock.post.findMany.mockResolvedValue(fakePosts);

      const res = await request(app)
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Should not return an empty list", async () =>{
      prismaMock.post.findMany.mockResolvedValue([]);

      const res = await request(app)
        .get("/posts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Ancora nessun post!");
    });

    test("Should get a post by id", async () =>{
      const date = new Date;
      const fakePost = {id: 1, createdAt: date, updatedAt: date, title: "fake post", interactions: []};
      prismaMock.post.findUnique.mockResolvedValue(fakePost);
  
      const res = await request(app)
        .get("/posts/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Should not get a non-existing post", async () =>{
      prismaMock.post.findUnique.mockResolvedValue(null);
  
      const res = await request(app)
        .get("/posts/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toStrictEqual({ error: "Nessun post trovato" });
    });

  });

  describe("POST", () => {

    test("Should create a post", async () => {
      const date = new Date;
      const fakePost = {id: 1, createdAt: date, updatedAt: date, title: "fake post", interactions: []};
      prismaMock.post.create.mockResolvedValue(fakePost);

      const res = await request(app)
        .post("/posts")
        .send({title: "fake post"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Post creato correttamente");
      expect(res.body).toHaveProperty("post");
    });

    test("Should not create a post without required data", async () => {
      const res = await request(app)
        .post("/posts")
        .send({notatitle: "notatitle"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Titolo mancante");
    });

  });

  describe("PUT", () => {
    
    test("Should update a post", async () => {
      const date = new Date;
      const fakePost = {id: 1, createdAt: date, updatedAt: date, title: "fake post modificato", interactions: []};
      prismaMock.post.update.mockResolvedValue(fakePost);

      const res = await request(app)
        .put("/posts/1")
        .send({title: "fake post modificato"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Post aggiornato correttamente");
      expect(res.body).toHaveProperty("post");
    });

    test("Should not update non-existing posts", async () => {
      prismaMock.post.update.mockRejectedValue(new Error);

      const res = await request(app)
        .put("/posts/1")
        .send({title: "fake post modificato"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Impossibile aggiornare il post");
    });

  });

  describe("DELETE", () => {
    test("Should delete a post", async () => {
      const date = new Date;
      const fakePost = {id: 1, createdAt: date, updatedAt: date, title: "fake post modificato", interactions: []};
      prismaMock.post.delete.mockResolvedValue(fakePost);

      const res = await request(app)
        .delete("/posts/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Post eliminato correttamente");
      expect(res.body).toHaveProperty("deletedPost");
    });

    test("Should not delete non-existing posts", async () => {
      prismaMock.post.delete.mockRejectedValue(new Error);

      const res = await request(app)
        .delete("/posts/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toEqual("Nessun post con questo id da cancellare");
    });
  });

});