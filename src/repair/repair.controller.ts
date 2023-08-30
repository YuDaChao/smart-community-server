import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { RepairService } from './repair.service';
import { CreateRepairDto } from './dtos/create-repair.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as process from 'process';
import e, { Express } from 'express';
import { GetRepairDto } from './dtos/get-repair.dto';
import { User } from '../commons/decorators/user.decorator';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('repairFile', 3, {
      dest: 'images/repair',
      storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'images/repair'),
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
  async createRepair(
    @Body() createRepairDto: CreateRepairDto,
    @UploadedFiles() repairFiles?: Array<Express.Multer.File>,
  ) {
    const fileUrls: string[] =
      repairFiles?.map((file) => `/images/repair/${file.filename}`) || [];
    return await this.repairService.createRepair(createRepairDto, fileUrls);
  }

  @Get()
  async getRepairList(
    @Query() getRepairDto: GetRepairDto,
    @User('communityId') communityId?: number,
  ) {
    if (communityId) {
      getRepairDto.communityId = communityId;
    }
    return await this.repairService.getRepairList(getRepairDto);
  }

  @Get(':repairId')
  async getRepairInfo(@Param('repairId', new ParseIntPipe()) repairId: number) {
    return this.repairService.getRepairById(repairId);
  }
}
