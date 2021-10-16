const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const heroLevelResource = require(`../data/heroLevelResource.json`);

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

    if (skillFields.length > 0) {
        return {
            title: "Skill Probabilities",
            color: embedColor,
            fields: skillFields
        };
    }
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

function calculateResourcesNeeded(start, end) {
    // heroLevelResource
    let heroXP = 0
    let gold = 0
    let heroMedal = 0

    for (let i = start + 1; i <= end; i++) {
        heroXP += heroLevelResource.lvlup_info.resources.hero_exp[`${i}`]
        gold += heroLevelResource.lvlup_info.resources.gold[`${i}`]
        if (heroLevelResource.lvlup_info.resources.hero_medal[`${i}`]) {
            heroMedal += heroLevelResource.lvlup_info.resources.hero_medal[`${i}`]
        }
    }
    return {
        heroXP: heroXP,
        gold: gold,
        heroMedal: heroMedal
    }
}

function generateLevelUpText(start, end) {
    if (start >= end) {
        return { content: "Target level **must** be higher than Current level", ephemeral: true }
    } else if (end > 250) {
        return { content: "Maximum level is 250", ephemeral: true }
    }

    let requiredResource = calculateResourcesNeeded(start, end)
    let resourceText = `**Resources required to level up from ${start} to ${end}**`
    resourceText += `\n${requiredResource.gold} gold`
    resourceText += `\n${requiredResource.heroXP} XP`
    resourceText += `\n${requiredResource.heroMedal} Hero Medals`

    return {content: resourceText}
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hero')
        .setDescription('Gives various infos about heros')
        // Damagers
        .addSubcommand(subCommand =>
            subCommand.setName('damager')
                .setDescription('Gives the details of a specific damager')
                .addStringOption(option =>
                    option.setName('heroname')
                        .setDescription('The name of the hero')
                        .setRequired(true)
                        .addChoice("Agra", "agra")
                        .addChoice("Avalon", "avalon")
                        .addChoice("Chas", "chas")
                        .addChoice("Drowzet", "drowzet")
                        .addChoice("Ridael", "ridael")
                        .addChoice("Sir Joseph", "sir-joseph")
                        .addChoice("Tiara", "tiara")
                        .addChoice("Violet", "violet")
                        .addChoice("Zik & Zak", "zik-zak")
                        .addChoice("Zi'uk", "ziuk")
                )
        )
        // Tanks
        .addSubcommand(subCommand =>
            subCommand.setName('tank')
                .setDescription('Gives the details of a specific tank')
                .addStringOption(option =>
                    option.setName('heroname')
                        .setDescription('The name of the hero')
                        .setRequired(true)
                        .addChoice("Condrat", "condrat")
                        .addChoice("Gabriella", "gabriella")
                        .addChoice("Ghorm", "ghorm")
                        .addChoice("Kuldjar", "kuldjar")
                        .addChoice("Larion", "larion")
                        .addChoice("Rabba", "rabba")
                        .addChoice("Tao", "tao")
                        .addChoice("Tomas", "tomas")
                )
        )
        // Supports
        .addSubcommand(subCommand =>
            subCommand.setName('support')
                .setDescription('Gives the details of a specific support')
                .addStringOption(option =>
                    option.setName('heroname')
                        .setDescription('The name of the hero')
                        .setRequired(true)
                        .addChoice("Brina", "brina")
                        .addChoice("Drogo", "drogo")
                        .addChoice("Harumi", "harumi")
                        .addChoice("Ja Van", "ja-van")
                        .addChoice("Marylee", "marylee")
                        .addChoice("Rigz Ash", "rigz-ash")
                        .addChoice("Rose", "rose")
                        .addChoice("Selina", "selina")
                )
        )
        .addSubcommand(subCommand =>
            subCommand.setName('levelup')
                .setDescription('Calculates resources needed to level up a hero')
                .addIntegerOption(option => option.setName('start').setDescription('Current level').setRequired(true))
                .addIntegerOption(option => option.setName('end').setDescription('Target level').setRequired(true))
        ),

    async execute(interaction) {
        await interaction.deferReply()

        let command = interaction.options.getSubcommand()
        if (command === 'damager' || command === 'tank' || command === 'support') {
            try {
                const heroName = interaction.options.getString('heroname').toLowerCase();
                const rawHero = fs.readFileSync(`./src/heros/${heroName}.json`)
                let hero = JSON.parse(rawHero);

                const heroEmbed = generateEmbedHero(hero)
                const skillsEmbed = generateEmbedSkills(hero)
                const resistEmbed = generateEmbedResists(hero)

                let potentialEmbeds = [heroEmbed, skillsEmbed, resistEmbed]

                await interaction.editReply({ embeds: potentialEmbeds.filter(n => n) });
            } catch (error) {
                console.log(error)
                await interaction.editReply(`I don't know this hero :(`);
            }
        } else if (command === 'levelup') {
            try {
                let start = interaction.options.getInteger('start');
                let end = interaction.options.getInteger('end');
                await interaction.editReply(generateLevelUpText(start, end));
            } catch (error) {
                console.log(error)
                await interaction.editReply(`Something went wrong with the calculation :(`);
            }
        } else {
            await interaction.editReply(`I don't know this command :(`);
        }
    },
};