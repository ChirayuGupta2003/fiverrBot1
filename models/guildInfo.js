const mongoose = require("mongoose");

const guildInfo = new mongoose.Schema({
  guildID: String,
  guildName: String,
  welcomeChannelID: String,
  welcomeChannelName: String,
});

module.exports = mongoose.model("guildInformation", guildInfo);
