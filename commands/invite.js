const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite this bot to your server",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor("Invite Jingle", message.client.user.displayAvatarURL())
      .setTitle("Invite me to your server")
      .setDescription("[Click Here](https://discord.com/oauth2/authorize?client_id=734027963930247248&permissions=0&scope=bot)")
      .setColor("#eb7434")
      .setThumbnail(message.author.displayAvatarURL());

  
    

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
