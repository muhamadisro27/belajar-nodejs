import supertest from "supertest";
import { logger } from "../src/app/logging.js";
import {
  removeTestUser,
  createTestUser,
  removeTestContact,
  createTestContact,
  getTestContact,
} from "./test-util.js";
import { web } from "../src/app/web.js";

describe("GET /api/contacts/:contactId", () => {
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  it("should get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBeDefined();
    expect(result.body.data.lastName).toBeDefined();
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.phoneNumber).toBeDefined();

    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phoneNumber).toBe("085157708597");
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/contacts", () => {
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
  });

  it("should create a new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
        lastName: "Isro Sabanur",
        email: "test@example.com",
        phoneNumber: "085157708597",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBeDefined();
    expect(result.body.data.lastName).toBeDefined();
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.phoneNumber).toBeDefined();

    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("Isro Sabanur");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phoneNumber).toBe("085157708597");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: 123,
        email: "test",
        phoneNumber: 123,
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  it("should update data contact by id", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "test 2",
        lastName: "test 2",
        email: "test2@example.com",
        phoneNumber: "0851577085972",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBeDefined();
    expect(result.body.data.lastName).toBeDefined();
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.phoneNumber).toBeDefined();

    expect(result.body.data.firstName).toBe("test 2");
    expect(result.body.data.lastName).toBe("test 2");
    expect(result.body.data.email).toBe("test2@example.com");
    expect(result.body.data.phoneNumber).toBe("0851577085972");
  });

  it("should reject update if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "test2",
        phoneNumber: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject update if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test")
      .send({
        firstName: "test 2",
        lastName: "test 2",
        email: "test2@example.com",
        phoneNumber: "0851577085972",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  it("should remove the contact", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data).toBe("Contact is deleted successfully !");

    testContact = await getTestContact();

    expect(testContact).toBeNull();
  });

  it("should reject delete if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
