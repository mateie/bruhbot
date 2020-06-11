const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    if(!message.mentions.users.first()) return message.reply('You need to mention someone to kiss them UwU');
    if(message.mentions.users.first().id == client.user.id && message.author.id !== '401269337924829186') return message.reply('No kissing unless you\'re my develoepr :v');
    if(message.mentions.users.first().id == message.author.id) return message.reply('What, that\'s not possible');
    if(message.mentions.users.first().id == client.user.id && message.author.id == '401269337924829186') return message.reply('Mwah <3');

    const { body } = await superagent
    .get('https://nekos.life/api/kiss');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle(`${message.author.username} kissed ${message.mentions.users.first().username} :heart:`)
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
    name: 'kiss',
    description: 'Kisses someone UwU',
    usage: 'kiss',
};