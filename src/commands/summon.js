const { SlashCommandBuilder } = require('@discordjs/builders');

const bonuses = [
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            }
        ],
        "rank": 1,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Grey Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 2,
        "summon_count": 30
    },
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 3,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Grey Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 4,
        "summon_count": 30
    },
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            }
        ],
        "rank": 5,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Green Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 10
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 10
            }
        ],
        "rank": 6,
        "summon_count": 40
    },
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 7,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Grey Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 8,
        "summon_count": 30
    },
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 5
            }
        ],
        "rank": 9,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Green Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 10
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 10
            }
        ],
        "rank": 10,
        "summon_count": 40
    },
    {
        "rewards_list": [
            {
                "name": "Summoning Scroll",
                "quantity": 1
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 5
            }
        ],
        "rank": 11,
        "summon_count": 20
    },
    {
        "rewards_list": [
            {
                "name": "Blue Soul",
                "quantity": 1
            },
            {
                "name": "2H Gold Chest",
                "quantity": 20
            },
            {
                "name": "2H Hero XP Chest",
                "quantity": 20
            }
        ],
        "rank": 12,
        "summon_count": 50
    }
]

function generateSummonBonusList() {
    return bonuses.reduce((finalText, bonus) => {
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
		.setName('summon')
		.setDescription('All the info we\'ve got about summons')
        .addSubcommand(subCommand =>
			subCommand.setName('bonus')
				.setDescription('List all the summon bonuses in their cycling order')
		),
	async execute(interaction) {
        await interaction.deferReply()

		try {
			if (interaction.options.getSubcommand() === 'bonus') {
                await interaction.editReply(generateSummonBonusList())
			}
		} catch (error) {
			console.log(error)
			await interaction.editReply({ content: `Something bad happened :(`, ephemeral: true });
		}
	},
};