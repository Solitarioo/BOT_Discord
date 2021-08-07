const { MessageEmbed } = require('discord.js')
exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('Você precisa estar em um canal de voz para utilizar o comando!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send({
        embed:{
            title: '**Não tem nada tocando agora!**'
        }
    })
    message.channel.send({
        embed:{
            title: 'Música Info',
            description: queue.songs[0].title + 'Música pedida por: ' + '<@' + queue.songs[0].requester + '>',
            color: '#000000',
            thumbnail: queue.songs[0].thumbnail
        }
    })
}