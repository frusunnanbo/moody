const status = require("./status.js");
const express = require("express");

const app = express();

const EVERY_FIVE_MINUTES = 5 * 60 * 1000;

app.get("/status", function (req, res) {
  return res.send(status.get());
});

status.checkAtInterval(EVERY_FIVE_MINUTES);

app.listen(process.env.PORT || 8080);
