// Imports e router
import express from "express";
import { requireJsonContent, isAvailableInteraction } from "../utils/middlewares";
import { getInteractions, createInteraction, updateInteraction, deleteInteraction } from "../controllers/interactionsController";

const router = express.Router();

// GET (Disabilitata!)
// La route è a scopo dimostrativo, per il progetto le interazioni vengono mostrate solo nei post
// togliere i commenti per abilitare la route
// router.get("/", getInteractions);

// POST
router.post("/:postId", requireJsonContent, isAvailableInteraction, createInteraction);

// PUT
router.put("/:interactionId", requireJsonContent, isAvailableInteraction, updateInteraction);

// DELETE
router.delete("/:interactionId", deleteInteraction);

// Export
export { router as interactionsRouter };