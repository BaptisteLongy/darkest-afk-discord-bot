const { SlashCommandBuilder } = require('@discordjs/builders');

const upgradeCost = [
    0,
    100,
    200,
    300,
    500,
    750,
    1000,
    1000,
    1000,
    1000,
    2000,
    3000,
    4000,
    5000
]

function generateHallOfFameCostText() {
    let costText
    upgradeCost.forEach((cost, index) => {
        if (index === 0) {
            costText = `${index + 1}: free`
        } else {
            costText += `\n${index + 1}: ${cost} provisions`
        }
    })
    costText += "\nAbove: unknown - probably 5000 provisions as well"

    return costText
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hall')
        .setDescription('Hall of Fame infos'),
    async execute(interaction) {
        await interaction.deferReply()

        try {
            await interaction.editReply("**Hall Of Fame Cost** \n" + generateHallOfFameCostText())
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
        }
    },
};