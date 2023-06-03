import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/url-shortner");
    console.log("connected to db");
  } catch (err) {
    console.error(err);
  }
};
export default connection;
