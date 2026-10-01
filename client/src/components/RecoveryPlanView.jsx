import React from 'react';
import {
  ClipboardList,
  CheckCircle2,
  CircleDashed,
  AlertTriangle,
  ArrowLeft,
  ArrowRight
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
      <div className="p-12 rounded-xl bg-white border border-gray-200 text-center space-y-4 max-w-lg mx-auto my-8 shadow-xs">
        <ClipboardList className="w-10 h-10 text-gray-400 mx-auto" />
        <h2 className="text-base font-bold text-gray-900">No Recovery Plan Available</h2>
        <p className="text-xs text-gray-500">Run an AI recovery assessment or select a project to view the deconstruction sequence.</p>
        <button
          onClick={loadDemoProject}
          className="btn-petrol-primary text-xs"
        >
          Load Demo Project
        </button>
      </div>
    );
  }

  const completedCount = sequences.filter(s => s.isCompleted || s.is_completed).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Project Hub
          </button>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Recommended Deconstruction Sequence
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Chronological salvage milestones engineered to prevent component breakage from vibration and impact shock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#0D3B5E] bg-[#0D3B5E]/10 px-3 py-1.5 rounded-lg border border-[#0D3B5E]/20">
            {completedCount} / {sequences.length} Steps Completed
          </span>
          <button
            onClick={() => setActiveTab('economic')}
            className="btn-outline-secondary text-xs"
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
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-4 bg-white shadow-xs ${
                isDone
                  ? 'border-gray-300 bg-gray-50/70 opacity-75'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#0D3B5E]/10 border border-[#0D3B5E]/20 text-[#0D3B5E] text-xs font-bold flex items-center justify-center">
                    {stepNum}
                  </span>
                  
                  <button
                    onClick={() => toggleSequenceStep(step.id, !isDone)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      isDone
                        ? 'bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/30'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B5E]" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <CircleDashed className="w-3.5 h-3.5 text-gray-400" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {step.action_title || step.actionTitle}
                  </h3>
                  <span className="text-[11px] font-medium text-[#0D3B5E] mt-0.5 block">
                    Target: {step.target_category || step.targetCategory}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {step.justification || step.operationalJustification}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
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
