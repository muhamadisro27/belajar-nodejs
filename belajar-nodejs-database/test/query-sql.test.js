import { prisma } from "../src/prisma-client";

describe("prisma client", () => {
  it("be able to query SQL", async () => {

    const samples = await prisma.$queryRaw`select * from sample`;

    for (const sample of samples) {
        console.info(`Result sample id : ${sample.id} and name : ${sample.name}`);
    }
  });
});


