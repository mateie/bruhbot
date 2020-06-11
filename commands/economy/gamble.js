const mongoose = require('mongoose');

exports.run = (client, message, args) => {
    const Coins = require(`${process.cwd()}/models/coins`);
    let user = message.author;
    Coins.findOne({
        userID: user.id,
    }, (err, coins) => {
        if(!coins) {
            let newCoins = new Coins({
                _id: mongoose.Schema.Types.ObjectId,
                userID: user.id,
                coins: 0,
                lastdaily: 0,
                streak: 0,
            });

            newCoins.save();
            message.channel.send(`<@${user.id}, you don't have any coins yet mate. Start off with \`daily\``);
        } else {
            let money = args[0];
            if(!money) {
                money = 10;
            }

            if(isNaN(money)) return message.channel.send(`**${message.author.username}**, Valid numbers only! (bet with letters? Bruh)`);
            if(money > 2500) return message.reply('Max is 2500. Gambling addicting... pfft');
            if(parseInt(coins.coins) < money) return message.reply(`You don't even have that much money`);

            let random = Math.floor(Math.random() * 37);

            if(random == 0) {
                money *= 10;
                let curBal1 = parseInt(coins.coins);
                coins.coins = curBal1 + money;
                coins.save();
                message.channel.send(`**${message.author}** Did you just hit a jackpot? Damn bruh. You won **${money}**`);
            } else if(random == 5) {
                money = money * 2.50;
                let curBal2 = parseInt(coins.coins);
                coins.coins = curBal2 + money;
                coins.save();
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else if(random == 10) {
                money = money * 2.50;
                let curBal2 = parseInt(coins.coins);
                coins.coins = curBal2 + money;
                coins.save();
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else if(random == 15) {
                money = money * 2.50;
                let curBal3 = parseInt(coins.coins);
                coins.coins = curBal3 + money;
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else if(random == 20) {
                money = money * 2.50;
                let curBal4 = parseInt(coins.coins);
                coins.coins = curBal4 + money;
                coins.save();
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else if(random == 25) {
                money = money * 2.50;
                let curBal3 = parseInt(coins.coins);
                coins.coins = curBal3 + money;
                coins.save();
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else if(random == 30) {
                money = money * 2.50;
                let curBal3 = parseInt(coins.coins);
                coins.coins = curBal3 + money;
                coins.save();
                message.channel.send(`**${message.author}** You won **${money}**`);
            } else {
                let curBal5 = parseInt(coins.coins);
                coins.coins = curBal5 - money;
                coins.save();
                message.channel.send(`**${message.author}** You lost **${money}**`);
            }
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'gamble',
    description: 'Gamble to win more coins',
    usage: 'gamble <amount>',
};