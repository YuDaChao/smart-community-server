import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUserInfo(@User('id') userId: number) {
    return this.userService.getUserInfoById(userId);
  }

  @Post(':userId')
  @UseInterceptors(FileInterceptor('avatarFile'))
  async updateUserInfo(
    @Param('userId', new ParseIntPipe()) userId: number,
    @UploadedFile() avatarFile: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(avatarFile, updateUserDto);
    return this.userService.updateUserInfoById(userId, updateUserDto);
  }
}
