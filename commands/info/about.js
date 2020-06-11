// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

exports.run = (client, message) => {
    const Settings = require(`${process.cwd()}/models/settings`);

    Settings.findOne({
        guildID: message.guild.id,
    }, (err, settings) => {
        if(err) console.error(err);

        const prefix = settings.prefix;

        message.delete();
        const embed = new Discord.MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle('About the bot')
        .addField('About The Bot', `Bruh is a bot created by ${process.env.OWNER_NAME}, made for any discord server that needs fun and moderating. It is written with Discord.js (A node.js module). Too see more info about the bot, type ${prefix}info`);

        message.channel.send({ embed });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'about',
    description: 'About the bot.',
    usage: 'about',
};