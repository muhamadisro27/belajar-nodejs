import { prisma } from "../src/prisma-client";

describe("prisma client", () => {
//   it("should create one to one", async () => {
//     const wallet = await prisma.wallet.create({
//       data: {
//         id: "reza",
//         customer_id: "reza",
//         balance: 1000000,
//       },
//       include: {
//         customer: true,
//       },
//     });

//     console.info(wallet);
//   });

//   it("should create new customer with a new wallet", async () => {
//     const customer = await prisma.customer.create({
//       data: {
//         id: "isro",
//         name: "Isro",
//         email: "mohammadisro2710@gmail.com",
//         phone: "085157708597",
//         wallet: {
//           create: {
//             id: "isro",
//             balance: 5000000,
//           },
//         },
//       },
//       include: {
//         wallet: true,
//       },
//     });

//     console.info(customer);
//   });

//   it("should can find one one to one relationship between customer and wallet", async () => {
//     const customer = await prisma.customer.findUnique({
//         where :{
//             id : "isro"
//         },
//         include : {
//             wallet: true,
//         }
//     })

//     console.info(customer);
//   })

  it("should can find many customers", async () => {
    const customer = await prisma.customer.findMany({
        where :{
            wallet : {
                isNot : null
            }
        },
        include : {
            wallet: true,
        }
    })

    console.info(customer);
  })
});
