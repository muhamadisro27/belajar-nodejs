import * as axios from "axios";

describe("HTTP Client", () => {
  const httpClient = axios.create({
    baseURL: "https://ent1psm1zz9f.x.pipedream.net",
    timeout: 5000,
  });

  it("should be supported by axios", () => {
    expect(httpClient).toBeDefined();
  });
});

describe("HTTP Method", () => {
  const httpClient = axios.create({
    baseURL: "https://ent1psm1zz9f.x.pipedream.net",
    timeout: 5000,
  });

  it("should be support GET Method", async () => {
    const response = await httpClient.get("/");
    expect(response.status).toBe(200);
  });

  it("should be support GET Method with config", async () => {
    const response = await httpClient.get("/", {
      params: {
        name: "Roozy",
      },
      headers: {
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBeTruthy();
  });

  it("should support POST method with JSON request body", async () => {
    const json = {
      username: "test",
      password: "rahasia",
    };

    const response = await httpClient.post("/", json, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    expect(response.status).toBe(200)
  });
});
