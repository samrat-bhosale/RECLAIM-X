import React from 'react';
import {
  Coins,
  Trash2,
  Hammer,
  ArrowRight,
  TrendingUp,
  Percent,
  Plus,
  Minus,
  Equal
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function EconomicImpactView() {
  const { activeProjectData, setActiveTab } = useProject();

  const project = activeProjectData?.project;
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
    recoveryAccuracy: 0
  };

  const items = activeProjectData?.items || [];

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
            Back to Project Hub
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20 uppercase">
              Circular Economics
            </span>
            <span className="text-xs text-gray-500">• Standardized PRD Formulation</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Economic Impact & Valuation
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Transparent accounting separating gross salvage revenue, landfill tipping savings, and selective labor costs.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('actuals')}
          className="btn-petrol-primary text-xs"
        >
          <span>Record Field Actuals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Formula Architecture Visual Breakdown */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-sm font-bold font-heading uppercase tracking-wider text-gray-700">
            Net Recovery Equation Breakdown
          </h2>
          <span className="text-xs text-gray-500 font-mono">
            Net Value = Gross Revenue + Disposal Savings - Recovery Cost
          </span>
        </div>

        {/* Mathematical Cards in Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Component 1: Gross Salvage Revenue */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
            <div className="flex items-center justify-between text-gray-600 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D3B5E]">1. Gross Salvage Revenue</span>
              <Coins className="w-4 h-4 text-[#0D3B5E]" />
            </div>
            <div className="text-2xl font-bold font-heading text-gray-900">
              ₹{(ledger.predictedGrossRevenue || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Σ(Recovered Qty × Resale Price)
            </p>
            <div className="mt-3 pt-2 border-t border-gray-200 text-[11px] text-gray-600">
              Realized: <strong className="text-teal-800">₹{(ledger.actualRevenue || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Plus Sign */}
          <div className="hidden md:flex justify-center text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[#0D3B5E] font-bold">
              <Plus className="w-4 h-4" />
            </div>
          </div>

          {/* Component 2: Disposal Cost Avoided */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
            <div className="flex items-center justify-between text-gray-600 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">2. Disposal Cost Avoided</span>
              <Trash2 className="w-4 h-4 text-teal-800" />
            </div>
            <div className="text-2xl font-bold font-heading text-gray-900">
              ₹{(ledger.predictedDisposalSavings || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Diverted Material × Tipping Fee
            </p>
            <div className="mt-3 pt-2 border-t border-gray-200 text-[11px] text-gray-600">
              Realized: <strong className="text-teal-800">₹{(ledger.actualDisposalSavings || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Minus Sign */}
          <div className="hidden md:flex justify-center text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-rose-600 font-bold">
              <Minus className="w-4 h-4" />
            </div>
          </div>

          {/* Component 3: Recovery Labor Cost */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
            <div className="flex items-center justify-between text-gray-600 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">3. Recovery Extraction Cost</span>
              <Hammer className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-gray-900">
              ₹{(ledger.predictedRecoveryCost || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Labor + Selective Tooling
            </p>
            <div className="mt-3 pt-2 border-t border-gray-200 text-[11px] text-gray-600">
              Realized: <strong className="text-gray-700">₹{(ledger.actualRecoveryCost || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

        </div>

        {/* Equals: Potential Net Recovery Value Result Card */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Equal className="w-4 h-4 text-[#0D3B5E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D3B5E]">
                Potential Net Recovery Value
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900">
              ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-gray-500">
              Realized Actual Net: <strong className="text-[#0D3B5E] font-mono">₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}</strong> • Recovery Gap: <span className="text-amber-700 font-mono">₹{(ledger.profitGap || 0).toLocaleString('en-IN')}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border border-gray-200">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Circularity Realization</span>
              <span className="text-xl font-bold font-heading text-[#0D3B5E]">
                {ledger.recoveryAccuracy || 0}%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Stream-by-Stream Economic Contribution Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-gray-900">
              Per-Material Economic Contribution
            </h2>
            <p className="text-xs text-gray-500">
              Unit economics, margin yield, and net salvage contribution per stream
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Sorted by potential yield
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase tracking-wider font-semibold text-[10px]">
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
            <tbody className="divide-y divide-gray-100 text-gray-700">
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
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {item.item_name || item.itemName}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{item.unit}</td>
                    <td className="py-3 px-4 text-right font-mono text-[#0D3B5E]">
                      ₹{resale.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-teal-800">
                      ₹{tipping.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-rose-600">
                      -₹{labor.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                      ₹{unitMargin.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#0D3B5E]">
                      ₹{predTotalNet.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-800">
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
