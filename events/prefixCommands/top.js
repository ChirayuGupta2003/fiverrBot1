const messageCount = require("../../models/messageCount.js");
const { Message } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

String.prototype.fracRepeat = function (n) {
  if (n < 0) n = 0;
  return this.repeat(n) + this.slice(0, ~~((n - ~~n) * this.length));
};

module.exports = {
  /**
   * @param {Message} msg
   */
  execute(msg) {
    messageCount
      .find({ guildID: msg.guild.id })
      .sort({ messageCount: -1 })
      .limit(5)
      .then((users) => {
        let msgStr = "";
        for (let user in users) {
          msgStr += `[${parseInt(user) + 1}] ${
            users[user].userTag
          }${" ".fracRepeat(20 - users[user].userTag.length)}||   ${
            users[user].messageCount
          }\n`;
        }
        msg.channel.send(codeBlock("js", msgStr));
      });
  },
};
