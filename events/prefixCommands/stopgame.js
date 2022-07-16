const minigame = require("../../models/minigame.js");
const { codeBlock } = require("@discordjs/builders");

String.prototype.fracRepeat = function (n) {
  if (n < 0) n = 0;
  return this.repeat(n) + this.slice(0, ~~((n - ~~n) * this.length));
};

module.exports = {
  async execute(msg) {
    const data = await minigame.findOne({ guildID: msg.guild.id });
    const players = data.players.sort((a, b) => b.points - a.points);
    let msgStr = "";
    for (let player in players) {
      msgStr += `[${parseInt(player) + 1}] ${
        players[player].tag
      }${" ".fracRepeat(20 - parseInt(players[player].tag.length))}  ||  ${
        players[player].points
      }\n`;
    }
    msg.channel.send(`Leaderboard:\n${codeBlock("js", msgStr)}`);
    await minigame.deleteMany({ guildID: msg.guild.id });
    msg.react("👍");
    msg.channel.send("Game ended");
  },
};
