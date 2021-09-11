const flags = {
    "agileislands": {
        "curious-mood": true
    }
}

function inRoom(roomName) {
    return flags[roomName] || {};
}

module.exports = {
    inRoom
};