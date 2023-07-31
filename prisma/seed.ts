import { PrismaClient } from '@prisma/client';

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
