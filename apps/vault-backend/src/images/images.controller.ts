import { Request } from 'express';
import 'multer';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  ParseIntPipe,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageEntity } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ImageEntity })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  findAll(@Req() req: Request) {
    return this.imagesService.findAll(req.user['id']);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity })
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.imagesService.handleUpload(file);
  }

  @Get('player/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  findForPlayer(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findForPlayer(id, req.user['id']);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity })
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const image = await this.imagesService.findOne(id, req.user['id']);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} does not exist.`);
    }
    return image;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity })
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImageDto: UpdateImageDto
  ) {
    return this.imagesService.update(id, updateImageDto, req.user['id']);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ImageEntity })
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id, req.user['id']);
  }
}
