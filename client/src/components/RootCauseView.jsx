import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  GitBranch
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function RootCauseView() {
  const { activeProjectData, setActiveTab, showNotification, t } = useProject();

  const project = activeProjectData?.project;
  const ledger = activeProjectData?.ledger;

  const [diagnosis, setDiagnosis] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [fieldNotesInput, setFieldNotesInput] = useState(
    'Demolition contractor expedited heavy equipment mobilisation by 4 days due to municipal permit deadline.'
  );

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
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-rose-500/10 text-rose-700 border border-rose-500/20 uppercase">
              Circularity Learning
            </span>
            <span className="text-xs text-gray-500">• Evidence-Based Variance Diagnosis</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Root Cause Analysis
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Explain documented and project-data-based reasons for recovery deficits using Gemini AI.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('simulator')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0D3B5E] hover:bg-[#0A2E4A] text-white transition shadow-sm"
        >
          <GitBranch className="w-4 h-4 text-cyan-200" />
          <span>Open Sequence Simulator</span>
        </button>
      </div>

      {/* Financial Deficit Snapshot */}
      {ledger && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <span className="text-[10px] uppercase font-semibold text-gray-500 block">Estimated Potential</span>
            <div className="text-xl font-bold font-heading text-gray-900 mt-1">
              ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-500">Baseline salvage target</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <span className="text-[10px] uppercase font-semibold text-gray-500 block">Actual Recovery</span>
            <div className="text-xl font-bold font-heading text-[#0D3B5E] mt-1">
              ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-500">Field confirmed value</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 shadow-xs">
            <span className="text-[10px] uppercase font-semibold text-amber-800 block">Recovery Gap to Diagnose</span>
            <div className="text-xl font-bold font-heading text-amber-900 mt-1">
              ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-amber-700">Unrecovered salvage deficit</span>
          </div>
        </div>
      )}

      {/* Gemini Root-Cause Analysis Panel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-bold font-heading text-gray-900">
                AI Root-Cause Diagnostic Engine
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Gemini correlates predicted vs actual shortfall, damaged material logs, and contractor notes.
            </p>
          </div>

          <button
            onClick={handleRunDiagnosis}
            disabled={isDiagnosing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isDiagnosing ? 'Analyzing Root Causes...' : 'Diagnose Recovery Deficit'}
          </button>
        </div>

        {/* User Input Notes for Gemini */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Field Execution Context & Contractor Observations
          </label>
          <textarea
            rows="2"
            value={fieldNotesInput}
            onChange={(e) => setFieldNotesInput(e.target.value)}
            placeholder="Add context about equipment timing, weather, schedule acceleration, or subcontractor actions..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
          />
        </div>

        {/* Diagnosis Results Card */}
        {diagnosis ? (
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-rose-900">
                  {diagnosis.rootCauseTitle}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-rose-800 font-semibold bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200">
                Confidence: {Math.round((diagnosis.aiConfidence || 0.8) * 100)}%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-white p-4 rounded-xl border border-rose-100">
              {diagnosis.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                  Contributing Site Factors
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {diagnosis.contributingFactors?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-[#0D3B5E] uppercase tracking-wider block">
                  Actionable Remedial Policies
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {diagnosis.preventativeActions?.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0D3B5E] font-bold">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 italic pt-2">
              Note: {diagnosis.basisNote || 'Statistical inference from recorded project variances. Not a structural or legal certification.'}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center text-xs text-gray-500 space-y-2">
            <Search className="w-8 h-8 text-gray-400 mx-auto" />
            <p>Click <strong>"Diagnose Recovery Deficit"</strong> to run Gemini AI analysis across field variance data, notes, and material damage rates.</p>
          </div>
        )}
      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
