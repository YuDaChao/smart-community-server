import { RedisClientOptions } from 'redis';
import { ModuleMetadata } from '@nestjs/common';

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) =>
    | RedisClientOptions
    | RedisClientOptions[]
    | Promise<RedisClientOptions>
    | Promise<RedisClientOptions[]>;
  inject?: any[];
}
