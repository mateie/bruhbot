const childProcess = require('child_process');

exports.run = (client, message, args) => {
    if(message.author.id !== '401269337924829186') return message.channel.send('What are you doing? Bruh moment');
    childProcess.exec(args.join(' '), {}, (err, stdout) => {
        if(err) return message.channel.send('```' + err.message + '```');
        message.channel.send(`\`\`\`${stdout}\`\`\``);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
};

exports.help = {
    name: 'exec',
    description: 'Executes a process command',
    usage: 'exec',
};