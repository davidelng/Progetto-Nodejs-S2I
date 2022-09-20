// Imports e router
import express from "express";
import prisma from "../utils/prisma";
import { requireJsonContent } from "../utils/middlewares";
import type { DbError } from "../utils/types";

const router = express.Router();

/**
 * READ
 */
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ error: "Ancora nessun utente!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "Nessun utente trovato" });
  }
});

/**
 * CREATE
 */
router.post("/", requireJsonContent, async (req, res) => {
  const { nickname, age, city } = req.body;

  try {
    const result = await prisma.user.create({
      data: { nickname, age, city }
    });
    res
      .status(200)
      .json({ message: "Utente creato correttamente", user: result });
  } catch (e: unknown) {
    const error = e as DbError;
    if ( error.code === "P2002") {
      error.message = "Nickname già in uso";
    } else {
      error.message = "Impossibile creare l'utente";
    }
    res.status(400).json({ error: error.message });
  }
});

/**
 * UPDATE
 */
router.put("/:id", requireJsonContent, async (req, res) => {
  const { id } = req.params;
  const { nickname, age, city } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { 
        nickname: nickname, 
        age: age, 
        city: city 
      }
    });

    res.status(200).json({
      message: "Utente aggiornato correttamente",
      user: updatedUser,
    });
  } catch (e: unknown) {
    const error = e as DbError;
    if ( error.code === "P2025") {
      error.message = `Nessun utente con id ${id}`;
    } else {
      error.message = "Impossibile aggiornare l'utente";
    }
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      }
    });
    res
      .status(200)
      .json({ message: "Utente eliminato correttamente", deletedUser: user });
  } catch {
    res
      .status(404)
      .json({ error: "Nessun utente con questo id da cancellare" });
  }
});

// Export
export { router as usersRouter };