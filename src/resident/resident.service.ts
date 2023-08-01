import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto } from './dtos/create-resident.dto';
import { GetResidentDto } from './dtos/get-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';

@Injectable()
export class ResidentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createResident(createResidentDto: CreateResidentDto) {
    return this.prismaService.resident.create({
      data: {
        ...createResidentDto,
        createdAt: new Date(),
      },
    });
  }

  async updateResident(id: number, updateResidentDto: UpdateResidentDto) {
    return this.prismaService.resident.update({
      where: { id },
      data: updateResidentDto,
    });
  }

  async getResidentList(getResidentDto: GetResidentDto) {
    const { pageSize, current, ...filters } = getResidentDto;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const where: Prisma.ResidentWhereInput = {};
    Object.keys(filters).forEach((key: keyof typeof filters) => {
      if (key === 'createAt') {
        where.createdAt = {
          gte: filters[key][0],
          lte: filters[key][1],
        };
      }
      if (key === 'residentName') {
        where[key] = {
          contains: filters[key],
        };
      }
    });
    const count = await this.prismaService.resident.count({
      where,
    });
    if (count === 0) {
      return {
        count: 0,
        data: [],
      };
    }
    const residentList = await this.prismaService.resident.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    });
    return {
      count,
      data: residentList,
    };
  }
}
