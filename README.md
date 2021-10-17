# Disclaimer
This bot is not user friendly. To make it work, you need minimum knowledge in how to manage node.js apps.

# Before getting started
This bot is based on [Discord.js](https://discord.js.org/). It is advised you at least go through [their amazing tutorial](https://discordjs.guide/#before-you-begin).

# Getting started
## Prerequisites
You need node.js 16 or higher
## Installation
* [Declare a Discord Bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html) and retrieve your bot token
   * Keep your token secret!
* Clone this repository
* Create a `.env` file at the root of the app
* Add the following code inside `.env` : `DISCORD_TOKEN=Your_token_retrieved_previously`
* run `npm install`
## Registration
* First, [add your bot to the desired server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)
   * Don't forget to add both `bot` and `applications.commands` scopes
* Modify the file `deploy-commands.js` to change:
   * `const clientId = "your_bot_id"`
   * `const guildId = "your_server_id"`
* Run `node deploy-commands.js` to [register the slash commands on your server](https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script)
   * You will need to do so every time you add a new command or change the signature of an existing command
* Run `node index.js`
* Go to your discord server and try it!
   * You can type `/ping` and if everything went well you should get this type of response

![Bot response to ping](https://user-images.githubusercontent.com/52977737/137628221-019ca354-1e47-4a26-9caf-d7c9c336f1f4.png)
## Adding new commands
We follow [Discord.js recommendations](https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files)
* To add a command, add a dedicated js file under `/src/commands`
* Write the code of the command
* Run `node deploy-commands.js`
* Run `node index.js` to test it
