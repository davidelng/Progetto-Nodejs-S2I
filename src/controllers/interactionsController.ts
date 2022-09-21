// Imports
import prisma from "../utils/prisma";
import type { Request, Response } from "express";

/**
 * READ
 */
const getInteractions = async (req: Request, res: Response) => {
  const interactions = await prisma.interaction.findMany();
  
  if (interactions.length > 0) {
    res.status(200).json(interactions);
  } else {
    res.status(404).json({ error: "Ancora nessuna interazione!" });
  }
};

/**
 * CREATE
 */
const createInteraction = async (req: Request, res: Response) => { 
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
};

/**
 * UPDATE
 */
const updateInteraction = async (req: Request, res: Response) => {
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
};

/**
 * DELETE
 */
const deleteInteraction = async (req: Request, res: Response) => {
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
};

// Exports
export { 
  getInteractions,
  createInteraction,
  updateInteraction,
  deleteInteraction
};