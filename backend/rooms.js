const database = {
    main: {
        happy: 0,
        angry: 0,
        sad: 0,
        scared: 0,
    },
    agileislands: {
        happy: 0,
        angry: 0,
        sad: 0,
        scared: 0,
    }
}

function autoDecreaseMoods(moods) {
    return {
        happy: moods.happy > 0 ? moods.happy - 1 : 0,
        angry: moods.angry > 0 ? moods.angry - 1 : 0,
        sad: moods.sad > 0 ? moods.sad - 1 : 0,
        scared: moods.scared > 0 ? moods.scared - 1 : 0,
    }
}

function increaseMood(roomName, mood) {
    database[roomName][mood] = database[roomName][mood] + 1;
    return database[roomName];
}

function moods(roomName) {
    return database[roomName];
}

function list() {
    return Object.keys(database);
}

setInterval(() => {
    database.main = autoDecreaseMoods(database.main);
}, 2000);

module.exports = { list, moods, increaseMood };