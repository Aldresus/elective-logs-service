import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LogEntity } from './entities/log.entity';

@Controller('api/log')
@ApiTags('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a log' })
  @ApiCreatedResponse({ type: LogEntity })
  @ApiBody({ type: CreateLogDto })
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get logs with optional filters' })
  @ApiCreatedResponse({ type: LogEntity, isArray: true })
  @ApiQuery({ name: 'id_log', required: false, type: String })
  @ApiQuery({ name: 'service', required: false, type: String })
  @ApiQuery({ name: 'level', required: false, type: String })
  findAll(
    @Query('id_log') idLog: string,
    @Query('service') service: string,
    @Query('level') level: string,
  ) {
    return this.logService.findMany({
      id_log: idLog,
      service: service,
      level: level,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update log with ID' })
  @ApiCreatedResponse({ type: LogEntity })
  @ApiBody({ type: UpdateLogDto })
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(id);
  }
}
