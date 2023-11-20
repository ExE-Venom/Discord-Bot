const Discord = require('discord.js');
const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) {
        amount = 'all'; // Если сумма не указана, устанавливаем значение 'all' для вывода всех денег из банка
    }

    if (isNaN(amount) && amount !== 'all') {
        return client.errNormal({ error: "Enter a valid number or 'all'!", type: 'editreply' }, interaction);
    }

    if (amount < 0) {
        return client.errNormal({ error: `You can't withdraw negative money!`, type: 'editreply' }, interaction);
    }

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.Bank === 0) {
                return client.errNormal({ error: `You have nothing left in the bank!`, type: 'editreply' }, interaction);
            }

            if (data.Bank < 0) {
                return client.errNormal({ error: `Your bank balance is negative!`, type: 'editreply' }, interaction);
            }

            let money = parseInt(amount);

            if (amount === 'all') {
                money = data.Bank; // Если 'all', устанавливаем сумму равной всем деньгам в банке
            }

            if (data.Bank < money) {
                return client.errNormal({ error: `You don't have enough money in the bank!`, type: 'editreply' }, interaction);
            }

            data.Money += money;
            data.Bank -= money;
            data.save();

            client.succNormal({
                text: `You've withdrawn some money from your bank!`,
                fields: [{
                    name: `${client.emotes.economy.coins}┆Amount`,
                    value: `$${money}`,
                    inline: true
                }],
                type: 'editreply'
            }, interaction);
        } else {
            client.errNormal({ text: `You don't have any money to withdraw!`, type: 'editreply' }, interaction);
        }
    });
};
