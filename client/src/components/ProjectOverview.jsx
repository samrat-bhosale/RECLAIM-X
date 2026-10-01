import React from 'react';
import {
  Building,
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
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 shadow-xs">
        <Building className="w-10 h-10 text-gray-400 mx-auto" />
        <h2 className="text-base font-bold text-gray-900">No Project Selected</h2>
        <p className="text-xs text-gray-500">Select an existing project or load our pre-configured demo project.</p>
        <button
          onClick={loadDemoProject}
          className="btn-petrol-primary text-xs"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  // The 6 clean, large navigation cards
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
    <div className="space-y-8 max-w-6xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* 1. Project Information Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">
                {project.status || 'Active'}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                ID: {project.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-gray-400" />
                {project.buildingType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                {Number(project.areaSqft || project.area_sqft || 0).toLocaleString()} sq.ft.
              </span>
            </div>
          </div>

          <button
            onClick={runAiAnalysis}
            disabled={isAiAnalyzing}
            className="btn-outline-secondary text-xs cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAiAnalyzing ? 'animate-spin text-[#0D3B5E]' : 'text-gray-500'}`} />
            <span>{isAiAnalyzing ? 'Re-Auditing...' : 'Re-Run AI Assessment'}</span>
          </button>
        </div>

        {/* Site Images Badge if analyzed */}
        {project.siteImages && project.siteImages.length > 0 && (
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
            <Camera className="w-3.5 h-3.5 text-[#0D3B5E]" />
            <span>{project.siteImages.length} site photo(s) analyzed for material identification</span>
          </div>
        )}
      </div>

      {/* 2. Small Summary Row: 4 Essential Project Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Potential Recovery */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 block">
            Potential Recovery
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
            {items.length} <span className="text-xs font-normal text-gray-500">Streams</span>
          </div>
          <span className="text-xs text-gray-400">Identified on site</span>
        </div>

        {/* Metric 2: Estimated Value */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 block">
            Estimated Value
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-[#0D3B5E] tracking-tight">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-gray-400">Net salvage potential</span>
        </div>

        {/* Metric 3: Actual Recovery */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 block">
            Actual Recovery
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-teal-800 tracking-tight">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-gray-400">Confirmed realized</span>
        </div>

        {/* Metric 4: Recovery Gap */}
        <div className="saas-stat-card space-y-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-amber-700 block">
            Recovery Gap
          </span>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-600 tracking-tight">
            ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-gray-400">Unrecovered salvage deficit</span>
        </div>

      </div>

      {/* 3. Clearly Separated Large Navigation Cards */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-base font-bold font-heading text-gray-900">
            Project Modules & Analysis
          </h2>
          <p className="text-xs text-gray-500">
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
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between space-y-5 group hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[#0D3B5E] group-hover:bg-[#0D3B5E] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0D3B5E] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed pt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 group-hover:text-[#0D3B5E] transition-colors">
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
