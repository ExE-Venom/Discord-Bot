const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.Administrator],
        perms: [Discord.PermissionsBitField.Flags.Administrator]
    }, interaction);

    if (perms == false) return;

    interaction.channel.clone().then((channel) => {
        channel.setPosition(interaction.channel.position).then(
            interaction.channel.delete()
        );

        client.embed({
            title: `Channel Nuked by **${interaction.user.tag}**`,
            image: `https://i.imgur.com/Da7ScU4.gif`
        }, channel)
    })
}

 