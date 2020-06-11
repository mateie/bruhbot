exports.run = async (client, message) => {

    let voiceChannel = message.member.voice.channel;

    let soundFile = `${process.cwd()}/sounds/bruh.mp3`;

    let connection = await voiceChannel.join();

    connection.play(soundFile, { volume: 100 })
    .on('finish', () => {
        message.channel.send(`**${message.author.username}** just did a Bruh moment`);
        voiceChannel.leave();
    })
    .on('error', err => {
        console.log('Err: ', err);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
};

exports.help = {
    name: 'bruh',
    description: 'Bruh...',
    usage: 'bruh',
};