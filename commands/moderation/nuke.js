exports.run = async (client, message, args) => {
    if(!args[0]) {
        const channel = message.guild.channels.cache.find(ch => ch.name === message.channel.name);
        const options = {
            type: channel.type,
            topic: channel.topic,
            nsfw: channel.nsfw,
            parent: channel.parentID,
            permissionOverwrites: channel.permissionOverwrites,
            position: channel.rawPosition,
            rateLimitPerUser: channel.rateLimitPerUser,
        };

        // console.log(channel);
        channel.delete();
        const newChannel = await message.guild.channels.create(channel.name, options);

        const randomNukeGIF = ['https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif', 'https://media.giphy.com/media/uSHMDTUL7lKso/giphy.gif', 'https://media.giphy.com/media/OMPqWQVhND9Vm/giphy.gif'];

        newChannel.send(`${newChannel.name} Channel has been Nuked`, { files: [randomNukeGIF[Math.floor(Math.random() * randomNukeGIF.length)]] });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3,
};

exports.help = {
    name: 'nuke',
    description: 'Nukes the channel',
    usage: 'nuke [channelname]',
};