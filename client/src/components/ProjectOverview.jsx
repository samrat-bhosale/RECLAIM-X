import React from 'react';
import {
  Building2,
  MapPin,
  Layers,
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  Coins,
  CheckCircle2,
  AlertOctagon,
  GitBranch,
  Calendar,
  Sparkles,
  Camera
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectOverview() {
  const {
    activeProjectData,
    setActiveTab,
    runAiAnalysis,
    isAiAnalyzing,
    loadDemoProject
  } = useProject();

  const project = activeProjectData?.project;
  const items = activeProjectData?.items || [];
  const sequences = activeProjectData?.sequences || [];
  const ledger = activeProjectData?.ledger || {
    predictedNetValue: 0,
    actualNetValue: 0,
    profitGap: 0,
    wasteDivertedTonnes: 0
  };

  if (!project) {
    return (
      <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4 max-w-lg mx-auto my-8">
        <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
        <h2 className="text-base font-bold text-white">No Project Selected</h2>
        <p className="text-xs text-slate-400">Select an existing project or load our pre-configured demo project.</p>
        <button
          onClick={loadDemoProject}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  // Navigation Hub Cards (Section 10)
  const navigationHubCards = [
    {
      id: 'intelligence',
      title: 'AI Recovery Intelligence',
      desc: 'Detected materials, recoverability estimates, and AI reasoning evidence.',
      icon: BrainCircuit,
      color: 'text-cyan-400',
      badge: `${items.length} Streams`
    },
    {
      id: 'plan',
      title: 'Recovery Plan',
      desc: 'Recommended chronological deconstruction sequence and impact risk alerts.',
      icon: ClipboardList,
      color: 'text-emerald-400',
      badge: `${sequences.length} Steps`
    },
    {
      id: 'economic',
      title: 'Economic Impact',
      desc: 'Gross salvage revenue, landfill tipping fee avoidance, and labor costs breakdown.',
      icon: Coins,
      color: 'text-teal-400',
      badge: `₹${(ledger.predictedNetValue || 0).toLocaleString('en-IN')}`
    },
    {
      id: 'actuals',
      title: 'Actual Recovery',
      desc: 'Log field reclaimed quantities, broken materials, and on-site notes.',
      icon: CheckCircle2,
      color: 'text-blue-400',
      badge: 'Field Logger'
    },
    {
      id: 'gap',
      title: 'Recovery Gap & Root Cause',
      desc: 'Compare predicted vs actual recovery and diagnose why recovery was lost.',
      icon: AlertOctagon,
      color: 'text-amber-400',
      badge: `₹${(ledger.profitGap || 0).toLocaleString('en-IN')} Gap`
    },
    {
      id: 'simulator',
      title: 'Counterfactual Simulator',
      desc: 'Reorder deconstruction steps to test sensitivity to early demolition.',
      icon: GitBranch,
      color: 'text-purple-400',
      badge: 'What-If Model'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* 1. Project Information Header (Section 10) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                {project.status || 'Planning'}
              </span>
              <span className="text-[11px] text-slate-400">
                Project ID: <span className="font-mono text-slate-300">{project.id}</span>
              </span>
            </div>

            <h1 className="text-2xl font-bold font-heading text-white">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                {project.buildingType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                {Number(project.areaSqft || project.area_sqft || 0).toLocaleString()} sq.ft.
              </span>
            </div>
          </div>

          <button
            onClick={runAiAnalysis}
            disabled={isAiAnalyzing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shrink-0"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAiAnalyzing ? 'Refreshing...' : 'Re-Run AI Assessment'}</span>
          </button>
        </div>

        {/* Site Images Badge if images exist */}
        {project.siteImages && project.siteImages.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>{project.siteImages.length} site photo(s) analyzed for material identification</span>
          </div>
        )}
      </div>

      {/* 2. Small Summary Metrics (Section 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Metric A: Potential Recoverable Materials */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
            Recoverable Materials
          </span>
          <div className="text-xl font-bold font-heading text-white mt-1">
            {items.length} <span className="text-xs font-normal text-slate-400">Streams</span>
          </div>
          <span className="text-[10px] text-slate-500">Identified on site</span>
        </div>

        {/* Metric B: Estimated Recovery Value */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
            Estimated Recovery
          </span>
          <div className="text-xl font-bold font-heading text-emerald-400 mt-1">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500">Net salvage value</span>
        </div>

        {/* Metric C: Actual Recovery */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
            Actual Recovery
          </span>
          <div className="text-xl font-bold font-heading text-teal-300 mt-1">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500">Confirmed realized</span>
        </div>

        {/* Metric D: Recovery Gap */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-300 block">
            Recovery Gap
          </span>
          <div className="text-xl font-bold font-heading text-amber-400 mt-1">
            ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-amber-300/70">Unrecovered potential</span>
        </div>

      </div>

      {/* 3. Clear Navigation Hub Cards to Deeper Pages (Section 10) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Project Intelligence & Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationHubCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center ${card.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-300 transition">
                  <span className="text-[11px]">Open module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
