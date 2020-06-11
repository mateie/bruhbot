const moment = require('moment');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    let mUser = message.guild.member(user);

    if(!user && args.length > 0) {
        user = message.guild.member(args[0]).user;
        mUser = message.guild.member(args[0]);
    }

    if(!mUser) mUser = message.member;
    if(!user) user = message.author;

    let status = '';
    if(status === null) status = 'No Game';
    if(mUser.presence.activities[0] == 'CUSTOM_STATUS') {
        let cStatus = mUser.presence.activities[0].state;
        if(mUser.presence.activities[0].emoji) {
            if(mUser.presence.activities[0].emoji.animated == true) {
                cStatus = `<a:${mUser.presence.activities[0].emoji.name}:${mUser.presence.activities[0].emoji.id}> ${cStatus}`;
            }

            if(mUser.presence.activities[0].emoji.animated !== true) {
                cStatus = `<:${mUser.presence.activities[0].emoji.name}:${mUser.presence.activities[0].emoji.id}> ${cStatus}`;
            }
        }

        status = `Custom Status:\n${cStatus}\nApp:${mUser.presence.activities[1].name}`;
    } else if(mUser.presence.status === 'online') {
            status = `${capitalizeFirstLetter(mUser.presence.activities[0].type.toLowerCase())}: ${mUser.presence.activities[0].name}`;
        } else {
            status = `Not Playing`;
        }

    const embed = new Discord.MessageEmbed()
    .addField('Username', `${user.username}#${user.discriminator}`, true)
    .addField('ID', `${user.id}`, true)
    .setColor(3447003)
    .setThumbnail(`${user.avatarURL()}`)
    .setTimestamp()
    .setURL(`${user.avatarURL()}`);
    if(mUser.presence.status !== 'dnd') {
        embed.addField('Currently', `${capitalizeFirstLetter(mUser.presence.status)}`, true);
    } else {
        embed.addField('Currently', `Do Not Disturb`, true);
    }
    embed.addField('Game', status, true)
    .addField('Joined Discord', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
    .addField('Joined Server', `${moment(mUser.joinedAt).toString().substr(0, 15)}\n(${moment(mUser.joinedAt).fromNow()})`, true)
    .addField('Roles', `${mUser.roles.cache.array()}`, true)
    .addField('Is Bot?', `${user.bot.toString().toUpperCase()}`, true);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'user',
    description: 'Information about a user',
    usage: 'user @user',
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}