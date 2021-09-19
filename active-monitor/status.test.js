const fetch = require("node-fetch");
const waitForExpect = require("wait-for-expect");

const url = process.env.BASE_URL || "http://localhost:3000";

describe("Moody at " + url, function() {
  const testRoom = "test";
  jest.setTimeout(120000);

  it("is alive", async function () {
    const response = await fetch(url);
    expect(response).toHaveProperty("status", 200);
  });

  it("can increase moods", async function () {
    const before = await getMoods(testRoom);
    await increaseMood(testRoom, "happy");
    const after = await getMoods(testRoom);

    expect(after.happy).toBeGreaterThan(before.happy);
  });

  xit("auto decreases moods", async function () {
    let initial = await getMoods(testRoom);
    if (initial.happy == 0) {
      initial = (await increaseMood(testRoom, "happy")).moods;
    }

    return await waitForExpect(() => {
      return expect(
        getMoods(testRoom).then((moods) => moods.happy)
      ).resolves.toBeLessThan(initial.happy);
    }, 60000);
  });
});

function roomUrl(room) {
  return url + "/api/rooms/" + room;
}

function getMoods(room) {
  return fetch(roomUrl(room)).then((response) => response.json());
}

function increaseMood(room, mood) {
  return fetch(roomUrl(room) + "/increase", {
    method: "post",
    body: JSON.stringify({ mood: mood }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}
