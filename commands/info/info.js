const Discord = require('discord.js');
const info = require(`${process.cwd()}/data/infoMsgs.json`);

exports.run = (client, message) => {
    const embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random() * 16777215))
    .setTitle('Bruh Info:', '')
    .addField('Important Informatoin', info.infoMsg1)
    .addField('Inviting the Bot', info.infoMsg2);

    message.author.send({ embed }).catch(e => {
        if(e) {
            message.channel.end(`Error: You have your DMs closed, I'll send it here`);
            message.channel.send({ embed });
        }
    });

    message.reply('Check your DMs');
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info'],
    permLevel: 0,
};

exports.help = {
    name: 'invite',
    description: 'DMs you the bot\'s invite link',
    usage: 'invite',
};