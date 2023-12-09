const Discord = require("discord.js");
const Schema = require("../../database/models/functions");
const Schema2 = require("../../database/models/channelList");

let lastDeletedTime = 0;

module.exports = (client) => {
    client.on(Discord.Events.MessageCreate, async (message) => {
        if (message.channel.type === Discord.ChannelType.DM || message.author.bot) return;
        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.AntiInvite == true) {
                    const { content } = message
                    const code = content.split('discord.gg/')[1];
                    const code1 = content.split('discord.com/invite/')[1];
                    
                    if (code || code1) {
                        Schema2.findOne({ Guild: message.guild.id }, async (err, data2) => {
                            if (data2) {
                                if (data2.Channels.includes(message.channel.id) || message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
                                    return;
                                }

                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                message.delete();
                                lastDeletedTime = now;

                                client.embed({
                                    title: `${client.emotes.normal.error}・Moderator`,
                                    desc: `Discord links are not allowed in this server!`,
                                    color: client.config.colors.error,
                                    content: `${message.author}`
                                }, message.channel);
                            } else {
                                if (message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                message.delete();
                                lastDeletedTime = now;

                                client.embed({
                                    title: `${client.emotes.normal.error}・Moderator`,
                                    desc: `Discord links are not allowed in this server!`,
                                    color: client.config.colors.error,
                                    content: `${message.author}`
                                }, message.channel);
                            }
                        })
                    }
                } else if (data.AntiLinks == true) {
                    const { content } = message
                    
                    const code3 = content.split('https://')[1];
                    const code4 = content.split('http://')[1];
                    const code5 = content.split('www.')[1];
                    const hasLink = /(http:\/\/|https:\/\/|www\.)\S+/i.test(content);
                    
                    if (hasLink) {
                        Schema2.findOne({ Guild: message.guild.id }, async (err, data2) => {
                            if (data2) {
                                if (data2.Channels.includes(message.channel.id) || message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
                                    return;
                                }

                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                message.delete();
                                lastDeletedTime = now;

                                client.embed({
                                    title: `${client.emotes.normal.error}・Moderator`,
                                    desc: `Links are not allowed in this server!`,
                                    color: client.config.colors.error,
                                    content: `${message.author}`
                                }, message.channel);
                            } else {
                                if (message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                message.delete();
                                lastDeletedTime = now;

                                client.embed({
                                    title: `${client.emotes.normal.error}・Moderator`,
                                    desc: `Links are not allowed in this server!`,
                                    color: client.config.colors.error,
                                    content: `${message.author}`
                                }, message.channel);
                            }
                        })
                    }
                }
            }
        })
    }).setMaxListeners(0);

    client.on(Discord.Events.MessageUpdate, async (oldMessage, newMessage) => {
        if (oldMessage.content === newMessage.content || newMessage.channel.type === Discord.ChannelType.DM) return;

        Schema.findOne({ Guild: newMessage.guild.id }, async (err, data) => {
            if (data) {
                if (data.AntiInvite == true) {
                    const { content } = newMessage
                    const code = content.split('discord.gg/')[1];
                    
                    if (code) {
                        Schema2.findOne({ Guild: newMessage.guild.id }, async (err, data2) => {
                            if (data2) {
                                if (data2.Channels.includes(newMessage.channel.id) || newMessage.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
                                    return;
                                }

                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                newMessage.delete();
                                lastDeletedTime = now;

                                let error = new Discord.EmbedBuilder()
                                    .setTitle(`${client.emotes.normal.error}・Moderator`)
                                    .setAuthor(client.user.username, client.user.avatarURL())
                                    .setDescription(`Discord links are not allowed in this server!`)
                                    .setColor(client.config.colors.error)
                                    .setFooter({ text: client.config.discord.footer })
                                    .setTimestamp();
                                var msg = newMessage.channel.send({ content: `${newMessage.author}`, embeds: [error] });
                                setTimeout(() => {
                                    try{
                                        msg.delete();
                                    } catch (e) {
                                        return;
                                    }
                                }, 5000);
                            } else {
                                if (newMessage.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                newMessage.delete();
                                lastDeletedTime = now;

                                let error = new Discord.EmbedBuilder()
                                    .setTitle(`${client.emotes.normal.error}・Moderator`)
                                    .setAuthor(client.user.username, client.user.avatarURL())
                                    .setDescription(`Discord links are not allowed in this server!`)
                                    .setColor(client.config.colors.error)
                                    .setFooter({ text: client.config.discord.footer })
                                    .setTimestamp();
                                var msg = newMessage.channel.send({ content: `${newMessage.author}`, embeds: [error] });
                                setTimeout(() => {
                                    try {
                                        msg.delete();
                                    } catch (e) {
                                        return;
                                    }
                                }, 5000);
                            }
                        })
                    }
                } else if (data.AntiLinks == true) {
                    const { content } = newMessage
                    
                    if (content.includes('http://') || content.includes('https://') || content.includes('www.')) {
                        Schema2.findOne({ Guild: newMessage.guild.id }, async (err, data2) => {
                            if (data2) {
                                if (data2.Channels.includes(newMessage.channel.id) || newMessage.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
                                    return;
                                }

                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                newMessage.delete();
                                lastDeletedTime = now;

                                let error = new Discord.EmbedBuilder()
                                    .setTitle(`${client.emotes.normal.error}・Moderator`)
                                    .setAuthor(client.user.username, client.user.avatarURL())
                                    .setDescription(`Links are not allowed in this server!`)
                                    .setColor(client.config.colors.error)
                                    .setFooter({ text: client.config.discord.footer })
                                    .setTimestamp();
                                var msg = newMessage.channel.send({ content: `${newMessage.author}`, embeds: [error] });
                                setTimeout(() => {
                                    try {
                                        msg.delete();
                                    } catch (e) {
                                        return;
                                    }
                                }, 5000);
                            } else {
                                if (newMessage.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
                                const now = Date.now();
                                const cooldown = 5000; // 5 секунд задержки

                                if (now - lastDeletedTime < cooldown) {
                                    return;
                                }

                                newMessage.delete();
                                lastDeletedTime = now;

                                let error = new Discord.EmbedBuilder()
                                    .setTitle(`${client.emotes.normal.error}・Moderator`)
                                    .setAuthor(client.user.username, client.user.avatarURL())
                                    .setDescription(`Links are not allowed in this server!`)
                                    .setColor(client.config.colors.error)
                                    .setFooter({ text: client.config.discord.footer })
                                    .setTimestamp();
                                var msg = newMessage.channel.send({ content: `${newMessage.author}`, embeds: [error] });
                                setTimeout(() => {
                                    try {
                                        msg.delete();
                                    } catch (e) {
                                        return;
                                    }
                                }, 5000);
                            }
                        })
                    }
                }
            }
        })
    }).setMaxListeners(0);
}
