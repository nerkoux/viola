const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "support",
  description: "Support server for any of the bot query/help",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor("Jingle Support", message.client.user.displayAvatarURL())
      .setTitle("Support Server Link")
      .setDescription(`[HERE] (https://discord.gg/A7fBFJd)`)
      .setThumbnail(message.author.displayAvatarURL());

  
    

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
