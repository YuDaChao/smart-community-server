import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  // 加密
  abstract hash(data: string | Buffer): Promise<string>;

  // 验证
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
