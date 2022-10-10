// Imports
import prisma from "../utils/prisma";
import type { Request, Response } from "express";

/**
 * READ
 */
const getPosts = async (req: Request, res: Response) => {
  const date = req.query.date as string;

  const posts = await prisma.post.findMany({
    where: {
      createdAt: { gte: date !== undefined ? new Date(date) : undefined }
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
    res.status(404).json({ error: "Ancora nessun post!" });
  }
};

const getPostById = async (req: Request, res: Response) => { 
  const { postId } = req.params;
  const date = req.query.date as string;
  const city = req.query.city as string;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(postId) },
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
          createdAt: { gte: date !== undefined ? new Date(date) : undefined },
          user: { city: city !== undefined ? city : undefined } 
        }
      }
    }
  });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Nessun post trovato" });
  }
};

/**
 * CREATE
 */
const createPost = async (req: Request, res: Response) => { 
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
};

/**
 * UPDATE
 */
const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { title } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: { title: title }
    });
    res
      .status(200)
      .json({ message: "Post aggiornato correttamente", post: updatedPost });
  } catch {
    res.status(404).json({ error: "Impossibile aggiornare il post" });
  }
};

/**
 * DELETE
 */
const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(postId)
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
};

// Exports
export { 
  getPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost
};