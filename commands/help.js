const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const DEFAULT_PREFIX = 'v>'

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix == null) prefix = DEFAULT_PREFIX

    let helpEmbed = new MessageEmbed()
      .setAuthor("Viola", message.client.user.displayAvatarURL())
      .setTitle("Command List")
      .setDescription("List of all commands")
      .setColor("#eb7434")
      .setThumbnail(message.author.displayAvatarURL());

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
