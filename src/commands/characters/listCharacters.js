const { SlashCommandBuilder } = require('discord.js');
const Character = require('../../schemas/character');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-characters')
        .setDescription('List all of your characters.'),
    async execute(interaction) {
        try {
            // grabbing the user's name
            const user = interaction.user.displayName;
            // searching for the user's characters
            const userCharacters = await Character.find({ userID: interaction.user.id });
 
            if (userCharacters.length === 0) {
                // if the user doesn't have any characters
                return interaction.reply("You don't have any characters!");
            } else {
                // joining the list of characters into a list
                const characterNames = userCharacters.map(Character => Character.characterName).join('\n');
                // the bot's response
                await interaction.reply(`**${user}'s characters:** \n${characterNames}`);
            }
        } catch (error) {
            console.log(`There was an error listing characters. ${error}`);
            interaction.reply('An error occurred when listing your characters...');
        }
    }
}