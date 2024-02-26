import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { ILoggerAdapter } from '@/infra/logger';

class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly logger: ILoggerAdapter;

  constructor(baseURL: string, retries: number = 3, logger: ILoggerAdapter) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.logger = logger;

    this.setupRetries(retries);
    this.setupInterceptors();
  }

  private setupRetries(retries: number): void {
    // Configuração do axios-retry
    const retryConfig: IAxiosRetryConfig = {
      retries,
      retryDelay: axiosRetry.exponentialDelay,
      /*   retryCondition: (error) => {
        return (
          axiosRetry.isRetryableError(error) || error.response?.status === 429
        );
      }, */
    };

    axiosRetry(this.instance, retryConfig);
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T, R = T>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }
}

export default HttpClient;
