const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();

    if(message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them').catch(console.error);
    if(message.mentions.users.first().id === message.author.id) return message.channel.send('I can\'t let you do that, you can\'t ban yourself mate');
    if(user.id === client.user.id) return message.channel.send('Did you actually try to ban the bot? :facepalm:');
    if(message.mentions.users.first().id === '401269337924829186') return message.channel.send('You can\'t ban the maker of me');
    if(reason.length < 1) reason = 'No reason provded';
    let botRolePos = message.guild.member(client.user).roles.highest.position;
    let rolePos = message.guild.member(user).roles.highest.position;
    let userRolePos = message.member.roles.highest.position;

    if(userRolePos <= rolePos) return message.channel.send(':x:**Error:** Cannot ban provided member because they have a role that is shigher or equal to you');
    if(botRolePos <= rolePos) return message.channel.send(':x:**Error:** Cannot bant provided member because they have a role that is higher or equal to me');
    if(!message.guild.member(user).bannable) {
        message.channel.send(`:negative_square_cross_mark: I cannot ban that member. My role might not be high enough or It's an internal error`);
        return;
    } else {
        const embed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .addField('Action:', 'Ban')
        .addField('User', `${user.username}#${user.discriminator} (${user.id})`)
        .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason', reason);
        if(user.bot) return;

        message.mentions.users.first().send({ embed }).catch(e => {
            if(e) return;
        });

        message.guild.members.ban(user.id, { days: 7, reason: reason });
        let logChannel = message.guild.channels.find('name', 'logs');
        if(!logChannel) {
            message.channel.send({ embed });
        } else {
            client.channel.get(logChannel.id).send({ embed });
            message.channel.send({ embed });
        }
        if(user.bot) return;
        message.mentions.users.first().send({ embed }).catch(e => {
            if(e) return;
        });

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2,
};

exports.help = {
    name: 'ban',
    description: 'Ban the mentioned user',
    usage: 'ban [mention] [reason]',
};