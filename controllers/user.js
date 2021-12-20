const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");
const UserService = require("../services/UserService");
const Helper = require("../scripts/utils/helper");
const BadRequestError = require("../errors/bad-request");

class UserController {
  async create(req, res) {
    req.body.password = await Helper.bcryptPassword(req.body.password);
    const user = await UserService.create(req.body);
    const { password, ...rest } = user._doc;
    res.status(StatusCodes.CREATED).json({ user: rest });
  }

  async login(req, res) {
    const { email, password } = req.body;

    let user = await UserService.findOne({ email });
    if (!user) {
      throw new NotFoundError(`No user with ${email}`);
    }
    const isMatch = await Helper.comparePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestError("Password is wrong!");
    }
    delete user._doc.password;
    user = {
      ...user._doc,
      tokens: {
        access_token: Helper.generateToken(user),
        refresh_token: Helper.generateRefreshToken(user),
      },
    };
    res.status(StatusCodes.OK).json(user);
  }
  async list(req, res) {
    const users = await UserService.list();
    res.status(StatusCodes.OK).json({ users });
  }
  async findOne(req, res) {
    const user = await UserService.findOne(req.body);
    if (!user) {
      throw new NotFoundError(`No user found`);
    }
    res.status(StatusCodes.OK).json({ user });
  }
  //   async update(req, res) {
  //     const updatedUser = await UserService.updateWhere(where, req.body);
  //     if (!user) {
  //       throw new NotFoundError(`No user found`);
  //     }
  //     res.status(StatusCodes.OK).json({ updatedUser });
  //   }
  async updateById(req, res) {
    if (req.body.password) {
      req.body.password = await Helper.bcryptPassword(req.body.password);
    }
    const updatedUser = await UserService.update(req.user.userId, req.body);
    delete updatedUser._doc.password;
    res.status(StatusCodes.OK).json({ updatedUser });
  }

  async delete(req, res) {
    const deletedUser = await UserService.delete(req.user.userId);
    res.status(StatusCodes.OK).json({ deletedUser });
  }
}

module.exports = new UserController();
