require('dotenv');
const { tenor_key } = process.env;
const { SlashCommandBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('astarion')
        .setDescription('Grabs an Astarion GIF from Tenor.'),
        async execute (interaction) {
            // deferring reply
            await interaction.deferReply();
            // however many results to generate
            const limit = 10;
            // choose a random number from 0-8 and show number in channel
            let choice = Math.floor(Math.random() * limit);
            // grabbing link for generation
            const link = "https://tenor.googleapis.com/v2/search?q=astarion&key=" + tenor_key + "&limit=" + limit;
            const output = await superagent.get(link).catch(error => { console.log(error) });

            try {
                // send a reply with the gif
                await interaction.editReply({ content: output.body.results[choice].itemurl });
            } catch (error) {
                return await interaction.editReply({ content: `There was an error grabbing a gif...` });
            }
        }
}