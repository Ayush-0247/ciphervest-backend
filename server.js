import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

dotenv.config();
connectDB();

const app = express();





const allowedOrigins = [
  "http://localhost:5173",
  "https://ciphervest.vercel.app",
  "https://www.ciphervestcapital.in",
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


app.use(helmet());

// ✅ Body parser
app.use(express.json());

// ✅ Security Middlewares (after body parser for req.body sanitization)

// Limit requests from same API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// ✅ Routes
app.use("/api", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀 happly" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});