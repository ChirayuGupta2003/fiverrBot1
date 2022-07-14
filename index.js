const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
});
const { token, mongo_uri } = require("./config.json");
const mongoose = require("mongoose");

// Event Handler
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, commands, client)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, commands, client)
    );
  }
}

// Command Handler
const commands = [];
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

mongoose.connect(mongo_uri, () => {
  console.log("Connected to db");
});

client.login(token);
