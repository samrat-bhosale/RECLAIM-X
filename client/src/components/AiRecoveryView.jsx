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
      <div className="bg-white border border-gray-200 p-12 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#0D3B5E]/10 border border-[#0D3B5E]/20 flex items-center justify-center text-[#0D3B5E] mx-auto">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-heading text-gray-900">AI Salvage Audit Pending</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Run the RECLAIM X Gemini Intelligence Engine to analyze building typology, estimate recoverable material yields, and generate an optimal deconstruction sequence.
        </p>
        <button
          onClick={runAiAnalysis}
          disabled={isAiAnalyzing}
          className="btn-petrol-primary text-xs"
        >
          <Cpu className="w-4 h-4" />
          <span>{isAiAnalyzing ? 'Generating AI Recovery Model...' : 'Run AI Recovery Analysis'}</span>
        </button>
      </div>
    );
  }

  const getConditionColor = (rating) => {
    switch (rating) {
      case 'A': return 'bg-[#0D3B5E]/10 text-[#0D3B5E] border-[#0D3B5E]/30';
      case 'B': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'C': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-2 transition"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            Back to Project Hub
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20 uppercase">
              AI Intelligence
            </span>
            <span className="text-xs text-gray-500">• Pre-Demolition Yield Audit</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            AI Recovery Opportunities
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Pre-demolition recovery estimates, resale valuation, and priority scoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAiAnalysis}
            disabled={isAiAnalyzing}
            className="btn-outline-secondary text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0D3B5E]" />
            <span>{isAiAnalyzing ? 'Refreshing...' : 'Re-Run Audit'}</span>
          </button>
          <button
            onClick={() => setActiveTab('economic')}
            className="btn-petrol-primary text-xs"
          >
            <span>View Economics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Part 1: Recoverable Materials Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-gray-900">
              Identified Recoverable Material Streams
            </h2>
            <p className="text-xs text-gray-500">
              Categorized architectural and structural assets with confidence scoring & estimation basis
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0D3B5E] bg-[#0D3B5E]/10 px-3 py-1 rounded-full border border-[#0D3B5E]/20">
            {items.length} Streams Projected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase tracking-wider font-semibold text-[10px]">
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
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {items.map((item) => {
                const priority = item.recovery_priority_score || item.priorityScore || 50;
                const confidence = Math.round(((item.confidence_score || item.confidenceScore || 0.7) * 100));
                const cond = item.condition_rating || item.conditionRating || 'B';
                const basis = item.estimation_basis || item.estimationBasis || 'Statistical Inference';

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {item.item_name || item.itemName}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {item.material_category || item.category}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-gray-900">
                      {item.predicted_qty || item.predictedQty} <span className="text-gray-500 text-[11px]">{item.unit}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getConditionColor(cond)}`}>
                        Grade {cond}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#0D3B5E] font-semibold">
                      ₹{Number(item.unit_resale_value || item.unitResaleValue || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-teal-800">
                      ₹{Number(item.tipping_fee_per_unit || item.tippingFeeAvoidedPerUnit || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-gray-500">
                      ₹{Number(item.labor_cost_per_unit || item.extractionLaborCostPerUnit || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#0D3B5E] h-full rounded-full"
                            style={{ width: `${priority}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[10px] text-gray-600">{priority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[#0D3B5E] font-medium">
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

      {/* Part 2: Recommended Recovery Sequence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-gray-900">
              Recommended Deconstruction Sequence
            </h2>
            <p className="text-xs text-gray-500">
              Optimal chronological order to extract reusable materials before structural vibrations trigger impact shatter
            </p>
          </div>
          <span className="text-xs text-gray-500">
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
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between bg-white shadow-xs ${
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
                          <span>Complete</span>
                        </>
                      ) : (
                        <>
                          <CircleDashed className="w-3.5 h-3.5 text-gray-400" />
                          <span>Pending</span>
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

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
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
