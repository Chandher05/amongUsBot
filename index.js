const Discord = require('discord.js'); // importing the package to interact with discord

require('dotenv').config() //setting env variables for the proj

const bot = new Discord.Client();
bot.once('ready', () => {
    console.log('The bot is ready');
});


bot.on('message', message => {
    if (message.content.startsWith(`${process.env.BOT_PREFIX}`)) {
        // Find the user 
        if (message.member.voice.channel) {
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members) {
                member.voice.setMute(!message.member.voice.serverMute);
            }
            if (message.member.voice.serverMute) {
                message.reply('Find that impostor');
            } else message.reply('Shhhhh!')
        } else {
            message.reply('You need to join a voice channel first!');
        }

        // if (message.content.startsWith(`${process.env.BOT_PREFIX} mute`)) {
        //     if (message.member.voice.channel) {
        //         let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        //         for (const [memberID, member] of channel.members) {
        //             // I added the following if statement to mute everyone but the invoker:
        //             // if (member != message.member)

        //             // This single line however, nested inside the for loop, should mute everyone in the channel:
        //             member.voice.setMute(!message.member.voice.serverDeaf);
        //             message.reply('Shhhhhhhh!');
        //         }
        //     } else {
        //         message.reply('You need to join a voice channel first!');
        //     }
        // } else if (message.content.startsWith(`${process.env.BOT_PREFIX} unmute`)) {
        //     if (message.member.voice.channel) {
        //         console.log(message.member.voice.serverDeaf)
        //         let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        //         for (const [memberID, member] of channel.members) {
        //             // I added the following if statement to mute everyone but the invoker:
        //             // if (member != message.member)

        //             // This single line however, nested inside the for loop, should mute everyone in the channel:
        //             member.voice.setMute(false);
        //             message.reply('Who is the imposter!');
        //         }
        //     } else {
        //         message.reply('You need to join a voice channel first!');
        //     }
        // }
    }

})

bot.login(process.env.DISCORD_TOKEN);