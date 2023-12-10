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
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (removedRoles.size === 0 && addedRoles.size === 0 || removedRoles.size === addedRoles.size) return;    
    const logsChannel = await client.getLogs(newMember.guild.id);
    if (!logsChannel) return;

    var ostring = "";
    if (removedRoles.size === 0) ostring = "No roles removed";
    if (removedRoles.size > 0) removedRoles.forEach(element => { ostring += "<@&" + element + "> " });

    var nstring = "";
    if (addedRoles.size > 0) addedRoles.forEach(element => { nstring += "<@&" + element + "> " });

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
    
    client.embed({
        title: `${newMember.user.username} roles adjusted`,
        desc: `There are roles changed`,
        fields: [
            {
                name: `> Old Roles`,
                value: `- ${ostring}`
            },
            {
                name: `> New Roles`,
                value: `- ${nstring}`
            },
        ]
    }, logsChannel).catch(() => { })
};