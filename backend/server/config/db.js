import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import path from "path";
import { mkdirSync } from "fs";

let memoryServer;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Database connection failed: ${error.message}`);
    }

    console.warn(`Primary MongoDB unavailable (${error.message}). Starting in-memory MongoDB...`);

    const fallbackDbPath = path.resolve(process.cwd(), ".mongo-fallback-data");
    mkdirSync(fallbackDbPath, { recursive: true });

    try {
      memoryServer = await MongoMemoryServer.create({
        binary: {
          version: process.env.MONGO_MEMORY_VERSION || "7.0.14"
        },
        instance: {
          dbPath: fallbackDbPath
        }
      });
    } catch (memoryError) {
      console.warn(`Fallback DB path busy (${memoryError.message}). Retrying with temp storage...`);

      memoryServer = await MongoMemoryServer.create({
        binary: {
          version: process.env.MONGO_MEMORY_VERSION || "7.0.14"
        }
      });
    }

    const inMemoryUri = memoryServer.getUri();
    const memConn = await mongoose.connect(inMemoryUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`In-memory MongoDB connected: ${memConn.connection.host}`);
  }
};

export default connectDB;
