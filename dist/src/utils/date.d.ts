import { DateTime } from 'luxon';
type GetDateWithFormatFormatInput = {
    date?: Date;
    format?: string;
};
export declare class DateUtils {
    private static readonly secretService;
    static getDateStringWithFormat(input?: Partial<GetDateWithFormatFormatInput>): string;
    static getISODateString(): string;
    static getJSDate(): Date;
    static getDate(): DateTime;
}
export {};
