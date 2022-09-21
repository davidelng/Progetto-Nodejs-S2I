// Imports e router
import express from "express";
import { requireJsonContent, isTitleCorrect, isDateCorrect } from "../utils/middlewares";
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsController";

const router = express.Router();

// GET
router.get("/", isDateCorrect, getPosts);
router.get("/:id", isDateCorrect, getPostById);

// POST
router.post("/", requireJsonContent, isTitleCorrect, createPost);

// PUT
router.put("/:id", requireJsonContent, isTitleCorrect, updatePost);

// DELETE
router.delete("/:id", deletePost);

// Export
export { router as postsRouter };