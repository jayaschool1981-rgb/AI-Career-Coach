const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./utils/connectDB");

const app = express();

// Connect DB
connectDB();

// Security
app.use(helmet());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/interview", require("./routes/interview"));

app.get("/", (req, res) => {
  res.json({ message: "AI Career Coach Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);