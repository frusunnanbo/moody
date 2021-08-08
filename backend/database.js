const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore();

async function listRooms() {
    const roomDocuments = await firestore.collection('rooms')
        .listDocuments();
  
    return roomDocuments.map(document => {
        return document.id
    });
}

module.exports = {
    listRooms,
};