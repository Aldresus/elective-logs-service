import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}
  create(createLogDto: CreateLogDto) {
    return this.prisma.log.create({
      data: createLogDto,
    });
  }

  findMany(params: { id_log: string; service: string; level: string }) {
    return this.prisma.log.findMany({
      where: {
        AND: [
          {
            id_log: params.id_log === '' ? undefined : params.id_log,
          },
          {
            service: params.service === '' ? undefined : params.service,
          },
          {
            level: params.level === '' ? undefined : params.level,
          },
        ],
      },
    });
  }

  update(id_log: string, updateLogDto: UpdateLogDto) {
    return this.prisma.log.update({
      where: {
        id_log: id_log,
      },
      data: updateLogDto,
    });
  }

  remove(id_log: string) {
    return this.prisma.log.delete({
      where: {
        id_log: id_log,
      },
    });
  }
}
