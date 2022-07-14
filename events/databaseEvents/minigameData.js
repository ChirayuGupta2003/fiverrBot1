const minigame = require("../../models/minigame");

module.exports = {
  async execute(msg, _) {
    const data = await minigame.findOne({ guildID: msg.guild.id });
    if (data && data.isStarted && !msg.content.startsWith("!")) {
      const intMsg = parseInt(msg.content);
      if (!intMsg) {
        msg.delete();
      } else if (intMsg == data.newIndex) {
        const newData = await minigame.findOne({ guildID: msg.guild.id });
        await newData.updateOne({ $inc: { newIndex: 1 } });
        console.log(newData.newIndex + 1);
      } else {
        msg.delete();
      }
    }
  },
};
