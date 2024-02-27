import { DateTime } from 'luxon';
import { SecretsService } from '../infra/secrets/service';
import { ConfigService } from '@nestjs/config';

type GetDateWithFormatFormatInput = {
  date?: Date;
  format?: string;
};

export class DateUtils {
  private static readonly secretService = new SecretsService(
    new ConfigService(),
  );
  static getDateStringWithFormat(
    input: Partial<GetDateWithFormatFormatInput> = {},
  ): string {
    if (!input?.date) {
      Object.assign(input, { date: DateUtils.getJSDate() });
    }

    if (!input?.format) {
      Object.assign(input, { format: this.secretService.DATE_FORMAT });
    }

    return DateTime.fromJSDate(input.date as Date, { zone: 'utc' })
      .setZone(this.secretService.TZ)
      .toFormat(input.format as string);
  }

  static getISODateString(): string {
    return DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' })
      .setZone(this.secretService.TZ)
      .toJSON() as string;
  }

  static getJSDate(): Date {
    return DateTime.fromJSDate(DateTime.now().toJSDate(), { zone: 'utc' })
      .setZone(this.secretService.TZ)
      .toJSDate();
  }

  static getDate(): DateTime {
    return DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' }).setZone(
      this.secretService.TZ,
    );
  }
}
