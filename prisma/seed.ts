import { PrismaClient } from '@prisma/client';
import { area, building, community } from '../mock/data';

const prisma = new PrismaClient();

async function main() {
  await prisma.area.createMany({ data: area });
  await prisma.community.createMany({ data: community });
  await prisma.building.createMany({ data: building });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });
