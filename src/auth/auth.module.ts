import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { HashingModule } from '../hashing/hashing.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    HashingModule,
    JwtModule.registerAsync({
      useFactory: (jwtConf: ConfigType<typeof jwtConfig>) => {
        return {
          global: true,
          secret: jwtConf.secret,
        };
      },
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
