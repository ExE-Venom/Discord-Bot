const Discord = require('discord.js');
const Schema = require("../../database/models/reminder");
const ms = require("ms");

function customMsParser(timeString) {
    const timeUnits = {
        d: 24 * 60 * 60 * 1000,
        h: 60 * 60 * 1000, // часы
        m: 60 * 1000,      // минуты
        s: 1000,           // секунды (добавьте другие единицы, если нужно)
    };

    const parts = timeString.split(' ');

    let milliseconds = 0;

    for (const part of parts) {
        for (const unit in timeUnits) {
            if (part.includes(unit)) {
                const value = parseInt(part.replace(unit, ''), 10);
                if (!isNaN(value)) {
                    milliseconds += value * timeUnits[unit];
                }
            }
        }
    }

    return milliseconds;
}

module.exports = async (client, interaction, args) => {
    const time = interaction.options.getString('time');
    const text = interaction.options.getString('message');

    const endTime = new Date().getTime() + customMsParser(time);

    Schema.findOne({ Text: text, User: interaction.user.id, endTime: endTime }, async (err, data) => {
        if (data) {
            return client.errNormal({ error: `You already made this reminder!`, type: 'editreply' }, interaction);
        } else {
            const timestampString = `<t:${Math.floor(endTime / 1000)}>`; // Создаем timestamp-строку

            // Создаем новый объект напоминания
            const newReminder = new Schema({
                Text: text,
                User: interaction.user.id,
                endTime: endTime,
                timestamp: timestampString // Добавляем timestamp-строку в объект напоминания
            });

            // Сохраняем новое напоминание в базе данных
            newReminder.save((err) => {
                if (err) {
                    console.error('Error saving reminder:', err);
                    // Обработка ошибки сохранения, если нужно
                } else {
                    return client.succNormal({
                        text: `Your reminder is set!`,
                        fields: [{
                                name: `${client.emotes.normal.clock}┇End Time`,
                                value: `${timestampString}`,
                                inline: true,
                            },
                            {
                                name: `💭┇Reminder`,
                                value: `${text}`,
                                inline: true,
                            }
                        ],
                        type: 'editreply'
                    }, interaction);
                }
            });
        }
    });

    setTimeout(async () => {
        client.embed({
            title: `🔔・Reminder`,
            desc: `Your reminder just ended!`,
            fields: [{
                name: `💭┇Reminder`,
                value: `${text}`,
                inline: true,
            }],
        }, interaction.user);

        let deleted = await Schema.findOneAndDelete({ Text: text, User: interaction.user.id, endTime: endTime });
    }, endTime - new Date().getTime());
};
