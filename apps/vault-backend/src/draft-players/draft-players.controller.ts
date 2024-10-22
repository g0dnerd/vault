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

import { DraftPlayerEntity } from './entities/draft-player.entity';
import { DraftPlayersService } from './draft-players.service';
import { CreateDraftPlayerDto } from './dto/create-draft-player.dto';
import { UpdateDraftPlayerDto } from './dto/update-draft-player.dto';

@Controller('draft-players')
@ApiTags('draft-players')
export class DraftPlayersController {
  constructor(private readonly draftPlayersService: DraftPlayersService) {}

  @Post()
  create(@Body() createDraftPlayerDto: CreateDraftPlayerDto) {
    return this.draftPlayersService.create(createDraftPlayerDto);
  }

  @Get()
  @ApiOkResponse({ type: DraftPlayerEntity, isArray: true })
  findAll() {
    return this.draftPlayersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DraftPlayerEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const draftPlayer = await this.draftPlayersService.findOne(id);
    if (!draftPlayer) {
      throw new NotFoundException(`DraftPlayer with ID ${id} does not exist.`);
    }
    return draftPlayer;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: DraftPlayerEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftPlayerDto: UpdateDraftPlayerDto
  ) {
    return this.draftPlayersService.update(id, updateDraftPlayerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DraftPlayerEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.draftPlayersService.remove(id);
  }
}
