const firestore = require('./database');
const logger = require('./logger');

function increaseMood(roomName, mood) {
    return firestore.increaseMood(roomName, mood);
}

async function moods(roomName) {
    return firestore.getMoods(roomName);
}

async function list() {
    return firestore.listRooms();
}

async function decreaseMoods() {
    const rooms = await firestore.listRooms();
    logger.info(JSON.stringify(rooms));
    const roomObjects = rooms.reduce((acc, roomName) => acc[roomName] = {})
    return Promise.all(
        rooms.map(roomName =>
            firestore.decreaseMoods(roomName)
                .then(room => roomObjects[roomName] = room))
    ).then(rooms => roomObjects);
}

module.exports = { list, moods, increaseMood, decreaseMoods };