function clean(text) {
    if(typeof (text) === 'string') {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

exports.run = (client, message, args) => {
    if(message.author.id !== '401269337924829186') return message.channel.send('What are you trying to do? Bruh...');
    args = args.join(' ');
    try {
        let evaled = eval(args);
        if(typeof (evaled) !== 'string') {
            evaled = require('util').inspect(evaled);
            message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
        }
    } catch(err) {
        message.channel.send(`\`Error\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5,
};

exports.help = {
    name: 'eval',
    description: 'Evaluates a JS String',
    usage: 'eval',
};