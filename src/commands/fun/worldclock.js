
module.exports = async (client, interaction, args) => {
    var gmt = new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/London",
    });
    var msk = new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
    });    
    var est = new Date().toLocaleString("ru-RU", {
        timeZone: "America/New_York",
    });
    var pst = new Date().toLocaleString("ru-RU", {
        timeZone: "America/Los_Angeles",
    });
    var cst = new Date().toLocaleString("ru-RU", {
        timeZone: "America/Mexico_City",
    });
    var aest = new Date().toLocaleString("ru-RU", {
        timeZone: "Australia/Sydney",
    });
    var awst = new Date().toLocaleString("ru-RU", {
        timeZone: "Australia/Perth",
    });
    var kst = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Seoul" });
    var ist = new Date().toLocaleString("ru-RU", {
        timeZone: "Asia/Calcutta",
    });

    client.embed({
        title: `⏰・World clock`,
        fields: [
            {
                name: ":flag_eu:┇London (GMT)",
                value: `${gmt}\n(GMT+0/GMT+1)`,
                inline: true,
            },
            {
                name: ":flag_ru:┇Moscow (MSK)",
                value: `${msk}\n(GMT+3)`,
                inline: true,
            },            
            {
                name: ":flag_us:┇New York (EST)",
                value: `${est}\n(GMT-5)`,
                inline: true,
            },
            {
                name: ":flag_us:┇Los Angles (PST)",
                value: `${pst}\n(GMT-8)`,
                inline: true,
            },
            {
                name: ":flag_us:┇Mexico City (CST)",
                value: `${cst}\n(GMT-7)`,
                inline: true,
            },
            {
                name: ":flag_au:┇Sydney (AEST)",
                value: `${aest}\n(GMT+11)`,
                inline: true,
            },
            {
                name: ":flag_au:┇Perth (AWST)",
                value: `${awst}\n(GMT+8)`,
                inline: true,
            },
            {
                name: ":flag_kr:┇Korean (KST)",
                value: `${kst}\n(GMT+9)`,
                inline: true,
            },
            {
                name: ":flag_in:┇India (IST)",
                value: `${ist}\n(GMT+05:30)`,
                inline: true,
            },
            {
                name: "\u200b",
                value: `\u200b`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 