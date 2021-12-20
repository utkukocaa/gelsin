const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    addresses: [
      {
        title: String,
        address1: String,
        address2: String,
        country: String,
        province: String,
        code: String,
      },
    ],
    phones: [
      {
        number: String,
        type: String,
      },
    ],
    favorites: Array,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
