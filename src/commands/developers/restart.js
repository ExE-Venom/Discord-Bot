const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    try {
        if (!interaction.deferred) {
            await interaction.deferReply({ fetchReply: true });
        }

        // Установка статуса бота перед перезапуском
		const randomText = '🚨Restarting...';
        await client.user.setPresence({
            activities: [{ name: randomText, type: Discord.ActivityType.Watching }],
            status: 'dnd'
        });

        client.embed({
            title: `🚨・Restarting...`,
            desc: `Almaz is restarting in 5 seconds.`,
            type: 'editreply',
            thumbnail: "https://www.bp360.in/wp-content/uploads/2020/09/Preparing-to-Restart-Your-Business-and-Dealing-with-the-New-Normal-1.jpg",
        }, interaction);

        // Ожидание 5 секунд перед перезапуском
        setTimeout(async () => {
            await client.user.setPresence({
                status: 'online',
                activities: [{ name: 'for commands', type: 'WATCHING' }]
            });

            process.exit();
        }, 5000); // 5000 миллисекунд = 5 секунд
    } catch (error) {
        console.error(error);
    }
};
