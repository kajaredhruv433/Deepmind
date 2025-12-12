import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult, SimulationResult, PaperSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Searches for research papers using Google Search Grounding.
 * Uses gemini-2.5-flash for speed and grounding capabilities.
 */
export const searchResearchPapers = async (query: string): Promise<SearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find and summarize key research papers and clinical trials related to: "${query}". 
      Focus on recent findings, methodology, and outcomes. 
      Format the output as a clear Markdown summary with bullet points.`,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is NOT allowed with googleSearch
      },
    });

    const text = response.text || "No results found.";
    
    // Extract grounding sources
    const sources: PaperSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri || "#",
          });
        }
      });
    }

    return {
      summary: text,
      sources: sources,
    };
  } catch (error) {
    console.error("Search Error:", error);
    throw new Error("Failed to fetch research papers. Please try again.");
  }
};

/**
 * Simulates an experimental outcome using reasoning.
 * Uses gemini-3-pro-preview with thinkingConfig for deep analysis.
 */
export const simulateOutcome = async (
  hypothesis: string,
  parameters: string
): Promise<SimulationResult> => {
  try {
    const prompt = `
      Act as a senior lead researcher and simulator. 
      Analyze the following hypothesis and experimental parameters.
      Hypothesis: ${hypothesis}
      Parameters/Context: ${parameters}

      Predict the likely outcome, potential pitfalls, and success probability.
      
      Return the response in JSON format conforming to the following structure:
      {
        "prediction": "Detailed markdown explanation of the predicted outcome...",
        "confidenceScore": number (0-100),
        "riskFactors": [{"name": "Risk Name", "value": number (0-100 scale)}],
        "timeline": [{"stage": "Phase 1", "outcome": "description"}]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 }, // Allow deep thought
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
            riskFactors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                }
              }
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stage: { type: Type.STRING },
                  outcome: { type: Type.STRING },
                }
              }
            }
          }
        }
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SimulationResult;
    }
    
    throw new Error("No simulation data returned.");

  } catch (error) {
    console.error("Simulation Error:", error);
    throw new Error("Failed to simulate outcome. Please adjust your parameters.");
  }
};
