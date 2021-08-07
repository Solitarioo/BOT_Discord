const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  
    let user = message.mentions.members.first() 

    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    let embed1 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setDescription(` Você tem que mencionar alguem para pagar!`);

    if (!user) {
        return message.channel.send(`${message.author}`, embed1)
    }
    let embed2 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setDescription(` Coloque um valor válido para o pagamento!`);
  
    if (!args[1]) {
        return message.channel.send(`${message.author}`, embed2)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setDescription(` Você nao possui dinheiro suficiente para realizar o pagamento!`);

    if (member < args[1]) {
        return message.channel.send(`${message.author}`, embed4)
    }
    let embed5 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setDescription(` Você nao pode enviar quantias abaixo de 0!`);

    if(args[1] < 0) {
        return message.channel.send(`${message.author}`, embed5)
    }
    let embed7 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setDescription(`Você tem que colocar um valor númerico para pagar! `);

    if (isNaN(args[1])){
        return message.channel.send(`${message.author}`, embed7)
    }
    let embed6 = new Discord.MessageEmbed()
    .setTitle(" Pagamento Efetuado!")
    .setColor("#000001")
    .setDescription(`Você pagou o ${user} com **R$${args[1]}**!`);

    message.channel.send(`${message.author}`, embed6)
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
}