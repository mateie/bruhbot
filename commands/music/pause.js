exports.run = async (client, message) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    if(serverQueue) {
        if(serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            message.channel.send(this.error.paused);
        } else {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            message.channel.send(this.error.resumed);
        }
    } else {
        return message.channel.send(this.error.music_play);
    }
};

exports.error = {
    'music_play': ':x: Music must be playing to pause',
    'paused': ':pause_button: Music paused',
    'resumed': ':arrow_forward: Music resumed',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'pause',
    description: 'Pause the queue',
    usage: 'pause',
};