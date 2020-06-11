const Discord = require('discord.js');
const Canvas = require('canvas');

exports.run = async (client, message, args) => {
    const canvas = Canvas.createCanvas(256, 256);
    const ctx = canvas.getContext('2d');

    if(!args[0]) {
        const avatarImage = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256 });

        const avatar = await Canvas.loadImage(avatarImage);
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        const flag = await Canvas.loadImage(`${process.cwd()}/data/images/pride_flag.png`);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(flag, 0, 0, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer());

        return message.channel.send(attachment);
    } else {
        let user = message.mentions.users.first();

        const userImage = user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 });

        const avatar = await Canvas.loadImage(userImage);
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        const flag = await Canvas.loadImage(`${process.cwd()}/data/images/pride_flag.png`);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(flag, 0, 0, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer());

        return message.channel.send(attachment);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pride'],
    permLevel: 0,
};

exports.help = {
    name: 'gay',
    description: 'Makes avatar with gay flag',
    usage: 'gay @user',
};