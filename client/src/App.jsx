import React, { useState } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProjectOverview from './components/ProjectOverview';
import AiRecoveryView from './components/AiRecoveryView';
import EconomicImpactView from './components/EconomicImpactView';
import ActualRecoveryView from './components/ActualRecoveryView';
import CircularityTowerView from './components/CircularityTowerView';
import RootCauseSimulatorView from './components/RootCauseSimulatorView';
import CreateProjectModal from './components/CreateProjectModal';
import { CheckCircle2, AlertCircle, Info, Sparkles, Recycle } from 'lucide-react';

function AppContent() {
  const { activeTab, notification } = useProject();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar onOpenNewProject={() => setIsCreateModalOpen(true)} />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onOpenNewProject={() => setIsCreateModalOpen(true)} />}
        {activeTab === 'overview' && <ProjectOverview />}
        {activeTab === 'intelligence' && <AiRecoveryView />}
        {activeTab === 'economic' && <EconomicImpactView />}
        {activeTab === 'actuals' && <ActualRecoveryView />}
        {activeTab === 'control-tower' && <CircularityTowerView />}
        {activeTab === 'simulator' && <RootCauseSimulatorView />}
      </main>

      {/* Modal for Creating New Project */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-xl ${
              notification.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50 shadow-rose-950/50'
                : notification.type === 'info'
                ? 'bg-blue-950/90 text-blue-200 border-blue-500/50 shadow-blue-950/50'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50 shadow-emerald-950/50'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Modern Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Recycle className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">RECLAIM X</span>
            <span>— AI Circularity & Material Recovery Platform for Construction & Demolition</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Stack: React + Vite + Node.js + Express + Gemini AI + Supabase</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Hackathon MVP</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
