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

  findMany(params: {
    id_log: string;
    service: string;
    level: string;
    page: number;
    limit: number;
  }) {
    const { id_log, service, level, page, limit } = params;
    const skip = (page - 1) * limit;
    const take = +limit;

    return this.prisma.log.findMany({
      where: {
        AND: [
          { id_log: id_log === '' ? undefined : id_log },
          { service: service === '' ? undefined : service },
          { level: level === '' ? undefined : level },
        ],
      },
      skip,
      take,
    });
  }

  count(params: { service: string }) {
    const { service } = params;
    return this.prisma.log.count({
      where: {
        service: service === '' ? undefined : service,
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
