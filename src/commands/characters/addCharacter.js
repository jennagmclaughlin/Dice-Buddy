const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Character = require('../../schemas/character');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-character')
        .setDescription('Adds a character to your collection.')
        .addStringOption(option => option.setName('name').setDescription('Character name').setRequired(true)),
    async execute(interaction) {
        // sending reply with content
        try {
            let characterName = interaction.options.getString('name');

            // creating new character profile
            characterProfile = await new Character({
                _id: new mongoose.Types.ObjectId(),
                userID: interaction.user.id,
                characterName: characterName
            });
            // saving character to database
            await characterProfile.save();
            // reply
            await interaction.reply({
                content: `"${characterName}" registered successfully!`
            })
        } catch (error) {
            console.log(`There was an error adding a character. ${error}`);
            interaction.reply('An error occurred when adding the character...');
        }
    }
}