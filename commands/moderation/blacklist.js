const fs = require('fs');

exports.run = async (client, message, args) => {
    if(!message.author.id === '401269337924829186') return message.reply('You don\'t have permission to use this command...');
    let blacklist = JSON.parse(fs.readFileSync('../../blacklist.json', 'utf8'));
    let user = args[0];
    const amount = parseInt(user);

    if(isNaN(amount)) {
        return message.reply('Please enter a valid UserID');
    }
    if(!user) return message.reply('Input a UserID');
    if(args[0] === '401269337924829186') return message.reply('The Dev Can\'t be blacklisted');

    if(!blacklist[user]) {
        blacklist[user] = {
            id: user,
            state: true,
        };
        message.reply(`<@${user}> is now Blacklisted`);
        fs.writeFile(`${process.cwd()}/blacklist.json`, JSON.stringify(blacklist), err => {
            if(err) throw err;
        });

        client.guilds.forEach((guild) => {
            if(guild.ownerID === user) {
                message.guild.leave(guild.id);
            }
        });

        return;
    }

    if(blacklist[user].state === true) {
        message.reply('That user is already blacklisted');
        return;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
};

exports.help = {
    name: 'blacklist',
    description: 'Blacklist a User',
    usage: 'blacklist [userid]',
};