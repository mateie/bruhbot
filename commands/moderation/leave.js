exports.run = (client, message, args) => {
    let id = args[0];
    if(!id) id = message.guild.id;
    client.guilds.get(id).leave()
    .then(g => console.log(`Left ${g}`));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
};

exports.help = {
    name: 'leave',
    description: 'Leave the server that bot is invited in',
    usage: 'leave',
};