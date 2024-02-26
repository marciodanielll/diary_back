import OpenAI from 'openai';
import { IAAdapter } from './adapter';
import { ILoggerAdapter } from '@/infra/logger';
import { ISecretsAdapter } from '@/infra/secrets';
import { ChatCompletionMessageParam } from 'openai/resources';

export class IAService implements IAAdapter {
  private readonly apiKey: string;
  private readonly user: ChatCompletionMessageParam['role'];
  private readonly model: string;
  private readonly maxTokens: number;
  private readonly temperature: number;
  private readonly command: string;
  private readonly logger: ILoggerAdapter;
  private readonly iaContext: string;
  private readonly context = IAService.name;

  constructor(
    {
      IA_KEY,
      IA_USER,
      IA_MODEL,
      IA_MAX_TOKENS,
      IA_TEMPERATURE,
      IA_CONTEXT,
      IA_COMMAND,
    }: ISecretsAdapter,
    logger: ILoggerAdapter,
  ) {
    this.apiKey = IA_KEY;
    this.user = IA_USER;
    this.model = IA_MODEL;
    this.maxTokens = IA_MAX_TOKENS;
    this.temperature = IA_TEMPERATURE;
    this.command = IA_COMMAND;
    this.iaContext = IA_CONTEXT;
    this.logger = logger;
  }

  private createContent(text: string): string {
    return `
    Com base nessas premissas.
    
    ${this.iaContext}

    ${this.command}

    ${text}
    `;
  }
  async analyzeTextWithContext(text: string): Promise<string> {
    const openai = new OpenAI({
      apiKey: this.apiKey,
    });

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        messages: [
          {
            role: this.user as any,
            content: this.createContent(text),
          },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      this.logger.error(error, this.context);
    }
  }
}
