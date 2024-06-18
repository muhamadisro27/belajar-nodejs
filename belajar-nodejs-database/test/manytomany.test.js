import { prisma } from "../src/prisma-client";

describe("prisma client", () => {
//   it("should return likes count", async () => {
//     let productData = [];

//     for (let i = 1; i <= 10; i++) {
//       let data = {
//         id: `P00${i}`,
//         name: `Product ${i}`,
//         price: 10000,
//         stock: 10,
//         category: "Food",
//       };

//       productData.push(data);
//     }

//     await prisma.product.createMany({
//       data: productData,
//     });

//     const product = await prisma.product.findFirst();

//     const like = await prisma.like.create({
//       data: {
//         customer_id: "isro",
//         product_id: product.id,
//       },
//       include: {
//         customer: true,
//         product: true,
//       },
//     });

//     console.info(like);
//   });

  it("should return loves with connect/implicit", async () => {
    const customer = await prisma.customer.update({
      where: {
        id: "isro",
      },
      data: {
        loves : {
            connect : [
                {id: "P001"},
                {id: "P002"},
            ]
        }
      },
      include : {
        loves : true
      }
    });


    console.info(customer);
  });

});
