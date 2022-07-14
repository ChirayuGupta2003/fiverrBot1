const minigame = require("../../models/minigame.js");

module.exports = {
  async execute(msg) {
    await minigame.deleteOne({ guildID: msg.guild.id });
    msg.react("👍");
    msg.channel.send("Game ended");
  },
};
