import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import JwtConfig from './config/jwt.config';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { JwtMiddleware } from './middlewares/jwt.middleware';
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

@Module({
  imports: [
    PrismaModule,
    HashingModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [JwtConfig],
    }),
    UserModule,
    AreaModule,
    CommunityModule,
    ResidentModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BcryptService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
