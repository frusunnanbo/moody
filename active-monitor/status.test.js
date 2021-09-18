const fetch = require("node-fetch");

const url = process.env.BASE_URL || "http://localhost:3000";

describe("Moody at " + url, () => {
  it("is alive", async function () {
    const response = await fetch(url);
    expect(response).toHaveProperty("status", 200);
  });

  it("can increase moods", async function () {
    const testRoom = "test";
    const before = await fetch(roomUrl(testRoom)).then((response) =>
      response.json()
    );
    // increase twice in case autodecrease kicks in
    await increaseMood(testRoom, "happy");
    await increaseMood(testRoom, "happy");
    const after = await fetch(roomUrl(testRoom)).then((response) =>
      response.json()
    );

    expect(after.happy).toBeGreaterThan(before.happy);
  });
});

function roomUrl(room) {
  return url + "/api/rooms/" + room;
}

function increaseMood(room, mood) {
  console.log(roomUrl(room) + "/increase"); 
  return fetch(roomUrl(room) + "/increase", {
    method: "post",
    body: JSON.stringify({ mood: mood }),
    headers: { "Content-Type": "application/json" },
  });
}
