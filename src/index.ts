/**
 * Imports
 */
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { userRouter } from "./controllers/userController";
import { postRouter } from "./controllers/postController";
import { interactionRouter } from "./controllers/interactionController";

/**
 * Express config
 */
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("L'app funziona correttamente! 👾\n Consulta il README📘 per istruzioni su come utilizzarla");
});

/**
 * Inizializzazione controller CRUD
 */
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/interactions", interactionRouter);

/**
 * Fallback per route inesistenti
 */
app.use((req, res) => {
  res.status(404).send("La pagina è inesistente 👻");
});

/**
 * Server
 */
app.listen(PORT, () => console.log(`🚀 Server lanciato sulla porta ${PORT}!`));
