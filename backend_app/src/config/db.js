import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.ATLAS_CONFIG_DATABASE_USER}:${process.env.ATLAS_CONFIG_DATABASE_PASS}@${process.env.ATLAS_CONFIG_CLUSTER_HOST}/${process.env.ATLAS_CONFIG_DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
