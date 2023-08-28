import { ModuleMetadata } from '@nestjs/common';
import { RedisOptions } from '@nestjs/microservices';

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) =>
    | RedisOptions
    | RedisOptions[]
    | Promise<RedisOptions>
    | Promise<RedisOptions[]>;
  inject?: any[];
}

export const REDIS_CLIENTS = 'REDIS_CLIENTS';
export const REDIS_OPTIONS = 'REDIS_OPTIONS';
