import React, { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Layers,
  Coins,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { SafetyDisclaimerNotice, ScenarioEstimateBanner } from './AiSafetyBadge';

export default function SimulatorView() {
  const { activeProjectData, setActiveTab, showNotification, t } = useProject();

  const project = activeProjectData?.project;
  const initialSequences = activeProjectData?.sequences || [];
  const ledger = activeProjectData?.ledger;

  const [simulatorSequence, setSimulatorSequence] = useState(
    [...initialSequences].sort((a, b) => (a.step_number || a.stepNumber) - (b.step_number || b.stepNumber))
  );
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const moveStepUp = (index) => {
    if (index === 0) return;
    const newSeq = [...simulatorSequence];
    const temp = newSeq[index - 1];
    newSeq[index - 1] = newSeq[index];
    newSeq[index] = temp;
    newSeq.forEach((s, idx) => {
      s.stepNumber = idx + 1;
      s.step_number = idx + 1;
    });
    setSimulatorSequence(newSeq);
  };

  const moveStepDown = (index) => {
    if (index === simulatorSequence.length - 1) return;
    const newSeq = [...simulatorSequence];
    const temp = newSeq[index + 1];
    newSeq[index + 1] = newSeq[index];
    newSeq[index] = temp;
    newSeq.forEach((s, idx) => {
      s.stepNumber = idx + 1;
      s.step_number = idx + 1;
    });
    setSimulatorSequence(newSeq);
  };

  const handleResetSequence = () => {
    setSimulatorSequence(
      [...initialSequences].sort((a, b) => (a.step_number || a.stepNumber) - (b.step_number || b.stepNumber))
    );
    setSimulationResult(null);
  };

  const handleSimulateSequence = async () => {
    if (!project) return;
    try {
      setIsSimulating(true);
      const payload = simulatorSequence.map((s, idx) => ({
        stepNumber: idx + 1,
        actionTitle: s.action_title || s.actionTitle,
        targetCategory: s.target_category || s.targetCategory
      }));

      const res = await api.simulateCounterfactual(project.id, payload);
      setSimulationResult(res);
      showNotification('Counterfactual simulation evaluated!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Simulation failed', 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* Top Banner */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-2 transition"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            {t('common.backToHub')}
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20 uppercase">
              Simulator
            </span>
            <span className="text-xs text-gray-500">• What-If Deconstruction Modeler</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Deconstruction Sequence Simulator
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Reorder salvage steps to evaluate how premature structural demolition impacts recovery yield and financial loss.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('rootcause')}
            className="btn-outline-secondary text-xs"
          >
            <span>Root Cause Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-base font-bold font-heading text-gray-900">
              Interactive Sequence Reordering
            </h2>
            <p className="text-xs text-gray-500">
              Drag or use arrows to move heavy mechanical demolition steps ahead of non-structural soft strip
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetSequence}
              className="btn-outline-secondary text-xs py-1.5 px-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSimulateSequence}
              disabled={isSimulating}
              className="btn-petrol-primary text-xs py-1.5 px-4 font-semibold disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Simulating...' : 'Simulate Changed Sequence'}</span>
            </button>
          </div>
        </div>

        {/* Process Flow */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 pb-2">
          <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">Baseline Plan</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">Adjust Step Order</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">Evaluate Yield Delta</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">Projected Net Value</span>
        </div>

        {/* Reorderable Sequence List */}
        <div className="space-y-3">
          {simulatorSequence.map((step, index) => {
            const isHeavy = step.action_title?.toLowerCase().includes('heavy') ||
              step.actionTitle?.toLowerCase().includes('heavy') ||
              step.target_category?.toLowerCase().includes('masonry') ||
              step.targetCategory?.toLowerCase().includes('masonry');

            return (
              <div
                key={step.id || index}
                className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 ${
                  isHeavy
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                    isHeavy ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {index + 1}
                  </span>

                  <div>
                    <span className="text-sm font-bold text-gray-900 block">
                      {step.action_title || step.actionTitle}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Category: {step.target_category || step.targetCategory}
                      {isHeavy && <span className="ml-2 text-rose-600 font-bold">• Structural Mechanical Impact</span>}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => moveStepUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 transition cursor-pointer"
                    title="Move earlier in sequence"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveStepDown(index)}
                    disabled={index === simulatorSequence.length - 1}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 transition cursor-pointer"
                    title="Move later in sequence"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counterfactual Simulation Results Card */}
        {simulationResult && (
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
              <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-[#0D3B5E]">
                Counterfactual Scenario Projection
              </h3>
              <ScenarioEstimateBanner />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Simulated Net Value</span>
                <span className="text-xl font-bold font-heading text-gray-900 mt-1 block">
                  ₹{simulationResult.simulatedNetValue?.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-gray-400">
                  Baseline: ₹{(ledger?.predictedNetValue || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-teal-800 block">Simulated Diversion</span>
                <span className="text-xl font-bold font-heading text-teal-800 mt-1 block">
                  {simulationResult.simulatedDivertedTonnes} T
                </span>
                <span className="text-[10px] text-gray-400">Recovered tonnes</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-rose-700 block">Simulated Damage Rate</span>
                <span className="text-xl font-bold font-heading text-rose-600 mt-1 block">
                  {simulationResult.simulatedDamageRate}%
                </span>
                <span className="text-[10px] text-gray-400">Vibration & shatter loss</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-[#0D3B5E] block">Scenario Delta</span>
                <span className={`text-xl font-bold font-heading mt-1 block ${
                  (simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)) >= 0 ? 'text-[#0D3B5E]' : 'text-rose-600'
                }`}>
                  {(simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)) >= 0 ? '+' : ''}
                  ₹{(simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-gray-400">vs actual realized</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 leading-relaxed">
              <strong>Scenario Assessment:</strong> {simulationResult.scenarioAssessment}
            </div>

            {/* Explanation Evidence */}
            {simulationResult.evidencePoints && simulationResult.evidencePoints.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-gray-200">
                <span className="text-[11px] font-bold text-gray-700 uppercase">Documented Evidence:</span>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {simulationResult.evidencePoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <SafetyDisclaimerNotice />

    </div>
  );
}
