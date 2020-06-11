const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message) => {
    let warns = JSON.parse(fs.readFileSync(`${process.cwd()}/warnings.json`, 'utf8'));
    let user = message.mentions.users.first();
    if(message.mentions.users.size < 1) return message.reply('Mention someone to check their warns').catch(console.error);
    if(!user) return message.reply('Coulnd\'t find that user...');
    if(!warns[user.id]) {
        warns[user.id] = {
            warns: 0,
        };
    }

    const embed = new Discord.MessageEmbed()
    .setColor(0xFFFF01)
    .setTimestamp()
    .addField('Action', 'Warn Check')
    .addField('User', `${user.username}#${user.discriminator}`)
    .addField('Number of Warnings', warns[`${user.id}, ${message.guild.id}`].warns);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'warnLevel',
    description: 'Show how many warnings a user has',
    usage: 'warnlevel [mention]',
};