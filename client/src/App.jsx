import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProjectsView from './components/ProjectsView';
import CreateProjectWizard from './components/CreateProjectWizard';
import ProjectOverview from './components/ProjectOverview';
import AiRecoveryView from './components/AiRecoveryView';
import RecoveryPlanView from './components/RecoveryPlanView';
import EconomicImpactView from './components/EconomicImpactView';
import ActualRecoveryView from './components/ActualRecoveryView';
import CircularityTowerView from './components/CircularityTowerView';
import SimulatorView from './components/SimulatorView';
import RootCauseView from './components/RootCauseView';
import AdminPanelView from './components/AdminPanelView';
import { CheckCircle2, AlertCircle, Info, Recycle } from 'lucide-react';

function AppContent() {
  const { activeTab, notification, currentUser } = useProject();

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Minimal Navigation Header */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'projects' && <ProjectsView />}
        {activeTab === 'create' && <CreateProjectWizard />}
        {activeTab === 'overview' && <ProjectOverview />}
        {activeTab === 'intelligence' && <AiRecoveryView />}
        {activeTab === 'plan' && <RecoveryPlanView />}
        {activeTab === 'economic' && <EconomicImpactView />}
        {activeTab === 'actuals' && <ActualRecoveryView />}
        {activeTab === 'gap' && <CircularityTowerView />}
        {activeTab === 'simulator' && <SimulatorView />}
        {activeTab === 'rootcause' && <RootCauseView />}
        {activeTab === 'admin' && <AdminPanelView />}
      </main>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold backdrop-blur-xl ${
              notification.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
                : notification.type === 'info'
                ? 'bg-blue-950/90 text-blue-200 border-blue-500/50'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
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

      {/* Minimal Clean Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#09090b]/80 py-6 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Recycle className="w-3 h-3" />
            </div>
            <span className="font-semibold text-zinc-200">RECLAIM X</span>
            <span className="hidden sm:inline">• Circularity & Material Recovery Platform</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
            <span>Active Role: <strong className="text-emerald-400 uppercase font-mono">{currentUser?.role}</strong></span>
            <span>•</span>
            <span>C&D Demolition Intelligence</span>
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
