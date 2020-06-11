const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let reason = args.slice(1).join(' ');
    if (!message.mentions.users.first()) return message.reply('Please mention a user to mute them');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
    if (message.mentions.users.first().id === '401269337924829186') return message.reply('You can\'t mute the dev');
    if (message.author.id === message.mentions.users.first()) return message.reply('You can\'t mute yourself...');
    if (!muteRole) {
        try {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permissions: [],
                },
            });

            message.guild.channels.cache.forEach(async (channel) => {
                await channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    READ_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (reason.length < 1) reason = 'No reason provided';
    if (message.mentions.users.size < 1) return message.reply('You must mention a user to mute them').catch(console.error);

    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I don\'t have enough permissions').catch(console.error);
    if (message.guild.member(user).roles.cache.has(muteRole.id)) {
        if (message.content.includes('!mute')) return message.reply('That user is already muted');
        message.guild.member(user).roles.remove(muteRole).then(() => {
            const embed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Actio:', 'Unmute')
                .addField('User', `${user.username}#${user.discriminator} (${user.id})`)
                .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);

            let logChannel = message.guild.channels.find(channel => channel.name === 'logs');

            if (!logChannel) {
                message.channel.send({ embed });
            } else {
                client.channels.get(logChannel.id).send({ embed });
                message.channel.send({ embed });
            }

            if (user.bot) return;
            message.mentions.users.first().send({ embed }).catch(e => {
                if (e) return;
            });
        });
    } else {
        if (message.content.includes('!unmute')) return message.reply('That user is not muted');
        message.guild.member(user).roles.add(muteRole).then(() => {
            const embed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Action', 'Mute')
                .addField('User', `${user.username}#${user.discriminator} (${user.id})`)
                .addField('Mod', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);

            message.channel.send({ embed });

            if (user.bot) return;
            message.mentions.users.first().send({ embed }).catch(e => {
                if (e) return;
            });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unmute'],
    permLevel: 2,
};

exports.help = {
    name: 'mute',
    description: 'mute/unmute a mentioned user',
    usage: 'un/mute [mention] [reason]',
};