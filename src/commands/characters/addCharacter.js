const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Character = require('../../schemas/character');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-character')
        .setDescription('Adds a character to your collection.')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Character name')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('strength')
            .setDescription('Character strength')
            .setRequired(false)
        )
        .addNumberOption(option => option
            .setName('dexterity')
            .setDescription('Character dexterity')
            .setRequired(false)
        )
        .addNumberOption(option => option
            .setName('constitution')
            .setDescription('Character constitution')
            .setRequired(false)
        )
        .addNumberOption(option => option
            .setName('intelligence')
            .setDescription('Character intelligence')
            .setRequired(false)
        )
        .addNumberOption(option => option
            .setName('wisdom')
            .setDescription('Character wisdom')
            .setRequired(false)
        )
        .addNumberOption(option => option
            .setName('charisma')
            .setDescription('Character charisma')
            .setRequired(false)
        ),
    async execute(interaction) {
        // grabbing user input
        let name = interaction.options.getString('name');
        let strength = interaction.options.getNumber('strength');
        let dexterity = interaction.options.getNumber('dexterity');
        let constitution = interaction.options.getNumber('constitution');
        let intelligence = interaction.options.getNumber('intelligence');
        let wisdom = interaction.options.getNumber('wisdom');
        let charisma = interaction.options.getNumber('charisma');
        const stats = [strength, dexterity, constitution, intelligence, wisdom, charisma];

        // searching if character with inputted name already exists
        let characterProfile = await Character.findOne({ name: name });

        try {
            // searching to see if the user already has a character with inputted name
            const existingCharacter = await Character.findOne({ userID: interaction.user.id, name: name });
 
            if (existingCharacter) {
                return interaction.reply(`You already have a character named "${name}"!`);
            } else {
                // if any of the stats are less than or equal to 0 or greater than 30
                if (stats.some(stat => stat <= 0 || stat > 30)) {
                    await interaction.reply({
                        content: `Please enter a stat value greater than 0 and less than 30.`
                    });
                } else {
                    // creating new character profile
                    characterProfile = new Character({
                        _id: new mongoose.Types.ObjectId(),
                        userID: interaction.user.id,
                        name: name,
                        strength: strength,
                        dexterity: dexterity,
                        constitution: constitution,
                        intelligence: intelligence,
                        wisdom: wisdom,
                        charisma: charisma
                    });
                    // saving character to database
                    await characterProfile.save();
                    // reply
                    await interaction.reply({
                        content: `"${name}" registered successfully!`
                    })
                }
            }
        } catch (error) {
            console.log(`There was an error adding a character. ${error}`);
            interaction.reply('An error occurred when adding the character...');
        }
    }
}