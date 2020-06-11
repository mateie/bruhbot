const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = async member => {
    const Settings = require(`${process.cwd()}/models/settings`);

    Settings.findOne({
        guildID: member.guild.id,
    }, async (err, settings) => {
        if (err) console.error(err);

        const channel = member.guild.channels.cache.find(ch => ch.name === settings.welcomechannel);
        if (!channel) {
            console.error('Welcome channel was not found on the server');
            return;
        }

        const guildName = member.guild.name;
        const memberAvatar = member.user.displayAvatarURL({ format: 'jpg' });

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const bg = await Canvas.loadImage(`${process.cwd()}/data/images/bg.jpg`);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.stokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Verdana';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Welcome to ${guildName},`, canvas.width / 2.7, canvas.height / 2.5);

        ctx.font = applyText(canvas, `${member.displayName}`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.displayName}`, canvas.width / 2.7, canvas.height / 1.5);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(memberAvatar);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer());
        return channel.send(attachment);
    });
};

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 48;

    do {
        ctx.font = `bold ${fontSize -= 10}px Verdana`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};