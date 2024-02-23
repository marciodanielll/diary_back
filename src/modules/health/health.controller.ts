import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { name, version } from '../../../package.json';
import { IDatabaseService } from '@/infra/database/postgres';

@Controller()
@ApiTags('health')
export class HealthController {
  private databaseService: IDatabaseService;
  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }

  @Get('/health')
  async getHealth(): Promise<string> {
    const result = await this.databaseService.query(``);

    if (result) {
      return `Service ${name} is running version ${version}`;
    }
    return 'Service is down';
  }
}
