const fs = require('fs');
const Discord = require('discord.js');

exports.run = (client, message) => {
    fs.readdir(`${process.cwd()}/shitposts/`, (err, files) => {
        if (err) console.error(err);

        const randomShitpost = files[Math.floor(Math.random() * files.length)];

        fs.readFile(`shitposts/${randomShitpost}`, (err, shitpost) => {
            if (err) console.error(err);

            const shitpostAttachment = new Discord.MessageAttachment(shitpost, randomShitpost);
            message.channel.send(shitpostAttachment);
        });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spost', 'sp', 'shitp'],
    permLevel: 0,
};

exports.help = {
    name: 'shitpost',
    description: 'Sends a random shitpost from the Bot\'s space',
    usage: 'shitpost',
};