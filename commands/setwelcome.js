const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    
    let channel = message.mentions.channels.first()

          if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const embed = new Discord.MessageEmbed()
          .setColor('#000001')
          .setDescription(`${message.author} \n Você não possui permissao de **__MANAGE_CHANNELS__** para executar esse comando!`)
          return message.channel.send(embed);
        }
      
          if(!channel) {
          const embed2 = new Discord.MessageEmbed()
          .setColor('#000001')
          .setDescription(`${message.author} \n Informe em qual canal deseja setar o canal de boas vindas!`)
          return message.channel.send(embed2);
        }

        db.set(`welcomec_${message.guild.id}`, channel.id)

        message.channel.send(`O canal de Boas Vindas foi setado em ${channel} com sucesso!`)
}
