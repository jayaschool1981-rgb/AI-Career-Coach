const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./utils/connectDB");

const app = express();

/* =========================
   ENVIRONMENT VALIDATION
========================= */

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

/* =========================
   DATABASE CONNECTION
========================= */

connectDB();

/* =========================
   SECURITY MIDDLEWARE
========================= */

// Secure HTTP headers
app.use(helmet());

// Body parser
app.use(express.json());

// Rate limiting (basic protection)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // limit each IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* =========================
   CORS CONFIGURATION
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // production domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin || // allow non-browser requests
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app") // allow Vercel preview deployments
      ) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/interview", require("./routes/interview"));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI Career Coach Backend Running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});