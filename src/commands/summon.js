const { SlashCommandBuilder } = require('@discordjs/builders');
const summonBonuses = require(`../data/summonBonuses.json`);

function generateSummonBonusList() {
    return summonBonuses.reduce((finalText, bonus) => {
        let bonusText = `**Rank ${bonus.rank}**`
        bonusText += `\nTotal summon needed: ${bonus.total_summon_count}`
        bonus.rewards_list.forEach(reward => {
            bonusText += `\n${reward.quantity}x ${reward.name}`
        })

        if (finalText === "") {
            return finalText = bonusText
        } else {
            return finalText = finalText + '\n' + bonusText
        }
    }, "")
}

function generateGemSummonText() {
    const gemsEmbedColor = "#7a14e1"

    const gemText = "**Hero Summon using gems**"

    probabilitiesEmbed = {
        title: "Probabilities",
        color: gemsEmbedColor,
        fields: [
            {
                name: "True Hero",
                value: "16%",
                inline: true
            },
            {
                name: "Soul",
                value: "2%",
                inline: true
            },
            {
                name: "Fallen Hero",
                value: "82%",
                inline: true
            }
        ]
    }

    soulUnlockEmbed = {
        title: "Soul Unlock level",
        color: gemsEmbedColor,
        fields: [
            {
                name: "Grey Soul",
                value: "Always",
                inline: true
            },
            {
                name: "Green Soul",
                value: "Once Chapter 6 is reached",
                inline: true
            },
            {
                name: "Blue Soul",
                value: "Once Chapter 9 is reached",
                inline: true
            },
            {
                name: "Purple Soul",
                value: "Once Chapter 12 is reached",
                inline: true
            }
        ]
    }

    soulWeightEmbed = {
        title: `Soul Weight (once unlocked)`,
        description: `Warning - Those are weights, not percentages`,
        color: gemsEmbedColor,
        fields: [
            {
                name: "Grey Soul",
                value: "80",
                inline: true
            },
            {
                name: "Green Soul",
                value: "40",
                inline: true
            },
            {
                name: "Blue Soul",
                value: "20",
                inline: true
            },
            {
                name: "Purple Soul",
                value: "10",
                inline: true
            }
        ]
    }

    let additionalInfoDescription = "A Fallen Hero is guaranteed as your first pull"
    additionalInfoDescription += "\nA True Hero is guaranteed as your 5th pull"
    additionalInfoDescription += "\nA Soul is guaranteed as your 11th pull"
    additionalInfoEmbed = {
        title: `Additional infos`,
        description: additionalInfoDescription,
        color: gemsEmbedColor,
    }

    return { content: gemText, embeds: [probabilitiesEmbed, soulUnlockEmbed, soulWeightEmbed, additionalInfoEmbed] }
}

function generateScrollSummonText() {
    const scrollEmbedColor = "#9f980c"

    let infoDescription = "The first pull gives one of those heros:"
    infoDescription += "\nJa Van ; Drogo ; Rigz Ash"
    infoEmbed = {
        title: `Fun Fact`,
        description: infoDescription,
        color: scrollEmbedColor
    }

    herosUnlockEmbed = {
        title: `Unlocking heros`,
        description: "Some heros are unlocked after reaching a certain stage",
        color: scrollEmbedColor,
        fields: [
            {
                name: "Rose",
                value: "Once Chapter 3 is reached",
                inline: true
            },
            {
                name: "Avalon",
                value: "Once Chapter 4 is reached",
                inline: true
            },
            {
                name: "Tomas",
                value: "Mid Chapter 4",
                inline: true
            },
            {
                name: "Brina",
                value: "Once Chapter 5 is reached",
                inline: true
            }
        ]
    }

    const scrollText = "**Hero Summon using scrolls**"
    return { content: scrollText, embeds: [herosUnlockEmbed, infoEmbed] }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Everything we know about Hero Summoning')
        .addSubcommand(subCommand =>
            subCommand.setName('bonus')
                .setDescription('List all the Hero Summon bonuses in their cycling order')
        ).addSubcommand(subCommand =>
            subCommand.setName('gems')
                .setDescription('List Hero Summon probabilities when using gems')
        ).addSubcommand(subCommand =>
            subCommand.setName('scrolls')
                .setDescription('List Hero Summon infos when using scrolls')
        ),
    async execute(interaction) {
        await interaction.deferReply()

        try {
            if (interaction.options.getSubcommand() === 'bonus') {
                await interaction.editReply("**Hero Summon bonuses in their cycling order** \n" + generateSummonBonusList())
            } else if (interaction.options.getSubcommand() === 'gems') {
                await interaction.editReply(generateGemSummonText())
            } else if (interaction.options.getSubcommand() === 'scrolls') {
                await interaction.editReply(generateScrollSummonText())
            }
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
        }
    },
};