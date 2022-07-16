const mongoose = require("mongoose");

const minigame = new mongoose.Schema({
  isStarted: Boolean,
  startIndex: Number,
  newIndex: Number,
  guildID: String,
  guildName: String,
  players: [{ id: String, tag: String, points: { default: 0, type: Number } }],
});

module.exports = mongoose.model("minigame", minigame);
