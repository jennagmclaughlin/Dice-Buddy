require('dotenv').config();
const { token, database_token } = process.env;
const mongoose = require('mongoose');
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

// connecting to the database
(async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect(database_token).catch(console.error);
})();

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);

