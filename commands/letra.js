const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async(client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não tem nada tocando no momento").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Não encontrei letra para essa ${queue.songs[0].title} :(`;
    } catch (error) {
      lyrics = `Não encontrei letra para essa ${queue.songs[0].title} :(`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`Letra da música **__${queue.songs[0].title}__**`)
      .setDescription(lyrics)
      .setColor("#000000")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
}