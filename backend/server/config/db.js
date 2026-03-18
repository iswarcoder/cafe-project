import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

let memoryServer;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Database connection failed: ${error.message}`);
      process.exit(1);
    }

    console.warn(`Primary MongoDB unavailable (${error.message}). Starting in-memory MongoDB...`);

    memoryServer = await MongoMemoryServer.create({
      binary: {
        version: process.env.MONGO_MEMORY_VERSION || "7.0.14"
      }
    });

    const inMemoryUri = memoryServer.getUri();
    const memConn = await mongoose.connect(inMemoryUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`In-memory MongoDB connected: ${memConn.connection.host}`);
  }
};

export default connectDB;
