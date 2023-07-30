import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getHello() {
    const result = await this.prismaService.community.findMany();
    return result;
  }
}
