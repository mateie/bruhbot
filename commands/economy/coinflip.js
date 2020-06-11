exports.run = async (client, message) => {
    let random = (Math.floor(Math.random() * Math.floor(2)));
    if(random === 0) {
        message.channel.send('Heads');
    } else {
        message.channel.send('Tails');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cf'],
    permLevel: 0,
};

exports.help = {
    name: 'coinflip',
    description: 'Flip a coin',
    usage: 'coinflip',
};