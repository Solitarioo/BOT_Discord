const { MessageEmbed } = require('discord.js');
const moment = require('moment');


const flags = {
    DISCORD_EMPLOYEE: 'Empregado do discord',
    DISCORD_PARTNER: 'Parceiro do discord',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'Eventos HypeSquad',
    HOUSE_BRAVERY: 'Bravery HypeSquad',
    HOUSE_BRILLIANCE: 'Brilliance HypeSquad',
    HOUSE_BALANCE: 'Balance HypeSquad',
    EARLY_SUPPORTER: 'Apoiante inicial',
    TEAM_USER: 'Usuário da equipe',
    SYSTEM: 'Sistema',
    VERIFIED_BOT: 'Bot verificado',
    VERIFIED_DEVELOPER: 'Desenvolvedor de bot verificado'
};

module.exports = {
    name: 'userinfo',
    description: 'Vejas informaçoês de membros mencionados',
    aliases: ['userinfo', 'user'],
    run: async(client, message, args) => {

        const member = message.mentions.members.last() || message.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags.toArray();
        const embed = new MessageEmbed()
            .setDescription(`**INFORMAÇÕES DO USUÁRIO**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(member.displayHexColor || 'BLACK')
            .setFooter(`TWO NINE・2021`)
            .addField('Usuário:', [
                `**🍭 Nome de usuário** : ${member.user.username}`,
                `**🔱 Tag** : ${member.user.discriminator}`,
                `**️⚠️ ID** : ${member.id}`,
                `**🏷 Avatar** : [Clique aqui](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**📌 Conta criada em** : ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `\u200b`
            ])
            .addField('INFORMAÇÕES DO USUÁRIO NO SERVIDOR', [
                `**🔥 Maior cargo** : ${member.roles.highest.id === message.guild.id ? 'Nenhum' : member.roles.highest.name}`,
                `**🌐 Entrou no servidor em** : ${moment(member.joinedAt).format('LL LTS')}`,
                `**📎 Todos cargos do usuário** [${roles.length}] : ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Nenhum'}`,
                `\u200b`
            ]);
        return message.channel.send(embed);
    }

}