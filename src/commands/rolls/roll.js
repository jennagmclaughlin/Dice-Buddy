const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls 1d20 dice.'),
    async execute(interaction) {
        const result = Math.floor(Math.random() * 20) + 1;

        if (result === 1) {
            interaction.reply({
                content: `The dice rolled a **${result}**. Ouch!`
            });
        } else if (result === 20) {
            interaction.reply({
                content: `The dice rolled a **${result}**. Nice!`
            });
        } else {
            interaction.reply({
                content: `The dice rolled a **${result}**.`
            });
        }
    }
}