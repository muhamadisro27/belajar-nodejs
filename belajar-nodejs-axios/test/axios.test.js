import * as axios from "axios";
import * as fs from "node:fs";

describe("HTTP Client", () => {
  const httpClient = axios.create({
    baseURL: "https://envawejluizk8.x.pipedream.net",
    timeout: 5000,
  });

  it("should be supported by axios", () => {
    expect(httpClient).toBeDefined();
  });
});

describe("HTTP Method", () => {
  const httpClient = axios.create({
    baseURL: "https://envawejluizk8.x.pipedream.net",
    timeout: 5000,
  });

  httpClient.interceptors.request.use(
    async (config) => {
      console.info(`Send request to ${config.baseURL}${config.url}`);
      return config;
    },
    async (error) => {
      console.error(`Request error: ${error.message}`);
      return Promise.reject(error);
    },
    {
      synchronous: false,
    }
  );

  httpClient.interceptors.response.use(async (response) => {
    const fullUrl = response.config.baseURL + response.config.url;
    const body = JSON.stringify(response.data);
    console.info(`Receive response from ${fullUrl} with body ${body}`);
    return response;
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
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(200);
  });

  it("should support POST method with TEXT request body", async () => {
    const text = "Muhamad Isro";

    const response = await httpClient.post("/", text, {
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBeTruthy();
  });

  it("should support POST method with FORM request body", async () => {
    const form = {
      username: "test",
      password: "rahasia",
    };
    const response = await httpClient.post("/", form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBeTruthy();
  });

  it("should support POST method with Multipart request body", async () => {
    const form = new FormData();

    form.append("username", "roozy");
    form.append("password", "rahasia");

    const data = fs.readFileSync("image.png");
    form.append("file", new Blob(data), "image.png");

    const response = await httpClient.post("/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBeTruthy();
  });
});

describe("Error Handler", () => {
  const httpClient = axios.create({
    baseURL: "https://www.programmerzamannow.com/",
    timeout: 5000,
    validateStatus: (status) => status < 500,
  });

  it("should error if 404 not found", async () => {
    try {
      const response = await httpClient.get("/not-found");
      expect(response.status).toBe(404);
      
    } catch (error) {
      console.error(error.response.statusText);
      expect(error.response.status).toBe(404);
    }
  });
});
