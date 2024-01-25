const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(':)'),
    async execute(interaction, client) {
        // defer the reply until we get a new message...
        const message = await interaction.deferReply({
            fetchReply: true
        });
        // get that new message
        const newMessage = `API Latency: ${client.ws.ping}ms\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}ms`
        // send the reply with the new message content
        await interaction.editReply({
            content: newMessage
        });
    }
}