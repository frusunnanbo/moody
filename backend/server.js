const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const rooms = require("./rooms");
const featureFlags = require("./featureFlags");
const logger = require("./logger");

const app = express();
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(bodyParser.json({ type: "application/json" }));

app.get("/api/rooms/", function (req, res) {
  rooms.list().then((rooms) => {
    logger.info(JSON.stringify(rooms));
    res.json(rooms);
  });
});

app.get("/api/rooms/:room", function (req, res) {
  rooms.moods(req.params.room).then((moods) => res.json(moods));
});

app.post("/api/rooms/:room/increase", function (req, res) {
  rooms
    .increaseMood(req.params.room, req.body.mood)
    .then((room) => res.json(room));
});

app.post("/api/rooms/autodecrease", function (req, res) {
  rooms.decreaseMoods().then((rooms) => res.json(rooms));
});

app.get("/api/feature-flags/:room", function (req, res) {
  res.json(featureFlags.inRoom(req.params.room));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.get("/:room", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
