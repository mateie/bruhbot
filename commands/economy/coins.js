const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const Coins = require(`${process.cwd()}/models/coins`);
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) user = message.author;
    Coins.findOne({
        userID: user.id,
    }, (err, coins) => {
        if(err) console.error(err);
        if(!coins) {
            return message.channel.send('This user has no coins');
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(Math.floor(Math.random() * 16777215))
            .addField(`Coins`, `${user} have ${coins.coins} coins`);

            message.channel.send({ embed });
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'coins',
    description: 'Checks user\'s coins',
    usage: 'coins',
};