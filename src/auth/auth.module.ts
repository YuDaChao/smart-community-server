import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from '../commons/config/jwt.config';
import { HashingModule } from '../hashing/hashing.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';
import { UserModule } from '../user/user.module';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Module({
  imports: [
    HashingModule,
    UserModule,
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
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    RefreshTokenIdsStorage,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
