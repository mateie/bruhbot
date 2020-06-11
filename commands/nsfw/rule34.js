const Discord = require('discord.js');
const axios = require('axios');

exports.run = async (client, message, args) => {
    if(!message.channel.nsfw) {
        return message.channel.send(this.error.not_nsfw);
    }

    if(!args[0]) {
        return message.channel.send(this.error.no_tags);
    }

    let rule34Search = `https://rule34.xxx/index.php?page=dapi&json=1&s=post&q=index&limit=30&tags=${args[0]}`;
    let rule34CDN = `https://img.rule34.xxx/images/`;

    axios.get(rule34Search)
    .then(res => {
        let data = res.data;
        let randomImage = data[Math.floor(Math.random() * data.length)];
        let randomImageName = randomImage.image;
        let randomImageDict = randomImage.directory;

        rule34CDN = `${rule34CDN}${randomImageDict}/${randomImageName}`;
        console.log(rule34CDN);

        const embed = new Discord.MessageEmbed()
        .setImage(rule34CDN);

        return message.channel.send({ embed });
    })
    .catch(err => {
        console.error(err);
        return message.channel.send(this.error.no_results);
    });
};

exports.error = {
    'not_nsfw': 'This channel is not NSFW',
    'no_tags': 'Specify a tag',
    'no_results': 'No results found',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r34'],
    permLevel: 0,
};

exports.help = {
    name: 'rule34',
    description: 'Gives a random Rule34 image',
    usage: 'rule34 [tag]',
};