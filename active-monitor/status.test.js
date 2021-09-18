const fetch = require("node-fetch");

const url = "https://moody.frusunnanbo.se";

describe("Moody", () => {
  it("is alive", async function() {
    const response = await fetch(url);
    expect(response).toHaveProperty("status", 400);
  });
});
