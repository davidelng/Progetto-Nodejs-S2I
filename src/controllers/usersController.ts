// Imports
import prisma from "../utils/prisma";
import type { DbError } from "../utils/types";
import type { Request, Response } from "express";

/**
 * READ
 */
const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ error: "Ancora nessun utente!" });
  }
};

const getUserById = async (req: Request, res: Response) => { 
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) }
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "Nessun utente trovato" });
  }
};

/**
 * CREATE
 */
const createUser = async (req: Request, res: Response) => { 
  const { nickname, age, city } = req.body;

  try {
    const result = await prisma.user.create({
      data: { nickname, age, city }
    });
    res
      .status(200)
      .json({ message: "Utente creato correttamente", user: result });
  } catch (e: unknown) {
    const error = e as DbError;
    if ( error.code === "P2002") {
      error.message = "Nickname già in uso";
    } else {
      error.message = "Impossibile creare l'utente, inserisci i dati corretti";
    }
    res.status(400).json({ error: error.message });
  }
};

/**
 * UPDATE
 */
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { nickname, age, city } = req.body;
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { 
        nickname: nickname, 
        age: age, 
        city: city 
      }
    });
  
    res.status(200).json({
      message: "Utente aggiornato correttamente",
      user: updatedUser,
    });
  } catch (e: unknown) {
    const error = e as DbError;
    if ( error.code === "P2025") {
      error.message = `Nessun utente con id ${userId}`;
    } else {
      error.message = "Impossibile aggiornare l'utente";
    }
    res.status(400).json({ error: error.message });
  }
};

/**
 * DELETE
 */
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(userId),
      }
    });
    res
      .status(200)
      .json({ message: "Utente eliminato correttamente", deletedUser: user });
  } catch {
    res
      .status(404)
      .json({ error: "Nessun utente con questo id da cancellare" });
  }
};

// Exports
export { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
};