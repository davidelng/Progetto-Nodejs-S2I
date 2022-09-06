import { PrismaClient } from "@prisma/client";
import { requireJsonContent, isTitleCorrect } from "./middlewares";

const prisma = new PrismaClient();

export const postController = (app) => {
  /**
   * READ
   */
  app.get("/posts", async (req, res) => {
    const posts = await prisma.post.findMany({
      include: { interactions: true },
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: "Ancora nessun post!" });
    }
  });

  app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Nessun post trovato" });
    }
  });

  app.get("/posts/filter/:date", async (req, res) => {
    const { date } = req.params;
    const posts = await prisma.post.findMany({
      where: {
        createdAt: {
          gte: new Date(date),
        },
      },
      include: { interactions: true },
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: "Nessun post trovato!" });
    }
  });

  app.get("/posts/inter/:date", async (req, res) => {
    const { date } = req.params;
    const posts = await prisma.post.findMany({
      include: {
        interactions: {
          where: {
            createdAt: {
              gte: new Date(date),
            },
          },
        },
      },
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: "Nessun post trovato!" });
    }
  });

  app.get("/posts/city/:city", async (req, res) => {
    const { city } = req.params;
    const posts = await prisma.post.findMany({
      include: {
        interactions: {
          where: {
            user: {
              city: city,
            },
          },
        },
      },
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: "Nessun post trovato!" });
    }
  });

  /**
   * CREATE
   */
  app.post("/post", requireJsonContent, isTitleCorrect, async (req, res) => {
    const { title } = req.body;

    try {
      const result = await prisma.post.create({
        data: {
          title,
        },
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
  app.put("/post/:id", requireJsonContent, isTitleCorrect, async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: { title: title },
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
  app.delete("/post/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const post = await prisma.post.delete({
        where: {
          id: Number(id),
        },
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
};
