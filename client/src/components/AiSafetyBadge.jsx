import React from 'react';
import { AlertTriangle, ShieldCheck, BarChart2, Info } from 'lucide-react';

export function EstimationBasisBadge({ basis = 'Statistical Inference' }) {
  if (basis === 'Visible Evidence') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/30">
        <ShieldCheck className="w-3.5 h-3.5 text-[#0D3B5E]" />
        Visible Evidence
      </span>
    );
  }
  if (basis === 'User Provided Data') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
        <Info className="w-3.5 h-3.5 text-blue-600" />
        User Provided Data
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
      <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
      Statistical Inference
    </span>
  );
}

export function SafetyDisclaimerNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>AI-assisted estimates based on project inputs. Professional structural inspection required prior to reuse.</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-xl bg-white border border-amber-200 flex items-start gap-3 shadow-xs">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs text-gray-700 space-y-1">
        <p className="font-semibold text-amber-800">AI Safety & Verification Notice</p>
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
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/30">
      <span className="w-2 h-2 rounded-full bg-[#0D3B5E] animate-pulse"></span>
      Scenario estimate — not a guaranteed outcome.
    </div>
  );
}
