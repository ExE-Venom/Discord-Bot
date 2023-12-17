const Discord = require('discord.js');

module.exports = {
    async execute(client, interaction) {
        const player = client.player.players.get(interaction.guild.id);
        const mode = interaction.options.getString('mode');
        const channel = interaction.member.voice.channel;

        if (!channel) return client.errNormal({
            error: `You're not in a voice channel!`,
            type: 'editreply'
        }, interaction);

        if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
            error: `You're not in the same voice channel!`,
            type: 'editreply'
        }, interaction);

        if (!player || !player.queue.current) return client.errNormal({
            error: "There are no songs playing in this server",
            type: 'editreply'
        }, interaction);


        if (mode === 'track') {
            player.setTrackRepeat(!player.trackRepeat);
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
            return client.succNormal({
                text: `Track repeat is **${trackRepeat}** for the current song`,
                type: 'editreply'
            }, interaction);
        } else if (mode === 'queue') {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
            return client.succNormal({
                text: `Queue repeat is **${queueRepeat}**`,
                type: 'editreply'
            }, interaction);
        }
    }
};
