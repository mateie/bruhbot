const customization = require(`${process.cwd()}/customization.json`);

exports.run = (client, message, args) => {
    if(!args[0]) return message.reply('Input a suggestion');
    if(args[0] === 'bug') return message.reply('Please give a suggestion');
    args = args.join(' ');
    message.reply('Thanks for suggesting something');
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) suggested:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get(customization.suggestionchannel).send(`${content}`);
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'suggest',
    description: 'Suggests something.',
    usage: 'suggest <suggestion>',
};