const { SlashCommandBuilder } = require('@discordjs/builders');
const worldSplitBonuses = require(`../data/worldSplitBonuses.json`);

function generateWorldSplitBonusList() {
    return worldSplitBonuses.reduce((finalText, bonus) => {
        let bonusText = `**Rank ${bonus.rank}**`
        bonusText += `\nNb of summons to reach the bonus: ${bonus.summon_count}`
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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('worldsplit')
        .setDescription('Everything we know about World Split'),
    async execute(interaction) {
        await interaction.deferReply()

        try {
            await interaction.editReply("**World Split bonuses in their cycling order** \n" + generateWorldSplitBonusList())
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
        }
    },
};