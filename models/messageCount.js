const mongoose = require("mongoose");

const messageCount = new mongoose.Schema({
  userID: String,
  guildID: String,
  userTag: String,
  guildName: String,
  messageCount: Number,
	msgs: [{
		obj: Object,
		content:String, 
	}]
});

module.exports = mongoose.model("messageCounter", messageCount);
