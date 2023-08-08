import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  /**
   * 统计小区人数
   * 待审核/审核通过/审核驳回人数
   * @param communityId
   */
  async getResidentOverview(communityId?: number) {}
}
