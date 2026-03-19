import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (configuredOrigins.length === 0 || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS policy blocked this origin"));
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api", (req, res) => {
  res.json({ message: "API working ✅" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Cafe API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
