const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelogs",
        desc: `—————————————————`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Changelogs",
                value: 'Removed many bugs.',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}