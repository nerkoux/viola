const express = require('express');
const app = express();
const db = require('quick.db')


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});
app.get("/thanks", (request, response) => {
  response.sendfile(__dirname + "/t.html");
});
//listener
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


/**
 * Module Imports
 */
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, DEFAULT_PREFIX } = require("./config.json");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.queue = new Map();
const cooldowns = new Collection();

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity("Music v>help", { type: "LISTENING" });
});

client.on('guildCreate', function(guild) {
  let embed = new MessageEmbed()
  .setTitle('Jingle Joined A Guild.')
  .addField('Guild Name', guild.name, true)
  .addField('Guild Member Count', guild.members.cache.size, true)
  .addField('Guild ID', guild.id, true)
  .addField('Guild Owner Name', guild.owner.user.username, true)
  .setTimestamp()
  .setColor("#eb7434")
  client.channels.cache.get('727507849101443072').send(embed)
})

client.on('guildDelete', function(guild) {
  let embed = new MessageEmbed()
  .setTitle('Jingle Left A Guild.')
  .addField('Guild Name', guild.name, true)
  .addField('Guild Member Count', guild.members.cache.size, true)
  .addField('Guild ID', guild.id, true)
  .addField('Guild Owner Name', guild.owner.user.username, true)
  .setTimestamp()
  .setColor("#eb7434")
  client.channels.cache.get('727507849101443072').send(embed)
})



client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let PREFIX = db.get(`prefix_${message.guild.id}`)
  if(!PREFIX) PREFIX = DEFAULT_PREFIX;
  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.").catch(console.error);
    }
  }
});
