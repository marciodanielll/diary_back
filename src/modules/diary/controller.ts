import { ILoggerAdapter } from '@/infra/logger';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('diary')
@ApiTags('diary')
export class DiaryController {
  private readonly logger: ILoggerAdapter;
  private readonly context = DiaryController.name;
  constructor(logger: ILoggerAdapter) {
    this.logger = logger;
  }
  @Post('/')
  @ApiOperation({ summary: 'Create a new diary' })
  async create(@Req() { body }: Request & { body: unknown }) {
    this.logger.info({
      message: 'Creating a new diary',
      obj: body,
      context: this.context,
    });
    return body;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a diary' })
  async update(
    @Req() { body }: Request & { body: unknown },
    @Param('id') id: string,
  ) {
    this.logger.info({
      message: 'Updating a diary',
      obj: body,
      context: this.context,
    });
    return { id, ...body };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a diary' })
  async patch(
    @Req() { body }: Request & { body: unknown },
    @Param('id') id: string,
  ) {
    this.logger.info({
      message: 'Patching a diary',
      obj: body,
      context: this.context,
    });
    return { id, ...body };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a diary' })
  async delete(@Param('id') id: string) {
    this.logger.info({
      message: 'Deleting a diary',
      obj: { id },
      context: this.context,
    });
    return { id };
  }

  @Get('/')
  @ApiOperation({ summary: 'List all diaries' })
  async list() {
    this.logger.info({
      message: 'Listing all diaries',
      obj: {},
      context: this.context,
    });
    return 'Method not implemented';
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a diary by id' })
  async get(@Param('id') id: string) {
    this.logger.info({
      message: 'Getting a diary by id',
      obj: { id },
      context: this.context,
    });
    return { id };
  }
}
