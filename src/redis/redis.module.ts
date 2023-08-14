import { DynamicModule, Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { RedisModuleAsyncOptions } from './redis.interface';

@Module({})
export class RedisModule {
  static register(options: RedisClientOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisModule.register(options)],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisModule.forRootAsync(options)],
    };
  }
}
