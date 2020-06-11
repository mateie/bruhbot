const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    const { body } = await superagent
    .get('https://nekos.life/api/v2/img/ngif');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle('Neko Gif UwU')
    .setImage(body.url);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['nekogif'],
    permLevel: 0,
};

exports.help = {
    name: 'ngif',
    description: 'Neko GIFs',
    usage: 'ngif',
};