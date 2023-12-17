const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = async (client, interaction, args) => {
    const language = interaction.options.getString('language');

    const initialMessage = await interaction.editReply('Please enter your code within the next 3 minutes.');

    const filter = (msg) => msg.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
        filter,
        time: 180000,
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
                title: '💻・Code',
                description: 'This code was uploaded via Almaz (Discord Bot).',
            }
        );

        const successEmbed = new Discord.EmbedBuilder()
        .setColor('#57F287')
        .setTitle('💻 Your code has been posted!')
        .setDescription(`## [Click here to see your code](${bin.url})`)
        .setThumbnail('https://avatars.githubusercontent.com/u/61188297?s=280&v=4')
        .setTimestamp();
    
    const successMessage = await interaction.followUp({
        embeds: [successEmbed]
    });    

        setTimeout(() => {
            initialMessage.delete().catch(console.error); 
        }, 5000);
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            interaction.followUp('Time expired, please try again.');
            initialMessage.delete().catch(console.error); // Delete the initial message if time expires
        }
    });
};