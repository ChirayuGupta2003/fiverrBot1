const { id } = require("../config.json");

module.exports = {
  name: "guildCreate",
  execute(guild, _, client) {
    client.users.fetch(id, false).then((user) => {
      user.send(`Added to new guild ${guild.id}`);
    });
  },
};
