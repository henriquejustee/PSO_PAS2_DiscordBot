const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


async function postPlayer(data) {

    const data_types = {
        nome: String(data.nome),
        pso_id: String(data.pso_id),
        steam_url: String(data.steam_url),
        discord_id: String(data.discord_id)
    }

    const newPlayer = await prisma.jogadores.create({
        data: {
            nome: data_types.nome,
            pso_id: data_types.pso_id,
            steam_url: data_types.steam_url,
            discord_id: data_types.discord_id
        }
    })

    return newPlayer;
}

async function checkPlayer(data) {
  
    const findPlayer = await prisma.jogadores.findFirst({
        where: {
            discord_id: data
        }
    });

    return findPlayer;
}

module.exports = { postPlayer, checkPlayer };