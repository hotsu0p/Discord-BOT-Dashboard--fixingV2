const discord = require ("discord.js");
const prefix = require('../config/config.json')
const dateformat = require('dateformat')
const number = require('easy-number-formatter')

module.exports.run = (client, message, args) =>{
    const info = new MessageEmbed()
    .setColor('#b434eb')
    .setThumbnail(message.guild.iconURL())
    .setTitle(`Server Info - ${message.guild.name}`)
    .addField("Server Name", `${message.guild.name}`,true)
    .addField("Server Owner", `${message.guild.owner}`,true)
    .addField("ID", `${message.guild.id}`)
    .addField("Server Region", `${message.guild.region}`)
    .addField("Member Count", `${number.formatNumber(message.guild.memberCount)}`)
    .addField("Creation Date", dateformat(`${message.guild.createdAt}`, 'dddd, mmmm dS, yyyy'))
    .setFooter("Made by LachlanDev#8014 - Hotsuop#0000 who is now mantaing this projext and modifyed/maintaied by hotsuop#0000", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe")
    message.channel.send({embed:info})
}

module.exports.details = {
    name:'Server Info',
    author:'LachlanDev#8014 - Hotsuop#0000 who is now mantaing this projext',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Sends information about the current server!',
    usage:`${prefix}serverinfo`
}