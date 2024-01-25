require('dotenv').config();
const { color, github, repository, jenna_icon } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Dice Buddy`)
            .setDescription(`Dice Buddy is your best friend when it comes to rolling die in DnD...or it hopes it is! :)`)
            .setColor(color)
            .setURL(repository)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {
                    name: 'Created',
                    value: '1/19/2024',
                    inline: true
                },
                {
                    name: 'Last Updated',
                    value: '1/25/2024',
                    inline: true
                }
            ])
            .setAuthor({
                url: github,
                iconURL: jenna_icon,
                name: 'Jenna'
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
}