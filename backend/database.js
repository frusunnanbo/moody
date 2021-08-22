const {Firestore} = require('@google-cloud/firestore');
const logger = require('./logger');

const firestore = new Firestore();

async function listRooms() {
    const roomDocuments = await firestore.collection('rooms')
        .listDocuments();
  
    return roomDocuments.map(document => {
        return document.id
    });
}

async function getMoods(roomName) {
    const moods = await firestore.collection('rooms')
        .doc(roomName)
        .get()
        .then(snapshot => snapshot.data().moods);
    
    return moods;
}

// TODO transaction!
async function increaseMood(roomName, mood) {
    const document = await firestore.collection('rooms')
        .doc(roomName);
    
    const room = await document
        .get()
        .then(snapshot => snapshot.data())
    
    logger.info(JSON.stringify(room))

    room.moods[mood] = room.moods[mood] + 1

    await document.set(room)
    return room;
}

// TODO transaction!
async function decreaseMoods(roomName) {
    const document = await firestore.collection('rooms')
        .doc(roomName);
    
    const room = await document
        .get()
        .then(snapshot => snapshot.data())
    
    logger.info(JSON.stringify(room))

    Object.keys(room.moods).forEach(mood => {
        room.moods[mood] = Math.max(0, room.moods[mood] - 1);
    })
 
    await document.set(room)
    return room;
}

module.exports = {
    listRooms,
    getMoods,
    increaseMood,
    decreaseMoods
};