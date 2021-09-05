const fetch = require('node-fetch');

const url = "https://moody.frusunnanbo.se"
const testRoomPath = "/api/rooms/test";

const status = {
    precondition: "ok",
    increase: "ok",
    autodecrease: "ok",
};

function checkAtInterval(milliseconds) {
    checkStatus();
    setInterval(checkStatus, milliseconds);
}

async function checkStatus() {
    console.log("Checking status");
    status.precondition = await checkPrecondition();
}

async function checkPrecondition() {
    const moods = await fetch(url + testRoomPath)
            .then(response => response.json());
    console.log(JSON.stringify(moods));
    if (moods.happy !== 0) {
        return `Expected happy mood to be 0, found ${moods.happy}`;
    }
    return "ok";
}

module.exports = {
    checkAtInterval,
    get: () => status
};