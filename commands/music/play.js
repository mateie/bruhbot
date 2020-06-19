const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const Search = require('youtube-search');

exports.run = async (client, message, args) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) {
        return message.channel.send('You have to be in a voice channel to play music');
    }

    let validate = YTDL.validateURL(args[0]);
    if(!validate) {
        let searchOptions = {
            maxResults: 10,
            key: process.env.GOOGLE_API_KEY,
        };

        let searchResults = await Search(args.join(' '), searchOptions);
        if(searchResults.results.length > 0) {
            args[0] = searchResults.results.find(val => val.kind == 'youtube#video').link;
            if(!YTDL.validateURL(args[0])) {
                return message.channel.send('Video not found');
            }
        } else {
            return message.channel.send('Video not found');
        }
    }

    let songInfo = await YTDL.getInfo(args[0]);
    let song = {
        title: songInfo.videoDetails.video_url,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.length_seconds,
    };

    if(!serverQueue) {
        let serverQueueConstructor = {
            text_channel: message.channel,
            voice_channel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            last_volume: 100,
            loop: false,
            playing: true,
        };

        queue.set(message.guild.id, serverQueueConstructor);

        serverQueueConstructor.songs.push(song);

        try {
            let connection = await voiceChannel.join();
            connection.on('disconnect', (err) => {
                if(err) console.error(err);

                if(serverQueue.connection.dispatcher) {
                    serverQueue.songs = [];
                    serverQueue.connection.dispatcher.end();
                    message.channel.send('Disconnected. Music Stopped');
                }
            });

            serverQueueConstructor.connection = connection;
            this.play(client, message, serverQueueConstructor.songs[0]);
        } catch(err) {
            console.error(err);
            queue.delete(message.guild.id);
            return message.channel.send(`Error: ${err}`);
        }
    } else {
        if(serverQueue.songs.length >= 20) {
            return message.channel.send('Max queue length is 20');
        }

        serverQueue.songs.push(song);
        return message.channel.send(`**${song.title}** has been added to the queue`);
    }
};

exports.play = (client, message, song) => {
    let queue = client.queue;
    let serverQueue = queue.get(message.guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        return queue.delete(message.guild.id);
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
    serverQueue.text_channel.send(`Now Playing: **${song.title}**`);
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