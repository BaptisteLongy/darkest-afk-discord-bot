const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists all the available commands'),
	async execute(interaction) {

        const commandListEmbed = {
            title: 'Command List',
            fields: [
                {
                    name: '/help',
                    value: 'Displays this list',
                },
                {
                    name: '/hero',
                    value: 'Displays infos about a specific hero'
                },
                {
                    name: '/summon',
                    value: 'Everything we know about summoning heros. Try "/summon bonus"'
                },
                {
                    name: '/battle',
                    value: 'Displays infos about battle events. Try "/battle events"'
                },
                {
                    name: '/ping',
                    value: 'Just a ping! Helps checking if the bot is online',
                }
            ]
        };

		await interaction.reply({embeds: [commandListEmbed], ephemeral: true });
	},
};