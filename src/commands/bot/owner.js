const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Discord Server (rus)")
                .setURL("https://discord.gg/9DUP4JRd9w")
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `📘・Owner information`,
        desc: `—————————————————`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `Almaz`,
            inline: true,
        },
        {
            name: "🏷┆Developers",
            value: `[Almaz](<https://discord.com/users/718458417232085104>)\n[f1zyshka](<https://discord.com/users/695642322695749663>)`,
            inline: true,
        },
        {
            name: "🏢┆Team",
            value: `Almaz Team`,
            inline: true,
        },
        {
            name: "🌐┆Discord Server (rus)",
            value: `**https://discord.gg/9DUP4JRd9w**`,
            inline: true,
        }],
        components: [row],
        type: 'editreply'
    }, interaction)
}
