const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "L'app funziona correttamente" });
});

app.use((req, res, next) => {
  res.status(404).send({ message: "La pagina è inesistente" });
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
