const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message) => {
    if(!message.mentions.users.first()) return message.reply('Mention a user to slap them');
    if(message.mentions.users.first().id === '401269337924829186') return message.reply('You can\'t slap the dev dumbass');
    if(message.mentions.users.first().id == client.user.id && message.author.id === '401269337924829186') {
        const { body } = await superagent
        .get('https://nekos.life/api/v2/img/slap');

        const embed = new Discord.MessageEmbed()
        .setColor('#ff9900')
        .setTitle(`Uno Reverse card *slaps* ${message.mentions.users.first().username}`)
        .setImage(body.url);

        return message.channel.send({ embed });
    } else if(message.mentions.users.first().id == client.user.id && message.author.id !== '401269337924829186') {
        return message.channel.send('Ouch *owww*');
    }

    const { body } = await superagent
    .get('https://nekos.life/api/v2/img/slap');

    const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle(`OwO ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
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
    name: 'slap',
    description: 'Slap someone',
    usage: 'slap',
};