const express = require("express");

const tests = require("./run-tests.js");

const app = express();

app.get("/status", function (_, res) {
  return res.json(tests.getStatus());
});

tests
  .start(process.env.BASE_URL || "https://moody.frusunnanbo.se")
  .then(() => app.listen(process.env.PORT || 8081));
