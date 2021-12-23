const BadRequestError = require("../errors/bad-request");

const idChecker = (req, res, next) => {
  if (!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)) {
    throw new BadRequestError("Id is not valid");
  }
  next();
};

module.exports = idChecker;
