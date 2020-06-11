const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    const { body } = await superagent
    .get('https://nekos.life/api/v2/img/wallpaper');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setImage(body.url);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'wallpaper',
    description: 'Anime Wallpapers',
    usage: 'wallpaper',
};