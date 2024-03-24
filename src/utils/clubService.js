const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createClub(data) {
    const newClub = await prisma.clubes.create({
        data: {
            nome: data.nome,
            club_tag: data.tag,
            logo_url: data.logo_url,
            estadio: data.estadio,
            fundacao: data.fundacao,
            cidade: data.cidade
        }
    })

    return newClub;
}

async function getClubs() {
    const clubs = await prisma.clubes.findMany();
    return clubs;
}

async function delClubs(nome) {
    const findClub = await prisma.clubes.findFirst({
        where: {
           nome: nome
        }
    });

    const delClub = await prisma.clubes.delete({
        where: {
            id: findClub.id
        }
    })

    return delClub;
}






module.exports = {
    createClub,
    getClubs,
    delClubs
  };