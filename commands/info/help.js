const Discord = require('discord.js');

exports.run = (client, message, args) => {

    const category = args[0];
    const commandName = args[1];

    const Settings = require(`${process.cwd()}/models/settings`);

    Settings.findOne({
        guildID: message.guild.id,
    }, (err, settings) => {
        if(err) console.error(err);

        let prefix = settings.prefix;

        if(!category && !commandName) {
            return message.channel.send(`Usage: ${prefix}${this.help.usage}`);
        } else if(category == 'economy') {
            if(!commandName) {
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Help -> Economy')
                .setDescription('Commands for Economy');
                client.commandsEcon.forEach(cmd => {
                    embed.addField('Name', cmd.help.name, true)
                    .addField('Description', cmd.help.description, true)
                    .addField('Usage', cmd.help.usage, true);
                });

                return message.channel.send({ embed });
            } else {
                let cmd = client.commandsEcon.get(commandName);
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`Help -> Economy -> ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .setDescription(`Command: ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .addField('Name', cmd.help.name, true)
                .addField('Description', cmd.help.description, true)
                .addField('Usage', cmd.help.usage, true);

                return message.channel.send({ embed });
            }
        } else if(category == 'fun') {
            if(!commandName) {
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Help -> Fun')
                .setDescription('Commands for Fun');
                client.commandsFun.forEach(cmd => {
                    embed.addField('Name', cmd.help.name, true)
                    .addField('Description', cmd.help.description, true)
                    .addField('Usage', cmd.help.usage, true);
                });

                return message.channel.send({ embed });
            } else {
                let cmd = client.commandsFun.get(commandName);
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`Help -> Fun -> ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .setDescription(`Command: ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .addField('Name', cmd.help.name, true)
                .addField('Description', cmd.help.description, true)
                .addField('Usage', cmd.help.usage, true);

                return message.channel.send({ embed });
            }
        } else if(category == 'info') {
            if(!commandName) {
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Help -> Info')
                .setDescription('Commands for Info');
                client.commandsModeration.forEach(cmd => {
                    embed.addField('Name', cmd.help.name, true)
                    .addField('Description', cmd.help.description, true)
                    .addField('Usage', cmd.help.usage, true);
                });

                return message.channel.send({ embed });
            } else {
                let cmd = client.commandsInfo.get(commandName);
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`Help -> Info -> ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .setDescription(`Command: ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .addField('Name', cmd.help.name, true)
                .addField('Description', cmd.help.description, true)
                .addField('Usage', cmd.help.usage, true);

                return message.channel.send({ embed });
            }
        } else if(category == 'moderation') {
            if(!commandName) {
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Help -> Moderation')
                .setDescription('Commands for Moderation');
                client.commandsModeration.forEach(cmd => {
                    embed.addField('Name', cmd.help.name, true)
                    .addField('Description', cmd.help.description, true)
                    .addField('Usage', cmd.help.usage, true);
                });

                return message.channel.send({ embed });
            } else {
                let cmd = client.commandsModeration.get(commandName);
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`Help -> Moderation -> ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .setDescription(`Command: ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .addField('Name', cmd.help.name, true)
                .addField('Description', cmd.help.description, true)
                .addField('Usage', cmd.help.usage, true);

                return message.channel.send({ embed });
            }
        } else if(category == 'music') {
            if(!commandName) {
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Help -> Music')
                .setDescription('Commands for Music');
                client.commandsMusic.forEach(cmd => {
                    embed.addField('Name', cmd.help.name, true)
                    .addField('Description', cmd.help.description, true)
                    .addField('Usage', cmd.help.usage, true);
                });

                return message.channel.send({ embed });
            } else {
                let cmd = client.commandsMusic.get(commandName);
                const embed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`Help -> Music -> ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .setDescription(`Command: ${commandName.charAt(0).toUpperCase() + commandName.slice(1)}`)
                .addField('Name', cmd.help.name, true)
                .addField('Description', cmd.help.description, true)
                .addField('Usage', cmd.help.usage, true);

                return message.channel.send({ embed });
            }
        }

        message.channel.send(`Usage: ${prefix}${this.help.usage}`);
    });
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['h', 'sos'],
    permLevel: 0,
};

exports.help = {
    name: 'help',
    description: 'Displays all the avaliable commands for your permission level',
    usage: 'help <category> <command>',
};