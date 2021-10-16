const { SlashCommandBuilder } = require('@discordjs/builders');

const embedColor = "#e1de14"

const events = [
	{
		"type": "Fountain",
		"object": "Holy Water",
		"successChance": "55%",
		"goodEffects": [
			{
				"attribute": "Attack",
				"bonus": "+50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "+50% for 4s"
			}
		],
		"badEffects": [
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Cart",
		"object": "Medicinal Herb",
		"successChance": "55%",
		"goodEffects": [
			{
				"attribute": "Heal over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Starvation",
		"object": "Food Supplies",
		"successChance": "40%",
		"goodEffects": [
			{
				"attribute": "Heal over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage",
				"bonus": "-10% max health"
			},
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Altar",
		"object": "None",
		"successChance": "60%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+10 mins of idle gold"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Medicinal Herb"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Chest",
		"object": "Pick Set",
		"successChance": "55%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+20 mins of idle gold"
			},
			{
				"attribute": "Gear",
				"bonus": "+1 random piece"
			},
			{
				"attribute": "Hero Medals",
				"bonus": "+2 - Needs ingame confirmation"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Tent",
		"object": "None",
		"successChance": "60%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+10 mins of idle gold"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Hiking Tools"
			}
		],
		"badEffects": [
			{
				"attribute": "Evasion",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Accuracy",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Boxes",
		"object": "None",
		"successChance": "70%",
		"goodEffects": [
			{
				"attribute": "Lab Coin",
				"bonus": "+200"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Food Supplies"
			}
		]
	},
	{
		"type": "Trap",
		"object": "Pick Set",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Accuracy",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Evasion",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Mushrooms",
		"object": "Holy Water",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Torture",
		"object": "Hiking Tools",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Accuracy",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Evasion",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Barricades",
		"object": "Hiking Tools",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Table",
		"object": "None",
		"successChance": "70%",
		"goodEffects": [
			{
				"attribute": "Lab Coin",
				"bonus": "+200"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Vigor Potion"
			}
		]
	},
	{
		"type": "Firewall",
		"object": "Holy Water",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "+2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Bodies",
		"object": "Holy Water",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Books",
		"object": "None",
		"successChance": "70%",
		"goodEffects": [
			{
				"attribute": "Lab Coin",
				"bonus": "+200"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Resurrection Scroll"
			}
		]
	},
	{
		"type": "Stress",
		"object": "Vigor Potion",
		"successChance": "15%",
		"goodEffects": [
			{
				"attribute": "Blessing",
				"bonus": "+1 Random blessing"
			},
		],
		"badEffects": [
			{
				"attribute": "Blessing",
				"bonus": "-1 Random blessing"
			},
		]
	},
	{
		"type": "Sarcophagus",
		"object": "Hiking Tools",
		"successChance": "55%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+20 mins of idle gold"
			},
			{
				"attribute": "Gear",
				"bonus": "+1 random piece"
			},
			{
				"attribute": "Hero Medals",
				"bonus": "+2 - Needs ingame confirmation"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack Speed",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Icewall",
		"object": "Hiking Tools",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack Speed",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Witch",
		"object": "Medicinal Herb",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack Speed",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Firetrap",
		"object": "Pick Set",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Torch",
		"object": "None",
		"successChance": "70%",
		"goodEffects": [
			{
				"attribute": "Lab Coin",
				"bonus": "+200"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Torch"
			}
		]
	},
	{
		"type": "Wardrobe",
		"object": "None",
		"successChance": "70%",
		"goodEffects": [
			{
				"attribute": "Lab Coin",
				"bonus": "+200"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Medical Bandages"
			}
		]
	},
	{
		"type": "Wounds",
		"object": "Medical Bandages",
		"successChance": "15%",
		"goodEffects": [
			{
				"attribute": "Blessing",
				"bonus": "Add new or Upgrade existing blessing"
			}
		],
		"badEffects": [
			{
				"attribute": "Blessing",
				"bonus": "Remove or Downgrade existing blessing"
			}
		]
	},
	{
		"type": "Bag",
		"object": "None",
		"successChance": "60%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+10 mins of idle gold"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Holy Water"
			}
		],
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Attack Speed",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Bones",
		"object": "None",
		"successChance": "50%",
		"goodEffects": [
			{
				"attribute": "Gold",
				"bonus": "+10 mins of idle gold"
			},
			{
				"attribute": "Object",
				"bonus": "+1 Pick Set"
			}
		],
		"badEffects": [
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Thickets",
		"object": "Medicinal Herb",
		"successChance": "30%",
		"badEffects": [
			{
				"attribute": "Damage over Time",
				"bonus": "-2.5% max health/400ms over 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
	{
		"type": "Arch",
		"object": "Resurrection Scroll",
		"successChance": "15%",
		"goodEffects": [
			{
				"attribute": "Resurrection with scroll",
				"bonus": "Resurrect 1 Dead hero, giving 100% HP and 50% Energy"
			},
			{
				"attribute": "Resurrection without scroll",
				"bonus": "Resurrect 1 Dead hero, giving 30% HP and 50% Energy"
			},
		],
		"badEffects": [
			{
				"attribute": "Attack",
				"bonus": "-50% for 4s"
			},
			{
				"attribute": "Defense",
				"bonus": "-50% for 4s"
			}
		]
	},
]

function generateFullList() {
	return events.reduce((finalText, event) => {
		let newLine = `Name: **${event.type}** - Object: **${event.object}** - Chance without object: ${event.successChance}`
		if (finalText === "") {
			return newLine
		} else {
			return finalText = finalText + "\n" + newLine
		}
	}, "")
}

function generateUniqueEventMainEmbed(event) {
	return {
		title: event.type,
		color: embedColor,
		fields: [
			{
				name: "Object used",
				value: event.object,
				inline: true
			},
			{
				name: "Chance to pass without object",
				value: event.successChance,
				inline: true
			}
		]
	}
}

function generateUniqueEventGoodEffectsEmbed(event) {
	if (event.goodEffects) {
		return {
			title: "Good Effects",
			color: embedColor,
			fields: event.goodEffects.map(effect => {
				return {
					name: effect.attribute,
					value: effect.bonus,
					inline: true
				}
			})
		}
	}
}

function generateUniqueEventBadEffectsEmbed(event) {
	if (event.badEffects) {
		return {
			title: "Bad Effects",
			color: embedColor,
			fields: event.badEffects.map(effect => {
				return {
					name: effect.attribute,
					value: effect.bonus,
					inline: true
				}
			})
		}
	}
}

function generateUniqueEvent(event) {
	let mainEmbed = generateUniqueEventMainEmbed(event)
	let goodEffectsEmbed = generateUniqueEventGoodEffectsEmbed(event)
	let badEffectsEmbed = generateUniqueEventBadEffectsEmbed(event)
	let potentialEmbeds = [mainEmbed, goodEffectsEmbed, badEffectsEmbed]
	return potentialEmbeds.filter(n => n)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle')
		.setDescription('Gives information about battle events')
		.addSubcommand(subCommand =>
			subCommand.setName('events')
				.setDescription('What tool should you use for a specific event')
				.addStringOption(option =>
					option.setName('type')
						.setDescription('The event you just encountered')
						.setRequired(false)
				)
		),
	async execute(interaction) {
		await interaction.deferReply()

		try {
			if (interaction.options.getSubcommand() === 'events') {
				const eventName = interaction.options.getString('type')
				if (eventName) {
					let event = events.find(event => event.type.toLowerCase() === eventName.toLowerCase())
					if (event) {
						await interaction.editReply({ embeds: generateUniqueEvent(event) })
					} else {
						await interaction.editReply({ content: `I don't know this type of event, please check /battle events for the full list`, ephemeral: true });
					}

				} else {
					await interaction.editReply(generateFullList());
				}
			}
		} catch (error) {
			console.log(error)
			await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
		}
	},
};