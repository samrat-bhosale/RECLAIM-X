import React from 'react';
import {
  Building2,
  MapPin,
  Layers,
  Calendar,
  Sparkles,
  ArrowRight,
  ClipboardList,
  Cpu,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

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
  const ledger = activeProjectData?.ledger;

  if (!project) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto my-12">
        <Building2 className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold font-heading text-white">No Project Selected</h2>
        <p className="text-xs text-slate-400">Please choose a project or load our pre-configured demo project to get started.</p>
        <button
          onClick={loadDemoProject}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  const isAnalyzed = items.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner with Project Identity */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {project.status || 'Planning'}
              </span>
              <span className="text-xs text-slate-400">
                ID: <span className="font-mono text-slate-300">{project.id}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                {project.buildingType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                {Number(project.areaSqft || project.area_sqft || 0).toLocaleString()} sq.ft.
              </span>
            </div>
          </div>

          {/* Action Trigger Buttons (PRD Section 13 Screen 2) */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={runAiAnalysis}
              disabled={isAiAnalyzing}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              <Cpu className="w-4 h-4" />
              {isAiAnalyzing ? 'Analyzing with Gemini...' : (isAnalyzed ? 'Re-Analyze Recovery' : 'Analyze Recovery')}
            </button>
            <button
              onClick={() => setActiveTab('intelligence')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition"
            >
              <ClipboardList className="w-4 h-4 text-emerald-400" />
              View Recovery Plan
            </button>
            <button
              onClick={() => setActiveTab('actuals')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition"
            >
              Record Actuals
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Specifications & Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Site Details Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold font-heading uppercase tracking-wider text-slate-300">
            Project Specifications
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Typology</span>
              <span className="font-semibold text-white">{project.buildingType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Gross Floor Area</span>
              <span className="font-semibold text-white">{Number(project.areaSqft || project.area_sqft || 0).toLocaleString()} sq.ft.</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Site Location</span>
              <span className="font-semibold text-white">{project.location}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Lifecycle Phase</span>
              <span className="font-semibold text-emerald-400">{project.status}</span>
            </div>
          </div>
        </div>

        {/* Site Inspection Notes */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold font-heading uppercase tracking-wider text-slate-300">
            Site Notes & Material Observations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            {project.siteNotes || project.site_notes || 'No detailed inspection notes entered yet. AI will use regional statistical inference models.'}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inspection notes are passed directly into Gemini AI for targeted material classification.</span>
          </div>
        </div>

      </div>

      {/* Recovery Status Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-bold font-heading text-white">Salvage Status Snapshot</h2>
            <p className="text-xs text-slate-400">Audit status and recoverable item counts</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {items.length} Recoverable Streams Identified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Identified Streams</span>
            <span className="text-xl font-bold text-white mt-1 block">{items.length}</span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sequence Steps</span>
            <span className="text-xl font-bold text-teal-300 mt-1 block">{sequences.length}</span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Expected Net Value</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              ₹{(ledger?.predictedNetValue || 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Diversion</span>
            <span className="text-xl font-bold text-cyan-300 mt-1 block">
              {ledger?.wasteDivertedTonnes || 0} T
            </span>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
