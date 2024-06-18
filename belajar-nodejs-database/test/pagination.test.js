import { prisma as prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  it("return data", async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true,
      },
      skip: 0,
      take: 10,
      orderBy: [
        {
          id: "desc",
        },
        {
          phone: "asc",
        },
      ],
    });

    for (const customer of customers) {
      console.info(customer);
    }
  });
});
