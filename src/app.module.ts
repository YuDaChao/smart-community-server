import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import JwtConfig from './config/jwt.config';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { HashingModule } from './hashing/hashing.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AreaModule } from './area/area.module';
import { CommunityModule } from './community/community.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
