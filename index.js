const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QuizQuestion = require("./models/QuizQuestion");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await QuizQuestion.aggregate([{ $sample: { size: 10 } }]);
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
