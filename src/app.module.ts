import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import JwtConfig from './commons/config/jwt.config';
import { JwtMiddleware } from './commons/middlewares/jwt.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { HashingModule } from './hashing/hashing.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AreaModule } from './area/area.module';
import { CommunityModule } from './community/community.module';
import { ResidentModule } from './resident/resident.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import { DashboardModule } from './dashboard/dashboard.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import * as path from 'path';
import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from './logger/logger.module';
import { BullModule } from '@nestjs/bull';
import { RepairModule } from './repair/repair.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    PrismaModule,
    HashingModule,
    AuthModule,
    UserModule,
    AreaModule,
    CommunityModule,
    ResidentModule,
    RoleModule,
    MenuModule,
    DashboardModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [JwtConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'images'),
      serveRoot: '/static',
    }),
    RedisModule.forRoot({
      host: 'localhost',
      port: 6379,
    }),
    LoggerModule,
    RepairModule,
    WorkflowModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BcryptService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
      .apply(LoggerMiddleware)
      .exclude(
        { path: '*', method: RequestMethod.GET },
        { path: '*', method: RequestMethod.OPTIONS },
      );
  }
}
