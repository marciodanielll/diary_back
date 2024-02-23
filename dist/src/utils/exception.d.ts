import { HttpException, HttpStatus } from '@nestjs/common';
export type ErrorModel = {
    error: {
        code: string | number;
        traceid: string;
        context: string;
        message: string;
        timestamp: string;
        path: string;
    };
};
type ParametersType = {
    [key: string]: unknown;
};
export declare class BaseException extends HttpException {
    traceid: string;
    readonly context: string;
    readonly statusCode: number;
    readonly code?: string;
    readonly parameters: ParametersType;
    constructor(message: string, status: HttpStatus, parameters?: ParametersType);
}
export declare class ApiInternalServerException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiNotFoundException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiConflictException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiUnauthorizedException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiBadRequestException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiForbiddenException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export declare class ApiTimeoutException extends BaseException {
    constructor(message?: string, parameters?: ParametersType);
}
export {};
