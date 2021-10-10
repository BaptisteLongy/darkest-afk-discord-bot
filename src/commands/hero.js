const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

function getEmbedColor(heroClass) {
    return heroClass === "Support" ? "#0bd92a" : heroClass === "Tank" ? "#241def" : "#d90909"
}

function generateEmbedHero(heroData) {
    let embedColor = getEmbedColor(heroData.class)

    return {
        title: heroData.name,
        color: embedColor,
        image: {
            url: heroData.stats
        }
    };
}

function generateEmbedSkills(heroData) {
    let embedColor = getEmbedColor(heroData.class)
    let skillFields = heroData.skills.map(skill => {
        return {
            name: skill.name,
            value: skill.effect,
            inline: true
        }
    })

    return {
        title: "Skill Probabilities",
        color: embedColor,
        fields: skillFields
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
                .setRequired(true)
                .addChoice("Agra", "agra")
                .addChoice("Avalon", "avalon")
                .addChoice("Chas", "chas")
            ),

    async execute(interaction) {
        await interaction.deferReply()
        try {
            const heroName = interaction.options.getString('heroname').toLowerCase();
            const rawHero = fs.readFileSync(`./src/heros/${heroName}.json`)
            let hero = JSON.parse(rawHero);

            const heroEmbed = generateEmbedHero(hero)
            const skillsEmbed = generateEmbedSkills(hero)
            const resistEmbed = generateEmbedResists(hero)

            await interaction.editReply({ embeds: [heroEmbed, skillsEmbed, resistEmbed] });
        } catch (error) {
            console.log(error)
            await interaction.editReply(`I don't know this hero :(`);
        }

    },
};