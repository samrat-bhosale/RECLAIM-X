import React, { useState } from 'react';
import {
  Recycle,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BrainCircuit,
  ClipboardList,
  GitBranch,
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
    isLoading,
    language,
    setLanguage,
    t
  } = useProject();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const mainNavItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'projects', label: t('nav.projects'), icon: FolderKanban },
    { id: 'create', label: t('nav.createProject'), icon: PlusCircle },
    { id: 'intelligence', label: t('nav.analysis'), icon: BrainCircuit },
    { id: 'actuals', label: t('nav.recovery'), icon: ClipboardList },
    { id: 'simulator', label: t('nav.simulator'), icon: GitBranch },
  ];

  // Admin tab is only visible to authorized admin users
  if (currentUser?.role === 'admin') {
    mainNavItems.push({ id: 'admin', label: t('nav.admin'), icon: Shield, badge: 'ADMIN' });
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                <Recycle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold font-heading text-white tracking-tight flex items-center gap-1">
                  RECLAIM <span className="text-emerald-400">X</span>
                </span>
                <p className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase hidden lg:block">
                  Circularity Platform
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-[11px] font-medium">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md transition ${
                  language === 'en'
                    ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="English (Default)"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-md transition ${
                  language === 'hi'
                    ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="हिन्दी (Hindi)"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded-md transition ${
                  language === 'mr'
                    ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="मराठी (Marathi)"
              >
                मराठी
              </button>
            </div>

            {/* Active Project Switcher */}
            {projects.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 transition"
                  title={t('nav.switchProject')}
                >
                  <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="max-w-[100px] sm:max-w-[140px] truncate font-medium">
                    {activeProjectData?.project?.name || t('nav.activeProject')}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl py-1 z-50 animate-in fade-in">
                    <div className="px-3 py-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                      {t('nav.switchProject')}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            selectProject(p.id, true);
                            setIsProjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-xs transition flex flex-col ${
                            p.id === activeProjectId
                              ? 'bg-emerald-500/10 text-emerald-300 font-semibold'
                              : 'text-zinc-300 hover:bg-zinc-800/70'
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          <span className="text-[10px] text-zinc-400">{p.location} • {p.buildingType}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Demo Data Quick Load Button */}
            <button
              onClick={loadDemoProject}
              disabled={isLoading}
              title="Quick demo setup for evaluation"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{t('nav.loadDemo')}</span>
            </button>

            {/* User Role Badge (Clickable to demonstrate role-based access control) */}
            <button
              onClick={toggleUserRole}
              title={`Active role: ${currentUser?.role?.toUpperCase()} (click to toggle)`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                currentUser?.role === 'admin'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {currentUser?.role === 'admin' ? (
                <Shield className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="capitalize">{currentUser?.role}</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center space-x-1 overflow-x-auto py-2 border-t border-zinc-800/80 text-xs">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-medium transition ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
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
