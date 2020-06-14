/* eslint-disable no-shadow */
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const { icyID } = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const mongoose = require('mongoose');
require('dotenv').config();
require('./util/eventLoader')(client);

const log = message => {
    console.log(`[${moment().format('YYYY-DD-MM HH:mm:ss')}] ${message}`);
};

client.queue = new Map();
client.deleteTime = 10;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = ['economy', 'fun', 'info', 'games', 'moderation', 'music', 'nsfw', 'owner'];

fs.readdir('./commands/', (err, directory) => {
    if (err) console.error(err);

    directory.forEach(category => {
        fs.readdir(`./commands/${category}/`, (err, command) => {
            if(err) console.error(err);
            log(chalk.bgBlack.white(`Category Loaded: ${category}`));
            command.forEach(commands => {
                let cmd = require(`./commands/${category}/${commands}`);
                client.commands.set(cmd.help.name, cmd);
                cmd.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, cmd.help.name);
                });
            });
        });
    });
});


client.reload = (category, command) => {
    return new Promise((resolve, reject) => {
        if(!client.categories.includes(category)) return reject(`${category} was not found`);
        if (!command) {
            try {
                fs.readdir(`./commands/${category}/`, (err, commands) => {
                    if (err) return console.error(err);

                    commands.forEach(command => {
                        command = command.slice(0, -3);
                        delete require.cache[require.resolve(`./commands/${category}/${command}`)];
                        let cmd = require(`./commands/${category}/${command}`);
                        client.commands.delete(command);
                        client.aliases.forEach((cmd, alias) => {
                            if (cmd === command) client.aliases.delete(alias);
                        });
                        client.commands.set(command, cmd);
                        cmd.conf.aliases.forEach(alias => {
                            client.aliases.set(alias, cmd.help.name);
                        });
                    });
                });

                resolve();
            } catch (e) {
                reject(e);
            }
        } else {
            try {
                delete require.cache[require.resolve(`./commands/${category}/${command}`)];
                let cmd = require(`./commands/${category}/${command}`);
                client.commands.delete(command);
                client.aliases.forEach((cmd, alias) => {
                    if (cmd === command) client.aliases.delete(alias);
                });
                client.commands.set(command, cmd);
                cmd.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, cmd.help.name);
                });

                resolve();

            } catch (e) {
                reject(e);
            }
        }
    });
};

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) return console.error(err);
    console.log(chalk.bgBlack.green('Connected to the MongoDB Database'));
});

client.elevation = message => {
    if (message.channel.type === 'dm') return;
    let permLvl = 0;
    if (message.member.hasPermission('MANAGE_MESSAGES')) permLvl = 1;
    if (message.member.hasPermission('BAN_MEMBERS')) permLvl = 2;
    if (message.member.hasPermission('MANAGE_GUILD')) permLvl = 3;
    if (message.member.id === message.guild.ownerID) permLvl = 4;
    if (message.author.id === process.env.OWNER_ID || message.author.id === icyID) permLvl = 5;
    return permLvl;
};

client.login(process.env.BOT_TOKEN);