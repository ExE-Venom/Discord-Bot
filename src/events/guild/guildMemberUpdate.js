const Discord = require('discord.js');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.GuildMember} oldMember 
 * @param {Discord.GuildMember} newMember 
 * @returns 
 */
module.exports = async (client, oldMember, newMember) => {
    if (!oldMember || !newMember) return;
    const logsChannel = await client.getLogs(newMember.guild.id);
    if (!logsChannel) return;

    if (oldMember.displayName !== newMember.displayName) {
        const logsChannel = await client.getLogs(newMember.guild.id);
        if (logsChannel) {
            client.embed({
                title: `${newMember.user.username} nickname changed`,
                desc: `New nickname: ${newMember.displayName}`,
            }, logsChannel).catch(() => { });
        }
    }

    if (oldMember.user.avatarURL() !== newMember.user.avatarURL()) {
        const logsChannel = await client.getLogs(newMember.guild.id);
        if (logsChannel) {
            client.embed({
                title: `${newMember.user.username} avatar changed`,
                desc: `New avatar: ${newMember.user.avatarURL()}`,
            }, logsChannel).catch(() => { });
        }
    }
};