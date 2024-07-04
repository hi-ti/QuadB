import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected SUCCESSFULLY");
    } catch (error) {
        console.log(error.message);
        console.log(error);
        console.log("MongoDB connection FAIL");
        process.exit(1);
    }
}