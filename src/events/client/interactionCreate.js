module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // if the interaction is a command
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            // if there is no command, do nothing
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: `Something went wrong when executing this command.`,
                    ephemeral: true
                });
            }
        } else if (interaction.isAutocomplete()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                await console.log(`There was an error with autocomplete commands. ${error}`);
            }
        }
    }
}