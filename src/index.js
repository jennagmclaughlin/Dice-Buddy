require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits, IntentsBitField } = require('discord.js');
const fs = require('fs');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent
	]
});

client.commands = new Collection();
client.commandArray = [];

// read the folders in the functions folder
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	// grabbing .js files in folders
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	// pass in clients to each file
	for (const file of functionFiles)
		require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
