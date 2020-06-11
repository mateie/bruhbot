exports.run = async (client, message, args) => {
    let reason = args.slice(0).join(' ');

    if(reason.length < 1) reason = 'No reason provided';

    message.channel.send(`The Developer shutdown the bot, Reason: ${reason}`);
    console.log(`Shutting down the bot, Reason: ${reason}`);
    setTimeout(() => {
        process.exit(0);
    }, 1000);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stopbot'],
    permLevel: 5,
};

exports.help = {
    name: 'shutdown',
    description: 'Shutdown the bot',
    usage: 'shutdown',
};