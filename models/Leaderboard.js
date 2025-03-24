const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true,
    enum: ["Memory", "Tetris", "Twogame", "Sudoku", "Minesweeper", "Quiz"],
  },
  username: {
    type: String,
    default: "Anonymous",
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    default: null,
  },
  boardSize: {
    type: Number,
    default: null,
  },
  highestTile: {
    type: Number,
    default: null,
  },
  clickCount: {
    type: Number,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
