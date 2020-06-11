const YTDL = require('ytdl-core');
const Search = require('youtube-search');

exports.run = async (client, message, args) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) {
        return message.channel.send(this.error.voice_channel);
    }

    let validate = YTDL.validateURL(args[0]);
    if(!validate) {
        let searchOptions = {
            maxResults: 10,
            key: process.env.GOOGLE_API_KEY,
        };

        let searchResults = await Search(args.join(' '), searchOptions);
        if(!searchResults.results.length > 0) {
            args[0] = searchResults.results.find(val => val.kind == 'youtube#video').link;
            if(!YTDL.validateURL(args[0])) {
                return message.channel.send(this.error.not_found);
            }
        } else {
            return message.channel.send(this.error.not_found);
        }
    }

    let songInfo = await YTDL.getInfo(args[0]);

    let song = {
        title: songInfo.title,
        url: songInfo.video_url,
        duration: songInfo.length_seconds,
    };

    if(!serverQueue) {
        let serverQueueConstruct = {
            text_channel: message.channel,
            voicechannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            last_volume: 100,
            loop: false,
            playing: false,
        };

        queue.set(message.guild.id, serverQueueConstruct);

        serverQueueConstruct.songs.push(song);

        try {
            let connection = await voiceChannel.join();
            connection.on('disconnect', (err) => {
                if(err) console.error(err);

                if(serverQueue.connection.dispatcher) {
                    serverQueue.queue.songs = [];
                    serverQueue.connection.dispatcher.end();
                    message.channel.send(this.error.stopped);
                }
            });

            serverQueueConstruct.connection = connection;
            this.play(client, message, serverQueueConstruct.songs[0]);
        } catch(err) {
            console.error(err);
            queue.delete(message.guild.id);
            return message.channel.send(`Error: ${err}`);
        }
    } else {
        if(serverQueue.songs.length >= 20) {
            return message.channel.send(this.error.queue_max);
        }

        serverQueue.songs.push(song);
        return message.channel.send(`**${song.title}** has been added to the queue`);
    }
};

exports.play = (client, message, song) => {
    let queue = client.queue;
    let serverQueue = serverQueue.get(message.guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        return queue.delete(message);
    }

    let dispatcher = serverQueue.connection
    .play(YTDL(song.url, { filter: 'audioonly' }))
    .on('end', () => {
        if(!serverQueue.loop) {
            serverQueue.songs.shift();
        }

        this.play(client, message, serverQueue.songs[0]);
    })
    .on('error', err => console.error(err));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
    serverQueue.text_channel.send(`Now playing: **${song.title}**`);
};

exports.error = {
    'voice_channel': 'You must be in a voice channel to play music',
    'not_found': 'Video was not found',
    'stopped': 'Disconnected from the voice channel. Music stopped',
    'queue_max': 'Queue can be up to 20 tracks long',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p'],
    permLevel: 0,
};

exports.help = {
    name: 'play',
    description: 'Play Music',
    usage: 'play <url|search>',
};