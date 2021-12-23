const uuid = require("uuid");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");
const UserService = require("../services/UserService");
const Helper = require("../scripts/utils/helper");
const BadRequestError = require("../errors/bad-request");
const eventEmitter = require("../scripts/events/eventEmitter");

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
  async resetPassword(req, res) {
    const newPassword =
      uuid.v4()?.split("-")[0] || `glsn-usr-${new Date().getTime()}`;

    const user = await UserService.updateWhere(
      { email: req.body.email },
      { password: await Helper.bcryptPassword(newPassword.toString()) }
    );
    if (!user) {
      throw new NotFoundError(`No user found`);
    }

    eventEmitter.emit("send_email", {
      to: req.body.email,
      subject: "Password Reset",
      html: `<b>${newPassword}</b>`,
    });

    res.status(200).json({
      message: "Password sent to registered e-mail",
    });
  }
}

module.exports = new UserController();
