import { prisma as prismaClient } from "../src/prisma-client";

describe("Prisma Client", function () {
  //   it("should can execute sequentially", async function () {
  //     const [teguh, reza] = await prisma.$transaction([
  //       prisma.customer.create({
  //         data: {
  //           id: "teguh",
  //           name: "teguh aja",
  //           email: "teguh@example.com",
  //           phone: "08123323232",
  //         },
  //       }),
  //       prisma.customer.create({
  //         data: {
  //           id: "reza",
  //           name: "reza aja",
  //           email: "reza@example.com",
  //           phone: "081233243232",
  //         },
  //       }),
  //     ]);

  //     expect(teguh.email).toBe("teguh@example.com");
  //     expect(reza.email).toBe("reza@example.com");
  //   });

  it("should can execute interactive", async function () {
    const [teguh, reza] = await prismaClient.$transaction(async (prisma) => {
      const teguh = await prisma.customer.create({
        data: {
          id: "teguh",
          name: "teguh aja",
          email: "teguh@example.com",
          phone: "08123323232",
        },
      });

      const reza = await prisma.customer.create({
        data: {
          id: "reza",
          name: "reza aja",
          email: "reza@example.com",
          phone: "081233243232",
        },
      });

      return [teguh, reza];
    });

    expect(teguh.email).toBe("teguh@example.com");
    expect(reza.email).toBe("reza@example.com");
  });
});
