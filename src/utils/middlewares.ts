import type { Request, Response, NextFunction } from "express";

/**
 * Controlla che il body non sia vuoto e che i dati inviati siano in formato json 
 */
const requireJsonContent = (req: Request, res: Response, next: NextFunction) => {
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
const isTitleCorrect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || req.body.title === "") {
    res.status(400).send({ error: "Titolo mancante" });
  } else {
    next();
  }
};

/**
 * Controlla se la data inserita nei parametri è formattata correttamente
 */
const isDateCorrect = (req: Request, res: Response, next: NextFunction) => {
  const dateRegex = new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", "gm");
  const date = req.query.date ? req.query.date as string : null;
  if (date !== null && dateRegex.test(date) !== true) {
    res.status(400).send({ error: "La data non è corretta o non rispecchia il formato YYYY-MM-DD" });
  } else {
    next();
  }
};

/**
 * Controlla se il tipo di interazione è "like" o "commento"
 */
const isAvailableInteraction = (req: Request, res: Response, next: NextFunction) => { 
  const { type } = req.body;
  if ( type !== "like" && type !== "commento") {
    res.status(400).send({ error: "Non un'interazione di tipo valido, deve essere 'like' o 'commento'" });
  } else {
    next();
  }
};

export { 
  requireJsonContent, 
  isTitleCorrect,
  isDateCorrect,
  isAvailableInteraction
};