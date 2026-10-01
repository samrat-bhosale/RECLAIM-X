import React from 'react';
import {
  Recycle,
  Coins,
  AlertOctagon,
  ArrowUpRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function CircularityTowerView() {
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
    wasteDivertedTonnes: 0,
    recoveryAccuracy: 0,
    materialDiversionRate: 0
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
            <ArrowUpRight className="w-3.5 h-3.5 rotate-225" />
            Back to Project Hub
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20 uppercase">
              Recovery Gap
            </span>
            <span className="text-xs text-gray-500">• Performance Control Tower</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Recovery Gap & Performance
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Cross-stream synthesis comparing predicted benchmarks against field execution yield.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('simulator')}
          className="btn-petrol-primary text-xs"
        >
          <span>Run What-If Simulator</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* High-Level Comparison Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Financial Realization Gauge */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Economic Recovery Realization
            </span>
            <Coins className="w-4 h-4 text-[#0D3B5E]" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-gray-900">
                {ledger.recoveryAccuracy || 0}%
              </span>
              <span className="text-xs text-gray-500">
                ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')} of ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#0D3B5E] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, ledger.recoveryAccuracy || 0)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed">
            Percentage of predicted net economic salvage value successfully converted into confirmed salvage revenue.
          </p>
        </div>

        {/* Metric 2: Material Diversion (Tonnes) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Landfill Diversion
            </span>
            <Recycle className="w-4 h-4 text-teal-800" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-teal-800">
                {ledger.wasteDivertedTonnes || 0} <span className="text-sm font-normal text-gray-500">Tonnes</span>
              </span>
              <span className="text-xs text-gray-500">
                Solid C&D Waste
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (ledger.wasteDivertedTonnes / 25) * 100)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed">
            Estimated physical weight diverted from regional landfill tipping, conserving circular resources.
          </p>
        </div>

        {/* Metric 3: Recovery Gap Forfeited */}
        <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Recovery Gap Deficit
            </span>
            <AlertOctagon className="w-4 h-4 text-amber-600" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-amber-700">
                ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-amber-800">
                Lost Value
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-700"
                style={{
                  width: `${ledger.predictedNetValue > 0 ? Math.min(100, Math.round((ledger.profitGap / ledger.predictedNetValue) * 100)) : 0}%`
                }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-amber-800 leading-relaxed">
            Economic potential forfeited due to breakage, schedule compression, or skipped soft-strip deconstruction.
          </p>
        </div>

      </div>

      {/* Visual Comparison: Expected vs Actual Recovery per Material Stream */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-gray-900">
              Expected vs. Actual Material Yield Comparison
            </h2>
            <p className="text-xs text-gray-500">
              Stream-by-stream physical recovery performance against AI baseline predictions
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
              <span className="text-gray-500">Predicted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#0D3B5E]"></div>
              <span className="text-gray-900 font-medium">Actual Recovered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-rose-500"></div>
              <span className="text-rose-600 font-medium">Damaged</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((it) => {
            const pred = Number(it.predicted_qty || it.predictedQty || 0);
            const act = Number(it.actual_recovered_qty || it.actualRecoveredQty || 0);
            const dam = Number(it.damaged_qty || it.damagedQty || 0);
            const maxVal = Math.max(pred, act + dam, 1);

            const predWidth = Math.round((pred / maxVal) * 100);
            const actWidth = Math.round((act / maxVal) * 100);
            const damWidth = Math.round((dam / maxVal) * 100);

            return (
              <div key={it.id} className="space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">
                    {it.item_name || it.itemName}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-gray-500">Pred: {pred}</span>
                    <span className="text-[#0D3B5E] font-bold">Act: {act}</span>
                    {dam > 0 && <span className="text-rose-600 font-bold">Dam: {dam}</span>}
                    <span className="text-gray-500">{it.unit}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Predicted Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gray-400 h-full rounded-full"
                      style={{ width: `${predWidth}%` }}
                      title={`Predicted: ${pred}`}
                    ></div>
                  </div>

                  {/* Actual + Damaged Combined Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-[#0D3B5E] h-full transition-all"
                      style={{ width: `${actWidth}%` }}
                      title={`Recovered: ${act}`}
                    ></div>
                    <div
                      className="bg-rose-500 h-full transition-all"
                      style={{ width: `${damWidth}%` }}
                      title={`Damaged: ${dam}`}
                    ></div>
                  </div>
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
