const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('user') || interaction.user;

    if (user.bot) return client.errNormal({
        error: "You can't see the bot's balance!",
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {

            let total = data.Money + data.Bank;

            client.embed({
                title: `${client.emotes.economy.coins}・Balance`,
                fields: [
                    {
                        name: `${client.emotes.economy.pocket}┆Wallet`,
                        value: `$${data.Money}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.bank}┆Bank`,
                        value: `$${data.Bank}`,
                        inline: true
                    },
                    {
                        name: `💰┆Total`,
                        value: `$${total}`,
                        inline: true
                    }
                ],
                desc: `The current balance of ${user}`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.embed({
                title: `${client.emotes.economy.coins}・Balance`,
                fields: [
                    {
                        name: `${client.emotes.economy.pocket}┆Wallet`,
                        value: `$0`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.bank}┆Bank`,
                        value: `$0`,
                        inline: true
                    },
                    {
                        name: `💰┆Total`,
                        value: `$0`,
                        inline: true
                    }
                ],
                desc: `The current balance of ${user}`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 