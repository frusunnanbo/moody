const express = require("express");

const tests = require("./run-tests.js");

const app = express();

app.get("/status", function (req, res) {
  return tests.runTests(req.query.url).then((result) => res.json(result));
});

app.listen(process.env.PORT || 8081);
