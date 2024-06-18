import { prisma as prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  // it("should create many data", async () => {
  //   const { data } = await prismaClient.$transaction(
  //     async (prisma) => {
  //       const data = await prisma.customer.createMany({
  //         data: [
  //           {
  //             id: "fajra",
  //             name: "fajra",
  //             email: "fajra@example.com",
  //             phone: "081251828223",
  //           },
  //           {
  //             id: "fajru",
  //             name: "fajru",
  //             email: "fajru@example.com",
  //             phone: "081251828224",
  //           },
  //           {
  //             id: "fajri",
  //             name: "fajri",
  //             email: "fajri@example.com",
  //             phone: "081251828225",
  //           },
  //         ],
  //       });

  //       return data
  //     },
  //   );
  // });

  it("should read many data", async () => {
    const customers = await prismaClient.customer.findMany({})

    console.info(customers);

    expect(customers.length).toBe(6)
  })
});
