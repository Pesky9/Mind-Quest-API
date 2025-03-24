const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QuizQuestion = require("./models/QuizQuestion");
const Leaderboard = require("./models/Leaderboard");
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

app.get("/api/leaderboard/:game", async (req, res) => {
  try {
    const { game } = req.params;

    let sortOptions = {};

    switch (game) {
      case "Tetris":
      case "Twogame":
      case "Quiz":
        sortOptions = { score: -1, time: 1 };
        break;
      case "Memory":
      case "Sudoku":
      case "Minesweeper":
        sortOptions = { score: -1, time: 1 };
        break;
      default:
        sortOptions = { score: -1, time: 1 };
    }

    const leaderboard = await Leaderboard.find({ game })
      .sort(sortOptions)
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/leaderboard", async (req, res) => {
  try {
    const {
      game,
      username,
      score,
      time,
      totalQuestions,
      boardSize,
      highestTile,
      clickCount,
    } = req.body;

    const newScore = new Leaderboard({
      game,
      username: username || "Anonymous",
      score,
      time,
      totalQuestions: totalQuestions || null,
      boardSize: boardSize || null,
      highestTile: highestTile || null,
      clickCount: clickCount || null,
      date: new Date(),
    });

    await newScore.save();
    res.status(201).json({ message: "Score submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/leaderboard/:game/detailed", async (req, res) => {
  try {
    const { game } = req.params;

    let sortOptions = {};
    let projection = {};

    switch (game) {
      case "Twogame":
        sortOptions = { score: -1, highestTile: -1 };
        projection = {
          username: 1,
          score: 1,
          time: 1,
          highestTile: 1,
          date: 1,
        };
        break;
      case "Sudoku":
      case "Minesweeper":
        sortOptions = { score: -1, time: 1 };
        projection = { username: 1, score: 1, time: 1, boardSize: 1, date: 1 };
        break;
      case "Memory":
        sortOptions = { score: -1, clickCount: 1 };
        projection = { username: 1, score: 1, time: 1, clickCount: 1, date: 1 };
        break;
      case "Quiz":
        sortOptions = { score: -1 };
        projection = {
          username: 1,
          score: 1,
          time: 1,
          totalQuestions: 1,
          date: 1,
        };
        break;
      default:
        sortOptions = { score: -1, time: 1 };
        projection = { username: 1, score: 1, time: 1, date: 1 };
    }

    const leaderboard = await Leaderboard.find({ game })
      .sort(sortOptions)
      .select(projection)
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
