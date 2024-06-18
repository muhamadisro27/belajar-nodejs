import { prisma } from "../src/prisma-client";

describe("prisma client", () => {
  it("be able to execute SQL", async () => {
    const id = 1;
    const name = "Muhamad Isro";

    const impacted =
      await prisma.$executeRaw`INSERT INTO sample (id,name) VALUES (${id}, ${name})`;
    expect(impacted).toBe(1);
  });
});


