const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = async (client, interaction, args) => {
    const language = interaction.options.getString('language');

    await interaction.editReply('Please enter your code within the next 60 seconds.');

    const filter = (msg) => msg.author.id === interaction.user.id; 
    const collector = interaction.channel.createMessageCollector({
        filter,
        time: 60000, 
        max: 1, 
    });

    collector.on('collect', async (msg) => {
        const code = msg.content;
        await msg.delete(); 

        const bin = await sourcebin.create(
            [
                {
                    content: code,
                    language: language,
                },
            ],
            {
                title: '💻・Random Code',
                description: 'This code was uploaded via Almaz (Discord Bot).',
            }
        );

        client.succNormal({
            text: `Your code has been posted!`,
            fields: [
                {
                    name: `🔗┇Link`,
                    value: `[Click here to see your code](${bin.url})`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            interaction.followUp('Time expired, please try again.');
        }
    });
};
