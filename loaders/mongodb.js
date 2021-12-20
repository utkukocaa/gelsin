const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
