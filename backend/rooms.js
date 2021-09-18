const database = require("./database");

function increaseMood(roomName, mood) {
  return database.increaseMood(roomName, mood);
}

async function moods(roomName) {
  return database.getMoods(roomName);
}

async function list() {
  const rooms = await database.listRooms();
  return Promise.all(
    rooms.map((roomName) => database.getProperties(roomName))
  );
}

async function decreaseMoods() {
  const rooms = await database.listRooms();
  const roomObjects = rooms.reduce((acc, roomName) => (acc[roomName] = {}));
  return Promise.all(
    rooms.map((roomName) =>
      database
        .decreaseMoods(roomName)
        .then((room) => (roomObjects[roomName] = room))
    )
  ).then((rooms) => roomObjects);
}

module.exports = { list, moods, increaseMood, decreaseMoods };
