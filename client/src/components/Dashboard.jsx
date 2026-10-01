import React from 'react';
import {
  PlusCircle,
  FolderKanban,
  Building2,
  MapPin,
  Layers,
  ArrowRight,
  Sparkles,
  Recycle,
  Coins,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Dashboard() {
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
    wasteDivertedTonnes: 0
  };

  // High-level aggregate totals across projects if data exists
  const totalProjectsCount = projects.length;
  const hasData = totalProjectsCount > 0;

  return (
    <div className="space-y-10 py-2 max-w-5xl mx-auto">
      
      {/* 1. Value Proposition & Clean Hero */}
      <div className="text-center space-y-4 pt-4 pb-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Recycle className="w-3.5 h-3.5 text-emerald-400" />
          Construction & Demolition Circularity
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Predict what can be saved. <br />
          <span className="text-emerald-400">Prove what was recovered.</span>
        </h1>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          RECLAIM X helps demolition and project managers identify reusable architectural materials from site photos,
          plan deconstruction sequences, and measure real recovery yield.
        </p>

        {/* Primary and Secondary CTAs (Section 2) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setActiveTab('create')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            Create Project
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
          >
            <FolderKanban className="w-4 h-4 text-slate-400" />
            View Projects
          </button>

          <button
            onClick={loadDemoProject}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-emerald-300 hover:bg-slate-900 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Load Demo (Pune)
          </button>
        </div>
      </div>

      {/* 2. Small / High-Level Recovery Summary (Section 2) */}
      {hasData && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Tracked Projects
            </span>
            <div className="text-2xl font-bold font-heading text-white mt-1">
              {totalProjectsCount}
            </div>
            <span className="text-[11px] text-slate-400">Demolition & salvage sites</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Estimated Net Recovery
            </span>
            <div className="text-2xl font-bold font-heading text-emerald-400 mt-1">
              ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400">Calculated salvage potential</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Landfill Waste Diverted
            </span>
            <div className="text-2xl font-bold font-heading text-teal-300 mt-1">
              {ledger.wasteDivertedTonnes || 0} <span className="text-sm font-normal text-slate-400">Tonnes</span>
            </div>
            <span className="text-[11px] text-slate-400">Recovered architectural assets</span>
          </div>
        </div>
      )}

      {/* 3. Small Summary of Existing Projects (Section 2) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-heading text-white">
            Existing Projects
          </h2>
          {projects.length > 3 && (
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View all {projects.length}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <Building2 className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">No demolition projects created yet.</p>
            <button
              onClick={() => setActiveTab('create')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((p) => {
              const isActive = p.id === activeProjectData?.project?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => selectProject(p.id, true)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 hover:border-slate-700 ${
                    isActive
                      ? 'bg-slate-900 border-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        {p.status || 'Planning'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 hover:text-white" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">
                      {p.name}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{p.buildingType}</span>
                        <span>•</span>
                        <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Open Overview</span>
                    <span className="text-emerald-400 font-medium">Explore →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Simple 4-Step Process Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
          How RECLAIM X Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white block">Create Project</strong>
              <span className="text-slate-400 text-[11px]">Enter building typology and site specifications.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-teal-500/15 text-teal-400 font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white block">Upload Site Photos</strong>
              <span className="text-slate-400 text-[11px]">AI detects doors, windows, steel, and fixtures.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-cyan-500/15 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white block">Confirm & Plan</strong>
              <span className="text-slate-400 text-[11px]">Verify detections and review deconstruction sequence.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <strong className="text-white block">Measure Gap</strong>
              <span className="text-slate-400 text-[11px]">Log actuals and diagnose lost circular value.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
