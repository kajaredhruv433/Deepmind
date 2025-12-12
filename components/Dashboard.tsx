import React from 'react';
import { ViewState } from '../types';
import { Search, FlaskConical, ArrowRight, Activity, FileText } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-white">Welcome, Researcher</h1>
        <p className="text-slate-400 text-lg">
          Accelerate your discovery process with grounded AI search and predictive modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search Card */}
        <div 
          onClick={() => onNavigate(ViewState.SEARCH)}
          className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-blue-500/50 transition-all cursor-pointer shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Paper Discovery</h2>
            <p className="text-slate-400">
              Find the exact papers you need. AI summarizes content and grounds every claim with a verified source link to reduce hallucination.
            </p>
            <div className="flex items-center text-blue-400 font-medium mt-4 group-hover:gap-2 transition-all">
              Start Search <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Simulator Card */}
        <div 
          onClick={() => onNavigate(ViewState.SIMULATION)}
          className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-purple-500/50 transition-all cursor-pointer shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-600/20 transition-all"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Outcome Simulator</h2>
            <p className="text-slate-400">
              Predict the future. Input your experimental parameters and let the AI reason through potential outcomes, risks, and success rates.
            </p>
             <div className="flex items-center text-purple-400 font-medium mt-4 group-hover:gap-2 transition-all">
              Start Simulation <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section (Static for demo) */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" /> Recent Trends in Medical AI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "CRISPR Off-target analysis", tag: "Genetics", time: "2h ago" },
            { title: "mRNA stability in tropical climates", tag: "Virology", time: "5h ago" },
            { title: "AI in Radiology Diagnostics", tag: "CompBio", time: "1d ago" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:bg-slate-800 transition-colors">
              <div className="bg-slate-800 p-2 rounded-lg text-slate-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-200 font-medium line-clamp-1">{item.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">{item.tag}</span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
