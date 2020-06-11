const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

exports.run = (client, message) => {
    randomPuppy('awwnime')
    .then(url => {
        const embed = new Discord.MessageEmbed()
        .setImage(url)
        .setColor('#ff9900');

        return message.channel.send({ embed });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'awwnime',
    description: 'Sends a random awwnime image',
    usage: 'awwnime',
};