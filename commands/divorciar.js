const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (bot, message, args) => {

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

let embed2 = new Discord.MessageEmbed()
.setColor("#000001")
.setDescription(` **|** Mencione alguem que deseja casar`)
  if (!user) return message.channel.send(embed2);

    let embed1 = new Discord.MessageEmbed()
.setColor("#000001")
.setDescription(` **|** Você não pode se auto-divorciar!`)
   if (user == message.member) return message.reply(embed1);

  const embed3 = new Discord.MessageEmbed()
  .setColor("#000001")
  .setDescription(` **${user}O usuário ${message.author.tag} se divorciou de você! \n Pela taxa do divorcio eu cobrei 5000 reais!!**`)
   message.channel.send(embed3)

   db.delete(`casamento_${user.id}`, message.author.username)
   db.delete(`casamento_${message.author.id}`, user.user.username)
   db.subtract(`money_${message.guild.id}_${message.author.id}`, 5000)
}