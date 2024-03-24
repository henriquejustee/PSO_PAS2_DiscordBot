const { SlashCommandBuilder } = require('discord.js');
const { delClubs } = require('../../utils/clubService')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletar-clube')
        .setDescription('ADMIN - Deleta um clube registrado no servidor')
        .addStringOption( option => option.setName('clube').setDescription('Nome do clube').setRequired(true)),
    
        async execute(interaction) {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                return await interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true });
            }
            const clube = interaction.options.getString('clube');
        
            const deletedClub = await delClubs(clube);
        
            if (!deletedClub) {
                interaction.reply({content: "Clube não encontrado!", ephemeral: true});
                return;
            }
        
            interaction.reply({content: `Clube ${clube} deletado com sucesso!`, ephemeral: true});
        }
}