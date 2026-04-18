import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import helmet from "helmet";

dotenv.config();
connectDB();

const app = express();





const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://ciphervest.vercel.app",
  "https://www.ciphervestcapital.in",
  "https://ciphervestcapital.in",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin OR "null" origin (file:// local admin dashboard)
    if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(helmet());


// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀 happly" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});