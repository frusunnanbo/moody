const fetch = require("node-fetch");
const assert = require("assert");

const url = "https://moody.frusunnanbo.se";
const testRoomPath = "/api/rooms/test";

const status = {
  increase: "ok",
  autodecrease: "ok",
};

function checkAtInterval(milliseconds) {
  checkStatus();
  setInterval(checkStatus, milliseconds);
}

async function checkStatus() {
  console.log("Checking status");
  try {
    await checkIncrease();
  } catch (e) {
    status.increase = e.message;
  }
}

async function checkIncrease() {
  const before = await fetch(url + testRoomPath).then((response) =>
    response.json()
  );
  await fetch(url + testRoomPath + "/increase", {
    method: "post",
    body: JSON.stringify({ mood: "happy" }),
    headers: { "Content-Type": "application/json" },
  });
  const moods = await fetch(url + testRoomPath).then((response) =>
    response.json()
  );
  assert.deepEqual(moods, {
    ...before,
    happy: before.happy + 1,
  });
}

module.exports = {
  checkAtInterval,
  get: () => status,
};
