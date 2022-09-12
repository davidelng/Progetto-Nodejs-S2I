import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireJsonContent, isTitleCorrect, isDateCorrect } from "./middlewares";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * READ
 */
router.get("/", async (req, res) => {
  // parametro query per filtare i post in base alla data di creazione
  const date = req.query.date !== undefined ? req.query.date as string : Date.now();

  const posts = await prisma.post.findMany({
    where: { createdAt: { lte: new Date(date) } },
    select: {
      id: true,
      createdAt: true,
      title: true,
      interactions: {
        select: {
          id: true,
          createdAt: true,
          type: true,
          user: { select: { nickname: true } }
        }
      }
    }
  });
  if (posts.length > 0) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ error: "Ancora nessun post!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // parametri query per filtrare le interazioni del post per città e data
  const date = req.query.date !== undefined ? req.query.date as string : Date.now();
  const city = req.query.city !== undefined ? req.query.city as string : undefined;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      createdAt: true,
      title: true,
      interactions: {
        select: {
          id: true,
          createdAt: true,
          type: true,
          user: { select: { nickname: true } }
        },
        where: { 
          createdAt: { lte: new Date(date) }, 
          user: { city: city } 
        }
      }
    }
  });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Nessun post trovato" });
  }
});

/**
 * CREATE
 */
router.post("/", requireJsonContent, isTitleCorrect, async (req, res) => {
  const { title } = req.body;

  try {
    const result = await prisma.post.create({
      data: { title }
    });
    res
      .status(200)
      .json({ message: "Post creato correttamente", post: result });
  } catch {
    res.status(400).json({ error: "Impossibile creare il post" });
  }
});

/**
 * UPDATE
 */
router.put("/:id", requireJsonContent, isTitleCorrect, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title: title }
    });
    res
      .status(200)
      .json({ message: "Post aggiornato correttamente", post: updatedPost });
  } catch {
    res.status(404).json({ error: "Impossibile aggiornare il post" });
  }
});

/**
 * DELETE
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(id)
      }
    });
    res
      .status(200)
      .json({ message: "Post eliminato correttamente", deletedPost: post });
  } catch {
    res
      .status(404)
      .json({ error: "Nessun post con questo id da cancellare" });
  }
});

export { router as postRouter };