import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getAllGames = async () => {
  return prisma.game.findMany();
};

export const getGameById = async (id: number) => {
  return prisma.game.findUnique({ where: { id } });
};

export const createGame = async (data: any) => {
  return prisma.game.create({ data });
};

export const updateGame = async (id: number, data: any) => {
  return prisma.game.update({ where: { id }, data });
};

export const deleteGame = async (id: number) => {
  return prisma.game.delete({ where: { id } });
};
