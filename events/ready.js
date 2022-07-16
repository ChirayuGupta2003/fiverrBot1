const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const token = process.env['token']
const production = process.env['production']

module.exports = {
  name: "ready",
  once: true,
  execute(client, commands) {

    console.log("Ready");

    const rest = new REST({ version: "9" }).setToken(token);
    const CLIENT_ID = client.user.id;

    (async () => {
      try {
        if (production == "false") {
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
  },
};
