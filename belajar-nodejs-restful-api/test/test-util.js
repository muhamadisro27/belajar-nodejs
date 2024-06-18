import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const removeTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      firstName: "test",
      lastName: "test",
      email: "test@example.com",
      phoneNumber: "085157708597",
      username: "test",
    },
  });
};

const createManyTestContacts = async () => {
  for (let i = 1; i <= 15; i++) {
    await prismaClient.contact.create({
      data: {
        firstName: "test" + i,
        lastName: "test" + i,
        email: `test${i}@example.com`,
        phoneNumber: `085157708597${i}`,
        username: "test",
      },
    });
  }
};

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "Muhamad Isro Test",
      token: "test",
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeTestContact,
  createTestContact,
  createManyTestContacts,
  getTestContact,
};
