const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { createClub } = require('../../utils/clubService');


const fieldValidations = {
    nome: { maxLength: 30, minLength: 1, errorMsg: 'O nome do clube não pode ter mais de 30 caracteres!' },
    tag: { maxLength: 5, minLength: 3, errorMsg: 'A tag do clube precisa ter entre 3 e 5 caracteres!' },
    logo_url: { maxLength: 200, minLength: 1, errorMsg: 'A URL da logo não pode ter mais de 200 caracteres!', isImageUrl: true },
    cidade: { maxLength: 30, minLength: 1, errorMsg: 'O nome da cidade não pode ter mais de 30 caracteres!' },
    fundacao: { maxLength: 10, minLength: 1, errorMsg: 'A data de fundação não pode ter mais de 10 caracteres!' },
    estadio: { maxLength: 30, minLength: 1, errorMsg: 'O nome do estádio não pode ter mais de 30 caracteres!' },
};

function validateField(fieldName, fieldValue) {
    const validation = fieldValidations[fieldName];

    if (fieldValue.length > validation.maxLength || fieldValue.length < validation.minLength) {
        return validation.errorMsg;
    }

    if (validation.isImageUrl && !fieldValue.endsWith('.png') && !fieldValue.endsWith('.jpg') && !fieldValue.endsWith('.jpeg')) {
        return 'A URL da logo precisa ser um link para uma imagem PNG, JPG ou JPEG!';
    }

    return null;
}



module.exports = {
    data: new SlashCommandBuilder()
    .setName('criar-clube')
    .setDescription('ADMIN - Cria um clube no servidor')
    .addStringOption(option => 
        option.setName('nome')
        .setDescription('Nome do clube')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('tag')
        .setDescription('Tag do clube')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('logo_url')
        .setDescription('URL da logo do clube')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('cidade')
        .setDescription('Cidade natal do clube')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('fundacao')
        .setDescription('Data de fundação do clube')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('estadio')
        .setDescription('Estádio do clube')
        .setRequired(true)
    ),

    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true });
        }
        const nome = interaction.options.getString('nome');
        const tag = interaction.options.getString('tag');
        const logo_url = interaction.options.getString('logo_url');
        const cidade = interaction.options.getString('cidade');
        const fundacao = interaction.options.getString('fundacao');
        const estadio = interaction.options.getString('estadio');

        const embed = new EmbedBuilder()
        .setTitle(`Clube ${nome}`)
        .setDescription(`Clube ${nome} criado com sucesso!`)
        .setColor('#FF0000')
        .setImage(logo_url)
        .addFields(
            { name: 'Tag', value: tag, inline: true},
            { name: 'Cidade', value: cidade, inline: true},
            { name: 'Fundação', value: fundacao, inline: true},
            { name: 'Estádio', value: estadio, inline: true}
        )
        .setTimestamp();

        const fields = { nome, tag, logo_url, cidade, fundacao, estadio };

        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            const errorMsg = validateField(fieldName, fieldValue);
            if (errorMsg) {
                return await interaction.reply({ content: errorMsg, ephemeral: true });
            }
        }

        await interaction.reply({ embeds: [embed] });
        await createClub(fields);
        console.warn(`Clube ${nome} criado com sucesso por ${interaction.user.username}`)
    }
    
}