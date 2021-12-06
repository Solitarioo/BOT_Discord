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
  let status = [
      `${config.prefix}help`,
    ],
    teste = 0;
  setInterval( () => client.user.setActivity(`${status[teste++ % status.length]}`, {
        type: "PLAYING" //mais tipos: WATCHING / LISTENING
      }), 1000 * 30); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("(STATUS) Index status carregada!")
});

 
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

  console.log('BOT by Thundert#4223') 
client.login(config.token);
