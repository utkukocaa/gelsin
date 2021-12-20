const BadRequestError = require("../errors/bad-request");

const validate = (schema, source) => (req, res, next) => {
  const { value, error } = schema.validate(req[source]);

  if (error) {
    const errorMessage = error?.details
      ?.map((detail) => detail?.message)
      .join(", ");

    throw new BadRequestError(errorMessage);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
