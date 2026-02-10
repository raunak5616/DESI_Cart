import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./mongodb/connection/connection.js";
import auth from "./router/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        process.env.CLIENT_URL,
      ];

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/auth", auth)
app.get("/", (req, res) => {
  res.send("API running 🚀");
});



/* server */
async function startServer() {
  try {
    await connectDB();
    console.log("Connected to DB:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error in starting server:", error);
  }
}

startServer();
