const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const Discord = require("discord.js")

module.exports = {
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ - ERROR").setDescription(`Que pena ${message.author}, você não tem a permissão de: **__SILENCIAR_MEMBROS__**.`).setColor("#2f3136"))
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ - ERROR").setDescription(`**Membro não encontrado.**`).setColor("#2f3136"))
        if(!time) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ - ERROR").setDescription(`**Por favor, coloque um tempo valido**\n**Exemplo: 1s, 1m, 1d**`).setColor("#2f3136"))
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send(new Discord.MessageEmbed().setTitle("❌ - ERROR").setDescription(`**Cargo:** **__[muted]__**, **não encontrado, cargo sendo criado!**`).setColor("#2f3136"))

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(new Discord.MessageEmbed().setTitle("✅ - CERTO").setDescription(`**Cargo:** **[<&@${muterole.id}>], **criado com sucesso!**`).setColor("#2f3136"))
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} já foi muted.`)
        await Member.roles.add(role2)
        message.channel.send(new Discord.MessageEmbed().setTitle("MUTADO").addField(`**Membro Mutado:**`, `${Member}`).addField(`Author do Mute`, `${message.author}`).addField(`**Duração do Mute**`, `${time}`).setFooter(`ID do usuario punido: ${Member.id}`).setThumbnail(Member.displayURL))

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(new Discord.MessageEmbed().setTitle("DESMUTADO").setDescription(`${Member}, foi desmutado pela duração do mute.`).setColor("#2f3136"))
        }, ms(time))
    }
}