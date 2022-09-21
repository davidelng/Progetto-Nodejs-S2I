// Imports e router
import express from "express";
import { requireJsonContent } from "../utils/middlewares";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/usersController";

const router = express.Router();

// GET
router.get("/", getUsers);
router.get("/:id", getUserById);

// POST
router.post("/", requireJsonContent, createUser);

// PUT
router.put("/:id", requireJsonContent, updateUser);

// DELETE
router.delete("/:id", deleteUser);

// Export
export { router as usersRouter };