const fs = require('fs');
module.exports = guild => {
    let client = guild.client;
    let channelID;
    let channels = guild.cache.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === 'text') {
            channelID = c[0];
            break channelLoop;
        }
    }

    const Settings = require(`${process.cwd()}/models/settings`);

    Settings.findOne({
        guildID: guild.id,
    }, (err, settings) => {
        if (err) console.error(err);

        let prefix = settings.prefix;

        let owner = guild.ownerID;
        if (owner !== process.env.OWNER_ID) {
            let channel = client.channels.cache.get(guild.systemChannelID || channelID);
            channel.send(`Thanks for inviting Bruh to this server! My current prefix is ${prefix}, Use ${prefix}info or ${prefix}help to see available commands. Use ${prefix}suggest or ${prefix}bug if there's any suggestions or bugs you found. Thank you`);

            let blacklist = JSON.parse(fs.readFileSync(`${process.cwd()}/blacklist.json`, 'utf8'));
            client.guilds.forEach(g => {
                if (!blacklist[g.ownerID]) return;
                if (blacklist[g.ownerID].state === true) {
                    channel.send('But unfortunately, the owner of this server has been blacklisted before so I\'m leaving! Bye!');
                    g.leave(g.id);
                }
            });
        }
    });
};