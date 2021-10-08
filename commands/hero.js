const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

function getEmbedColor(heroClass) {
    return heroClass === "Support" ? "#0bd92a" : heroClass === "Tank" ? "#241def" : "#d90909"
}

function generateEmbedHero(heroData) {
    let embedColor = getEmbedColor(heroData.class)

    return {
        title: heroData.name,
        color: embedColor,
        thumbnail: {
            url: heroData.icon,
        },
        fields: [
            {
                name: 'Class',
                value: heroData.class,
            },
        ]
    };
}

function generateEmbedSkills(heroData) {
    let embedColor = getEmbedColor(heroData.class)

    return {
        title: "Skills",
        color: embedColor,
        fields: [
            {
                name: heroData.trigger1.name,
                value: heroData.trigger1.effect,
                inline: true
            },
            {
                name: heroData.trigger2.name,
                value: heroData.trigger2.effect,
                inline: true
            },
        ]
    };
}

function generateEmbedResists(heroData) {
    let embedColor = getEmbedColor(heroData.class)

    return {
        title: "Resistances",
        color: embedColor,
        fields: [
            {
                name: "Burning",
                value: heroData.resistances.burning,
                inline: true
            },
            {
                name: "Poisoning",
                value: heroData.resistances.poisoning,
                inline: true
            },
            {
                name: "Weakening",
                value: heroData.resistances.weakening,
                inline: true
            },
            {
                name: "Stunning",
                value: heroData.resistances.stunning,
                inline: true
            },
            {
                name: "Freezing",
                value: heroData.resistances.freezing,
                inline: true
            },
            {
                name: "Bleeding",
                value: heroData.resistances.bleeding,
                inline: true
            },
        ]
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hero')
        .setDescription('Gives the details of a specific hero')
        .addStringOption(option =>
            option.setName('heroname')
                .setDescription('The name of the hero')
                .setRequired(true)),
    async execute(interaction) {
            await interaction.deferReply()
        try {
            const heroName = interaction.options.getString('heroname').toLowerCase();
            const rawHero = fs.readFileSync(`./heros/${heroName}.json`)
            let hero = JSON.parse(rawHero);

            const heroEmbed = generateEmbedHero(hero)
            const skillsEmbed = generateEmbedSkills(hero)
            const resistEmbed = generateEmbedResists(hero)

            await interaction.editReply({embeds: [heroEmbed, skillsEmbed, resistEmbed]});
        } catch (error) {
            console.log(error)
            await interaction.editReply(`I don't know this hero :(`);
        }

    },
};