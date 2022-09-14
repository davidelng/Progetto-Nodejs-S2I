/***************************
 *  NODE REST API Project  *
 ***************************
 *
 * Consulta il package.json e il README.md per conoscere:
 * - gli script utilizzabili da riga di comando
 * - come utilizzare le API
 * 
 * Questo è il file principale 
 * qui viene inizializzato Express e configurato con tutti gli endpoint
 */

// Imports
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { usersRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";
import { interactionsRouter } from "./routes/interactions";

// Config Express
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("L'app funziona correttamente! 👾\n Consulta il README📘 per istruzioni su come utilizzarla");
});

// Inizializzazione routes REST per operazioni CRUD
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/interactions", interactionsRouter);

// Fallback per routes inesistenti
app.use((req, res) => {
  res.status(404).send("La pagina è inesistente 👻");
});

// Server
app.listen(PORT, () => console.log(`🚀 Server lanciato sulla porta ${PORT}!`));
