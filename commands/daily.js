const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    
  function convertMilliseconds(ms) {
    const seconds = ~~(ms/1000)
    const minutes = ~~(seconds/60)
    const hours = ~~(minutes/60)
    const days = ~~(hours/24)
  
    return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
  }
    let user = message.author;

    let timeout = 86400000;

    let daily = await db.fetch(`dailyy_${message.guild.id}_${user.id}`);

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;
    
    let amount = Math.floor(Math.random() * 250) + 150;
    
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = convertMilliseconds(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#008000")
        .setDescription(`:no_entry_sign: **|** Você já recebeu sua recompensa diária!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
            
        message.channel.send(`${user}`, timeEmbed);

    } else {
        let moneyEmbed = new Discord.MessageEmbed()
        .setTitle(":dollar: **|** Recompensa Diária")
        .setColor("#008000")
        .setDescription(`Você coletou sua recompensa diária!\n\n :dollar: Dinheiro Coletado: **\`R$${amount}\`**`+
        `\n\n Agora você tem 1 saldo de **${money}** no bolso!`);
        
        message.channel.send(`${user}`, moneyEmbed);
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`dailyy_${message.guild.id}_${user.id}`, Date.now());
    }
}