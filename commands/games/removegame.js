const axios = require('axios');

exports.run = (client, message, args) => {
    const game = args[0].toLowerCase();

    if (!game) {
        return message.reply('Please enter a game name');
    }

    if (!message.guild.roles.cache.find(ch => ch.name === game.toUpperCase())) {
        return message.reply(`${game.toUpperCase()} doesn't exist`);
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
            let originalGamesName = res.data[0].name.toLowerCase();
            let gameNames = res.data[0].alternative_name.toLowerCase();

            if (!gameNames.includes(game) && !originalGamesName.includes(game)) {
                return message.reply(`${game} doesn't exist, please enter a valid game`);
            }

            let parent = message.guild.channels.cache.find(ch => ch.name === game.toUpperCase());

            let gameCustom;
            for (let i = 1; i <= 2; i++) {
                gameCustom = message.guild.channels.cache.find(ch => ch.name === `Custom #${i}`);
                if (gameCustom.parentID === parent.id) {
                    await gameCustom.delete();
                }
            }

            let gameRanked;
            for (let j = 1; j <= 5; j++) {
                gameRanked = message.guild.channels.cache.find(ch => ch.name === `Ranked #${j}`);
                if (gameRanked.parentID === parent.id) {
                    await gameRanked.delete();
                }
            }

            let gameUnranked;
            for (let k = 1; k <= 5; k++) {
                gameUnranked = message.guild.channels.cache.find(ch => ch.name === `Unranked #${k}`);
                if (gameUnranked.parentID === parent.id) {
                    await gameUnranked.delete();
                }
            }

            let gameGnrlTxt = message.guild.channels.cache.find(ch => ch.name === `${game.toLowerCase()}-chat`);
            if (gameGnrlTxt.parentID === parent.id) {
                await gameGnrlTxt.delete();
            }

            let gameTaPTxt = message.guild.channels.cache.find(ch => ch.name === 'tips-and-tricks');
            if(gameTaPTxt.parentID === parent.id) {
                await gameTaPTxt.delete();
            }

            await parent.delete();

            let gameEmoji = message.guild.emojis.cache.find(e => e.name === game.toLowerCase());
            await gameEmoji.delete();

            let gameRole = message.guild.roles.cache.find(r => r.name === game.toUpperCase());
            await gameRole.delete();

            await message.reply(`Game: ${game.toUpperCase()} removed`);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rmgm'],
    permLevel: 4,
};

exports.help = {
    name: 'removegame',
    description: 'Removes everything related to the game',
    usage: 'removegame (game name)',
};