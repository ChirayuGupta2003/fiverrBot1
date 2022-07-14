const fs = require("fs");
const { Message } = require("discord.js");
const axios = require("axios");
const minigame = require("../models/minigame.js");

const prefixCommands = fs
  .readdirSync("./events/prefixCommands")
  .filter((file) => file.endsWith(".js"));

const databaseEvents = fs
  .readdirSync("./events/databaseEvents")
  .filter((file) => file.endsWith(".js"));

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} msg
   * @returns
   */
  async execute(msg) {
    if (msg.author == msg.client.user || msg.system || msg.author.bot) return;

    let isNsfw = false;

    try {
      await axios
        .get(
          `https://www.purgomalum.com/service/containsprofanity?text=${msg.content}`
        )
        .then((res) => {
          if (res.data) {
            msg.delete();
            msg.channel.send(
              "This message was deleted due to possible profanity"
            );
            isNsfw = true;
          } else {
            isNsfw = false;
          }
        });
    } catch (err) {
      console.error(err);
    }

    if (msg.content.startsWith("!")) {
      const command = msg.content.split("!")[1];
      if (prefixCommands.includes(`${command}.js`)) {
        const file = require(`./prefixCommands/${command}.js`);
        file.execute(msg);
      }
    }

    for (let event of databaseEvents) {
      const file = require(`./databaseEvents/${event}`);
      file.execute(msg, isNsfw);
    }
  },
};
