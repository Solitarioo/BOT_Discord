Discord = require("discord.js");
 
module.exports = {
  name:"helpdm",
  category:"help",
  aliases: ["heldm"],
  run: async (client, message, args) => {
 
    const embed = new Discord.MessageEmbed()//mensagem no chat burro
    .setTitle('HELP AJUDA')
    .setDescription(`Enviei no seu privado minha lista de comandos!`)
    message.channel.send(embed);

    const dm = new Discord.MessageEmbed()//na dm bem obvio
  .setTitle(`COMANDOS`)
  .setColor([255,182,193])
  .setDescription(`**UTILIDADE**: botinfo, addemoji, afk, anunciar, serverinfo, userinfo, servericon, embed, ticket, close, avatar, ping`+
  `\n\n**DIVERSÃO**: respeitos, like, casar, divorciar, beijar`+
  `\n\n**MÚSICA**: play, fs, volume, queue, pause, resume, musica, disconnect, letra`+
  `\n\n**ECONOMIA**: daily, depositar, loja, pescar, pay, rank, roubar, sacar, carteira, roletav, trabalhar`+
  `\n\n**MODERAÇÂO**: ban, watn, mute, setmoney, removemoney, removebank, clear, say, criar call`)
  message.author.send(dm);
}
}