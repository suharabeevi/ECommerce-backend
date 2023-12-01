import mongoose from "mongoose";
import { configkeys } from "../config/configkeys.js";
const connectDB = async () => {
    try {
      const dbOptions = {
        dbName: configkeys.DB_NAME,
      };
      await mongoose.connect("mongodb+srv://sairasuhara12345:s6AYGWiUUv7voyEK@cluster0.rzzuwuk.mongodb.net/", dbOptions);
      console.log(dbOptions);
      console.log("Database connected...");
    } catch (error) {
      console.error("Database connection error", error);
      process.exit(1);
    }
  };
  
  export default connectDB;