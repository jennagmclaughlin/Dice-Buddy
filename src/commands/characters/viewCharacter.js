const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Character = require('../../schemas/character');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view-character')
        .setDescription("View a character's information.")
        .addStringOption(option => option
            .setName('character')
            .setDescription('Choose your character.')
            .setAutocomplete(true)
            .setRequired(true)
        ),
    async autocomplete(interaction) {
        // searching for the user's characters
        const userCharacters = await Character.find({ userID: interaction.user.id });
        // grabbing the focused value...what the user typed
        const focusedOption = interaction.options.getFocused(true);
        // listing the user's characters as choices
        const choices = userCharacters.map(character => character.name);
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
        // grabs the chosen character's name
        const chosenName = chosenCharacter['name'];
        // grabs the chosen character's image
        const image = chosenCharacter['image'];
        // grabs the stats for the chosen character
        const strength = chosenCharacter['strength'];
        const dexterity = chosenCharacter['dexterity'];
        const constitution = chosenCharacter['constitution'];
        const intelligence = chosenCharacter['intelligence'];
        const wisdom = chosenCharacter['wisdom'];
        const charisma = chosenCharacter['charisma'];

        const embed = new EmbedBuilder()
            .setTitle(`${chosenName}`)
            .addFields([
                {
                    name: 'Strength',
                    value: `${strength}`,
                    inline: true
                },
                {
                    name: 'Dexterity',
                    value: `${dexterity}`,
                    inline: true
                },
                {
                    name: 'Constitution',
                    value: `${constitution}`,
                    inline: true
                }
            ])
            .addFields([
                {
                    name: 'Intelligence',
                    value: `${intelligence}`,
                    inline: true
                },
                {
                    name: 'Wisdom',
                    value: `${wisdom}`,
                    inline: true
                },
                {
                    name: 'Charisma',
                    value: `${charisma}`,
                    inline: true
                }
            ])
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.displayName
            });

        // if the image isn't undefined, show it
        if (image !== undefined) {
            embed.setThumbnail(image);
        }
    }
}