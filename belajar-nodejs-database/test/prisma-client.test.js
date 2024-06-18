import { prisma } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to connect", async () => {
    console.log("connected to prisma !");
    await prisma.$connect();

    await prisma.$disconnect();
  });
});
