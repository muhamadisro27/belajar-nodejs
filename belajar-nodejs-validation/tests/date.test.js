import Joi from "joi";

describe("Joi", function () {
  it("should can create schema", function () {
    const schema = Joi.date().min("1-1-1988").max("now").required();

    const request = "1-1-1987";

    const result = schema.validate(request);

    if (result.error) {
      console.error(result.error?.message);
    }
  });
});
