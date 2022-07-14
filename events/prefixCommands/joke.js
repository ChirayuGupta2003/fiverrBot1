const request = require("request");
module.exports = {
  execute(msg) {
    request("https://icanhazdadjoke.com/", { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      msg.reply(body.joke);
    });
  },
};
