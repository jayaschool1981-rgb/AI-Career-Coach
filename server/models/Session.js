const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: String,
    score: Number,
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);