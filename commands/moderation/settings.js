/* eslint-disable no-lonely-if */
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
    if (!args) return message.reply(`Usage: ${this.help.usage}`);
    if (args[0] === 'template') {
        message.channel.send('Here\'s the settings template', { files: ['./temp/default.json'] });
    } else if (args[0] === 'example') {
        message.channel.send('Here\'s the settings example', { files: ['./temp/example.json'] });
    } else if (args[0] === 'upload') {
        if (!message.attachments.first() || message.attachments.first().name.split('.').pop() !== 'json') {
            return message.reply('Please attach a proper .json file');
        } else {

            const file = fs.createWriteStream(`${process.cwd()}/temp/${message.guild.id}.json`);
            https.get(message.attachments.first().url, async function(res) {
                res.pipe(file);
                file.on('finish', async function() {
                    await file.close(console.log('Settings Downloaded'));
                    let setting = JSON.parse(fs.readFileSync(`${process.cwd()}/temp/${message.guild.id}.json`, 'utf8'));

                    if (!setting['settings']) {
                        message.reply('Please upload a proper settigns file');
                        return fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                    } else {
                        if (!setting['settings'].prefix || setting['settings'].prefix.length > 21) {
                            message.reply('Prefix should be between 1 and 20 characters long');
                            return fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                        }

                        if (!setting['settings'].welcomechannel == undefined) {
                            message.reply('Please enter a proper Welcome Channel name');
                            return fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                        }

                        if (!setting['settings'].logschannel == undefined) {
                            message.reply('Please neter a proper Logs Channel name');
                            return fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                        }
                    }

                    const Settings = require(`${process.cwd()}/models/settings`);
                    Settings.findOne({
                        guildID: message.guild.id,
                    }, (err, settings) => {
                        if (err) console.error(err);

                        if (!settings) {

                            const newSettings = new Settings({
                                _id: mongoose.Types.ObjectId(),
                                guildID: message.guild.id,
                                prefix: setting['settings'].prefix,
                                welcomechannel: setting['settings'].welcomechannel,
                                logschannel: setting['settings'].logschannel,
                            });
                            newSettings.save();
                            fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                            return message.channel.send('Settings for this server have been updated');
                        } else if (settings) {
                            settings.prefix = setting['settings'].prefix;
                            settings.welcomechannel = setting['settings'].welcomechannel;
                            settings.logschannel = setting['settings'].logschannel;

                            settings.save();
                            fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`);
                            return message.channel.send('Settings for this server have been updated');
                        }
                    });
                })
                .on('error', async function() {
                    await fs.unlinkSync(`${process.cwd()}/temp/${message.guild.id}.json`, function(err) {
                        console.log(err);
                    });
                });
            });
        }
    } else if (args[0] === 'current') {
        const Settings = require(`${process.cwd()}/models/settings`);
        Settings.findOne({
            guildID: message.guild.id,
        }, async (err, settings) => {
            if (!settings) {
                return message.reply('This server hasn\'t been set up yet');
            } else {
                let dict = {
                    settings: {
                        "prefix": settings.prefix,
                        "welcomechannel": settings.welcomechannel,
                        "logschannel": settings.logschannel,
                    },
                };

                let dictstring = JSON.stringify(dict, null, 2);
                fs.writeFile(`${process.cwd()}/temp/currentSettings.json`, dictstring, function(err) {
                    if (err) {
                        console.log('error', err);
                    }
                });

                const attachment = new Discord.Attachment(`${process.cwd()}/temp/currentSettings.json`);
                await message.channel.send(attachment);
                fs.unlinkSync(`${process.cwd()}/temp/currentSettings.json`);
            }
        });
    } else {
        return message.reply(`Usage: ${this.help.usage}`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['setup'],
    permLevel: 4,
};

exports.help = {
    name: 'settings',
    description: 'Full bot settings upload',
    usage: 'settings current|example|template|upload (file upload)',
};