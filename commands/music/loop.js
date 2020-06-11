exports.run = async (client, message) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    if(serverQueue && serverQueue.playing) {
        if(serverQueue.loop) {
            serverQueue.loop = false;
            message.channel.send(this.error.turn_off);
        } else {
            serverQueue.loop = true;
            message.channel.send(this.error.turn_on);
        }
    } else {
        return message.channel.send(this.error.music_play);
    }
};

exports.error = {
    'music_play': ':x: Music must be playing to loop',
    'turn_on': ':repeat_one: Loop enabled',
    'turn_off': ':arrow_right: Loop disabled',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'loop',
    description: 'Loops currently playing song',
    usage: 'loop',
};