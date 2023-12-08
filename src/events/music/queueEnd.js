const Discord = require('discord.js');

module.exports = (client, player, track) => {
    player.destroy(player.guild.id);

    const channel = client.channels.cache.get(player.textChannel);

    setTimeout(() => {
        if (channel && channel.guild.me.voice && channel.guild.me.voice.channel) {
            if (channel.guild.me.voice.channel.id === player.voiceChannel) {
                client.errNormal({
                    error: "Queue is empty, Leaving voice channel"
                }, channel);

                channel.guild.me.voice.channel.leave();
            }
        }
    }, 900000);
};
