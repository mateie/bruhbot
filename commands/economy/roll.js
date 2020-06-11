exports.run = (client, message) => {
    message.channel.send(`:game_die: **${message.author.username}**, you rolled a **${Math.floor(Math.random() * 6) + 1}**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permlevel: 0,
};

exports.help = {
    name: 'roll',
    description: 'Rolls a dice',
    usage: 'roll',
};