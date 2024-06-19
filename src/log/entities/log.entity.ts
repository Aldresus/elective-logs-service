import { ApiProperty } from '@nestjs/swagger';
import type { Log } from '@prisma/client';

export class LogEntity implements Log {
  @ApiProperty()
  id_log: string;

  @ApiProperty()
  service: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<LogEntity>) {
    Object.assign(this, partial);
  }
}
