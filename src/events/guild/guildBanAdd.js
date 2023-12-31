const discord = require('discord.js');

module.exports = async (client, ban) => {
    const logsChannel = await client.getLogs(ban.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🔧・Member banned`,
        desc: `A user has been banned`,
        thumbnail: ban.user.avatarURL({ size: 4096 }),
        fields: [
            {
                name: `> User`,
                value: `- ${ban.user}`
            },
            {
                name: `> Tag`,
                value: `- ${ban.user.tag}`
            },
            {
                name: `> ID`,
                value: `- ${ban.user.id}`
            },
			{
			    name: `> Timestamp (GMT)`,
			    value: `- ${new Date(ban.createdTimestamp).toUTCString()}`
			}
        ]
    }, logsChannel).catch(() => { })
};