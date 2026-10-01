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
  Camera,
  RefreshCw
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectOverview() {
  const {
    activeProjectData,
    setActiveTab,
    runAiAnalysis,
    isAiAnalyzing,
    loadDemoProject,
    t
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
      <div className="saas-card p-12 text-center space-y-4 max-w-lg mx-auto my-12">
        <Building2 className="w-10 h-10 text-zinc-500 mx-auto" />
        <h2 className="text-base font-bold text-white">No Project Selected</h2>
        <p className="text-xs text-zinc-400">Select an existing project or load our pre-configured demo project.</p>
        <button
          onClick={loadDemoProject}
          className="saas-btn-primary"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  // The 6 clean, large navigation cards specified in the prompt
  const navigationCards = [
    {
      id: 'intelligence',
      title: 'AI Recovery Intelligence',
      desc: 'Identified material streams, condition assessments, and Gemini evidence reasoning.',
      icon: BrainCircuit,
      badge: `${items.length} Streams`,
      cta: 'Explore Intelligence'
    },
    {
      id: 'plan',
      title: 'Recovery Plan',
      desc: 'Chronological deconstruction sequence, target materials, and premature demolition risks.',
      icon: ClipboardList,
      badge: `${sequences.length} Steps`,
      cta: 'View Plan'
    },
    {
      id: 'economic',
      title: 'Economic Impact',
      desc: 'Gross salvage revenue, disposal tipping savings, and selective labor costs breakdown.',
      icon: Coins,
      badge: `₹${(ledger.predictedNetValue || 0).toLocaleString('en-IN')}`,
      cta: 'View Financials'
    },
    {
      id: 'actuals',
      title: 'Actual Recovery',
      desc: 'Log field confirmed reclaimed items, damaged quantities, and contractor site notes.',
      icon: CheckCircle2,
      badge: 'Field Logger',
      cta: 'Record Actuals'
    },
    {
      id: 'gap',
      title: 'Recovery Gap',
      desc: 'Compare predicted salvage targets against field realization and evaluate lost value.',
      icon: AlertOctagon,
      badge: `₹${(ledger.profitGap || 0).toLocaleString('en-IN')} Deficit`,
      cta: 'Analyze Gap'
    },
    {
      id: 'simulator',
      title: 'Simulator',
      desc: 'Modify deconstruction assumptions and step order to model scenario yield sensitivity.',
      icon: GitBranch,
      badge: 'Counterfactual',
      cta: 'Run Simulator'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* 1. Project Information Header */}
      <div className="saas-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {project.status || 'Planning'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                ID: {project.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                {project.buildingType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-500" />
                {Number(project.areaSqft || project.area_sqft || 0).toLocaleString()} sq.ft.
              </span>
            </div>
          </div>

          <button
            onClick={runAiAnalysis}
            disabled={isAiAnalyzing}
            className="saas-btn-secondary cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAiAnalyzing ? 'animate-spin text-emerald-400' : 'text-zinc-400'}`} />
            <span>{isAiAnalyzing ? 'Re-Auditing...' : 'Re-Run AI Assessment'}</span>
          </button>
        </div>

        {/* Site Images Badge if analyzed */}
        {project.siteImages && project.siteImages.length > 0 && (
          <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>{project.siteImages.length} site image(s) analyzed for material identification</span>
          </div>
        )}
      </div>

      {/* 2. Small Summary Row: 4 Essential Project Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Potential Recovery */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-zinc-400 block">
            Potential Recovery
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
            {items.length} <span className="text-xs font-normal text-zinc-400">Streams</span>
          </div>
          <span className="text-xs text-zinc-500">Identified on site</span>
        </div>

        {/* Metric 2: Estimated Value */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-zinc-400 block">
            Estimated Value
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400 tracking-tight">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-zinc-500">Net salvage potential</span>
        </div>

        {/* Metric 3: Actual Recovery */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-zinc-400 block">
            Actual Recovery
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-teal-300 tracking-tight">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-zinc-500">Confirmed realized</span>
        </div>

        {/* Metric 4: Recovery Gap */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-amber-300 block">
            Recovery Gap
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-400 tracking-tight">
            ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-zinc-500">Unrecovered salvage deficit</span>
        </div>

      </div>

      {/* 3. Clearly Separated Large Navigation Cards */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-base font-bold font-heading text-white">
            Project Modules & Analysis
          </h2>
          <p className="text-xs text-zinc-400">
            Open focused screens to inspect intelligence, plans, financial ledgers, and simulators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className="saas-card-interactive p-6 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/50">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 group-hover:text-emerald-300 transition-colors">
                  <span className="font-medium">{card.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
