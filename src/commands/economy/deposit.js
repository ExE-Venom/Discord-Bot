const Discord = require('discord.js');
const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let amountInput = interaction.options.getString('amount');
    let user = interaction.user;

	let amount = 0;
	let depositAll = false;
	
	if (amountInput) {
	    if (amountInput.toLowerCase() === 'all') {
	        depositAll = true;
	    } else {
	        amount = parseInt(amountInput);
	
	        if (isNaN(amount) || amount < 0) {
	            return client.errNormal({ error: "Enter a valid positive number or 'all'!", type: 'editreply' }, interaction);
	        }
	    }
	} else {
	    depositAll = true; // Если amountInput не определено, устанавливаем depositAll в true
	}


    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (!data) {
            return client.errNormal({ error: `You don't have any money to deposit!`, type: 'editreply' }, interaction);
        }

        if (!amountInput || amount === data.Money) {
            amount = data.Money; // Если пользователь не указал сумму или указал всю доступную сумму на руках, устанавливаем сумму для перевода в банк равной деньгам на руках пользователя
        }

        if (data.Money < amount) {
            return client.errNormal({ error: `You don't have enough money to deposit!`, type: 'editreply' }, interaction);
        }

        // Выполняем операции только если есть деньги для перевода в банк
        data.Money -= amount;
        data.Bank += amount;
        data.save();

        client.succNormal({
            text: `You've deposited some money into your bank!`,
            fields: [{
                name: `${client.emotes.economy.coins}┆Amount`,
                value: `$${amount}`,
                inline: true
            }],
            type: 'editreply'
        }, interaction);
    });
};
