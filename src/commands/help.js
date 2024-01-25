// Requirements

const Discord = require("discord.js");

// Required display prefix

const prefix = require("../config/config.json").prefix;

// All the code for your Plugin goes inside here
module.exports.run = async (client, message, args) => {
  // Create an embed object
  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Help Command")
    .setAuthor("Bard", client.user.avatarURL());

  // Add commands and their descriptions to the embed
  embed.addField("ping", "Checks the bot's response time.", true);
  embed.addField("help", "Displays this help command.", true);

  // Send the embed message
  message.channel.send(embed);
};

// IMPORTANT Allows DBD to know details about your Plugin
module.exports.details = {
  name: "help",
  author: "Bard",
  icon: "https://i.imgur.com/b586629.png",
  description: "Provides information about available commands.",
  usage: `${prefix}help`,
};
