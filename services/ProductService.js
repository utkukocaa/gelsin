const Product = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  constructor() {
    super(Product);
  }
}

module.exports = new ProductService();
