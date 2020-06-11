exports.run = async (client, message) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    if(serverQueue) {
        message.channel.send(this.error.skipped);
        serverQueue.connection.dispatcher.end();
    } else {
        return message.channel.send(this.error.must_play);
    }
};

exports.error = {
    'skipped': 'Song skipped',
    'must_play': 'Music must be playing, to skip a song',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['s'],
    permLevel: 0,
};

exports.help = {
    name: 'skip',
    description: 'Skips current song',
    usage: 'skip',
};