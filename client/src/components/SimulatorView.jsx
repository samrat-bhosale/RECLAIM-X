import React, { useState } from 'react';
import {
  GitBranch,
  Sparkles,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Coins,
  Recycle,
  AlertTriangle,
  Search
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { ScenarioEstimateBanner, SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function SimulatorView() {
  const { activeProjectData, setActiveTab, showNotification, t } = useProject();

  const project = activeProjectData?.project;
  const initialSequences = activeProjectData?.sequences || [];
  const ledger = activeProjectData?.ledger;

  const [simulatorSequence, setSimulatorSequence] = useState(
    initialSequences.length > 0
      ? [...initialSequences].sort((a, b) => (a.step_number || a.stepNumber) - (b.step_number || b.stepNumber))
      : []
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
    <div className="space-y-6 max-w-5xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            {t('common.backToHub')}
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
              What-If Counterfactual
            </span>
            <span className="text-xs text-slate-400">• Sequence Sensitivity Simulator</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Deconstruction Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Modify deconstruction order to test sensitivity to premature heavy demolition and equipment arrival.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('rootcause')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Search className="w-4 h-4 text-rose-400" />
          <span>View Root Cause Analysis</span>
        </button>
      </div>

      {/* Simulator Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold font-heading text-white">
                Interactive Sequence Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reorder steps using the arrows to model how moving structural tasks earlier increases damage rates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetSequence}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Order
            </button>
            <button
              onClick={handleSimulateSequence}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSimulating ? 'Simulating...' : 'Simulate Changed Sequence'}
            </button>
          </div>
        </div>

        {/* Process Flow */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 pb-2">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">Baseline Plan</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40">Adjust Step Order</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">Evaluate Yield Delta</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/40">Projected Net Value</span>
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
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                    isHeavy ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-200'
                  }`}>
                    {index + 1}
                  </span>

                  <div>
                    <span className="text-sm font-bold text-white block">
                      {step.action_title || step.actionTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Category: {step.target_category || step.targetCategory}
                      {isHeavy && <span className="ml-2 text-rose-400 font-bold">• Structural Mechanical Impact</span>}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => moveStepUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition"
                    title="Move earlier in sequence"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveStepDown(index)}
                    disabled={index === simulatorSequence.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition"
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
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-cyan-300">
                Counterfactual Scenario Projection
              </h3>
              <ScenarioEstimateBanner />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Simulated Net Value</span>
                <span className="text-xl font-bold font-heading text-white mt-1 block">
                  ₹{simulationResult.simulatedNetValue?.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">
                  Baseline: ₹{(ledger?.predictedNetValue || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-teal-400 block">Simulated Diversion</span>
                <span className="text-xl font-bold font-heading text-teal-300 mt-1 block">
                  {simulationResult.simulatedDivertedTonnes} T
                </span>
                <span className="text-[10px] text-slate-400">Recovered tonnes</span>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-rose-400 block">Simulated Damage Rate</span>
                <span className="text-xl font-bold font-heading text-rose-400 mt-1 block">
                  {simulationResult.simulatedDamageRate}%
                </span>
                <span className="text-[10px] text-slate-400">Vibration & shatter loss</span>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Scenario Delta</span>
                <span className={`text-xl font-bold font-heading mt-1 block ${
                  (simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {(simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)) >= 0 ? '+' : ''}
                  ₹{(simulationResult.simulatedNetValue - (ledger?.actualNetValue || 0)).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">vs actual realized</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong>Scenario Assessment:</strong> {simulationResult.scenarioAssessment}
            </div>

            <div className="text-[11px] text-slate-400 italic">
              {simulationResult.disclaimer}
            </div>
          </div>
        )}

      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
