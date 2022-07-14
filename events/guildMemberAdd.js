const guildInfo = require("../models/guildInfo");
const discord = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {discord.GuildMember} member
   */
  async execute(member, _, client) {
    console.log("member added");
    const welcomeChannel = await guildInfo
      .find({
        guildID: member.guild.id,
      })
      .then((obj) => {
        return obj[0].welcomeChannelID;
      });

    const ch = client.channels.cache.get(welcomeChannel);
    ch.send(`Hey ${member}, welcome to ${member.guild.name}`);
  },
};
