const Discord = require("discord.js"); // importing the package to interact with discord

require("dotenv").config(); //setting env variables for the proj

const bot = new Discord.Client();
bot.once("ready", () => {
  console.log("The bot is ready");
});

bot.on("message", (message) => {
  if (message.content.startsWith(`${process.env.BOT_PREFIX} mute`)) {
    if (message.member.voice.channel) {
      let channel = message.guild.channels.cache.get(
        message.member.voice.channel.id
      );
      for (const [ _ , member] of channel.members) {
        member.voice.setMute();
        message.reply("Shhhhhhhh!");
      }
    } else {
      message.reply("You need to join a voice channel first!");
    }
  } else if (message.content.startsWith(`${process.env.BOT_PREFIX} unmute`)) {
    if (message.member.voice.channel) {
      let channel = message.guild.channels.cache.get(
        message.member.voice.channel.id
      );
      for (const [ _, member] of channel.members) {
        member.voice.setMute(false);
        message.reply("Who is the imposter!");
      }
    } else {
      message.reply("You need to join a voice channel first!");
    }
  } else if (message.content.startsWith(`${process.env.BOT_PREFIX} help`)) {
    message.reply(`
      The among us bot does two very simple tasks. Mute and Unmute everyone in a voice channel. 
      !AU mute - to mute everyone in a voice channel.
      !AU unmute - to unmute everyone in a voice channel. 
      (You must be connected to a voice channel to use these commands)
    `)
  } else if ( message.content.startsWith(`!AU`)) {
    message.reply('Try command, **!AU help** on how to use the bot');
  }
});

bot.login(process.env.DISCORD_TOKEN);
