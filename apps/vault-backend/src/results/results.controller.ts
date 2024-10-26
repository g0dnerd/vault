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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResultEntity } from './entities/result.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('results')
@ApiTags('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ResultEntity })
  create(@Request() req, @Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(req.user.id, createResultDto);
  }

  @Get()
  @ApiOkResponse({ type: ResultEntity, isArray: true })
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResultEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.resultsService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} does not exist.`);
    }
    return result;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ResultEntity })
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultDto: UpdateResultDto
  ) {
    return this.resultsService.update(req.user.id, id, updateResultDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResultEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.remove(id);
  }
}
