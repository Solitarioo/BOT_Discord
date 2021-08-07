var Discord = require('discord.js');
 
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('<:alarm:805762591111643198> | Voce nao pode utilizar esse comando!');
 
    var user = msg.mentions.users.first();
    if(!user) return msg.reply('<:alarm:805762591111643198> | Voce tem que mencionar alguem');
 
    var member;
 
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
 
    if(!member) return msg.reply('<:alarm:805762591111643198> | O usuario nao está no server!');
 
    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('<:alarm:805762591111643198> | Voce tem que dar um motivo!');
 
    var channel = msg.guild.channels.cache.find(c => c.id === '783895106767290368');
 
    var log = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('<:alarm:805762591111643198> | Usuario Warned')
    .addField('Usuario:', user, true)
    .addField('Por:', msg.author, true)
    .addField('Motivo:', reason)
    channel.send(log);
 
    var embed = new Discord.MessageEmbed()
    .setTitle('<:alarm:805762591111643198> | Voce levou um warn!')
    .setDescription(reason);
 
    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }
 
    msg.channel.send(`**${user}** foi avisado por **${msg.author}**!`);
}