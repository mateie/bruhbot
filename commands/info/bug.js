const customization = require(`${process.cwd()}/customization.json`);

exports.run = (client, message, args) => {
    if(!args[0]) return message.reply('Please specify the bug');
    if(args[0] === 'bug') return message.reply('Please specify a bug');
    args = args.join(' ');
    message.reply('Thanks for submitting a bug');
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get(customization.bugchannelid).send(content);
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'bug',
    description: 'Report a bug',
    usage: 'bug <bug>',
};