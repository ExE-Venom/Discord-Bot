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
                desc: `**Before:** ${oldMember.user.username}\n**After:** ${newMember.user.username}`,
            }, logsChannel).catch(() => { });
        }
    }

    if (oldMember.user.avatar !== newMember.user.avatar) {
        const logsChannel = await client.getLogs(newMember.guild.id);
        if (logsChannel) {
            const embed = {
                title: `${newMember.user.username} avatar changed`,
                desc: `New avatar: ${newMember.user.avatarURL()}`,
            };
            embed.thumbnail = { url: newMember.user.avatarURL({ dynamic: true, size: 256 }) }; 
            client.embed(embed, logsChannel).catch(() => { });
        }
    }
};