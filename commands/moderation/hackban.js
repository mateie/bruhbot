const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = args[0];
    if(args[0] === message.author.id) return message.reply('You can\'t ban yourself');
    if(user === client.user.id) return message.reply('You can\'t ban the bot dumbass');
    if(args[0] === '401269337924829186') return message.reply('You can\'t ban my developer');
    if(!user) return message.reply('You need to input a User ID');

    if(reason.length < 1) {
        reason = 'No reason provided';
    }

    message.guild.members.ban(user, { days: 7, reason: reason }).catch(e => {
        if(e) return message.channel.send('That user has already been banned or I don\'t have permission or my role isn\'t high enough');
    });

    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action', 'HackBan')
    .addField('User', `${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator}(${user})`)
    .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);

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
    guildOnly: false,
    aliases: [],
    permLevel: 4,
};

exports.help = {
    name: 'hackban',
    description: 'Forcebans a user',
    usage: 'hackban [user id] [reason]',
};