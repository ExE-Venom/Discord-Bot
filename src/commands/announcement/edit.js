const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const messageId = interaction.options.getString('id');

    try {
        const editMessage = await interaction.channel.messages.fetch(messageId);

        if (editMessage) {
            await client.embed({ 
                title: `📢・Announcement!`, 
                desc: message,
                type: 'edit'
            }, editMessage);

            await client.succNormal({
                text: `Announcement has been edited successfully!`,
                type: 'ephemeraledit'
            }, interaction);
        } else {
            await client.errNormal({
                error: `Unexpected error`,
                type: 'editreply'
            }, interaction);
        }
    } catch (error) {
        if (error.code === 10008) { // Check for Unknown Message error
            await client.errNormal({
                error: `The message with the provided ID was not found.\nMaybe you entered the command in a different channel where you created this announcement?`,
                type: 'editreply'
            }, interaction);
        } else {
            console.error(error); // Log any other unexpected errors
        }
    }
}
