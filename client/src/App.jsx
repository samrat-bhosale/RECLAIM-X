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
import Footer from './components/Footer';
import { CheckCircle2, AlertCircle, Info, Recycle } from 'lucide-react';

function AppContent() {
  const { activeTab, notification, currentUser } = useProject();

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Sleek Nexora Navigation Header */}
      <Navbar />

      {/* Main Screen Content */}
      <main className={`flex-1 w-full ${activeTab === 'dashboard' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
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

      {/* Comprehensive High-End Nexora Footer */}
      <Footer />

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
