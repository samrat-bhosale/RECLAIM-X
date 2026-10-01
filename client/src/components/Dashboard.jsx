import React from 'react';
import {
  TrendingUp,
  Coins,
  Recycle,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle,
  FileCheck2,
  BrainCircuit,
  SlidersHorizontal
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Dashboard({ onOpenNewProject }) {
  const {
    projects,
    activeProjectData,
    selectProject,
    setActiveTab,
    loadDemoProject,
    isLoading
  } = useProject();

  const ledger = activeProjectData?.ledger || {
    predictedNetValue: 0,
    actualNetValue: 0,
    profitGap: 0,
    wasteDivertedTonnes: 0,
    recoveryAccuracy: 0
  };

  const project = activeProjectData?.project;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner with PRD Loop: PLAN -> RECOVER -> MEASURE -> LEARN */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Circular Economy Demolition Intelligence
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Predict what can be saved. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Prove what was recovered.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bridge the demolition recovery gap. RECLAIM X provides AI pre-demolition salvage audits,
              predicts economic returns, tracks real-world execution, and diagnoses lost circular value.
            </p>

            {/* Complete Loop Diagram (Section 3 & 22) */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-400">PLAN</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-teal-400">RECOVER</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-cyan-400">MEASURE</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-amber-400">LEARN</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={loadDemoProject}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Load Demo Project (3-Min Flow)
            </button>
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 transition"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Screen 1 KPI Cards (Section 13) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Metric 1: Potential Recovery Value */}
        <div className="glass-panel p-5 rounded-2xl hover:border-slate-700 transition group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Potential Value</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-white">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Expected net salvage value</p>
        </div>

        {/* Metric 2: Actual Recovery Value */}
        <div className="glass-panel p-5 rounded-2xl hover:border-slate-700 transition group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Actual Value</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 group-hover:scale-110 transition">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-teal-300">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Realized circular recovery</p>
        </div>

        {/* Metric 3: Recovery Gap (Lost Opportunity) */}
        <div className="glass-panel-amber p-5 rounded-2xl transition group">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Recovery Gap</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-amber-400">
            ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-amber-300/80 mt-1">Economic opportunity lost</p>
        </div>

        {/* Metric 4: Material Diverted */}
        <div className="glass-panel p-5 rounded-2xl hover:border-slate-700 transition group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Diverted Waste</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-cyan-300">
            {ledger.wasteDivertedTonnes || 0} <span className="text-sm font-normal text-slate-400">Tonnes</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Kept out of landfills</p>
        </div>

        {/* Metric 5: Recovery Accuracy */}
        <div className="glass-panel p-5 rounded-2xl hover:border-slate-700 transition group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Recovery Rate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-white">
            {ledger.recoveryAccuracy || 0}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Realization vs Projection</p>
        </div>
      </div>

      {/* Active Projects Table & Demo Flow Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Projects List */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Active Demolition Projects</h2>
              <p className="text-xs text-slate-400">Manage sites, trigger AI recovery audits, and log field actuals</p>
            </div>
            <button
              onClick={onOpenNewProject}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              + Create Project
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((p) => {
              const isSelected = p.id === activeProjectData?.project?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => selectProject(p.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-800/80 border-emerald-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {p.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        {p.buildingType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-slate-500" />
                        {Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProject(p.id);
                        setActiveTab('intelligence');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                      AI Audit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProject(p.id);
                        setActiveTab('actuals');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 transition"
                    >
                      Actuals
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Demo & Step-by-Step Flow Guide */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold font-heading text-white">Judge Demo Walkthrough</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Explore the 3-minute complete recovery loop on <span className="font-semibold text-emerald-400">ABC Tech Park (Pune)</span>:
            </p>

            <ol className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                <span>Click <strong>Load Demo Project</strong> to seed commercial dataset.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                <span>View AI recovery opportunities table & sequenced deconstruction plan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                <span>Inspect economic impact & tipping fee avoidance breakdowns.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                <span>Simulate field actuals to uncover the <strong>Recovery Gap</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                <span>Ask Gemini AI for root-cause diagnosis & test the counterfactual simulator!</span>
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (project) {
                  setActiveTab('intelligence');
                } else {
                  loadDemoProject();
                }
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2 transition"
            >
              <span>{project ? 'Explore Active Project' : 'Launch Demo Dataset'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
