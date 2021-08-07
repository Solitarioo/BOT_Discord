const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    const servericon = new Discord.MessageEmbed() 

    .setColor("YELLOW")
    .setTitle(`Imagem do ${message.guild.name}`)
    .setDescription(`Clique [aqui](${message.guild.iconURL()}) para baixar o **Ícone do Servidor**`) // Aqui é pro cara fazer o download da Imagem do Servidor
    .setImage(message.guild.iconURL({ dynamic: true, size: 2048 })) // aqui pega a imagem do Servidor
    .setFooter(`・Comando executado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(`Aqui está, ${message.author}!`, servericon)

};

exports.help = {
    name: "servericon",
    aliases: ['serveravatar'],
    description: "Comando para ver a Imagem do Servidor.",
    usage: "m.servericon",
    category: "Information"
  };