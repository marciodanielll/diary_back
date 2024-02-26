export abstract class IAAdapter {
  abstract analyzeTextWithContext(text: string): Promise<string>;
}
