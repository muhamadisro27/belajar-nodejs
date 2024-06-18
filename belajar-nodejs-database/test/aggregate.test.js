import { prisma } from "../src/prisma-client";

describe("prisma client", () => {
  it("should return data aggregate", async () => {
    const products = await prisma.product.groupBy({
      by: ['category'],
      _min: {
        price: true,
        stock: true,
      },
      _max: {
        price: true,
        stock: true,
      },
      _avg: {
        price: true,
        stock: true,
      },
      _sum: {
        price: true,
        stock: true,
      },
      having: {
        price : {
            _avg : {
                gt : 50000
            }
        }
      }
    });

    console.info(products);
  });
});
