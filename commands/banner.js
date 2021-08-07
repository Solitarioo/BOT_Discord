const axios = require('axios');
const { Client, Message, MessageEmbed } = require('discord.js');


module.exports = {
    name: "banner",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
if (!user) return message.reply('mencione um usúario');


axios
    .get(`https://discord.com/api/users/${user.id}`, {
    headers: {
        Authorization: `Bot ${client.token}`,
    },
})
.then((res) => {
    const { banner } = res.data;

    if(banner) {
        const extension = banner.startsWith("a_") ? '.gif' : '.png';
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;

        const bannerimg = new MessageEmbed()
        .setDescription(`**[Banner de ${user.username}](${url})**`)
        .setImage(url)
        .setFooter(`• Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

        message.channel.send(bannerimg)
    }})}}
