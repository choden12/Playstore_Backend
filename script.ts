import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function main() {
  // Your Prisma Client queries here
}

main().finally(async () => {
  await prisma.$disconnect();
});
