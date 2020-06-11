exports.run = async (client, message, args) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    args[0] = parseInt(args[0]);
    if(args[0] <= 0 || args[0] > serverQueue.songs.length - 1) {
        return message.channel.send(this.error.invalid_num);
    }

    if(serverQueue) {
        message.channel.send(this.error.removed.replace('${{pos}}', args[0]));
        serverQueue.songs.splice(args[0], 1);
    } else {
        return message.channel.send(this.error.must_play);
    }
};

exports.error = {
    'must_play': 'There must be music playing to manipulate queue',
    'removed': 'Track {{pos}} removed from the queue',
    'invalid_num': 'Invalid number specified',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'remove',
    description: 'Remove a song from the queue',
    usage: 'remove <song #>',
};