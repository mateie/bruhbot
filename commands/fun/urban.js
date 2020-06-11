const urban = require('urban');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(args.length < 1) {
        return message.channel.send('Enter a word');
    }

    let word = args.join(' ');

    urban(word).first(json => {
        if(!json) {
            return message.channel.send(`${word} doesn't exist`);
        }

        let newStr = json.definition.match(/(.|[\r\n]){1,2040}/g);
        if(newStr.length >= 2) {
            const def = new Discord.MessageEmbed()
            .setTitle(json.word)
            .setDescription(newStr[0] + '...')
            .addField('Upvotes', json.thumbs_up, true)
            .addField('Downvotes', json.thumbs_down, true)
            .setTimestamp(new Date())
            .setFooter(`Written by ${json.author}`);

            message.channel.send(def);
        } else {
            const def = new Discord.MessageEmbed()
            .setTitle(json.word)
            .setDescription(json.definition)
            .addField('Upvotes', json.thumbs_up, true)
            .addField('Downvotes', json.thumbs_down, true)
            .setTimestamp(new Date())
            .setFooter(`Written by ${json.author}`);

            message.channel.send(def);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dictionary', 'ub'],
    permLevel: 0,
};

exports.help = {
    name: 'urban',
    description: 'Search the Urban Dictionary',
    usage: 'urban <word>',
};