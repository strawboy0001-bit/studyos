import type { AIProvider, AIRequest, AIResponse } from "./ai-provider";

export class GeminiProvider implements AIProvider {
  name = "Google Gemini";

  async generateStructured<T>(_request: AIRequest, _schemaName: string): Promise<AIResponse<T>> {
    throw new Error("Gemini AI integration is scheduled for Phase 4 implementation.");
  }

  async generateText(_request: AIRequest): Promise<string> {
    throw new Error("Gemini AI integration is scheduled for Phase 4 implementation.");
  }
}
