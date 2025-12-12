import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, BookOpen, ChevronRight } from 'lucide-react';
import { searchResearchPapers } from '../services/geminiService';
import { SearchResult, PaperSource } from '../types';

export const PaperSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await searchResearchPapers(query);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Research Discovery Engine</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Utilize grounded AI to find relevant papers, clinical trials, and scientific journals. 
          Results are verified against real-world sources.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 p-2">
            <Search className="w-6 h-6 text-slate-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., mRNA vaccine efficacy in pediatric oncology..."
              className="w-full bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-500 px-4 py-3 text-lg"
            />
            <button
              type="submit"
              disabled={isLoading || !query}
              className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Summary */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-teal-400 w-6 h-6" />
                <h3 className="text-xl font-semibold text-slate-100">Executive Summary</h3>
              </div>
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-line">
                {result.summary}
              </div>
            </div>

            {/* Sources Column */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm h-fit sticky top-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Cited Sources
              </h3>
              <div className="space-y-3">
                {result.sources.length > 0 ? (
                  result.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-primary-500/50 transition-all"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm font-medium text-slate-200 group-hover:text-primary-400 line-clamp-2">
                          {source.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-primary-400 flex-shrink-0 mt-1" />
                      </div>
                      <div className="mt-2 text-xs text-slate-500 truncate">
                        {new URL(source.uri).hostname}
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic">No direct sources linked.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
