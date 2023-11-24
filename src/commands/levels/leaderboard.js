const Discord = require('discord.js');

const Schema = require("../../database/models/levels");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ guildID: interaction.guild.id }).sort(([['level', 'descending']])).exec();

    if (!rawLeaderboard) return client.errNormal({
        error: `No data found!`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map((e, index) => {
        const rank = rawLeaderboard.findIndex(i => i.guildID === interaction.guild.id && i.userID === e.userID) + 1;
        // const username = e.username || 'Unknown';  Проверяем наличие username и устанавливаем значение по умолчанию, если его нет
        return `**${rank}** | <@${e.userID}> - Level: \`${e.level.toLocaleString()}\` (${e.xp.toLocaleString()} xp)`;
    });

    await client.createLeaderboard(`🆙・Levels - ${interaction.guild.name}`, lb, interaction);
}
