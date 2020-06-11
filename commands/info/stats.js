const Discord = require('discord.js');
const fs = require('fs');
const osutils = require('os-utils');
const settings = require(`${process.cwd()}/settings.json`);
const version = require(`${process.cwd()}/package.json`);

exports.run = async (client, message) => {
    let milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) % 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24),
    days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
    days = (days < 10) ? '0' + days : days,
    hours = (hours < 10) ? '0' + minutes : minutes,
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    fs.readdir(`${process.cwd()}/commands/`, async (err, files) => {
        if(err) console.error(err);
        let totcat = files.length;
        let totcmds = new Number();

        for(let i = 0; i < files.length; i++) {
            let directory = files[i];
            fs.readdir(`${process.cwd()}/commands/${directory}/`, async (err, command) => {
                totcmds = totcmds + command.length;
            });
        }

        const prefixes = require(`${process.cwd()}/models/settings`);
        prefixes.findOne({
            guildID: message.guild.id,
        }, (err, srid) => {
            let prefix = srid.prefix;
            if(!prefix) prefix = '!';

            let globalPrefix = settings.prefix;
            osutils.cpuUsage(function(v) {
                const embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setTimestamp()
                .setTitle('Bruh Bot')
                .setDescription('Bot\'s Stats')
                .addField('\u200B', '\u200B')
                .addField('Server Prefix', prefix, true)
                .addField('Global Prefix', globalPrefix, true)
                .addField('Total Categories', `${totcat} categories`, true)
                .addField('Total Commands', `${totcmds} commands`, true)
                .addField('Total Servers', `${client.guilds.cache.size}`, true)
                .addField('Total Channels', `${client.channels.cache.size}`, true)
                .addField('Total Users', `${client.users.cache.size}`, true)
                .addField('Bot Version', version['version'], true)
                .addField('Library', 'Discord.js v12', true)
                .addField('Developer', `${process.env.OWNER_NAME}`)
                .addField('\u200B', '\u200B')
                .addField('Platform', osutils.platform(), true)
                .addField('VPS CPU Cores', osutils.cpuCount() + ' Cores', true)
                .addField('CPU Usage', `${(v * 100).toString().split('.')[0] + '.' + (v * 100).toString().split('.')[1].split('')[0] + (v * 100).toString().split('.')[1].split('')[1]}%`, true)
                .addField('Total Memory', osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1] + 'MB', true)
                .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true);

                message.channel.send({ embed });
            });
        });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['botinfo'],
    permLevel: 0,
};

exports.help = {
    name: 'stats',
    description: 'Displays bot\'s stats',
    usage: 'stats',
};