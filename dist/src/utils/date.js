"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const luxon_1 = require("luxon");
const service_1 = require("../infra/secrets/service");
const config_1 = require("@nestjs/config");
class DateUtils {
    static getDateStringWithFormat(input = {}) {
        if (!input?.date) {
            Object.assign(input, { date: DateUtils.getJSDate() });
        }
        if (!input?.format) {
            Object.assign(input, { format: this.secretService.DATE_FORMAT });
        }
        return luxon_1.DateTime.fromJSDate(input.date, { zone: 'utc' })
            .setZone(this.secretService.TZ)
            .toFormat(input.format);
    }
    static getISODateString() {
        return luxon_1.DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' })
            .setZone(this.secretService.TZ)
            .toJSON();
    }
    static getJSDate() {
        return luxon_1.DateTime.fromJSDate(luxon_1.DateTime.now().toJSDate(), { zone: 'utc' })
            .setZone(this.secretService.TZ)
            .toJSDate();
    }
    static getDate() {
        return luxon_1.DateTime.fromJSDate(DateUtils.getJSDate(), { zone: 'utc' }).setZone(this.secretService.TZ);
    }
}
exports.DateUtils = DateUtils;
DateUtils.secretService = new service_1.SecretsService(new config_1.ConfigService());
//# sourceMappingURL=date.js.map