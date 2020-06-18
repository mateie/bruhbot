const axios = require('axios');

exports.run = (client, message, args) => {
    const game = args[0].toLowerCase();

    if (!game) {
        return message.reply('Please enter a game name');
    }

    if (message.guild.roles.cache.find(ch => ch.name === game.toUpperCase())) {
        return message.reply(`${game.toUpperCase()} already exists`);
    }

    let emoji = message.attachments.first();

    if (!emoji) {
        return message.reply('Please attach an icon file');
    }

    axios({
        url: `https://api-v3.igdb.com/search`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_API_KEY,
        },
        data: `search "${game}"; fields *;`,
    })
        .then(async res => {
            let resGame = res.data[0];
            if(!resGame) {
                return message.reply(`${game} doesn't exist, please enter a valid game`);
            }

            let originalGameName = res.data[0].name.toLowerCase();
            let gameNames = res.data[0].alternative_name.toLowerCase();

            if (!gameNames.includes(game) && !originalGameName.includes(game)) {
                return message.reply(`${game} doesn't exist, please enter a valid game`);
            }

            const gameRole = {
                data: {
                    name: game.toUpperCase(),
                    color: this.randomHex(),
                    mentionable: true,
                },
                reason: `Automatically generated role for ${game.toUpperCase()}`,
            };

            await message.guild.roles.create(gameRole);

            let role = message.guild.roles.cache.find(ch => ch.name === game.toUpperCase());

            const gameEmoji = {
                roles: [role],
                reason: `Automatically generated Emoji for ${game.toUpperCase()}`,
            };

            await message.guild.emojis.create(emoji.url, game, gameEmoji);

            const gameCat = {
                type: 'category',
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: role.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                ],
            };

            const parent = await message.guild.channels.create(game.toUpperCase(), gameCat);

            const options = {
                gameTextGnrl: {
                    type: 'text',
                    parent: parent,
                    topic: `General channel for ${game.toUpperCase()}`,
                    reason: `Automatically Generated Channel for ${game.toUpperCase()}`,
                },
                gameTextTaP: {
                    type: 'text',
                    parent: parent,
                    topic: `Tips and Tricks channel for ${game.toUpperCase()}`,
                    reason: `Automatically Generated Channel for ${game.toUpperCase()}`,
                },
                gameVoice: {
                    type: 'voice',
                    parent: parent,
                    reason: `Automatically Generated Channel for ${game.toUpperCase()}`,
                    userLimit: 5,
                },
                gameVoiceCstm: {
                    type: 'voice',
                    parent: parent,
                    reason: `Automatically Generated Channel for ${game.toUpperCase()}`,
                    userLimit: 10,
                },
            };


            await message.guild.channels.create(`${game.toLowerCase()}-chat`, options.gameTextGnrl);
            await message.guild.channels.create('tips-and-tricks', options.gameTextTaP);
            for (let i = 1; i <= 5; i++) {
                await message.guild.channels.create(`Unranked #${i}`, options.gameVoice);
            }
            for (let j = 1; j <= 5; j++) {
                await message.guild.channels.create(`Ranked #${j}`, options.gameVoice);
            }
            for (let k = 1; k <= 2; k++) {
                await message.guild.channels.create(`Custom #${k}`, options.gameVoiceCstm);
            }

            await message.reply(`Game: ${game.toUpperCase()} added`);

        })
        .catch(e => {
            console.error(e);
        });
};

exports.randomHex = () => {
    return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addg'],
    permLevel: 4,
};

exports.help = {
    name: 'addgame',
    description: 'Adds everything in the server related to the game',
    usage: 'addgame (game name)',
};