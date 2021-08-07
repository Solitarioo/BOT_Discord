const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle(`**Olá, me chamo Zenitsu, acompanhe algumas de minhas informações abaixo:**`)
    .setTimestamp()
    .setFooter(`Comando requisitado por: ${message.author.username}`)
    .addFields(
        {
            name: 'Nome e #',
            value: `${client.user.tag}`,
            inline: true
        },
        {
            name: 'Servidores:',
            value: `Estou em **${client.guilds.cache.size}** servidores.`,
            inline: true
        },
        {
            name: 'Canais:',
            value: `Gerencio **${client.channels.cache.size}** canais de texto.`,
            inline: true
        },
        {
            name: 'Usuários:',
            value: `Cuido de **${client.users.cache.size}** usuários.`,
            inline: true
        },
        {
            name: 'Meu ping atualmente:',
            value: `**${Math.round(client.ws.ping)}** ms`,
            inline: true
        },
        {
            name: 'Meus criadores:',
            value: 'ThunderHB#0001',
            inline: true
        },
        {
            name: 'Meu servidor:',
            value: 'não possuo ainda!',
            inline: true
        },
    )
    message.channel.send(embed);
}