const { Firestore } = require("@google-cloud/firestore");
const logger = require("./logger");

const firestore = new Firestore();

async function listRooms() {
  return firestore
    .collection("rooms")
    .listDocuments()
    .then((roomDocuments) => roomDocuments.map((document) => document.id));
}

function getProperties(roomName) {
  return firestore
    .collection("rooms")
    .doc(roomName)
    .get()
    .then((snapshot) => {
      const room = snapshot.data();
      return { name: roomName, hidden: room.hidden, defaultRoom: room.default };
    });
}

async function getMoods(roomName) {
  const moods = await firestore
    .collection("rooms")
    .doc(roomName)
    .get()
    .then((snapshot) => snapshot.data().moods);

  return moods;
}

async function increaseMood(roomName, mood) {
  const document = await firestore.collection("rooms").doc(roomName);
  const result = await firestore.runTransaction(async (transaction) => {
    const room = await transaction
      .get(document)
      .then((snapshot) => snapshot.data());
    room.moods[mood] = room.moods[mood] + 1;

    await transaction.set(document, room);
    return room;
  });
  return result;
}

async function decreaseMoods(roomName) {
  const document = await firestore.collection("rooms").doc(roomName);

  const transactionResult = await firestore.runTransaction(
    async (transaction) => {
      const room = await transaction
        .get(document)
        .then((snapshot) => snapshot.data());

      Object.keys(room.moods).forEach((mood) => {
        room.moods[mood] = Math.max(0, room.moods[mood] - 1);
      });

      await transaction.set(document, room);
      return room;
    }
  );
  return transactionResult;
}

module.exports = {
  listRooms,
  getProperties,
  getMoods,
  increaseMood,
  decreaseMoods,
};
