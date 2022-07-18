const messageCounter = require("../../models/messageCount.js");
const { Message } = require("discord.js");

module.exports = {
  /**
   *
   * @param {Message} msg
   * @param {boolean} isNsfw
   */
  async execute(msg, isNsfw) {
    const user = await messageCounter.findOne({
      userID: msg.author.id,
      guildID: msg.guild.id,
    });
    if (!user) {
      await messageCounter.create({
        userID: msg.author.id,
        guildID: msg.guildId,
        userTag: msg.author.tag,
        guildName: msg.guild.name,
        messageCount: 1,
		msgs: [{
			obj: msg,
			content: msg.content
		}],
      });
      console.log("created new user");
    } else if (!isNsfw) {
      await user.updateOne({
        userTag: msg.author.tag,
        guildName: msg.guild.name,
        $inc: { messageCount: 1 },
		  $push:{
			  msgs: {
				  obj: msg,
				  content: msg.content,
			  }
		  }
      });
      console.log("incremented");
    } else if (isNsfw) {
		await user.updateOne({
        userTag: msg.author.tag,
        guildName: msg.guild.name,
        $inc: { messageCount: 0 },
		  $push:{
			  msgs: {
				  obj: msg,
				  content: msg.content,
			  }
		  }
      });
            msg.delete();
		
	}
  },
};
