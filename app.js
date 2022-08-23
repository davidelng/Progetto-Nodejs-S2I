const express = require("express");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT || 3000, () =>
  console.log("Now listening on port " + process.env.PORT)
);
