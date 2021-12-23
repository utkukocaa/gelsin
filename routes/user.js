const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const {
  createUser,
  updateUser,
  loginUser,
  resetPassword,
} = require("../validations/user");
const router = express.Router();

router
  .route("/register")
  .post(validate(createUser, "body"), userController.create);
router.route("/login").post(validate(loginUser, "body"), userController.login);
router.route("/list").get(userController.list);
router
  .route("/update")
  .patch(auth, validate(updateUser, "body"), userController.updateById);
router.route("/delete").get(auth, userController.delete);
router
  .route("/reset-password")
  .post(validate(resetPassword), userController.resetPassword);

module.exports = router;
