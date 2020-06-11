exports.run = (client, message) => {
    let milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) & 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    message.channel.send(`:chart_with_upwards_tend: I've been running for **${hours}** Hours, **${minutes}** Minutes and **${seconds}**.${milliseconds} Seconds`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'uptime',
    description: 'Shows how long the bot has been online for',
    usage: 'uptime',
};