exports.run = (client, message, args) => {
    let newName = args.slice(1).join(' ');
    let user;
    let mention = message.mentions.users.first();
    if(!mention) {
        user = message.guilds.members.get(args[0]);
        if(!user) return message.reply('You must mention a user or give me a valid UserID for me to rename them').catch(console.error);
    } else {
        user = message.guild.member(mention);
    }

    if(user.id === '401269337924829186' && message.author.id !== '401269337924829186') return message.reply('You can\'t rename my Dev');
    user.setNickname(newName).catch(e => {
        if(e) return message.channel.send(`An error occured: \`\`\`${e}\`\`\``);
    });
    message.channel.send(`${message.author.username} Renamed ${mention}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['nick', 'nickname'],
    permLevel: 2,
};

exports.help = {
    name: 'rename',
    descriptionL: 'Rename the mentioned user',
    usage: 'rename @user|userID newname',
};