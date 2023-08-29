import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENTS } from './redis.interface';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENTS) private readonly redisClient: Redis) {}

  async get(key: string): Promise<string | undefined> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: number | string, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
