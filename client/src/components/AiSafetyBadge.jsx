import React from 'react';
import { AlertTriangle, ShieldCheck, BarChart2, Info } from 'lucide-react';

export function EstimationBasisBadge({ basis = 'Statistical Inference' }) {
  if (basis === 'Visible Evidence') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        Visible Evidence
      </span>
    );
  }
  if (basis === 'User Provided Data') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-300 border border-blue-500/40">
        <Info className="w-3.5 h-3.5 text-blue-400" />
        User Provided Data
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/70 text-amber-300 border border-amber-500/40">
      <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
      Statistical Inference
    </span>
  );
}

export function SafetyDisclaimerNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>AI-assisted estimates based on project inputs. Professional structural inspection required prior to reuse.</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-start gap-3 shadow-sm">
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="text-xs text-slate-300 space-y-1">
        <p className="font-semibold text-amber-300">AI Safety & Verification Notice</p>
        <p className="leading-relaxed">
          Estimates are statistical projections derived from building typology, regional factors, and visible project logs.
          These estimates do not constitute verified metallurgical, engineering, or structural load certifications.
          All materials must undergo qualified on-site physical inspection before structural repurposing.
        </p>
      </div>
    </div>
  );
}

export function ScenarioEstimateBanner() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-cyan-950/70 text-cyan-300 border border-cyan-500/40">
      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      Scenario estimate — not a guaranteed outcome.
    </div>
  );
}
