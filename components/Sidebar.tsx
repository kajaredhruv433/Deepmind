import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Search, FlaskConical, Bookmark, Atom } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Overview' },
    { view: ViewState.SEARCH, icon: Search, label: 'Paper Discovery' },
    { view: ViewState.SIMULATION, icon: FlaskConical, label: 'Outcome Simulator' },
    { view: ViewState.SAVED, icon: Bookmark, label: 'Saved Research' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-primary-600 p-2 rounded-lg">
          <Atom className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Nexus
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.view
                ? 'bg-primary-600/20 text-primary-400 border border-primary-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-xs text-slate-500 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Gemini 3.0 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
