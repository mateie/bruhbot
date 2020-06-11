const chalk = require('chalk');
const fs = require('fs');

module.exports = client => {
    client.user.setActivity(`over ${client.guilds.cache.size} servers`, { type: 'WATCHING' });

    console.log(chalk.bgBlack.green(`Online and ready in ${client.guilds.cache.size} servers.`));
    let blacklist = JSON.parse(fs.readFileSync(`${process.cwd()}/blacklist.json`, 'utf8'));
    client.guilds.cache.forEach((guild) => {
        if (!blacklist[guild.ownerID]) {
            return;
        } else if (blacklist[guild.ownerID].state === true) {
            guild.leave(guild.id);
        }
    });
};