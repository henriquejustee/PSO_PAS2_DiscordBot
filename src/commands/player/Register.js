const { SlashCommandBuilder } = require('discord.js');
const { postPlayer, checkPlayer } = require('../../utils/playerService')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registrar')
        .setDescription('Registre seu jogador no bot')
        .addStringOption( option => option.setName('nome').setDescription('Nome do seu jogador').setRequired(true))
        .addStringOption( option => option.setName('steam_url').setDescription('Link da sua conta na Steam').setRequired(true))
        .addStringOption( option => option.setName('pso_id').setDescription('Sua ID no PSO').setRequired(true)),

    async execute(interaction) {
        const userId = interaction.user.id;
        const nome = interaction.options.getString('nome');
        const steam_url = String(interaction.options.getString('steam_url'));
        const pso_id = String(interaction.options.getString('pso_id'));

        const data = {
            nome: nome,
            pso_id: String(pso_id),
            steam_url: steam_url,
            discord_id: userId
        }

        if (!(await checkPlayer(data.discord_id))) {
             await postPlayer(data);

            await interaction.reply({content: `Jogador ${nome} criado com sucesso!`, ephemeral: true});
            await console.log(`Jogador ${nome} criou uma conta.`);
        }
        
        else {
            await interaction.reply({content: `Você já possui um jogador registrado!`, ephemeral: true});
        }

        
    }
}

