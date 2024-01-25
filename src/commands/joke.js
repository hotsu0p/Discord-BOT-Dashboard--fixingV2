const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const config = require('../config/config.json');

module.exports.run = async (client, message, args) => {
  try {
    const res = await snekfetch.get('https://official-joke-api.appspot.com/random_joke');
    const joke = res.body;

    if (!joke || !joke.setup || !joke.punchline) {
      return message.channel.send('Failed to fetch a joke. Please try again later.');
    }

    const embed = new MessageEmbed()
      .setColor('#ff9900')
      .setTitle('Random Joke')
      .addField('Setup', joke.setup)
      .addField('Punchline', joke.punchline)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL());

    message.channel.send({ embeds: [embed] });
  } catch (err) {
    console.error('Error fetching or sending joke:', err);
    message.channel.send('Failed to fetch or send a joke. Please try again later.');
  }
};

module.exports.details = {
  name: 'Joke',
  author: 'YourName#0000',
  icon: 'URL',
  description: 'Get a random joke!',
  usage: `${config.prefix}joke`,
};
