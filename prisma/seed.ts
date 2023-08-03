import { PrismaClient } from '@prisma/client';
import {
  area,
  building,
  community,
  resident,
  role,
  menu,
} from '../mock/data';

const prisma = new PrismaClient();

async function main() {
  await prisma.area.createMany({ data: area });
  await prisma.community.createMany({ data: community });
  await prisma.building.createMany({ data: building });
  await prisma.role.createMany({ data: role });
  await prisma.resident.createMany({ data: resident });
  await prisma.menu.createMany({ data: menu });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
