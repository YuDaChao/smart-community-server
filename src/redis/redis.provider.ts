import { Provider } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENTS, REDIS_OPTIONS } from './redis.interface';

export const createRedisProvider = (): Provider => {
  return {
    provide: REDIS_CLIENTS,
    useFactory: (options: RedisOptions) => {
      return new Redis(options);
    },
    inject: [REDIS_OPTIONS],
  };
};
