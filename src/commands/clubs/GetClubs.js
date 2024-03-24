const { SlashCommandBuilder } = require('discord.js');
const { getClubs } = require('../../utils/clubService')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clubes')
        .setDescription('Mostra todos os clubes registrados no campeonato'),

    async execute(interaction) {
        const clubs = await getClubs();
        
        interaction.reply({ content: `Clubes registados : ${clubs.map(clube => JSON.stringify(clube)).join(', ')}`})

    } 
}