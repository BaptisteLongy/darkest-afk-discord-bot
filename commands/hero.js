const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

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
            const heroName = interaction.options.getString('heroname');
            const rawHero = fs.readFileSync(`./heros/${heroName}.json`)
            let hero = JSON.parse(rawHero);

            const heroEmbed = {
                title: heroName.charAt(0).toUpperCase() + heroName.slice(1),
                fields: [
                    {
                        name: 'Class',
                        value: hero.class,
                    },
                    {
                        name: 'Skills',
                        value: '\u200b',
                    },
                    {
                        name: hero.trigger1.name,
                        value: hero.trigger1.effect,
                        inline: true
                    },
                    {
                        name: hero.trigger2.name,
                        value: hero.trigger2.effect,
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: "Burning",
                        value: hero.resistances.burning,
                        inline: true
                    },
                    {
                        name: "Poisoning",
                        value: hero.resistances.poisoning,
                        inline: true
                    },
                    {
                        name: "Weakening",
                        value: hero.resistances.weakening,
                        inline: true
                    },
                    {
                        name: "Stunning",
                        value: hero.resistances.stunning,
                        inline: true
                    },
                    {
                        name: "Freezing",
                        value: hero.resistances.freezing,
                        inline: true
                    },
                    {
                        name: "Bleeding",
                        value: hero.resistances.bleeding,
                        inline: true
                    },
                ]
            };

            await interaction.editReply({embeds: [heroEmbed]});
        } catch (error) {
            console.log(error)
            await interaction.editReply(`I don't know this hero :(`);
        }

    },
};