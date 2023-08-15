import { Test, TestingModule } from '@nestjs/testing';
import { ResidentService } from './resident.service';
import { PrismaService } from '../prisma/prisma.service';
import { ResidentType } from '@prisma/client';

describe('ResidentService', () => {
  let service: ResidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidentService, PrismaService],
    }).compile();

    service = module.get<ResidentService>(ResidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should created success', async () => {
    const result = await service.createResident({
      residentName: '赵敏',
      residentPhone: '18827661000',
      residentType: ResidentType.TENANT,
      communityId: 1,
      buildingId: 1,
      houseId: 1,
    });
    expect(result.residentName).toEqual('赵敏');
  });

  it('should updated success', async () => {
    const result = await service.updateResident(7, { residentName: '周芷若' });
    expect(result.residentName).toEqual('周芷若');
  });

  it('should fetch', async () => {
    const result = await service.getResidentList({ current: 1, pageSize: 10 });
    expect(result.count).toEqual(result.data.length);
  });

  it('should fetch with params', async () => {
    const result = await service.getResidentList({
      current: 1,
      pageSize: 10,
      communityId: 1,
      buildingId: 1,
      floorNumber: 3,
    });
    expect(result.count).toEqual(0);
    expect(result.data.length).toEqual(0);
  });
});
