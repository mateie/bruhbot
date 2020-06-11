exports.run = async (client, message) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    if(serverQueue && serverQueue.playing) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.channel.send(this.error.stopped);
    } else {
        return message.channel.send(this.error.music_play);
    }
};

exports.error = {
    'music_play': 'There must be music playing to stop it',
    'stopped': 'Bot stopped music and disconnected',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dc', 'stop'],
    permLevel: 0,
};

exports.help = {
    name: 'disconnect',
    description: 'Stops the music and disconnects the bot',
    usage: 'disconnect',
};