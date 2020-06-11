let https = require('https');

exports.run = (client, message, args) => {
    function convertCurrency(amount, fromCurrency, toCurrency, cb) {
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        let query = `${fromCurrency}_${toCurrency}`;

        let url = `http://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${process.env.CURRENY_API_KEY}`;

        https.get(url, function(res) {
            let body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                try {
                    let jsonObj = JSON.parse(body);

                    let val = jsonObj[query];
                    if(val) {
                        let total = val * amount;
                        cb(null, Math.round(total * 100) / 100);
                    } else {
                        let err = new Error(`Value not found for ${query}`);
                        cb(err);
                        return message.channel.send(`An error occured: \`\`\`${err}\`\`\``);
                    }
                } catch(e) {
                    console.log('Parse error: ', e);
                    message.channel.send('An Error occured: ', e);
                    cb(e);
                }
            });
        }).on('error', function(e) {
            console.log('Got an error: ', e);
            message.channel.send('An error occured: ', e);
            cb(e);
        });
    }
    if(isNaN(args[0])) return message.reply(' please enter a valid number for amount');
    let a = parseInt(args[0]);

    if(!args[1]) return message.reply(' please enter the base currency');
    let base = args[1].toUpperCase();
    if(!base) {
        message.reply(' please enter the base currency');
    }

    if(!args[2]) return message.reply(' please enter the target currency');
    let target = args[2].toUpperCase();
    if(!target) {
        message.reply(' please enter the target currency');
    }

    convertCurrency(a, base, target, function(err, amount) {
        if(err) console.log(err);
        message.channel.send(`**${a} ${base}** equals to **${amount} ${target}**`);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'currency',
    description: 'Convert Currencies',
    usage: 'currency <amount> [Base Currency] [Target Currency]',
};