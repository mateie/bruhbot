const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');

exports.run = async (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let warns = JSON.parse(fs.readFileSync(`${process.cwd()}/warnings.json`, 'utf8'));
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(':x: **Error:** You don\'t have the **Kick Members** permission');
    if(message.mentions.users.size < 1) return message.reply('Mention someone to warn them').catch(console.error);
    if(user.id === message.author.id) return message.reply('You can\'t warn yourself...');
    if(user.id === process.env.OWNER_ID) return message.reply('My Developer doesn\'t need warns :wink:');
    if(reason.length < 1) reason = 'No reason provided';

    if(!warns[`${user.id}, ${message.guild.id}`]) {
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0,
        };
    }

    warns[`${user.id}, ${message.guild.id}`].warns++;

    fs.writeFile(`${process.cwd()}/warnings.json`, JSON.stringify(warns), err => {
        if(err) throw err;
    });

    const embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTimestamp()
    .addField('Action', 'Warning')
    .addField('User', `${user.username}#${user.discriminator}`)
    .addField('Warned by', `${message.author.username}#${message.author.discriminator}`)
    .addField('Number of Warnings', warns[`${user.id}, ${message.guild.id}`].warns)
    .addField('Reason', reason);

    message.channel.send({ embed });

    if(user.bot) return;
    message.mentions.users.first().send({ embed }).catch(e => {
        if(e) return;
    });

    if(warns[`${user.id}, ${message.guild.id}`].warns == 2) {
        let muteRole = message.guild.roles.find('name', 'Muted');

        let muteTime = '60s';
        message.guild.members.get(user.id).addRole(muteRole.id);
        message.reply(`${user.tag} has been temporarily muted, because he had ${warns[`${user.id}, ${message.guild.id}`].warns} warns`);

        setTimeout(() => {
            message.guild.members.get(user.id).removeRole(muteRole.id);
        }, ms(muteTime));
    }

    if(warns[`${user.id}, ${message.guild.id}`].warns == 3) {
        message.guild.member(user).kick(reason);
        message.reply(`${user.tag} has been kicked, because he had ${warns[`${user.id}, ${message.guild.id}`].warns} warns :facepalm:`);
    }

    if(warns[`${user.id}, ${message.guild.id}`].warns == 5) {
        message.guild.member(user).ban(reason);
        message.reply(`${user.tag} got banned, because he had ${warns[`${user.id}, ${message.guild.id}`].warns} warns :scream:`);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2,
};

exports.help = {
    name: 'warn',
    description: 'Warn a user',
    usage: 'warn @user [reason]',
};