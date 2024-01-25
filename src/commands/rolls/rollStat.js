const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Character = require('../../schemas/character');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll-stat')
        .setDescription("Rolls 1d20 dice based on your character's chosen stat.")
        .addStringOption(option => option
            .setName('character')
            .setDescription('Choose your character.')
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('stat')
            .setDescription('Choose the stat.')
            .setAutocomplete(true)
            .setRequired(true)
        ),
    async autocomplete(interaction, client) {
        // searching for the user's characters
        const userCharacters = await Character.find({ userID: interaction.user.id });
        // grabbing the focused value...what the user typed
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        // if the option is 'character'
        if (focusedOption.name === 'character') {
            // listing the user's characters as choices
            choices = userCharacters.map(character => character.name);
        }

        // if the option is 'stat'
        if (focusedOption.name === 'stat') {
            choices = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        }

        // filtering the choices so the first choice listed matches what the user typed
        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
        // responding with the list
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        // grabs the character the user chose
        const chosenCharacter = await Character.findOne({ userID: interaction.user.id, name: interaction.options.getString('character') });
        const chosenName = chosenCharacter['name'];
        // grabs the stat the user chose
        const chosenStat = await interaction.options.getString('stat');
        const chosenStatValue = chosenCharacter[chosenStat];

        try {
            if (chosenCharacter) {
                // Check if the requested stat exists in the character's stats
                if (chosenStatValue !== null) {
                    // what the dice rolls
                    const originalResult = Math.floor(Math.random() * 20) + 1;
                    // the modifier for each stat, based on 5e
                    const modifier = Math.floor((chosenStatValue - 10) / 2);
                    // the roll and modifier combined
                    const finalResult = originalResult + modifier;

                    await interaction.reply({
                        content: `${chosenName} rolled a **${finalResult}** in ${chosenStat}. (${originalResult} (roll) + ${modifier} (modifier) = ${finalResult})`
                    });
                } else {
                    await interaction.reply({
                        content: `${chosenStat} is null...`
                    });
                }
            } else {
                await interaction.reply({
                    content: `This character doesn't seem to exist.`
                });
            }
        } catch (error) {
            console.log(`There was an error with the roll stat command. ${error}`);
            await interaction.reply({
                    content: `Sorry, something went wrong...`
            });
        }

        // const originalResult = Math.floor(Math.random() * 20) + 1;
        // const modifier = 5;
        // const finalResult = originalResult + modifier;

        // await interaction.reply({
        //     content: `${chosenCharacter} rolled a **${finalResult}** in ${chosenStat}. (${originalResult} + ${modifier} (modifier) = ${finalResult})`
        // })
    }
}