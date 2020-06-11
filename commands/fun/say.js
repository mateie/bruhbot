exports.run = (client, message, args) => {
    args = message.content.split(' ').slice(1);
    message.delete();
    if(message.content.includes('@everyone') || message.content.includes('@here')) return message.channel.send('I won\'t ping anyone');
    message.channel.send(args.join(' ')).cleanContent;
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message",
    usage: "say [message]",
};