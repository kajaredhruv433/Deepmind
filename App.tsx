import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PaperSearch } from './components/PaperSearch';
import { OutcomeSimulator } from './components/OutcomeSimulator';
import { ViewState } from './types';
import { Bookmark } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.SEARCH:
        return <PaperSearch />;
      case ViewState.SIMULATION:
        return <OutcomeSimulator />;
      case ViewState.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case ViewState.SAVED:
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Bookmark className="w-16 h-16 mb-4 opacity-20" />
                <h2 className="text-xl font-semibold">Saved Library</h2>
                <p>Your bookmarked papers will appear here.</p>
            </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{
               backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
               backgroundSize: '24px 24px'
             }}>
        </div>
        
        {renderView()}
      </main>
    </div>
  );
};

export default App;
