import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import JwtConfig from '../../config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof JwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const [_, token] = request.headers['authorization'].split(' ') ?? [];
      if (!token) {
        throw new UnauthorizedException();
      }
      const isValidated = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConf.secret,
      });
      if (!isValidated) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
