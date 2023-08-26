import { Injectable } from '@nestjs/common';
import { ResidentService } from '../resident/resident.service';
import { HouseStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly residentService: ResidentService) {}

  /**
   * 统计小区人数
   * @param communityId
   */
  async getResidentOverview(communityId?: number) {
    // 房屋状态
    const residentHouseStatusCount =
      this.residentService.getResidentHouseStatusCountByCommunityId(
        communityId,
      );
    // 总住户数
    const residentCount =
      this.residentService.getResidentCountByCommunityId(communityId);
    // 总租户数
    const residentTenantCount =
      this.residentService.getResidentTenantCountByCommunityId(communityId);
    const [houseStatusCount, count, tenantCount] = await Promise.all([
      residentHouseStatusCount,
      residentCount,
      residentTenantCount,
    ]);
    const houseStatusCountMap: Partial<Record<HouseStatus, number>> =
      houseStatusCount.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.houseStatus]: cur.count,
        }),
        {},
      );
    // 入住率
    const occupancyCount =
      (houseStatusCountMap.SELF_OCCUPIED || 0) +
      (houseStatusCountMap.HIRE || 0);
    const totalCount = occupancyCount + (houseStatusCountMap.IDLE || 0);
    const occupancyRate = Number(
      ((occupancyCount / totalCount) * 100).toFixed(2),
    );
    return {
      // 自住
      selfOccupied: houseStatusCountMap.SELF_OCCUPIED,
      // 出租
      hire: houseStatusCountMap.HIRE,
      // 空闲
      idle: houseStatusCountMap.IDLE,
      occupancyRate,
      residentCount: count,
      tenantCount,
    };
  }
}
