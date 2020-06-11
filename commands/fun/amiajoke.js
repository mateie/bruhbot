const Discord = require('discord.js');

exports.run = async (client, message) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    let link = `https://api.alexflipnote.dev/amiajoke?image=${avatar}`;
    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setImage(link);
    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'amiajoke',
    description: 'Am I A Joke To You?',
    usage: 'amiajoke (with or w/o @mention)',
};