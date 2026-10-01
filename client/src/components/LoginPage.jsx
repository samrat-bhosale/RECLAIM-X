import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Building2,
  TrendingUp,
  Cpu,
  Globe,
  Check,
  ChevronDown
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

/**
 * ReclaimXLogo Component
 * Scalable SVG vector accurately rendering the stylized 'X' + architectural roof shape.
 * Supports: variant="color" (Light Blue #0284C7 + Dark Navy #1B2559) and variant="white" (monochrome).
 */
export function ReclaimXLogo({ className = 'w-9 h-9', variant = 'color' }) {
  const isWhite = variant === 'white';
  const lightBlue = isWhite ? '#FFFFFF' : '#0284C7';
  const darkBlue = isWhite ? '#FFFFFF' : '#1B2559';
  const windowColor = isWhite ? 'rgba(255, 255, 255, 0.75)' : '#0284C7';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RECLAIM X Brand Logo"
    >
      {/* Upper Wing & Dynamic Checkmark of the 'X' */}
      <path
        d="M33 42.5H48.5L58 52.5L78.5 27L82 30.5L57 60H43.5L33 42.5Z"
        fill={lightBlue}
      />
      {/* Lower Architectural Roof Gable */}
      <path
        d="M44 61.5H62.5L68 74H53.5L47.5 66.5L41.5 74H33L44 61.5Z"
        fill={darkBlue}
      />
      {/* 4-Pane Modern Window under the Roof Gable */}
      <rect x="44" y="68" width="2.5" height="2.5" rx="0.5" fill={windowColor} />
      <rect x="47.5" y="68" width="2.5" height="2.5" rx="0.5" fill={windowColor} />
      <rect x="44" y="71.5" width="2.5" height="2.5" rx="0.5" fill={windowColor} />
      <rect x="47.5" y="71.5" width="2.5" height="2.5" rx="0.5" fill={windowColor} />
    </svg>
  );
}

export default function LoginPage({ onLoginSuccess, onNavigateRegister, onForgotPassword }) {
  const projectContext = useProject();
  const setActiveTab = projectContext?.setActiveTab;
  const showNotification = projectContext?.showNotification;
  const currentLang = projectContext?.language || 'en';
  const setLanguage = projectContext?.setLanguage;

  const [email, setEmail] = useState('contractor@reclaimx.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English (Default)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' }
  ];

  const handleLanguageSelect = (code) => {
    if (setLanguage) setLanguage(code);
    setIsLangMenuOpen(false);
  };

  // Sign In Flow (Supports Supabase Auth & Instant Demonstration)
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Simulate/trigger sign in
      await new Promise((r) => setTimeout(r, 600));

      if (showNotification) {
        showNotification(`Welcome back! Signed in as ${email}`, 'success');
      }
      if (onLoginSuccess) {
        onLoginSuccess({ email, rememberMe });
      } else if (setActiveTab) {
        setActiveTab('dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Flow
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (showNotification) {
        showNotification('Signed in with Google Account', 'success');
      }
      if (onLoginSuccess) {
        onLoginSuccess({ email: 'alex.morgan@gmail.com', provider: 'google' });
      } else if (setActiveTab) {
        setActiveTab('dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Google sign-in encountered an error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans antialiased text-gray-900 selection:bg-[#0284C7] selection:text-white">
      
      {/* =========================================================================
          LEFT COLUMN: Visual/Brand Side (Hidden on mobile, 50% width on desktop)
          ========================================================================= */}
      <div className="hidden md:flex md:w-1/2 relative flex-col justify-between p-8 lg:p-12 overflow-hidden bg-slate-900">
        {/* Modern Construction & Architectural Site Photo */}
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1800&q=85"
          alt="Modern Architectural Site"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
        />

        {/* Dark Sleek Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/50 pointer-events-none" />

        {/* Top-Left: Monochrome White Logo & Brand Name */}
        <div className="relative z-10 flex items-center gap-3">
          <ReclaimXLogo variant="white" className="w-10 h-10 drop-shadow-md" />
          <div className="leading-tight">
            <span className="text-xl font-extrabold tracking-wider text-white block uppercase font-heading">
              RECLAIM X
            </span>
            <span className="text-[11px] font-medium tracking-widest text-slate-300 block uppercase">
              Circularity & Asset Recovery
            </span>
          </div>
        </div>

        {/* Bottom: Minimal Statistics Row */}
        <div className="relative z-10 w-full">
          <div className="bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/10 p-5 grid grid-cols-3 gap-4 text-white shadow-2xl">
            {/* Stat 1: Active Projects */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sky-400 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold tracking-tight block">24</span>
                <span className="text-[10px] lg:text-[11px] text-slate-300 font-medium block">
                  Active Projects
                </span>
              </div>
            </div>

            {/* Stat 2: On Schedule */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sky-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold tracking-tight block">87%</span>
                <span className="text-[10px] lg:text-[11px] text-slate-300 font-medium block">
                  On Schedule
                </span>
              </div>
            </div>

            {/* Stat 3: AI Scans */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sky-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold tracking-tight block">12</span>
                <span className="text-[10px] lg:text-[11px] text-slate-300 font-medium block">
                  AI Scans
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN: Form Side (100% width on mobile, 50% width on desktop)
          ========================================================================= */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        
        {/* Top Header Bar: Back to Dashboard & Language Switcher Dropdown */}
        <div className="w-full flex items-center justify-between relative">
          <button
            type="button"
            onClick={() => setActiveTab ? setActiveTab('dashboard') : null}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{languages.find((l) => l.code === currentLang)?.label.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-gray-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-sky-50 text-[#0284C7] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Centered Form Wrapper */}
        <div className="w-full max-w-md mx-auto my-auto py-6 space-y-7">
          
          {/* Brand Logo & Heading Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ReclaimXLogo variant="color" className="w-11 h-11" />
              <span className="text-2xl font-black tracking-tight text-[#1B2559] uppercase font-heading">
                RECLAIM X
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                Welcome back,
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559] tracking-tight mt-1">
                Sign in to your account
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage projects, track circular progress, make better decisions.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage('')}
                className="text-rose-500 hover:text-rose-700 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-5">
            {/* Work Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="work-email"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
              >
                Work email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="work-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-11 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Utility Row: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0284C7] focus:ring-[#0284C7] focus:ring-offset-0 transition cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="font-medium text-[#0284C7] hover:text-[#0369A1] transition hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Action Button (Brand Deep Blue & Light Blue Gradient) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0284C7] to-[#1B2559] hover:from-[#0369A1] hover:to-[#131B42] shadow-md shadow-[#1B2559]/20 transition-all duration-200 transform active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider: "or" */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-widest font-semibold">
              or
            </span>
          </div>

          {/* Secondary Action: Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full inline-flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs cursor-pointer"
          >
            {/* Standard Google 'G' Vector Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer Note */}
          <div className="pt-2 text-center text-xs text-gray-500">
            <span>New to RECLAIM X? </span>
            <button
              type="button"
              onClick={onNavigateRegister}
              className="font-semibold text-[#0284C7] hover:text-[#0369A1] transition hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Create an account</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Bottom subtle copyright */}
        <div className="text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} RECLAIM X Inc. All rights reserved.
        </div>

      </div>

    </div>
  );
}
