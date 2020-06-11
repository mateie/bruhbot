exports.run = (client, message, args) => {
    let category = args[0].toLowerCase();
    let command = args[1].toLowerCase();

    if(!category) {
        return message.channel.send(this.error.no_category);
    }

    if(client.commands.has(command)) {
        command = args.slice(1).join(' ');
    } else if(client.aliases.has(args[1])) {
        command = client.aliases.get(command);
    }

    if(!command) {
        message.channel.send(`Reloading: Category - ${this.capFirstLetter(category)}`)
        .then(m => {
            client.reload(category)
            .then(() => {
                m.edit(`Succesfully reloaded: Category - ${this.capFirstLetter(category)}`);
            })
            .catch(e => {
                m.edit(`Reload failed: Category - ${this.capFirstLetter(category)} \n\`\`\`${this.capFirstLetter(category)} was not found\`\`\``);
                return console.log(e);
            });
        });
    } else {
        message.channel.send(`Reloading: Command - ${this.capFirstLetter(command)} in Category - ${this.capFirstLetter(category)}`)
        .then(m => {
            client.reload(category, command)
            .then(() => {
                m.edit(`Successfuly reloaded: Command - ${this.capFirstLetter(command)} in Category - ${this.capFirstLetter(category)}`);
            })
            .catch(e => {
                m.edit(`Command reload failed: ${this.capFirstLetter(command)} in ${this.capFirstLetter(category)}\n\`\`\`${this.capFirstLetter(command)} was not found in ${this.capFirstLetter(category)}\`\`\``);
                return console.log(e);
            });
        });
    }
};

exports.capFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.error = {
    'no_category': 'Category must be provided',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: 5,
};

exports.help = {
    name: 'reload',
    description: 'Reloads a command file, if it\'s been updated or modified',
    usage: 'reload <category> <commandname>',
};