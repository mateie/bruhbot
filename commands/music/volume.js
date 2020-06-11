exports.run = async (client, message, args) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    let newVolume = parseInt(args[0]) || undefined;
    if(!newVolume || newVolume < 1 || newVolume > 200) {
        return message.channel.send(`${this.error.value} Volume: ${serverQueue.volune}`);
    }

    if(serverQueue && serverQueue.playing) {
        serverQueue.last_volume = serverQueue.volume,
        serverQueue.volume = newVolume;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(newVolume / 100);
        message.channel.send(`${this.error.success} ${newVolume}`);
    } else {
        return message.channel.send(this.error.must_play);
    }
};

exports.err = {
    'music_play': 'There must be music playing to manipulate the volume',
    'value': 'Enter integer between 1 - 200',
    'success': 'Successfully set the volume to',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2,
};

exports.help = {
    name: 'volume',
    description: 'Manipulate the volume',
    usage: 'volume <integer>',
};