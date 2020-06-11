const Discord = require('discord.js');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? ' day' : ' days') + ' ago';
}

exports.run = (client, message) => {

    let emojis;
    if(message.guild.emojis.cache.size === 0) {
        emojis = 'None';
    } else {
        emojis = message.guild.emojis.cache.size;
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .addField('Created', `${message.guild.createdAt.toString().substr(0, 15)}, \n${checkDays(message.guild.createdAt)}`, true)
    .addField('ID', message.guild.id, true)
    .addField('Owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
    .addField('User Count', message.guild.memberCount, true)
    .addField('Member Count', message.guild.members.cache.filter(m => !m.user.bot).size, true)
    .addField('Bot Count', message.guild.members.cache.filter(m => m.user.bot).size, true)
    .addField('AFK Timeout', message.guild.afkTimeout / 60 + ' minutes', true)
    .addField('Roles', message.guild.roles.cache.size, true)
    .addField('Channels', message.guild.channels.cache.size, true)
    .addField('Emojis', `${emojis}/100`, true)
    .addField('Verification Level', message.guild.verificationLevel, true)
    .setColor(Math.floor(Math.random() * 16777215));

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['server'],
    permLevel: 0,
};

exports.help = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    usage: 'serverinfo',
};