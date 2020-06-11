const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    const { body } = await superagent
    .get('https://nekos.life/api/v2/img/fox_girl');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle(`OwO, Here's your Kitsune`)
    .setImage(body.url);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['foxgirls'],
    permLevel: 0,
};

exports.help = {
    name: 'kitsune',
    description: 'Kitsunes (Fox Girls)',
    usage: 'kitsune',
};