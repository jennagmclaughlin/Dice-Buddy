const { token, client_id } = process.env;
const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())
            }
        }

        const rest = new REST({ version: '9' }).setToken(token);
        try {
            await rest.put(
                Routes.applicationCommands(client_id),
                { body: client.commandArray }
            );

            console.log("Successfully reloaded application's (/) commands!")
        } catch (error) {
            console.log(`There was an error refreshing (/) commands... ${error}`);
        }
    }
}