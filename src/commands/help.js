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
                    value: 'Gives various infos about heros'
                },
                {
                    name: '/summon',
                    value: 'Everything we know about Hero Summoning. Try "/summon bonus"'
                },
                {
                    name: '/worldsplit',
                    value: 'Everything we know about World Split.'
                },
                {
                    name: '/battle',
                    value: 'Displays infos about battle events. Try "/battle events"'
                },
                {
                    name: '/hall',
                    value: 'Hall of Fame infos'
                },
                {
                    name: '/ping',
                    value: 'Just a ping! Helps checking if the bot is online',
                },
                {
                    name: '/campaign_progress',
                    value: 'Discover when you can unlock specific modes and items.'
                }
            ]
        };

		await interaction.reply({embeds: [commandListEmbed], ephemeral: true });
	},
};