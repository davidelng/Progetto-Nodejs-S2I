/**
 * Imports
 */
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { userController } from "./controllers/userController";
import { postController } from "./controllers/postController";
import { interactionController } from "./controllers/interactionController";

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
userController(app);
postController(app);
interactionController(app);

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
