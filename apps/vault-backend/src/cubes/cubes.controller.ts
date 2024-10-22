import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CubesService } from './cubes.service';
import { CreateCubeDto } from './dto/create-cube.dto';
import { UpdateCubeDto } from './dto/update-cube.dto';
import { CubeEntity } from './entities/cube.entity';

@Controller('cubes')
@ApiTags('cubes')
export class CubesController {
  constructor(private readonly cubesService: CubesService) {}

  @Post()
  @ApiCreatedResponse({ type: CubeEntity })
  create(@Body() createCubeDto: CreateCubeDto) {
    return this.cubesService.create(createCubeDto);
  }

  @Get()
  @ApiOkResponse({ type: CubeEntity, isArray: true })
  findAll() {
    return this.cubesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CubeEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cube = await this.cubesService.findOne(id);
    if (!cube) {
      throw new NotFoundException(`Cube with ID ${id} does not exist.`);
    }
    return cube;
  }

  @Patch(':id')
  @ApiOkResponse({ type: CubeEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCubeDto: UpdateCubeDto
  ) {
    return this.cubesService.update(id, updateCubeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CubeEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cubesService.remove(id);
  }
}
