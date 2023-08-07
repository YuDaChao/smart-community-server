import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth/decotators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getHello() {
    console.log(this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN'));
    return 'hello';
  }
}
