import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENTS } from '../redis/redis.interface';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(
    @Inject(REDIS_CLIENTS) private readonly redisClient: Redis.Redis,
  ) {}

  async insert(userId: number, tokeId: string) {
    const key = this.getKey(userId);
    return this.redisClient.set(key, tokeId);
  }

  async validate(userId: number, tokenId: string) {
    const val = await this.redisClient.get(this.getKey(userId));
    return val === tokenId;
  }

  async invalidate(userId: number) {
    return this.redisClient.del(this.getKey(userId));
  }

  getKey(userId: number): string {
    return `user-${userId}`;
  }
}
