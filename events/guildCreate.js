const id = process.env['id']

module.exports = {
  name: "guildCreate",
  execute(guild, _, client) {
    client.users.fetch(id, false).then((user) => {
      user.send(`Added to new guild ${guild.id}`);
    });
  },
};
