const request = require('superagent');

exports.run = async (client, message) => {
    request
    .get('http://api.adviceslip.com/advice')
    .end((err, res) => {
        if(!err && res.status === 200) {
            try {
                JSON.parse(res.text);
            } catch(e) {
                return message.channel.send(this.error.api_error);
            }
            const advice = JSON.parse(res.text);
            message.channel.send(advice.slip.advice);
        } else {
            console.error(`REST Call Failed: ${err}, Status Code: ${res.status}`);
        }
    });
};

exports.error = {
    'api_error': 'An API Error Occured',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'advice',
    descirption: 'Sends a Life advice',
    usage: 'advice',
};