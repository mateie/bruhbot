const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message) => {
    let warns = JSON.parse(fs.readFileSync(`${process.cwd()}/warnings.json`, 'utf8'));
    let user = message.mentions.users.first();
    let reason = new String();
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(':x:**Error:** You don\'t have the **Kick Members** permission');
    if(message.mentions.users.size < 1) return message.reply('You must mention to clear their warns').catch(console.error);
    if(!user) return message.reply('Couldn\'t find that user');
    if(!warns[`${user.id}, ${message.guild.id}`]) {
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0,
        };
    } else {
        reason = 'This user doesn\'t have any warnings';
    }

    fs.writeFile(`${process.cwd()}/warnings.json`, JSON.stringify(warns), err => {
        if(err) throw err;
    });

    const embed = new Discord.MessageEmbed()
    .setColor(0xFFFF01)
    .setTimestamp()
    .addField('Action', 'Clear Warns', true)
    .addField('User', `${user.username}#${user.discriminator}`, true)
    .addField('Result', reason, true);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clw'],
    permLevel: 3,
};

exports.help = {
    name: 'clearwarns',
    description: 'Clear a user\'s warnings',
    usage: 'clearwarns [mention]',
};