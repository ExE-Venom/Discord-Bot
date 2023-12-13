const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Discord Server")
                .setURL("https://discord.gg/6K7K2wPtBG")
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `${client.user.username}・Donate`,
        desc: '—————————————————\n**If you want to support the owner of the bot:\n[DonatePay](https://new.donatepay.ru/@Almaziik)\n[DonationAlerts](https://www.donationalerts.com/r/almaz_gamer778)**\nAbout all donations, please report to [Almaz](<https://discord.com/users/718458417232085104>) ',
        thumbnail: client.user.avatarURL({ dynamic: true }),
        url: "https://new.donatepay.ru/@Almaziik",
        components: [row],
        type: 'editreply'
    }, interaction)
}

 