const fetch = require("node-fetch");

const url = process.env.BASE_URL || "http://localhost:3000";

describe("Moody at " + url, () => {
  it("is alive", async function () {
    console.log(JSON.stringify(global.BASE_URL));
    const response = await fetch(url);
    expect(response).toHaveProperty("status", 200);
  });
});
