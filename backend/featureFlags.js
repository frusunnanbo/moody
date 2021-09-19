const flags = {
  agileislands: {
    "example-flag": true,
  },
};

function inRoom(roomName) {
  return flags[roomName] || {};
}

module.exports = {
  inRoom,
};
