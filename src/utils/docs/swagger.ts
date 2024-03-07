import { ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ErrorModel } from '@/utils/exception';
import {
  SwaggerErrorMessage,
  SwaggerDefaultResponseText,
  SwaggerJson,
} from './types';

import httpStatusCode from '../status-codes.json';

export const swagger = {
  defaultResponseError({
    status,
    route,
    message,
    description,
  }: SwaggerErrorMessage): ApiResponseOptions {
    return {
      schema: {
        example: {
          error: {
            code: status,
            traceid: '<traceid>',
            message: [message, httpStatusCode[String(status)]].find(Boolean),
            timestamp: '<timestamp>',
            path: route,
          },
        } as ErrorModel,
      },
      description,
      status,
    };
  },

  defaultResponseText({
    status,
    text,
    description,
  }: SwaggerDefaultResponseText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      description,
      status,
    };
  },

  defaultResponseJSON({
    status,
    json,
    description,
  }: SwaggerJson): ApiResponseOptions {
    return {
      content: json
        ? {
            'application/json': {
              schema: {
                example: json,
              },
            },
          }
        : undefined,
      description,
      status,
    };
  },

  defaultRequestJSON(json: unknown): ApiResponseOptions {
    return {
      schema: {
        example: json,
      },
    };
  },

  defaultApiQueryOptions({
    example,
    name,
    required,
    description,
  }: ApiQueryOptions): ApiQueryOptions {
    return {
      schema: { example },
      required,
      name,
      description,
      explode: true,
      type: 'string',
    };
  },
};
