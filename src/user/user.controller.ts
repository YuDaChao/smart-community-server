import { Controller, Get } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUserInfo(@User('id') userId: number) {
    return this.userService.getUserInfoById(userId);
  }
}
