const mongoose = require("mongoose");

const dotenv = require("dotenv");
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}auth`);
    console.log(`Connected to mongodb database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo connect error ${error}`);
  }
};

module.exports = connectDB;
