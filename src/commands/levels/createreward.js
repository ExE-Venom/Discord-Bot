const Discord = require('discord.js');
const Schema = require("../../database/models/levelRewards");

module.exports = async (client, interaction, args) => {
    let level = interaction.options.getNumber('level');
    let role = interaction.options.getRole('role');
    let delrole = interaction.options.getRole('delrole');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    let data = await Schema.findOne({ Guild: interaction.guild.id, Level: level });

    if (data) {
        if (role) {
            data.Role = role.id;
        }
        if (delrole) {
            data.DelRole = delrole.id; 
        }
    } else {
        data = new Schema({
            Guild: interaction.guild.id,
            Level: level,
            Role: role ? role.id : null,
            DelRole: delrole ? delrole.id : null
        });
    }

    try {
        await data.save();

        const fields = [];
        if (role) {
            fields.push({
                name: "📘┆Role",
                value: `${role}`,
                inline: true,
            });
        }
        if (delrole) {
            fields.push({
                name: "🗑️┆Role to Delete",
                value: `${delrole}`,
                inline: true,
            });
        }

        client.succNormal({ 
            text: data._id ? `Level reward updated` : `Level reward created`,
            fields: fields,
            type: 'editreply'
        }, interaction);
    } catch (err) {
        console.error('Error occurred while saving data:', err);
        client.errNormal({ 
            error: `An error occurred while saving data.`,
            type: 'editreply'
        }, interaction);
    }
}