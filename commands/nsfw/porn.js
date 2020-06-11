const Discord = require('discord.js');
const Pornsearch = require('pornsearch');

exports.run = (client, message, args) => {

    let name = args.slice(0, args.length - 1).join(' ');
    let type = args[args.length - 1];

    if(!message.channel.nsfw) {
        return message.channel.send(this.error.no_nsfw);
    }

    if(!name) {
        return message.channel.send(this.error.no_tags);
    }

    const Searcher = new Pornsearch(name);

    if(type === 'gif') {
        Searcher.gifs()
        .then(gifs => {
            let randomGIF = gifs[Math.floor(Math.random() * gifs.length)];

            let GIFName = randomGIF.title;
            let GIFImage = randomGIF.url;

            const embed = new Discord.MessageEmbed()
            .setTitle(GIFName)
            .setImage(GIFImage);

            return message.channel.send({ embed });
        });
    } else if(type === 'video') {
        Searcher.videos()
        .then(videos => {
            let randomVideo = videos[Math.floor(Math.random() * videos.length)];

            let videoTitle = randomVideo.title.split('\n');
            videoTitle = videoTitle[videoTitle.length - 1];
            videoTitle = videoTitle.trim();
            videoTitle = videoTitle.replace(/ +/g, ' ');

            let videoUrl = randomVideo.url;
            let videoDuration = randomVideo.duration;
            let videoThumbnail = randomVideo.thumb;

            const embed = new Discord.MessageEmbed()
            .setTitle(videoTitle)
            .setDescription('Click the title to check the video out');
            if(videoDuration) {
                embed.addField('Video Duration', videoDuration, true);
            }
            embed.setURL(videoUrl)
            .setImage(videoThumbnail);

            return message.channel.send({ embed });

        });
    } else {
        return message.reply(this.error.no_type);
    }
};

exports.error = {
    'no_tags': 'Specify a tag',
    'no_nsfw': 'This channel is not NSFW',
    'no_results': 'No results found',
    'no_type': 'Choose either GIF or Video',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'porn',
    description: 'Gives a video with a providen tag',
    usage: 'porn [tag] [type]',
};