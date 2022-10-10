// Imports e router
import express from "express";
import { requireJsonContent } from "../utils/middlewares";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/usersController";

const router = express.Router();

// GET
router.get("/", getUsers);
router.get("/:userId", getUserById);

// POST
router.post("/", requireJsonContent, createUser);

// PUT
router.put("/:userId", requireJsonContent, updateUser);

// DELETE
router.delete("/:userId", deleteUser);

// Export
export { router as usersRouter };