const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    if(!message.mentions.users.first()) return message.reply('You need to mention someone to feed them');
    if(message.mentions.users.first().id == client.user.id && message.author.id !== '401269337924829186') return message.channel.send('I\'m not hungry mate');
    if(message.mentions.users.first().id == client.user.id && message.author.id == '401269337924829186') return message.reply('I need more RAM ples :(');

    const { body } = await superagent
    .get('https://nekos.life/api/v2/img/feed');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle(`${message.mentions.users.first().username}, you got fed by ${message.author.username} OwO`)
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
    name: 'feed',
    description: 'Feed someone UwU',
    usage: 'feed',
};