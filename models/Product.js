const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: String,
    quantity: Number,
    unit_price: Number,
    category: [String],
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    media: String,
    comments: [
      {
        comment: String,
        rate: Number,
        created_at: Date,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", ProductSchema);
