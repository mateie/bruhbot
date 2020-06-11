const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    if(!message.mentions.users.first()) return message.reply('Mention someone to soft ban them');
    let user = message.mentions.users.first();
    let logChannel = message.guild.channels.cache.find(val => val.name === 'logs');
    if(!logChannel) return message.reply('I can\'t find a logs channel');
    if(message.mentions.users.size < 1) return message.reply('Mention someone to soft banthem').catch(console.error);
    if(message.mentions.users.first().id === message.author.id) return message.reply('You can\'t soft ban yourself');
    if(message.mentions.users.first().id === '401269337924829186') return message.reply('You can\'t soft ban my dev');
    if(reason.length < 1) reason = 'No reason provided';

    if(!message.guild.member(user).bannable) return message.reply(`:no_entry_sign: I can't ban that member`);

    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action', ' Soft Ban')
    .addField('User', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);

    message.mentions.users.first().send({ embed });
    message.guild.members.ban(user.id, { days: 7, reason: reason });
    message.guild.members.unban(user.id, reason);

    const Settings = require(`${process.cwd()}/models/settings`);
    Settings.findOne({
        guildID: message.guild.id,
    }, (err, settings) => {
        let logs = settings.logs;
        let logChannelSettings = settings.logChannel;
        if(logs == true && logChannelSettings !== 'none') {
            message.channel.send(`:hammer: Done. <@${user.id}> has been Soft banned. Also I've logged the ban in <#${logChannelSettings}>`);
            if(client.channels.cache.get(logChannel)) client.channels.cache.get(logChannel).send({ embed });
        } else {
            return message.channel.send(`:hammer: Done. You don't have to worry about that cunt anymore, I have banned them`);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sban'],
    permLevel: 2,
};

exports.help = {
    name: 'softban',
    description: 'Soft ban the mentioned user',
    usage: 'softban [mention] [reason]',
};