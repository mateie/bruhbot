const copypastas = require(`${process.cwd()}/data/copypastas.json`);

exports.run = (client, message) => {
    message.channel.send(`${copypastas[Math.floor(Math.random() * copypastas.length)]}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cp'],
    permLevel: 0,
};

exports.help = {
    name: 'copypasta',
    description: 'Sends a random copypasta',
    usage: 'copypasta',
};