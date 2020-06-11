const coins = require(`${process.cwd()}/models/coins`);

exports.run = async (client, message) => {
    const cursor = coins.find({}).sort({ 'coins': -1 }).collation({ locale: 'en_US', numericOrdering: true });
    cursor.exec(async (err, result) => {
        if(!result) return console.log('returned');
        if(err) {
            console.error(err);
            return message.channel.send('Sorry an error has occured');
        }

        let order = 1;
        let lsString = '```';
        for(let i = 0; i < result.length; i++) {
            if(i > result.length - 1) {
                break;
            }

            const user = await client.users.cache.get(`${result[i].userID}`);
            if(user != undefined && !user.bot) {
                lsString = lsString + `${order}. ${user.username} - ${result[i].coins} coins\n`;
                order++;
            }

            if(order > 10) {
                break;
            }
        }

        message.channel.send(`Richest users of **${client.user.username}**:\n${lsString}\`\`\``);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['richest', 'milionaire'],
    permLevel: 0,
};

exports.help = {
    name: 'rich',
    description: 'Send top 10 richest bot users',
    usage: 'rich',
};