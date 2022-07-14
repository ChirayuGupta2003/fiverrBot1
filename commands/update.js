const { SlashCommandBuilder } = require("@discordjs/builders");
const guildInfo = require("../models/guildInfo");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Updating up your bot")
    .addChannelOption((option) =>
      option
        .setName("welcome_message_channel")
        .setDescription("Set the channel you want to recieve welcome messages")
        .setRequired(true)
    ),
  async execute(interaction) {
    const welcomeMessageChannel = interaction.options.getChannel(
      "welcome_message_channel"
    );
    const guilds = await guildInfo.findOne({ guildID: interaction.guild.id });
    if (!guilds) {
      await interaction.reply({
        content: 'You have to setup your bot first, run "/setup"',
        ephemeral: true,
      });
    } else {
      await guildInfo
        .findOne({
          guildID: interaction.guild.id,
        })
        .updateOne({
          guildID: interaction.guild.id,
          guildName: interaction.guild.name,
          welcomeChannelID: welcomeMessageChannel.id,
          welcomeChannelName: welcomeMessageChannel.name,
        });

      await interaction.reply({
        content: "Update successful!!",
        ephemeral: true,
      });
    }
  },
};
