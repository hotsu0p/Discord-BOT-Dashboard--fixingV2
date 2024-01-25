const { Calculator } = require('weky');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "calculator",
  aliases: ["ti82", "taschenrechner"],
  category: "🏫 School Commands",
  description: "Allows you to use a calculator",
  usage: "calc",
  type: "math",
  run: async (client, message, args, cmduser, text, prefix) => {
    // Your code to check guild settings and language settings

    await Calculator({
      message: message,
      embed: {
        title: 'Calculator',
        color: 'RANDOM', // Set your desired color here
        footer: 'Test', // Set your desired footer text
        timestamp: false,
      },
      disabledQuery: 'Calculator got disabled!',
      invalidQuery: 'The provided equation is invalid!',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
    });
  }
};
