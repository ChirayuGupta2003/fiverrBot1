const mongoose = require("mongoose");

const minigame = new mongoose.Schema({
  isStarted: Boolean,
  startIndex: Number,
  newIndex: Number,
  guildID: String,
  guildName: String,
});

module.exports = mongoose.model("minigame", minigame);
