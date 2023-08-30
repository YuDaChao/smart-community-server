import { Injectable } from '@nestjs/common';
import { ResidentService } from '../resident/resident.service';
import { HouseStatus, ResidentType } from '@prisma/client';
import * as dayjs from 'dayjs';

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
    // ------------------------------
    // 小区入住人数
    const residentCount = this.residentService.getResidentCountByCommunityId({
      communityId,
    });
    // 上个月小区入住人数
    const lastDate = dayjs()
      .subtract(1, 'month')
      .endOf('date')
      .format('YYYY-MM-DD');
    const createdAt = new Date(`${lastDate} 23:59:59`);
    const lastResidentCount =
      this.residentService.getResidentCountByCommunityId({
        communityId,
        createdAt,
      });
    // ------------------------------
    // 小区租户人数
    const residentTenantCount =
      this.residentService.getResidentCountByCommunityId({
        communityId,
        residentType: ResidentType.TENANT,
      });
    // 上个月小区租户人数
    const lastResidentTenantCount =
      this.residentService.getResidentCountByCommunityId({
        communityId,
        residentType: ResidentType.TENANT,
        createdAt,
      });
    const [houseStatusCount, count, tenantCount, lastCount, lastTenantCount] =
      await Promise.all([
        residentHouseStatusCount,
        residentCount,
        residentTenantCount,
        lastResidentCount,
        lastResidentTenantCount,
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
      // 入住率
      occupancyRate,
      residentCount: count,
      tenantCount,
      lastResidentCount: lastCount,
      lastTenantCount,
    };
  }
}
