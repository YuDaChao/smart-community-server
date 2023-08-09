import { Injectable } from '@nestjs/common';
import { ResidentService } from '../resident/resident.service';

@Injectable()
export class DashboardService {
  constructor(private readonly residentService: ResidentService) {}

  /**
   * 统计小区人数
   * 待审核/审核通过/审核驳回人数
   * @param communityId
   */
  async getResidentOverview(communityId?: number) {
    const residentCertificationStatusCount =
      this.residentService.getResidentCertificationStatusCountByCommunityId(
        communityId,
      );
    const residentHouseStatusCount =
      this.residentService.getResidentHouseStatusCountByCommunityId(
        communityId,
      );
    const [certificationStatusCount, houseStatusCount] = await Promise.all([
      residentCertificationStatusCount,
      residentHouseStatusCount,
    ]);
    return {
      certificationStatusCount,
      houseStatusCount,
    };
  }
}
