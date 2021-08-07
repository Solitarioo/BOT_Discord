const express = require("express");
const app = express();
const { readFileSync } = require('fs')
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({partials: ["MESSAGE, USER, REACTION"]});
const {token, prefix} = require('./config.json')
const config = require("./config.json");
const db = require("quick.db");
client.config = config;
client.queue = new Map()

console.log(readFileSync( 'output.txt', 'utf8').toString())

console.log('[INFO] Zenitsu é um bot Discord com multi utilidades, uma nova era pro discord!');
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`(COMANDO) ${commandName} foi iniciado!`);
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  let ferinha = [
      `${config.prefix}help`,
    ],
    fera = 0;
  setInterval( () => client.user.setActivity(`${ferinha[fera++ % ferinha.length]}`, {
        type: "PLAYING" //mais tipos: WATCHING / LISTENING
      }), 1000 * 30); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("(STATUS) Index status carregada!")
});

client.on('ready', () => {
  console.log('ready');

 
client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;
 
  if(command == 'ms') {
      client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
              type: 4,
              data: {
                  content: `:ping_pong:**Pong**\n:robot: **${client.ws.ping} ms**`
              }
          }
      });
  }
})
 
  client.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;
 
      if(command == 'link') {
          client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {
                      content: "Não disponivel ainda!"
                  }
              }
          });
      }
 
      if(command == "echo") {
          const description = args.find(arg => arg.name.toLowerCase() == "content").value;
          const embed = new Discord.MessageEmbed()
              .setTitle("Echo!")
              .setDescription(description)
              .setAuthor(interaction.member.user.username);
 
          client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: await createAPIMessage(interaction, embed)
              }
          });
      }
  });
});
 
async function createAPIMessage(interaction, content) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
      .resolveData()
      .resolveFiles();
 
  return { ...apiMessage.data, files: apiMessage.files };
}


async function createAPIMessage(interaction, content) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
      .resolveData()
      .resolveFiles();

  return { ...apiMessage.data, files: apiMessage.files };
}

client.on("message", async message => {

  let afk = new db.table("AFKs"),
        authorStatus = await afk.fetch(message.author.id),
        mentioned = message.mentions.members.first();
    
    if (mentioned) {
      let status = await afk.fetch(mentioned.id);
      
      if (status) {
        message.channel.send(`O Usúario **${mentioned.user.tag}** está AFK \nMotivo: **${status}**`).then(i => i.delete({timeout: 5000}));
      }
    }
    
    if (authorStatus) {
      message.channel.send(`**${message.author.tag}** não está mais AFK.`).then(i => i.delete({timeout: 5000}));
      afk.delete(message.author.id)
    }
  })
  
  client.on("message", async message => {
    if (message.author.client) return;
  
    if(!message.member.hasPermission("EMBED_LINKS")) {
  
      if(is_url(message.content) === true) {
        message.delete()
        return message.channel.send(`<@${message.author.id}> **você não pode mandar link de outros servidores e hoteis aqui**!`,)
      }
  
    }
  
  });

//Entrada
client.on('guildMemberAdd', async member => {
  let guild = await client.guilds.cache.get('866865070385135616');
  let channel = await client.channels.cache.get('866867136160595988');
        if (guild != member.guild) {
      return console.log('Entrou');
  } else {
      let embed = await new Discord.MessageEmbed()
          .setColor('#000001')
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setTitle(`Seja muito Bem vindo(a)`)
          .setImage('https://imgur.com/qZco7sq.png')
          .setDescription(
              `Olá **${member.user.username}** Bem vindo ao servidor, abaixo irei deixar algumas informaçoes sobre mim \n\n **Leia minhas regras** \n <#811345513898704906>`
          )
      channel.send(embed);
  }
});

//saida
client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("866865070385135616");
  let channel = await client.channels.cache.get("866867157924446258");
        if (guild != member.guild) {
        return console.log('Saiu');
    } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Alguem saiu do server`)
      .setDescription(`**${member.user.username}** Saiu do servidor, Espero que um dia ele volte, agora estamos com **${member.guild.memberCount}** membros `)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setTimestamp();

    channel.send(embed);
    }
});

  client.on("message", msg => {
    if(msg.content === `<@!${client.user.id}>`)
    msg.channel.send("**Meu prefixo é **`$`") 
  });

  client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(command == "ticket") {
  
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Use: `.ticket #channel`");
  
        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket")
            .setDescription("Reaja com :ticket: para abrir um ticket!")
            .setFooter("Zenitsu 2.0")
            .setColor("BLUE")
        );
  
        sent.react('🎫');
        settings.set(`${message.guild.id}-ticket`, sent.id);
  
        message.channel.send("Ticket setado para o canal!")
    }
  
    if(command == "close") {
        if(!message.channel.name.includes("ticket-")) return message.channel.send("Você não pode usar aqui")
        message.channel.delete();
    }
  });
  
  client.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
  
    if(user.bot) return;
  
    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
  
    if(!ticketid) return;
  
    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);
  
        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed()
            .setTitle("Bem-vindo ao ticket")
            .setDescription("O suporte estará aqui em breve!")
            .setColor("BLUE"))
        })
    }
  });

  console.log('[AUTHOR] - BOT by ThunderHB#0001') 
client.login(config.token);