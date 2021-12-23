const { StatusCodes } = require("http-status-codes");
const ProductService = require("../services/ProductService");

class ProductController {
  async list(req, res) {
    const products = await ProductService.list();
    res.status(StatusCodes.OK).json({ products });
  }
  async create(req, res) {
    req.body.user_id = req.user.userId;
    const product = await ProductService.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  }
  async update(req, res) {
    const updatedProduct = await ProductService.update(req.params.id, req.body);
    if (!updatedProduct) {
      throw new NotFoundError(`No product with ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ updatedProduct });
  }
  async addComment(req, res) {
    const product = await ProductService.findOne({ _id: req.params.id });
    if (!product) {
      throw new NotFoundError(`No product with ${req.params.id}`);
    }
    const comment = {
      ...req.body,
      created_at: new Date(),
      user_id: req.user.userId,
    };

    product.comments.push(comment);
    const addedCommentProduct = await ProductService.update(
      req.params.id,
      product
    );
    res.status(StatusCodes.OK).json(addedCommentProduct);
  }
}

module.exports = new ProductController();
