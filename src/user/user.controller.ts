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
import e, { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as process from 'process';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUserInfo(@User('id') userId: number) {
    return this.userService.getUserInfoById(userId);
  }

  @Post(':userId')
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      dest: 'images',
      storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'images'),
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, `${new Date().getTime()}_${file.originalname}`);
        },
      }),
    }),
  )
  async updateUserInfo(
    @Param('userId', new ParseIntPipe()) userId: number,
    @UploadedFile() avatarFile: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(avatarFile, updateUserDto);
    if (avatarFile) {
      updateUserDto.avatar = `/static/${avatarFile.filename}`;
    }
    return this.userService.updateUserInfoById(userId, updateUserDto);
  }
}
