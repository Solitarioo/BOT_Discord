const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let respeito = db.fetch(`respeito_${message.guild.id}_${user.id}`);
  if(respeito === null) respeito = 0;

  let resp =`**respeitos:** - :thumbsup:\n**${user} tem ${respeito} respeitos!`;
    message.channel.send(resp)
 
}
