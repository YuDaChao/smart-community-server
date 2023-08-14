import { PrismaClient } from '@prisma/client';
import {
  area,
  building,
  community,
  resident,
  role,
  menu,
  house,
} from '../mock/data';

const prisma = new PrismaClient();

async function main() {
  await prisma.area.updateMany({ data: area });
  await prisma.community.updateMany({ data: community });
  await prisma.building.updateMany({ data: building });
  await prisma.house.updateMany({ data: house });
  await prisma.role.updateMany({ data: role });
  await prisma.resident.updateMany({ data: resident });
  await prisma.menu.updateMany({ data: menu });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
