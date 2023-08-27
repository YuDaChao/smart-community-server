import { DynamicModule, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from './redis.interface';
import { createRedisProvider } from './redis.provider';

@Module({})
export class RedisModule {
  static forRoot(options: RedisOptions, isGlobal = true): DynamicModule {
    const redisClientProvider = createRedisProvider();
    return {
      global: isGlobal,
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        redisClientProvider,
      ],
      exports: [redisClientProvider],
    };
  }
}
