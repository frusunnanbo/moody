const express = require("express");

const status = require("./status.js");
const tests = require("./run-tests.js");

const app = express();

const EVERY_FIVE_MINUTES = 5 * 60 * 1000;

app.get("/status", function (req, res) {
  return res.send(status.get());
});

app.get("/test-status", function (req, res) {
  return tests.runTests().then((result) => res.json(result));
});

status.checkAtInterval(EVERY_FIVE_MINUTES);

app.listen(process.env.PORT || 8081);
