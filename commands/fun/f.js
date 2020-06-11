exports.run = async (client, message, args) => {
    if(args && args.length > 1) {
        message.channel.send(`${message.author.username} has paid their respect for **${args.join(' ')}** :heart:`);
    } else {
        message.channel.send(`${message.author.username} has paid their respect :heart:`);
    }
};

exports.conf = {
    enabled: true,
    buildOnly: false,
    aliases: ['eff'],
    permLevel: 0,
};

exports.help = {
    name: 'f',
    description: 'Press F to Pay Respect',
    usage: 'f',
};