import Joi from "joi";

describe("Joi", function () {
//   it("should return validation error", function () {
//     const schema = Joi.string().email().min(5).required();

//     const request = "ups";

//     const result = schema.validate(request, {
//       abortEarly: false,
//     });

//     if (result.error) {
//       result.error.details.forEach((detail) => {
//         console.error(detail.message);
//       });
//     }
//   });

  it("should return object", function () {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    });

    const request = {
        username : "",
        password : ""
    }

    const result = loginSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result.error)
    // if (result.error) {
    //   result.error.details.forEach((detail) => {
    //     console.error(detail.message);
    //   });
    // }
  });
});
