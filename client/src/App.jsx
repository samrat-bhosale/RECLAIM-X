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
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

function AppContent() {
  const { activeTab, notification, currentUser } = useProject();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1F2937] selection:bg-[#0D3B5E] selection:text-white">
      
      {/* Enterprise SaaS Navigation Header */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Toast Notification Banner - Petrol Blue / Monochromatic */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold backdrop-blur-md ${
              notification.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : notification.type === 'info'
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-[#0D3B5E] text-white border-[#082840]'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Deep Charcoal Enterprise Footer */}
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
