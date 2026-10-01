import React, { useState } from 'react';
import {
  BrainCircuit,
  GitBranch,
  Sparkles,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Coins,
  Recycle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { ScenarioEstimateBanner, SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function RootCauseSimulatorView() {
  const { activeProjectData, showNotification } = useProject();

  const project = activeProjectData?.project;
  const items = activeProjectData?.items || [];
  const initialSequences = activeProjectData?.sequences || [];
  const ledger = activeProjectData?.ledger;

  // Root Cause Diagnosis State
  const [diagnosis, setDiagnosis] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [fieldNotesInput, setFieldNotesInput] = useState(
    'Demolition contractor expedited heavy equipment mobilisation by 4 days due to municipal permit deadline.'
  );

  // Counterfactual Simulator State
  const [simulatorSequence, setSimulatorSequence] = useState(
    initialSequences.length > 0
      ? [...initialSequences].sort((a, b) => (a.step_number || a.stepNumber) - (b.step_number || b.stepNumber))
      : []
  );
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Trigger Gemini Root Cause Diagnosis
  const handleRunDiagnosis = async () => {
    if (!project) return;
    try {
      setIsDiagnosing(true);
      const result = await api.diagnoseGap(project.id, fieldNotesInput);
      setDiagnosis(result);
      showNotification('Gemini Root-Cause Diagnosis complete!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Failed to run root-cause diagnosis', 'error');
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Move sequence item up
  const moveStepUp = (index) => {
    if (index === 0) return;
    const newSeq = [...simulatorSequence];
    const temp = newSeq[index - 1];
    newSeq[index - 1] = newSeq[index];
    newSeq[index] = temp;
    // update step numbers
    newSeq.forEach((s, idx) => {
      s.stepNumber = idx + 1;
      s.step_number = idx + 1;
    });
    setSimulatorSequence(newSeq);
  };

  // Move sequence item down
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

  // Reset sequence to recommended original
  const handleResetSequence = () => {
    setSimulatorSequence(
      [...initialSequences].sort((a, b) => (a.step_number || a.stepNumber) - (b.step_number || b.stepNumber))
    );
    setSimulationResult(null);
  };

  // Run Simulation
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
            Back to Project Hub
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase">
              Circularity Learning
            </span>
            <span className="text-xs text-slate-400">• Root Cause & What-If Simulator</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Root Cause Diagnosis & Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Understand why material recovery was lost and simulate how sequencing changes affect circular yield.
          </p>
        </div>

        <ScenarioEstimateBanner />
      </div>

      {/* Part 1: Gemini Root-Cause Analysis (PRD Section 5.H) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold font-heading text-white">
                AI Root-Cause Diagnostic Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Gemini correlates predicted vs actual shortfall, damaged material logs, and contractor notes.
            </p>
          </div>

          <button
            onClick={handleRunDiagnosis}
            disabled={isDiagnosing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isDiagnosing ? 'Analyzing Root Causes...' : 'Ask Gemini: Why Was Recovery Lost?'}
          </button>
        </div>

        {/* User Input Notes for Gemini */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Field Execution Context & Observations
          </label>
          <textarea
            rows="2"
            value={fieldNotesInput}
            onChange={(e) => setFieldNotesInput(e.target.value)}
            placeholder="Add context about equipment timing, weather, schedule acceleration, or subcontractor actions..."
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Diagnosis Results Card */}
        {diagnosis ? (
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-amber-300">
                  {diagnosis.rootCauseTitle}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-amber-400/90 font-semibold bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                Confidence: {Math.round((diagnosis.aiConfidence || 0.8) * 100)}%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              {diagnosis.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Contributing Site Factors
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {diagnosis.contributingFactors?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Actionable Remedial Policies
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {diagnosis.preventativeActions?.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic pt-2">
              Note: {diagnosis.basisNote || 'Statistical inference from recorded project variances. Not a structural or legal certification.'}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            Click <strong>"Ask Gemini: Why Was Recovery Lost?"</strong> to generate an AI diagnosis of site breakage and schedule bottlenecks.
          </div>
        )}
      </div>

      {/* Part 2: Counterfactual Simulator (PRD Section 5.I & 13 Screen 7) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold font-heading text-white">
                Interactive Counterfactual Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reorder deconstruction steps to simulate how operational sequence shifts impact recovery yield & damage rates.
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

        {/* PRD Visual Flow: Current Scenario -> Change Sequence -> Simulated Recovery -> Simulated Economic Value */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 pb-2">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">Baseline Scenario</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40">Reorder Sequence</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">Simulate Recovery Yield</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/40">Simulated Net Value</span>
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
