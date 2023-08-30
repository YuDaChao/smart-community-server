import { ResidentType } from '@prisma/client';

export class ResidentCountInterface {
  communityId?: number;
  createdAt?: Date;
  residentType?: ResidentType;
}
