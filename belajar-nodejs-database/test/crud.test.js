import { prisma } from "../src/prisma-client";

describe("Prisma Client", () => {
//   it("should be able to create customer", async () => {
//     const customer = await prisma.customer.create({
//       data: {
//         id: "isro",
//         name: "Muhamad Isro",
//         email: "mohammadisro2710@gmail.com",
//         phone: "081258194116",
//       },
//     });

//     expect(customer.id).toBe("isro");
//   });

  it("should be able to update customer", async () => {
    const customer = await prisma.customer.update({
      data: {
        name: "Roozy",
      },
      where: {
        id: "isro",
      },
    });

    expect(customer.name).toBe("Roozy");
  });

  it("should be able to delete customer", async () => {
    const customer = await prisma.customer.findUnique({
      where: {
        id: "isro",
      },
    });

    expect(customer.id).toBe("isro");
    expect(customer.name).toBe("Roozy");
    expect(customer.email).toBe("mohammadisro2710@gmail.com");
  });

//   it("should be able to delete customer", async () => {
//     const customer = await prisma.customer.delete({
//       where: {
//         id: "isro",
//       },
//     });

//     expect(customer.name).toBe("Roozy");
//   });
});
