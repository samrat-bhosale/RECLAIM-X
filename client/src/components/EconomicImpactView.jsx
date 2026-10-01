import React from 'react';
import {
  Coins,
  TrendingUp,
  Trash2,
  Hammer,
  HelpCircle,
  Equal,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function EconomicImpactView() {
  const { activeProjectData, setActiveTab } = useProject();

  const ledger = activeProjectData?.ledger || {
    predictedGrossRevenue: 0,
    predictedDisposalSavings: 0,
    predictedRecoveryCost: 0,
    predictedNetValue: 0,
    actualRevenue: 0,
    actualDisposalSavings: 0,
    actualRecoveryCost: 0,
    actualNetValue: 0,
    profitGap: 0,
    recoveryAccuracy: 0,
    itemCalculations: []
  };

  const items = activeProjectData?.items || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase">
              Demolition Circular Economics
            </span>
            <span className="text-xs text-slate-400">• Standardized PRD Formulation</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Economic Impact & Net Recovery Valuation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Transparent mathematical accounting separating gross salvage revenue, landfill tipping savings, and selective labor costs.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('actuals')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-md shadow-emerald-500/20"
        >
          <span>Record Field Actuals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Formula Architecture Visual Breakdown (PRD Section 5.E & 13 Screen 4) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold font-heading uppercase tracking-wider text-slate-300">
            PRD Net Recovery Equation Breakdown
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Net Value = Gross Revenue + Disposal Savings - Recovery Cost
          </span>
        </div>

        {/* Mathematical Cards in Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Component 1: Gross Salvage Revenue */}
          <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 relative">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">1. Gross Salvage Revenue</span>
              <Coins className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              ₹{(ledger.predictedGrossRevenue || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Σ(Recovered Qty × Resale Price)
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              Realized: <strong className="text-teal-300">₹{(ledger.actualRevenue || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Plus Sign */}
          <div className="hidden md:flex justify-center text-slate-600">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
              <Plus className="w-4 h-4" />
            </div>
          </div>

          {/* Component 2: Disposal Cost Avoided */}
          <div className="glass-panel p-5 rounded-2xl border-teal-500/30 relative">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">2. Disposal Cost Avoided</span>
              <Trash2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              ₹{(ledger.predictedDisposalSavings || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Diverted Material × Tipping Fee
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              Realized: <strong className="text-teal-300">₹{(ledger.actualDisposalSavings || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Minus Sign */}
          <div className="hidden md:flex justify-center text-slate-600">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 font-bold">
              <Minus className="w-4 h-4" />
            </div>
          </div>

          {/* Component 3: Recovery Labor Cost */}
          <div className="glass-panel p-5 rounded-2xl border-rose-500/30 relative">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">3. Recovery Extraction Cost</span>
              <Hammer className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              ₹{(ledger.predictedRecoveryCost || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Labor + Selective Tooling
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              Realized: <strong className="text-slate-300">₹{(ledger.actualRecoveryCost || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

        </div>

        {/* Equals: Potential Net Recovery Value Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Equal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Potential Net Recovery Value
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-400">
              Realized Actual Net: <strong className="text-emerald-400 font-mono">₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}</strong> • Recovery Gap: <span className="text-amber-400 font-mono">₹{(ledger.profitGap || 0).toLocaleString('en-IN')}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Circularity Realization</span>
              <span className="text-xl font-bold font-heading text-emerald-400">
                {ledger.recoveryAccuracy || 0}%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Stream-by-Stream Economic Contribution Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-white">
              Per-Material Economic Contribution
            </h2>
            <p className="text-xs text-slate-400">
              Unit economics, margin yield, and net salvage contribution per stream
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Sorted by potential yield
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Material Asset</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4 text-right">Resale Value</th>
                <th className="py-3 px-4 text-right">Tipping Avoided</th>
                <th className="py-3 px-4 text-right">Extraction Cost</th>
                <th className="py-3 px-4 text-right">Net Margin / Unit</th>
                <th className="py-3 px-4 text-right">Predicted Net Total</th>
                <th className="py-3 px-4 text-right">Actual Net Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {items.map((item) => {
                const resale = Number(item.unit_resale_value || item.unitResaleValue || 0);
                const tipping = Number(item.tipping_fee_per_unit || item.tippingFeeAvoidedPerUnit || 0);
                const labor = Number(item.labor_cost_per_unit || item.extractionLaborCostPerUnit || 0);
                const unitMargin = resale + tipping - labor;

                const predQty = Number(item.predicted_qty || item.predictedQty || 0);
                const actQty = Number(item.actual_recovered_qty || item.actualRecoveredQty || 0);

                const predTotalNet = predQty * unitMargin;
                const actTotalNet = actQty * unitMargin;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.item_name || item.itemName}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{item.unit}</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400">
                      ₹{resale.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-teal-300">
                      ₹{tipping.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-rose-400">
                      -₹{labor.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      ₹{unitMargin.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                      ₹{predTotalNet.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-300">
                      ₹{actTotalNet.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
