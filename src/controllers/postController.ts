import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireJsonContent, isTitleCorrect, isDateCorrect } from "./middlewares";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * READ
 */
// ottiene tutti i post
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
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

// ottiene il post corrispondente all'id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
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
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Nessun post trovato" });
  }
});

// ottiene tutti i post prima della data specificata
router.get("/date/:date", isDateCorrect, async (req, res) => {
  const { date } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        lte: new Date(date),
      }
    },
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
    res.status(404).json({ error: `Nessun post prima di ${date} trovato!` });
  }
});

// ottiene il post corrispondente all'id, mostra le interazioni prima della data specificata
router.get("/:id/date/:date", isDateCorrect, async (req, res) => {
  const { id, date } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
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
        where: { createdAt: { lte: new Date(date) } }
      }
    }
  });
  if (post && post.interactions.length > 0) {
    res.status(200).json(post);
  } else if (post && post.interactions.length === 0 ) {
    res.status(404).json({ post: post, error: `Nessuna interazione prima di ${date} per questo post` });
  } else {
    res.status(404).json({ error: "Nessun post trovato" });
  }
});

// ottiene il post corrispondente all'id, mostra le interazioni nella città specificata
router.get("/:id/city/:city", async (req, res) => {
  const { id, city } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
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
        where: { user: { city: city } }
      }
    }
  });
  if (post && post.interactions.length > 0) {
    res.status(200).json(post);
  } else if (post && post.interactions.length === 0) {
    res.status(404).json({ post: post, error: `Nessuna interazione da ${city} per questo post` });
  } else {
    res.status(404).json({ error: "Nessun post trovato" });
  }
});

// ottiene il post corrispondente all'id, mostra le interazioni prima della data e nella città specificate
router.get("/:id/:date/:city", isDateCorrect, async (req, res) => {
  const { id, date, city } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
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
  if (post && post.interactions.length > 0) {
    res.status(200).json(post);
  } else if (post && post.interactions.length === 0 ) {
    res.status(404).json({ post: post, error: `Nessuna interazione prima di ${date} a ${city} per questo post` });
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