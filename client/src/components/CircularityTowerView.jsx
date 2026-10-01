import React from 'react';
import {
  LineChart,
  Recycle,
  TrendingUp,
  AlertOctagon,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Layers,
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
              Circularity Intelligence
            </span>
            <span className="text-xs text-slate-400">• Executive Control Tower</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Circularity Control Tower
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Holistic cross-stream synthesis comparing predicted benchmarks against field execution yield.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('simulator')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:scale-102 transition shadow-md shadow-emerald-500/20"
        >
          <span>Run What-If Simulator</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* High-Level Comparison Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Financial Realization Gauge */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Economic Recovery Realization
            </span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-white">
                {ledger.recoveryAccuracy || 0}%
              </span>
              <span className="text-xs text-slate-400">
                ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')} of ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, ledger.recoveryAccuracy || 0)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Percentage of predicted net economic salvage value successfully converted into confirmed salvage revenue.
          </p>
        </div>

        {/* Metric 2: Material Diversion (Tonnes) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Landfill Diversion
            </span>
            <Recycle className="w-4 h-4 text-teal-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-teal-300">
                {ledger.wasteDivertedTonnes || 0} <span className="text-sm font-normal text-slate-400">Tonnes</span>
              </span>
              <span className="text-xs text-slate-400">
                Solid C&D Waste
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (ledger.wasteDivertedTonnes / 25) * 100)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Estimated physical weight diverted from regional landfill tipping, conserving circular resources.
          </p>
        </div>

        {/* Metric 3: Recovery Gap Forfeited */}
        <div className="glass-panel-amber p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Recovery Gap Deficit
            </span>
            <AlertOctagon className="w-4 h-4 text-amber-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold font-heading text-amber-400">
                ₹{(ledger.profitGap || 0).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-amber-300/80">
                Lost Value
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-700"
                style={{
                  width: `${ledger.predictedNetValue > 0 ? Math.min(100, Math.round((ledger.profitGap / ledger.predictedNetValue) * 100)) : 0}%`
                }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            Economic potential forfeited due to breakage, schedule compression, or skipped soft-strip deconstruction.
          </p>
        </div>

      </div>

      {/* Visual Comparison: Expected vs Actual Recovery per Material Stream */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-white">
              Expected vs. Actual Material Yield Comparison
            </h2>
            <p className="text-xs text-slate-400">
              Stream-by-stream physical recovery performance against AI baseline predictions
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-slate-600"></div>
              <span className="text-slate-400">Predicted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-teal-400"></div>
              <span className="text-slate-200 font-medium">Actual Recovered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-rose-500"></div>
              <span className="text-rose-400 font-medium">Damaged</span>
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
              <div key={it.id} className="space-y-1.5 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    {it.item_name || it.itemName}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-slate-400">Pred: {pred}</span>
                    <span className="text-teal-300 font-bold">Act: {act}</span>
                    {dam > 0 && <span className="text-rose-400 font-bold">Dam: {dam}</span>}
                    <span className="text-slate-400">{it.unit}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Predicted Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-slate-500 h-full rounded-full"
                      style={{ width: `${predWidth}%` }}
                      title={`Predicted: ${pred}`}
                    ></div>
                  </div>

                  {/* Actual + Damaged Combined Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-teal-400 h-full transition-all"
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
