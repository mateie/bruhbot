const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if(message.mentions.users.size < 1) return message.reply('You must mention a user to kick').catch(console.error);
    if(user.id === message.author.id) return message.reply('You can\'t kick yourself');
    if(user.id === client.user.id) return message.reply('You can\'t kick the bot :facepalm:');

    if(message.mentions.users.first().id === '401269337924829186') return message.reply('You can\'t kick my developer');
    if(reason.length < 1) reason = 'No reason provided';

    if(!message.guild.member(user).kickable) return message.reply('I can\'t kick that member');

    const embed = new Discord.MessageEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .addField('Action', 'Kick')
    .addField('User', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);

    if(user.bot) return;
    message.mentions.users.first().send({ embed }).catch(e => {
        if(e) return;
    });

    message.guild.member(user).kick();

    let logChannel = message.guild.channels.find('name', 'logs');
    if(!logChannel) {
        message.channel.send({ embed });
    } else {
        client.channels.get(logChannel.id).send({ embed });
        message.channel.send({ embed });
    }

    if(user.bot) return;
    message.mentions.users.first().send({ embed }).catch(e => {
        if(e) return;
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2,
};

exports.help = {
    name: 'kick',
    description: 'Kicks the mentioned user',
    usage: 'kick [mention] [reason]',
};