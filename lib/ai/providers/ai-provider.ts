/**
 * AI Provider Interface (SOLID - Open/Closed, Dependency Inversion)
 * StudyOS AI Engine Contract for Phase 4+ implementation.
 */

export interface AIRequest {
  systemPrompt?: string;
  userPrompt: string;
  contextDocuments?: Array<{
    title: string;
    content: string;
    source?: string;
  }>;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse<T> {
  data: T;
  rawText?: string;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProvider {
  name: string;
  generateStructured<T>(request: AIRequest, schemaName: string): Promise<AIResponse<T>>;
  generateText(request: AIRequest): Promise<string>;
}
