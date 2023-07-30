import { PrismaClient, Prisma } from '@prisma/client';
// import { area } from '../mock/area';

const prisma = new PrismaClient();

async function main() {
  // todo
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
  });
