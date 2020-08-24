const discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: "info",
  description: "Get information about the bot.",
  execute(message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix == null) prefix = 'j!'
    let totalSeconds = (message.client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 866400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
    let embed = new discord.MessageEmbed()
    .setAuthor('Jingle', message.client.user.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle('Stats And Information')
    .setColor("#eb7434")
    .setFooter('Developed By BOTOMANIA')
    .addField('Server Prefix', `${prefix}`, true)
    .addField('Server Count', message.client.guilds.cache.size, true)
    .addField('User Count', message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))
    .addField('Ping', `${message.client.ws.ping} ms`, true)
    .addField('Library', 'discord.js', true)
    .addField('Uptime', uptime, true)
    .addField('Support Server', '[Click Here To Join](https://discord.gg/cP9drmp)')
    .addField('Website', '[Click Here To Visit](https://www.botomaniadiscord.ml)')
    .addField('Invite Link', '[Click Here To Add Me In Your Server](https://discord.com/oauth2/authorize?client_id=734027963930247248&permissions=0&scope=bot)')
    
    message.channel.send(embed)
  }}