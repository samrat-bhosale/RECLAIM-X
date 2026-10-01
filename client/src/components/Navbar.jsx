import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  Plus,
  LayoutDashboard,
  FileSpreadsheet,
  BrainCircuit,
  Coins,
  ClipboardCheck,
  LineChart,
  GitBranch,
  ChevronDown,
  Building
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Navbar({ onOpenNewProject }) {
  const {
    projects,
    activeProjectId,
    activeProjectData,
    activeTab,
    setActiveTab,
    selectProject,
    loadDemoProject,
    isLoading
  } = useProject();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'overview', label: 'Overview', icon: FileSpreadsheet },
    { id: 'intelligence', label: 'AI Intelligence', icon: BrainCircuit, badge: 'AI' },
    { id: 'economic', label: 'Economics', icon: Coins },
    { id: 'actuals', label: 'Actuals & Gap', icon: ClipboardCheck },
    { id: 'control-tower', label: 'Control Tower', icon: LineChart },
    { id: 'simulator', label: 'Root Cause & Sim', icon: GitBranch }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
                <Recycle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold font-heading tracking-tight text-white group-hover:text-emerald-400 transition">
                    RECLAIM <span className="text-emerald-400">X</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                    C&D AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Predict • Prove • Measure
                </p>
              </div>
            </div>
          </div>

          {/* Active Project Selector & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Project dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 transition"
              >
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[140px] sm:max-w-[200px] truncate font-medium">
                  {activeProjectData?.project?.name || 'Select Project'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Switch Active Project
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          selectProject(p.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition flex flex-col ${
                          p.id === activeProjectId
                            ? 'bg-emerald-500/15 text-emerald-300 font-semibold'
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

            {/* Load Demo Project Button (Section 5.B - 1-Click Demo) */}
            <button
              onClick={loadDemoProject}
              disabled={isLoading}
              title="Instantly load ABC Tech Park demo dataset"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/50 shadow-sm transition hover:scale-102"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
              <span className="hidden sm:inline">Load</span> Demo Project
            </button>

            {/* New Project Button */}
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-900 scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-0.5 px-1 py-0.2 text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
