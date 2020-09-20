const db = require('quick.db')
const discord = require('discord.js')
const client = new discord.Client()

module.exports = {
  name: "setprefix",
  description: "Change the bot prefix for your server.",
  async execute(message, args) {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You need to have 'manage server' permission to use that.")
    if(!args[0]) return message.channel.send("Please provide a new prefix for jingle!")
    
    if(args[1]) return message.channel.send("The prefix can not have two spaces!")
    
    db.set(`prefix_${message.guild.id}`, args[0])
    
    message.channel.send(`Prefix has been set to '${args[0]}'!`)
  }}
