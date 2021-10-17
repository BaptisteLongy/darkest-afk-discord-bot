const { SlashCommandBuilder } = require('@discordjs/builders');

const campaign = [
    { chapter: 0, levels: 5, totalProgress: "0-5", unlocks: [] },
    { chapter: 1, levels: 20, totalProgress: "6-25", unlocks: ["**Mines of Abyss (unlock at half chapter)**"] },
    { chapter: 2, levels: 20, totalProgress: "26-45", unlocks: ["**Tower of Darkness**", "**Apprentice Gear (green)**"] },
    { chapter: 3, levels: 20, totalProgress: "46-65", unlocks: ["**Utopia of Dragon**"] },
    { chapter: 4, levels: 40, totalProgress: "66-105", unlocks: ["**Labyrinth of Madness**", "**Hall of Honor (unlock at half chapter)**"] },
    { chapter: 5, levels: 40, totalProgress: "106-145", unlocks: ["**Adept Gear (blue)**"] },
    { chapter: 6, levels: 40, totalProgress: "146-185", unlocks: ["**Apprentice Universal Soul (green)**", "**Class Towers of Darkness**"] },
    { chapter: 7, levels: 40, totalProgress: "186-225", unlocks: [] },
    { chapter: 8, levels: 40, totalProgress: "226-265", unlocks: ["**Rare Adept Gear (purple)**"] },
    { chapter: 9, levels: 40, totalProgress: "266-305", unlocks: ["**Adept Universal Soul (blue)**"] },
    { chapter: 10, levels: 40, totalProgress: "306-345", unlocks: [] },
    { chapter: 11, levels: 40, totalProgress: "346-385", unlocks: ["**Master Gear (pink)**"] },
    { chapter: 12, levels: 40, totalProgress: "386-425", unlocks: ["**Master Universal Soul (purple)**"] },
    { chapter: 13, levels: 40, totalProgress: "426-465", unlocks: [] },
    { chapter: 14, levels: 40, totalProgress: "466-505", unlocks: [] },
]

function generateProgressList() {
    return campaign.reduce((acc, curr) => {
        let text = `**Chapter ${curr.chapter}**`
        text += `\nLevels: ${curr.levels}, total progress: ${curr.totalProgress}`
        curr.unlocks.forEach(unlock => {
            text += `\nUnlocks: ${unlock}`
        })

        if (acc === "") {
            return acc = text + '\n'
        } else {
            return acc += '\n' + text + '\n'
        }
    }, "")
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('campaign_progress')
        .setDescription('A description of campaign progression and what it unlocks in the game'),
    async execute(interaction) {
        await interaction.deferReply()

        try {
            await interaction.editReply("**Campaign progress and what it unlocks** \n\n" + generateProgressList())
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
        }
    },
};