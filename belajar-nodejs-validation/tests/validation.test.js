import Joi from "joi";

describe("Joi", function () {
  it("should can create schema", function () {
    const schema = Joi.string().min(3).max(100).required();

    const request = "";

    const result = schema.validate(request);

    if (result.error) {
      console.error(result.error?.message);
    }
  });
});
