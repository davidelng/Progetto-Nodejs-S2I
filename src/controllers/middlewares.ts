/**
 * Controlla che il body non sia vuoto e che i dati inviati siano in formato json
 */
export const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res
      .status(400)
      .json({ error: "I dati inviati devono essere in formato json" });
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).send({ error: "Dati json mancanti" });
  } else {
    next();
  }
};

/**
 * Controlla se nel body è presente un titolo e che non sia una stringa vuota
 */
export const isTitleCorrect = (req, res, next) => {
  if (!req.body.title || req.body.title === "") {
    res.status(400).send({ error: "Titolo mancante" });
  } else {
    next();
  }
};