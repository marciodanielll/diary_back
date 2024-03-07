export type SwaggerErrorMessage = {
  status: number;
  route: string;
  message?: string | unknown;
  description?: string;
};

export type SwaggerDefaultResponseText = {
  status: number;
  text: string | unknown;
  description?: string;
};

export type SwaggerJson = {
  status: number;
  json: unknown;
  description?: string;
};
