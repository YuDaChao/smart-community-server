import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENTS } from './redis.interface';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENTS) private readonly redisClient: Redis.Redis,
  ) {}
}
