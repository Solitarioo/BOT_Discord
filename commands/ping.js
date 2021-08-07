const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const embed = new Discord.MessageEmbed()
  .setDescription("🔥 **PING CARREGANDO ESPERE 4 SEGUNDOS**🔥 ")
  .setColor('#000000')
  message.channel.send(embed).then(msg => {
    setTimeout(() => {
      let ping = new Discord.MessageEmbed()
      .setTitle(`🏓 PONG`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**🤖 Latencia do BOT** \`${Math.round(client.ws.ping)}ms\`\n**📡 Latência da API** \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
      .setFooter(`Ping requisitado por ${message.author.tag}`)
      .setColor('#000000')
    msg.edit(ping)
    }, 1000)
  });
};