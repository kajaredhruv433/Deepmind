import React, { useState } from 'react';
import { FlaskConical, Play, RefreshCw, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { simulateOutcome } from '../services/geminiService';
import { SimulationResult } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';

export const OutcomeSimulator: React.FC = () => {
  const [hypothesis, setHypothesis] = useState('');
  const [parameters, setParameters] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    if (!hypothesis || !parameters) return;
    setIsSimulating(true);
    setResult(null);
    try {
      const data = await simulateOutcome(hypothesis, parameters);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Simulation failed. Please try again.");
    } finally {
      setIsSimulating(false);
    }
  };

  // Prepare data for charts
  const riskData = result?.riskFactors.map(r => ({ ...r, fill: '#ef4444' })) || [];
  const confidenceData = result ? [{ name: 'Confidence', value: result.confidenceScore, fill: '#10b981' }] : [];

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Input Panel */}
      <div className="w-full lg:w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FlaskConical className="text-purple-400" /> Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Input your hypothesis and variables. The AI will reason through potential outcomes before real-world implementation.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Hypothesis / Solution</label>
              <textarea
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder="e.g., Implementing a CRISPR-Cas9 based gene drive to reduce malaria vector population..."
                className="w-full bg-slate-800 border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:ring-purple-500 focus:border-purple-500 h-32 p-3 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Parameters & Variables</label>
              <textarea
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder="e.g., Target region: Sub-Saharan Africa. Efficiency rate: 95%. Off-target mutations: <0.1%. Population size: 1M..."
                className="w-full bg-slate-800 border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:ring-purple-500 focus:border-purple-500 h-32 p-3 text-sm resize-none"
              />
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating || !hypothesis || !parameters}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Simulating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" /> Run Simulation
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="w-full lg:w-2/3 bg-slate-950 flex flex-col h-full overflow-y-auto">
        {!result && !isSimulating && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
            <FlaskConical className="w-24 h-24 mb-4 opacity-20" />
            <h3 className="text-xl font-medium">Ready to Simulate</h3>
            <p className="max-w-md mt-2">Enter your research parameters to generate a predictive model using AI reasoning.</p>
          </div>
        )}

        {isSimulating && (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-purple-400 font-medium animate-pulse">Analyzing Biological Vectors...</p>
            <p className="text-xs text-slate-600 mt-2">Powered by Gemini 3.0 Reasoning Engine</p>
          </div>
        )}

        {result && (
          <div className="p-8 space-y-8 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <TrendingUp className="w-4 h-4" /> Confidence Score
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-bold ${result.confidenceScore > 70 ? 'text-green-400' : result.confidenceScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {result.confidenceScore}%
                  </span>
                  <span className="text-sm text-slate-500 mb-1">probability of success</span>
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Primary Risk
                </div>
                <div className="text-lg font-medium text-slate-200">
                  {result.riskFactors.sort((a,b) => b.value - a.value)[0]?.name || "None"}
                </div>
              </div>

               <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Expected Timeline
                </div>
                <div className="text-lg font-medium text-slate-200">
                  {result.timeline.length} Phases
                </div>
              </div>
            </div>

            {/* Analysis Text */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Predictive Analysis</h3>
              <div className="prose prose-invert max-w-none text-slate-300">
                <p className="whitespace-pre-wrap">{result.prediction}</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Risk Factors Chart */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-80">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase">Risk Assessment</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

               {/* Timeline View */}
               <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-80 overflow-y-auto custom-scrollbar">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase">Projected Timeline</h3>
                <div className="space-y-6 pl-2">
                  {result.timeline.map((phase, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-700 last:border-0 pb-2">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500"></div>
                      <h4 className="text-sm font-bold text-blue-400">{phase.stage}</h4>
                      <p className="text-sm text-slate-300 mt-1">{phase.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
