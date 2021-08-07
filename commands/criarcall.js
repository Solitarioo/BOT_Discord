const { Client, Message } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "callcreate",

    run: async(client, message, args) => {
        var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (membro === message.member) return message.reply(`🚨 | Desculpe, mas você não tem permissão para isso.`)
            if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.inlineReply('🚨 | Desculpe, mas você não tem permissão para isso.')
        let nome = args.join(" ")
        if(!nome) message.inlineReply('Nome inválido')
        message.guild.channels.create(`${nome}`, {
            type : 'voice',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    allow : ['VIEW_CHANNEL']
                },

            ]
        }).then(async channel=> {
            message.channel.send(`✅ | ${message.author} Call criada! Entre nela: <#${channel.id}>`).then(msg => msg.delete({timeout: 15000})); 
        })
    }
}