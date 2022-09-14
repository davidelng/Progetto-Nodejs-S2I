/**
 * 
 ***************************
 *  NODE REST API Project  *
 ***************************
 * 
 * Imports
 */
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { usersRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";
import { interactionsRouter } from "./routes/interactions";

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
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/interactions", interactionsRouter);

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
