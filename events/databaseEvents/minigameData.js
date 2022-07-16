const minigame = require("../../models/minigame");

async function updatePoints(msg, point) {
  await minigame.updateOne(
    { guildID: msg.guild.id, "players.id": msg.author.id },
    {
      $inc: { "players.$.points": point },
    }
  );
}

module.exports = {
  async execute(msg, _) {
    if (msg.content.startsWith("!")) {
      return;
    }
    const data = await minigame.findOne({ guildID: msg.guild.id });

    if (!data.players.find((player) => player.id == msg.author.id)) {
      let points;
      if (msg.content == data.newIndex) {
        points = 5;
        await msg.react("👍");
        data.newIndex += 1;
      } else if (parseInt(msg.content)) {
        points = -1;
        await msg.delete();
      }
      data.players.push({
        id: msg.author.id,
        tag: msg.author.tag,
        points: points,
      });
      data.save();
      return;
    }

    if (msg.content == data.newIndex) {
      await updatePoints(msg, 5);
      await msg.react("👍");
      data.newIndex += 1;
      data.save();
    } else if (parseInt(msg.content)) {
      await updatePoints(msg, -1);
      await msg.delete();
    }
  },
};
