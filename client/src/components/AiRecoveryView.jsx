import React from 'react';
import {
  BrainCircuit,
  Cpu,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  CircleDashed,
  Layers,
  Coins,
  Truck,
  Sparkles,
  Award,
  AlertTriangle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { EstimationBasisBadge, SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function AiRecoveryView() {
  const {
    activeProjectData,
    runAiAnalysis,
    isAiAnalyzing,
    toggleSequenceStep,
    setActiveTab
  } = useProject();

  const project = activeProjectData?.project;
  const items = activeProjectData?.items || [];
  const sequences = activeProjectData?.sequences || [];
  const ledger = activeProjectData?.ledger;

  if (!items || items.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto my-12 border border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-heading text-white">AI Salvage Audit Pending</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Run the RECLAIM X Gemini Intelligence Engine to analyze building typology, estimate recoverable material yields, and generate an optimal deconstruction sequence.
        </p>
        <button
          onClick={runAiAnalysis}
          disabled={isAiAnalyzing}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-102 transition disabled:opacity-50"
        >
          <Cpu className="w-4 h-4" />
          {isAiAnalyzing ? 'Generating AI Recovery Model...' : 'Run AI Recovery Analysis'}
        </button>
      </div>
    );
  }

  const getConditionColor = (rating) => {
    switch (rating) {
      case 'A': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'B': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'C': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default: return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            Back to Project Hub
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
              AI Intelligence
            </span>
            <span className="text-xs text-slate-400">• Pre-Demolition Yield Audit</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            AI Recovery Opportunities
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pre-demolition recovery estimates, resale valuation, and priority scoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAiAnalysis}
            disabled={isAiAnalyzing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {isAiAnalyzing ? 'Refreshing...' : 'Re-Run Audit'}
          </button>
          <button
            onClick={() => setActiveTab('economic')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-md shadow-emerald-500/20"
          >
            <span>View Economics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Part 1: Recoverable Materials Table (PRD Screen 3) */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-white">
              Identified Recoverable Material Streams
            </h2>
            <p className="text-xs text-slate-400">
              Categorized architectural and structural assets with confidence scoring & estimation basis
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            {items.length} Streams Projected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3.5 px-4">Material / Asset</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Predicted Qty</th>
                <th className="py-3.5 px-4">Condition</th>
                <th className="py-3.5 px-4 text-right">Unit Resale</th>
                <th className="py-3.5 px-4 text-right">Tipping Saved</th>
                <th className="py-3.5 px-4 text-right">Labor Cost</th>
                <th className="py-3.5 px-4 text-center">Priority</th>
                <th className="py-3.5 px-4 text-center">Confidence</th>
                <th className="py-3.5 px-4">Estimation Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {items.map((item) => {
                const priority = item.recovery_priority_score || item.priorityScore || 50;
                const confidence = Math.round(((item.confidence_score || item.confidenceScore || 0.7) * 100));
                const cond = item.condition_rating || item.conditionRating || 'B';
                const basis = item.estimation_basis || item.estimationBasis || 'Statistical Inference';

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.item_name || item.itemName}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {item.material_category || item.category}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-white">
                      {item.predicted_qty || item.predictedQty} <span className="text-slate-400 text-[11px]">{item.unit}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getConditionColor(cond)}`}>
                        Grade {cond}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400 font-semibold">
                      ₹{Number(item.unit_resale_value || item.unitResaleValue || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-teal-300">
                      ₹{Number(item.tipping_fee_per_unit || item.tippingFeeAvoidedPerUnit || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">
                      ₹{Number(item.labor_cost_per_unit || item.extractionLaborCostPerUnit || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${priority}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-300">{priority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-cyan-300 font-medium">
                      {confidence}%
                    </td>
                    <td className="py-3 px-4">
                      <EstimationBasisBadge basis={basis} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 2: Recommended Recovery Sequence (PRD Screen 3) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-white">
              Recommended Deconstruction Sequence
            </h2>
            <p className="text-xs text-slate-400">
              Optimal chronological order to extract reusable materials before structural vibrations trigger impact shatter
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {sequences.filter(s => s.isCompleted || s.is_completed).length} / {sequences.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sequences.map((step) => {
            const stepNum = step.step_number || step.stepNumber;
            const isDone = step.is_completed || step.isCompleted;

            return (
              <div
                key={step.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-900/40 border-emerald-500/30 opacity-75'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center">
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
                          <span>Complete</span>
                        </>
                      ) : (
                        <>
                          <CircleDashed className="w-3.5 h-3.5 text-slate-400" />
                          <span>Pending</span>
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

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {step.justification || step.operationalJustification}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-amber-300/90">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <strong>Risk if delayed:</strong> {step.risk_if_delayed || step.riskIfDelayed}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
