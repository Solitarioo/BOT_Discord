const db = require('quick.db');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

      let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;
  
    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
    if(bank === null) bank = 0;

    const embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle(`${user.username}, **SALDO MONETÁRIO**`)
    .setDescription(`**${user.username}**, **veja as informações do seu saldo:**` +
    `\n\nDinheiro no Bolso: **R$${money}**` +
    `\nDinheiro no Banco: **R$${bank}**`)
    .setFooter("Zenitsu 2.0")
    .setTimestamp();

    message.channel.send(`${user}`, embed);
}
