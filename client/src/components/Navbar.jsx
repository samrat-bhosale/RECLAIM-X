import React, { useState } from 'react';
import {
  Recycle,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BrainCircuit,
  ClipboardList,
  GitBranch,
  ShieldAlert,
  ChevronDown,
  Building,
  UserCheck,
  Shield,
  Sparkles
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Navbar() {
  const {
    projects,
    activeProjectId,
    activeProjectData,
    activeTab,
    setActiveTab,
    selectProject,
    loadDemoProject,
    currentUser,
    toggleUserRole,
    isLoading
  } = useProject();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'create', label: 'Create Project', icon: PlusCircle },
    { id: 'intelligence', label: 'Analysis', icon: BrainCircuit },
    { id: 'actuals', label: 'Recovery', icon: ClipboardList },
    { id: 'simulator', label: 'Simulator', icon: GitBranch },
  ];

  // Admin tab is only visible to authorized admin users
  if (currentUser?.role === 'admin') {
    mainNavItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield, badge: 'ADMIN' });
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Product Name */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/25 transition">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold font-heading text-white tracking-tight flex items-center gap-1.5">
                  RECLAIM <span className="text-emerald-400">X</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Circularity & Material Recovery
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 text-xs">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                      isActive
                        ? 'bg-slate-800 text-emerald-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-2.5">
            
            {/* Active Project Switcher */}
            {projects.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition"
                  title="Switch current active project"
                >
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="max-w-[120px] sm:max-w-[160px] truncate font-medium">
                    {activeProjectData?.project?.name || 'Active Project'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1 z-50 animate-in fade-in">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Switch Project
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            selectProject(p.id, true);
                            setIsProjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs transition flex flex-col ${
                            p.id === activeProjectId
                              ? 'bg-emerald-500/10 text-emerald-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          <span className="text-[10px] text-slate-400">{p.location} • {p.buildingType}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick 1-Click Demo Loader for Judges */}
            <button
              onClick={loadDemoProject}
              disabled={isLoading}
              title="Quick demo setup for hackathon evaluation"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Demo Data</span>
            </button>

            {/* User Role Badge & Switcher (Demonstrating Admin Role Access Control) */}
            <button
              onClick={toggleUserRole}
              title={`Click to toggle role: currently ${currentUser?.role?.toUpperCase()}`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                currentUser?.role === 'admin'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {currentUser?.role === 'admin' ? (
                <Shield className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="capitalize">{currentUser?.role}</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center space-x-1 overflow-x-auto py-2 border-t border-slate-900 text-xs">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
