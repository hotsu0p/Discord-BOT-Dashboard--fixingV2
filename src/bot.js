const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const json = require('json-update'); // Added 'const' keyword for json variable

const config = require('./config/config.json');
const settings = require('./config/settings.json');

const client = new Discord.Client(); // Initialize Discord Client

client.commands = new Enmap();
chalk = require('chalk');
client.config = config;

// Event Handling
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Command Loading
client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
  console.log(chalk.red('Loading Commands...'))
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    if (settings.includes(commandName)) return;
    console.log(chalk.green(`[+] ${commandName}`));
    client.commands.set(commandName, props);
  });
});

// Set bot activity on ready
client.on("ready", () => {
  client.user.setActivity('Set Activity', { type: 'WATCHING' });
});

client.login(config.token); // Login to Discord with bot token

exports.client = client;
