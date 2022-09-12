import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireJsonContent, isAvailableInteraction } from "./middlewares";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * READ
 * a scopo dimostrativo, per il progetto le interazioni vengono mostrate solo nei post
 * togliere i commenti per abilitare la route
 */
// router.get("/", async (req, res) => {
//   const interactions = await prisma.interaction.findMany();
//   if (interactions.length > 0) {
//     res.status(200).json(interactions);
//   } else {
//     res.status(404).json({ error: "Ancora nessuna interazione!" });
//   }
// });

/**
 * CREATE
 */
router.post("/:postId", requireJsonContent, isAvailableInteraction, async (req, res) => {
  const { postId } = req.params;
  const { userId, type } = req.body;

  try {
    const result = await prisma.interaction.create({
      data: {
        type,
        postId: Number(postId),
        userId: Number(userId)
      }
    });
    res
      .status(200)
      .json({ message: `${type} aggiunto!`, interaction: result });
  } catch {
    res.status(400).json({ error: "Impossibile inserire l'interazione" });
  }
});

/**
 * UPDATE
 */
router.put(
  "/:interactionId",
  requireJsonContent,
  isAvailableInteraction,
  async (req, res) => {
    const { interactionId } = req.params;
    const { type } = req.body;

    try {
      const updatedInteraction = await prisma.interaction.update({
        where: { id: Number(interactionId) },
        data: { type: type }
      });
      res.status(200).json({
        message: `Modificato in ${type}!`,
        interaction: updatedInteraction,
      });
    } catch {
      res.status(404).json({ error: "Impossibile modificare" });
    }
  }
);

/**
 * DELETE
 */
router.delete("/:interactionId", async (req, res) => {
  const { interactionId } = req.params;

  try {
    const interaction = await prisma.interaction.delete({
      where: {
        id: Number(interactionId),
      }
    });
    res.status(200).json({
      message: "Interazione eliminata correttamente",
      deleted: interaction,
    });
  } catch {
    res
      .status(404)
      .json({ error: "Nessuna interazione da cancellare con questo id" });
  }
});

export { router as interactionRouter };