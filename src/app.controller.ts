import { Controller, Get } from '@nestjs/common';
import { Auth } from './auth/decotators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller()
export class AppController {
  @Get()
  async getHello() {
    return 'hello';
  }
}
