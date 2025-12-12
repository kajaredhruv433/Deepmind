export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  SEARCH = 'SEARCH',
  SIMULATION = 'SIMULATION',
  SAVED = 'SAVED'
}

export interface PaperSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  summary: string;
  sources: PaperSource[];
}

export interface SimulationResult {
  prediction: string;
  confidenceScore: number;
  riskFactors: { name: string; value: number }[];
  timeline: { stage: string; outcome: string }[];
}

export interface SavedPaper {
  id: string;
  title: string;
  snippet: string;
  url?: string;
  dateSaved: string;
}
