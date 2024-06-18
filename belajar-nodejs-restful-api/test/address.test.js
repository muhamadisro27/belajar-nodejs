import supertest from "supertest";
import { logger } from "../src/app/logging.js";
import {
  removeTestUser,
  createTestUser,
  removeTestContact,
  createTestContact,
  getTestContact,
  createTestAddress,
  removeTestAddresses,
  getTestAddress,
} from "./test-util.js";
import { web } from "../src/app/web.js";

describe("GET /api/contacts/:contactId/addresses/", () => {
  afterEach(async () => {
    await removeTestAddresses();
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  it("should return list of addresses from contact id", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("should reject if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  afterEach(async () => {
    await removeTestAddresses();
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  it("should return address from contact id and address id", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("should reject if contact id is not found", async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${(testContact.id+1)}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  })

  it("should reject if address id is not found", async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${(testAddress.id + 2)}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  })
});

describe("POST /api/contacts/:contactId/addresses/", () => {
  afterEach(async () => {
    await removeTestAddresses();
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  it("should create address based on contact id", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses/`)
      .set("Authorization", "test")
      .send({
        street: "Jalan", // optional
        city: "Kota", // optional
        province: "Provinsi", // optional
        country: "Negara",
        postalCode: "Kode Pos",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBeDefined();
    expect(result.body.data.city).toBeDefined();
    expect(result.body.data.province).toBeDefined();
    expect(result.body.data.country).toBeDefined();
    expect(result.body.data.postalCode).toBeDefined();
    expect(result.body.data.id).toBeDefined();

    expect(result.body.data.street).toBe("Jalan");
    expect(result.body.data.city).toBe("Kota");
    expect(result.body.data.province).toBe("Provinsi");
    expect(result.body.data.country).toBe("Negara");
    expect(result.body.data.postalCode).toBe("Kode Pos");
  });

  it("should reject if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id + 1}/addresses/`)
      .set("Authorization", "test")
      .send({
        street: "Jalan", // optional
        city: "Kota", // optional
        province: "Provinsi", // optional
        country: "Negara",
        postalCode: "Kode Pos",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses/`)
      .set("Authorization", "test")
      .send({
        street: "", // optional
        city: "", // optional
        province: "", // optional
        country: "",
        postalCode: "",
      });

    logger.error(result.body);
    logger.error(result.body.errors);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
