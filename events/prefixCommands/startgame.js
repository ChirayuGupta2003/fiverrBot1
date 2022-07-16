const minigame = require("../../models/minigame.js");

module.exports = {
  async execute(msg) {
    const data = await minigame.findOne({ guildID: msg.guild.id });
    if (!data) {
      const startIndex = Math.floor(Math.random() * (999999 - 100000 + 1)) + 1;

      await minigame.create({
        isStarted: true,
        guildID: msg.guild.id,
        guildName: msg.guild.name,
        startIndex: startIndex,
        newIndex: startIndex + 1,
      });

      console.log("Started");
      await msg.channel.send(
        `Game Started!!\nStart Counting from ${startIndex}`
      );
    } else {
      msg.reply("Game is already in progress");
    }
  },
};
