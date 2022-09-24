import express from "express";
import request from "supertest";
import { usersRouter } from "../src/routes/users";
import { prismaMock } from "../src/utils/prismamock";

describe("Testing: USERS", () => {

  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  describe("GET", () => {

    test("Should get a list of all users", async () => {
      const fakeUsers = [
        {id: 1, nickname: "Jest", age: 21, city: "Node"}, 
        {id: 2, nickname: "Supertest", age: 22, city: "Node"}
      ];
      prismaMock.user.findMany.mockResolvedValue(fakeUsers);

      const res = await request(app).get("/users").expect(200);
      expect(res.body).toStrictEqual(fakeUsers);
    });

    test("Should get a user by id", async () => {
      const fakeUser = {id: 1, nickname: "Jest", age: 21, city: "Node"};
      prismaMock.user.findUnique.mockResolvedValue(fakeUser);

      const res = await request(app).get("/users/1").expect(200);
      expect(res.body).toStrictEqual(fakeUser);
    });

    test("Should not get non-existing users", async () => {
      const error = { error: "Nessun utente trovato" };
      prismaMock.user.findUnique.mockResolvedValue(null);

      const res = await request(app).get("/users/99").expect(404);
      expect(res.body).toStrictEqual(error);
    });
  });

  describe("POST", () => {
    test("Should register a user", async () => {
      const fakeUser = {id: 1, nickname: "Jest", age: 21, city: "Node"};
      prismaMock.user.create.mockResolvedValue(fakeUser);

      const res = await request(app).post("/users").send({nickname: "Jest", age: 21, city: "Node"}).expect(200);
      expect(res.body).toStrictEqual({ message: "Utente creato correttamente", user: fakeUser });
    });

    test("Should not register a user without required data", async () => {
      const res = await request(app)
        .post("/users")
        .send({})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res.body).toStrictEqual({ error: "Dati json mancanti" });
    });
  });

  describe("PUT", () => {
    test("Should update a user", async () => {
      const fakeUser = {id: 1, nickname: "Supertest", age: 21, city: "Node"};
      prismaMock.user.update.mockResolvedValue(fakeUser);

      const res = await request(app)
        .put("/users/1")
        .send({nickname: "Supertest"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toStrictEqual({
        message: "Utente aggiornato correttamente",
        user: fakeUser,
      });
    });

    test("Should not update non-existing users", async () => {
      const error = { code: "P2025"};
      prismaMock.user.update.mockRejectedValue(error);

      const res = await request(app)
        .put("/users/1")
        .send({nickname: "Supertest"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res.body).toStrictEqual({ error: "Nessun utente con id 1" });
    });
  });

  describe("DELETE", () => {
    test("Should delete a user", async () => {
      const fakeUser = {id: 1, nickname: "Supertest", age: 21, city: "Node"};
      prismaMock.user.delete.mockResolvedValue(fakeUser);

      const res = await request(app)
        .delete("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toStrictEqual({ 
        message: "Utente eliminato correttamente", 
        deletedUser: fakeUser
      });
    });

    test("Should not delete non-existing users", async () => {
      prismaMock.user.delete.mockRejectedValue(new Error);

      const res = await request(app)
        .delete("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(res.body).toStrictEqual({ error: "Nessun utente con questo id da cancellare" });
    });
  });

});