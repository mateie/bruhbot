exports.run = async (client, message, args) => {

    const game = args[0];

    if(!game) {
        return message.reply('Please provide a game name');
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addr'],
    permLevel: 4,
};

exports.help = {
    name: 'addreaction',
    description: 'Adds a reaction to the game reaction chooser',
    usage: 'addreaction (game name)',
};