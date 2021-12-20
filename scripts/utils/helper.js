const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  async bcryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(candidatePassword, password) {
    const isMatch = await bcrypt.compare(candidatePassword, password);
    return isMatch;
  }

  generateToken(user) {
    return jwt.sign(
      { userId: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  }
  generateRefreshToken(user) {
    return jwt.sign(
      { userId: user._id, username: user.first_name, isAdmin: user.isAdmin },
      process.env.JWT_REFRESH_SECRET
    );
  }
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = new Helper();
