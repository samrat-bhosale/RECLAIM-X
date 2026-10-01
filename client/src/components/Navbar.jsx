import React, { useState, useRef, useEffect } from 'react';
import {
  Recycle,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BrainCircuit,
  ChevronDown,
  Building,
  UserCheck,
  Shield,
  Sparkles,
  Globe,
  Check,
  Menu,
  X,
  ArrowRight
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

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langRef = useRef(null);
  const projRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (projRef.current && !projRef.current.contains(event.target)) {
        setIsProjectDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions = [
    { code: 'en', label: 'English', native: 'English', flag: 'EN' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', flag: 'MR' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: 'HI' },
  ];

  const currentLangObj = languageOptions.find((l) => l.code === language) || languageOptions[0];

  const handleNavClick = (tabId, hashId) => {
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
      setTimeout(() => {
        if (hashId) {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (hashId) {
      const el = document.getElementById(hashId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0d0f]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo - Sleek Nexora style */}
          <div className="flex items-center gap-8 lg:gap-12">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 text-left group transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black shadow-md group-hover:bg-zinc-200 transition-colors">
                <Recycle className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-heading text-white tracking-wider flex items-center gap-1">
                  RECLAIM<span className="text-emerald-400">X</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-medium tracking-widest uppercase">
                  Circularity AI
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 text-xs font-medium tracking-wide text-zinc-300">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`transition-colors duration-200 hover:text-white cursor-pointer ${
                  activeTab === 'dashboard' ? 'text-white font-semibold' : 'text-zinc-400'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'services')}
                className="transition-colors duration-200 hover:text-white cursor-pointer text-zinc-400"
              >
                Services
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`transition-colors duration-200 hover:text-white cursor-pointer ${
                  activeTab === 'projects' ? 'text-white font-semibold' : 'text-zinc-400'
                }`}
              >
                Projects
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'process')}
                className="transition-colors duration-200 hover:text-white cursor-pointer text-zinc-400"
              >
                Process
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'about')}
                className="transition-colors duration-200 hover:text-white cursor-pointer text-zinc-400"
              >
                About
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                    activeTab === 'admin' ? 'text-amber-400 font-semibold' : 'text-amber-400/80 hover:text-amber-300'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">

            {/* Feature 2: Multi-Language Switcher (i18n) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-xs text-zinc-200 transition-all duration-300 cursor-pointer"
                title="Change Language / भाषा बदला / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-medium text-[11px]">{currentLangObj.native}</span>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#141417] border border-white/15 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-white/10">
                    Language / भाषा
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        language === opt.code
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500">{opt.flag}</span>
                        <span>{opt.native}</span>
                        <span className="text-[10px] text-zinc-500 font-normal">({opt.label})</span>
                      </div>
                      {language === opt.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Project Switcher (Preserves existing data routing) */}
            {projects.length > 0 && (
              <div className="relative hidden lg:block" ref={projRef}>
                <button
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs text-zinc-300 transition-all cursor-pointer"
                  title={t('nav.switchProject')}
                >
                  <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="max-w-[120px] truncate font-medium">
                    {activeProjectData?.project?.name || t('nav.activeProject')}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#141417] border border-white/15 shadow-2xl py-1.5 z-50 animate-in fade-in duration-200">
                    <div className="px-3 py-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-white/10">
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
                          className={`w-full text-left px-3 py-2.5 text-xs transition flex flex-col cursor-pointer ${
                            p.id === activeProjectId
                              ? 'bg-white/10 text-white font-semibold'
                              : 'text-zinc-300 hover:bg-white/5'
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
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Demo</span>
            </button>

            {/* Role Toggle Button (Demonstrates RBAC) */}
            <button
              onClick={toggleUserRole}
              title={`Role: ${currentUser?.role?.toUpperCase()} (click to toggle)`}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 cursor-pointer ${
                currentUser?.role === 'admin'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              {currentUser?.role === 'admin' ? (
                <Shield className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="capitalize">{currentUser?.role}</span>
            </button>

            {/* Primary Action Button: "Get a Quote" / "Create Project" */}
            <button
              onClick={() => setActiveTab('create')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <span>{t('ctaBanner.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
            <button
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('dashboard', 'services')}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-lg"
            >
              Services
            </button>
            <button
              onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-lg"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('dashboard', 'process')}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-lg"
            >
              Process
            </button>
            <button
              onClick={() => handleNavClick('dashboard', 'about')}
              className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-lg"
            >
              About
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/10 rounded-lg flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between px-3">
              <span className="text-xs text-zinc-400">Switch Role:</span>
              <button
                onClick={toggleUserRole}
                className="text-xs font-semibold uppercase text-emerald-400 bg-white/5 px-2.5 py-1 rounded"
              >
                {currentUser?.role}
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
