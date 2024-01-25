const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.reply('Please provide something to say.');
    }

    const sayMessage = args.join(' ');

    const embedDetails = {
        color: '#7289DA',
        description: sayMessage,
        fields: []
    };

    try {
        await message.channel.send('Please enter the title for the embed: (type "cancel" to cancel)');
        const titleResponse = await awaitMessage(message);

        if (titleResponse.content.toLowerCase() === 'cancel') {
            return message.channel.send('Embed creation cancelled.');
        } else {
            embedDetails.title = titleResponse.content;
        }

        const footerMessage = await message.channel.send('Please enter the footer text for the embed: (type "none" for no footer)');
        const footerResponse = await awaitMessage(message);

        if (footerResponse.content.toLowerCase() !== 'none') {
            embedDetails.footer = { text: footerResponse.content };
        }

        footerMessage.delete().catch(console.error);

        let fieldCount = 1;

        while (true) {
            const fieldMessage = await message.channel.send(`Please enter the name for field ${fieldCount} or type "stop" to finish:`);
            const nameResponse = await awaitMessage(message);

            if (nameResponse.content.toLowerCase() === 'stop') {
                fieldMessage.delete().catch(console.error);
                break;
            }

            const valueMessage = await message.channel.send(`Please enter the value for field ${fieldCount}:`);
            const valueResponse = await awaitMessage(message);

            embedDetails.fields.push({ name: nameResponse.content, value: valueResponse.content });
            fieldCount++;

            valueMessage.delete().catch(console.error);
            fieldMessage.delete().catch(console.error);
        }

        const finalEmbed = new MessageEmbed(embedDetails);
        message.channel.send(finalEmbed);
    } catch (error) {
        console.error('Error:', error);
        message.reply('There was an error while processing your command.');
    }
};

async function awaitMessage(message) {
    try {
        const filter = (msg) => msg.author.id === message.author.id;
        const response = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
        return response.first();
    } catch (error) {
        console.error('Error:', error);
        message.reply('There was an error while processing your command.');
    }
}

module.exports.details = {
    name: 'Say',
    author: 'Hotsuop#0000',
    icon: 'URL',
    description: 'Say command description with options for regular or embedded messages.',
    usage: '!say <message>',
};
