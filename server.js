import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";

dotenv.config();
connectDB();

const app = express();





const allowedOrigins = [
  "http://localhost:5173",
  "https://ciphervest.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));





// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀 happly" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});