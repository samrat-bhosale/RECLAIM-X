import React from 'react';
import {
  ClipboardList,
  CheckCircle2,
  CircleDashed,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function RecoveryPlanView() {
  const {
    activeProjectData,
    toggleSequenceStep,
    setActiveTab,
    loadDemoProject
  } = useProject();

  const project = activeProjectData?.project;
  const sequences = activeProjectData?.sequences || [];

  if (!project || sequences.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4 max-w-lg mx-auto my-8">
        <ClipboardList className="w-10 h-10 text-slate-500 mx-auto" />
        <h2 className="text-base font-bold text-white">No Recovery Plan Available</h2>
        <p className="text-xs text-slate-400">Run an AI recovery assessment or select a project to view the deconstruction sequence.</p>
        <button
          onClick={loadDemoProject}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  const completedCount = sequences.filter(s => s.isCompleted || s.is_completed).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Project Hub
          </button>
          <h1 className="text-2xl font-bold font-heading text-white">
            Recommended Deconstruction Sequence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Chronological salvage milestones engineered to prevent component breakage from vibration and impact shock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            {completedCount} / {sequences.length} Steps Completed
          </span>
          <button
            onClick={() => setActiveTab('economic')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <span>Next: Economics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sequenced Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sequences.map((step) => {
          const stepNum = step.step_number || step.stepNumber;
          const isDone = step.is_completed || step.isCompleted;

          return (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isDone
                  ? 'bg-slate-950/40 border-emerald-500/30 opacity-75'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    {stepNum}
                  </span>
                  
                  <button
                    onClick={() => toggleSequenceStep(step.id, !isDone)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <CircleDashed className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {step.action_title || step.actionTitle}
                  </h3>
                  <span className="text-[11px] font-medium text-emerald-400 mt-0.5 block">
                    Target: {step.target_category || step.targetCategory}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {step.justification || step.operationalJustification}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-amber-300/90">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  <strong>Risk if delayed:</strong> {step.risk_if_delayed || step.riskIfDelayed}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <SafetyDisclaimerNotice compact />

    </div>
  );
}
