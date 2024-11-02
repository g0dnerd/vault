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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DraftPlayerEntity } from './entities/draft-player.entity';
import { DraftPlayersService } from './draft-players.service';
import { CreateDraftPlayerDto } from './dto/create-draft-player.dto';
import { UpdateDraftPlayerDto } from './dto/update-draft-player.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('draft-players')
@ApiTags('draft-players')
export class DraftPlayersController {
  constructor(private readonly draftPlayersService: DraftPlayersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDraftPlayerDto: CreateDraftPlayerDto) {
    return this.draftPlayersService.create(createDraftPlayerDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftPlayerEntity, isArray: true })
  findAll() {
    return this.draftPlayersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftPlayerEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const draftPlayer = await this.draftPlayersService.findOne(id);
    if (!draftPlayer) {
      throw new NotFoundException(`DraftPlayer with ID ${id} does not exist.`);
    }
    return draftPlayer;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: DraftPlayerEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftPlayerDto: UpdateDraftPlayerDto
  ) {
    return this.draftPlayersService.update(id, updateDraftPlayerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DraftPlayerEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.draftPlayersService.remove(id);
  }
}
