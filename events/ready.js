const { token, production, GUILD_ID } = require("../config.json");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const discord = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {discord.Client} client
   * @param {*} commands
   */
  execute(client, commands) {
    console.log("Ready");

    const rest = new REST({ version: "9" }).setToken(token);
    const CLIENT_ID = client.user.id;

    (async () => {
      try {
        if (!production) {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Successfully registered commands globally");
        } else {
          await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
          });
          console.log("Successfully registered commands locally");
        }
      } catch (err) {
        if (err) console.error(err);
      }
    })();

    // const channel = client.guilds.cache.find(
    //   (users) => users.id == "933715782540615731"
    // );
    // console.log(channel);
  },
};
