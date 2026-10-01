import React, { useState, useRef, useEffect } from 'react';
import {
  Recycle,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  BrainCircuit,
  ClipboardList,
  GitBranch,
  ChevronDown,
  Search,
  UserCheck,
  Shield,
  Sparkles,
  Globe,
  Check,
  Menu,
  X,
  Building,
  LogIn
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ReclaimXLogo } from './LoginPage';

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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions = [
    { code: 'en', label: 'English (Default)', native: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)', native: 'हिंदी' },
    { code: 'mr', label: 'मराठी (मराठी)', native: 'मराठी' },
  ];

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'create', label: 'Create Project' },
    { id: 'intelligence', label: 'Analysis' },
    { id: 'actuals', label: 'Recovery' },
    { id: 'simulator', label: 'Simulator' },
  ];

  if (currentUser?.role === 'admin') {
    mainNavItems.push({ id: 'admin', label: 'Admin Panel', badge: 'ADMIN' });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-gray-200 group-hover:border-sky-300 transition-colors">
                <ReclaimXLogo variant="color" className="w-7 h-7 group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-lg font-black font-heading text-[#1B2559] tracking-tight">
                RECLAIM X
              </span>
            </button>

            {/* Center Navigation Links (Matching Reference Image) */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`transition-colors cursor-pointer py-1 ${
                      isActive
                        ? 'text-gray-900 font-semibold border-b-2 border-[#0D3B5E]'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Search Icon */}
            <button
              onClick={() => setActiveTab('projects')}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Search projects"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Login Page Link */}
            <button
              onClick={() => setActiveTab('login')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-sky-50 text-[#0284C7] border-[#0284C7]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#0284C7] hover:border-[#0284C7]/30'
              }`}
              title="Sign In / Authentication"
            >
              <LogIn className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            {/* Language Switcher Dropdown (Matching Reference Popover) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Select language"
              >
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="hidden sm:inline">
                  {languageOptions.find((l) => l.code === language)?.native || 'English'}
                </span>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-gray-200 shadow-xl py-1.5 z-50 animate-in fade-in duration-150">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        language === opt.code
                          ? 'bg-gray-50 text-gray-900 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {language === opt.code && <Check className="w-3.5 h-3.5 text-[#0D3B5E]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Avatar with dropdown */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-gray-200 transition-all cursor-pointer"
                title="User profile & settings"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User Avatar"
                  className="w-7 h-7 rounded-full object-cover border border-gray-300"
                />
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-200 shadow-xl py-2 z-50 animate-in fade-in duration-150 text-xs">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{currentUser?.name || 'Enterprise Auditor'}</p>
                    <p className="text-gray-500 text-[11px] capitalize">Role: {currentUser?.role}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        toggleUserRole();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {currentUser?.role === 'admin' ? <Shield className="w-3.5 h-3.5 text-amber-600" /> : <UserCheck className="w-3.5 h-3.5 text-gray-500" />}
                        <span>Switch to {currentUser?.role === 'admin' ? 'Auditor' : 'Admin'}</span>
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        loadDemoProject();
                        setIsUserDropdownOpen(false);
                      }}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#0D3B5E]" />
                      <span>Reload Demo Data</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer border-t border-gray-100 mt-1 pt-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>Sign In / Switch User</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 space-y-1">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                  activeTab === item.id ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('login');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 ${
                activeTab === 'login' ? 'bg-sky-50 font-semibold text-[#0284C7]' : 'text-gray-600'
              }`}
            >
              <LogIn className="w-4 h-4 text-[#0284C7]" />
              <span>Sign In Page</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
