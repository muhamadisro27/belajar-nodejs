import { prisma } from "../src/prisma-client";

describe("prisma client", () => {

    // it("should return data with one to many relationships", async () => {
    //     const customer = await prisma.customer.findUnique({
    //         where : {
    //             id : "isro"
    //         },
    //         include: {
    //             comments: true
    //         }   
    //     })

    //     console.info(customer)
    // })

    // it("create many comments in a customer", async () => {
    //     const customer = await prisma.customer.create({
    //         data : {
    //             id : "test customer",
    //             name : "test customer",
    //             email : "test-customer@example.com",
    //             phone : "08123456789",
    //             comments : {
    //                 createMany : {
    //                     data : [
    //                         {
    //                             title : "Comment 1",
    //                             description : "Description 1",
    //                         },
    //                         {
    //                             title : "Comment 2",
    //                             description : "Description 2",
    //                         },
    //                         {
    //                             title : "Comment 3",
    //                             description : "Description 3",
    //                         },
    //                     ]
    //                 }
    //             },
    //             wallet : {
    //                 create : {
    //                     id : "test customer",
    //                     balance : 5000000,
    //                 }
    //             }

    //         },
    //         include : {
    //             wallet : true,
    //             comments : true
    //         }
    //     })

    //     console.info(customer)
    // })

    it("should return customer with a specific description comment", async () => {
        const customers = await prisma.customer.findMany({
            where : {
                comments : {
                    some : {
                        description : {
                            contains : "Sample"
                        }
                    }
                }
            },
            include : {
                comments : true
            }
        })

        console.info(customers);
    })



})