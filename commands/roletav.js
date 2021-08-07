const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { PREFIX } = require('../config');

module.exports = {
    config: {
        name: "roleta",
        aliases: ["roul"],
        category: "economy",
        description: "Bet a colour to win or lose",
        usage: "[colour]<amount>",
        accessableby: "everyone"
    },
    run: async (client, message, args) => {

        if (!message.member.permissions.has("SEND_TTS_MESSAGES"))
    return message.reply(
    "Apenas usuários vips podem usar esse comando."
    );
    
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Especifique uma quantia para jogar | .roleta <cor> <Valor>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Você está apostando mais do que você tem`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Especifique uma cor | Red [1,5x] (normal) Black [2x] (Dificil) Green [15x] (raro)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Você ganhou ${money} moedas\n\nMultiplicador: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 Você ganhou ${money} moedas\n\nMultiplicador: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ Você ganhou ${money} moedas\n\nMultiplicador: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            db.subtract(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Você perdeu ${money} moedas\n\nMultiplicador: 0x`);
            message.channel.send(moneyEmbed4)
        }
          db.add(`games_${message.guild.id}_${user.id}`, 1)
    }
}