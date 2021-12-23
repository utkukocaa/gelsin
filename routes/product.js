const validate = require("../middlewares/validation");
const ProductController = require("../controllers/product");
const auth = require("../middlewares/auth");
const {
  createProduct,
  updateProduct,
  addComment,
} = require("../validations/product");

const express = require("express");
const idChecker = require("../middlewares/idChecker");
const router = express.Router();

router.route("/list").get(ProductController.list);
router
  .route("/create")
  .post(auth, validate(createProduct, "body"), ProductController.create);
router
  .route("/update")
  .patch(
    idChecker,
    auth,
    validate(updateProduct, "body"),
    ProductController.update
  );
router
  .route("/:id/add-comment")
  .post(
    idChecker,
    auth,
    validate(addComment, "body"),
    ProductController.addComment
  );

module.exports = router;
