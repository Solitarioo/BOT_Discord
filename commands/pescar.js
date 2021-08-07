const db = require("quick.db") 
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {


    function convertMilliseconds(ms) {
        const seconds = ~~(ms/1000)
        const minutes = ~~(seconds/60)
        
        return { minutes: minutes%60, seconds: seconds%60 }
      }
    
 const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
 let user = message.author;
 let author = await db.fetch(`fish_${message.guild.id}_${user.id}`)

 let timeout = 606060;
    
 if (author !== null && timeout - (Date.now() - author) > 9000) {
    let time = convertMilliseconds(timeout - (Date.now() -  author));

        message.channel.send(`**${member.user.tag}**, você já pescou recentemente, tente novamente em \`${time.minutes} minutos, ${time.seconds} segundos\`.`)
      } else {

    let fish = [
    "🐠 `(Peixe tropical)`",
    "🐟 `(Peixe)`",
    "🐡 `(Baiacu)`",
    "🐬 `(Golfinho)`",
    "🦐 `(Camarão)`",
    "🦈 `(Tubarão)`",
    "🔋 `(Bateria)`",
    "🦂 `(Escorpião)`",
    "⛸ `(Patins de gelo)`",
    "👕 `(Camisa)`",
    "📦 `(Pacote)`",
    "🏓 `(Ping Pong)`",
    "🦑 `(Lula)`",
    "⚽ `(Bola)`"

    ]
    let fishresult = Math.floor((Math.random() * fish.length));
    let amount = Math.floor(Math.random() * 300) + 1;
        if (!args[0]) {
        message.channel.send(`**Pesca:** - 🎣\n**${member.user.tag}** pescou um ${fish[fishresult]} e ganhou \`${amount}\` moedas com a pesca.`)
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`fish_${message.guild.id}_${user.id}`, Date.now())
    }
   }
}
module.exports.help = {
    name:"fish",
    aliases: []
}