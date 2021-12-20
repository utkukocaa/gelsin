const { dotenv } = require("./dotenv");
const asyncErrors = require("./express-async-erros");
module.exports = () => {
  dotenv.config();
  asyncErrors;
};
