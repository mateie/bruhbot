const config = require(`${process.cwd()}/settings.json`);
const fs = require('fs');
const mongoose = require('mongoose');
module.exports = async message => {
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;

    let client = message.client;
    let blacklist = JSON.parse(fs.readFileSync(`${process.cwd()}/blacklist.json`, 'utf8'));

    const Settings = require(`${process.cwd()}/models/settings`);

    Settings.findOne({
        guildID: message.guild.id,
    }, async (err, settings) => {
        if (!settings) {
            if (!message.content.startsWith(config.prefix)) return;
            if (message.content.startsWith(config.prefix)) {
                let command = message.content.split(' ')[0].slice(config.prefix.length);
                if (client.commands.has(command)) {
                    if (!message.content.startsWith(config.prefix + 'settings')) return message.channel.send(`Please run ${config.prefix}settings to set up the bot first`);
                } else if (client.aliases.has(command)) {
                    if (!message.content.startsWith(config.prefix + 'settings')) return message.channel.send(`Please run ${config.prefix}settings to set up the bot first`);
                }
            }
            let command = message.content.split(' ')[0].slice(config.prefix.length);
            let params = message.content.split(' ').slice(1);
            let perms = client.elevation(message);

            let cmd;

            if(client.commands.has(command)) {
                cmd = client.commands.get(command);
            } else if(client.aliases.has(command)) {
                cmd = client.commands.get(client.aliases.get(command));
            }

            if(cmd) {
                if(perms < cmd.conf.permLevel) {
                    console.log(`Command: ${config.prefix}${cmd.help.name} - Guild: ${message.guild.name} ID: ${message.guild.id} - By: ${message.author.username}#${message.author.discriminator}`);
                    return;
                }

                cmd.run(client, message, params, perms);
                console.log(`Command: ${config.prefix}${cmd.help.name} - Guild: ${message.guild.name} ID: ${message.guild.id} - By: ${message.author.username}#${message.author.discriminator}`);
            }
        } else {

            if (!blacklist[message.author.id]) {
                blacklist[message.author.id] = { state: false };
            }

            if (blacklist[message.author.id].state === true) return;

            if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
                if (message.content.includes('prefix')) return message.reply(`My current config.prefix is ${settings.config.prefix}`);
            }
        }

        const Coins = require(`${process.cwd()}/models/coins`);

        function generateCoins() {
            return Math.floor(Math.random() * 15) + 1;
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        if (!message.content.startsWith(settings.prefix)) {
            if (parseInt(getRandomInt(4)) == 3) {
                Coins.findOne({
                    userID: message.author.id,
                }, (err, coins) => {
                    if (err) console.error(err);
                    if (!coins) {
                        const newCoins = new Coins({
                            _id: mongoose.Types.ObjectId(),
                            userID: message.author.id,
                            coins: generateCoins(),
                            lastdaily: Math.round((new Date()).getTime / 1000),
                            streak: 0,
                        });

                        newCoins.save()
                            .catch(err => console.error(err));
                    } else {
                        coins.coins = parseInt(coins.coins) + parseInt(generateCoins());
                        coins.save()
                            .catch(err => console.error(err));
                    }
                });
            }
        }

        if (!message.content.startsWith(settings.prefix)) return;
        let command = message.content.split(' ')[0].slice(settings.prefix.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);
        let cmd;

        if(client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if(client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }

        if(cmd) {
            if(perms < cmd.conf.permLevel) {
                console.log(`Command: ${settings.prefix}${cmd.help.name} - Guild: ${message.guild.name} ID: ${message.guild.id} - By: ${message.author.username}#${message.author.discriminator}`);
                return;
            }

            if(cmd.conf.enabled === true) {
                cmd.run(client, message, params, perms);
            } else {
                message.channel.send(`Command ${cmd.help.name} is disabled`);
            }
            console.log(`Command: ${settings.prefix}${cmd.help.name} - Guild: ${message.guild.name} ID: ${message.guild.id} - By: ${message.author.username}#${message.author.discriminator}`);
        }
    });
};