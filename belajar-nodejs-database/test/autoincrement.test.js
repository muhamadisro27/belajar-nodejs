import { prisma as prismaClient } from "../src/prisma-client";

describe("auto increment", function () {
    it("should increment", async function () {


        const category = await prismaClient.category.create({
            data : {
                name : "Food",
            }
        })

        console.info(category)
        expect(category).toHaveProperty("id")
    })
})