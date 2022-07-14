const { SlashCommandBuilder } = require("@discordjs/builders");
const guildInfo = require("../models/guildInfo");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setting up your bot")
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
      guildInfo.create({
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
        welcomeChannelID: welcomeMessageChannel.id,
        welcomeChannelName: welcomeMessageChannel.name,
      });
      interaction.reply({ content: "Setup successful", ephemeral: true });
    } else {
      interaction.reply({
        content:
          'You have already setted up your bot, use "/update" command instead',
        ephemeral: true,
      });
    }
  },
};
