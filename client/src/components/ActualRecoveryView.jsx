import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  AlertOctagon,
  Save,
  CheckCircle,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function ActualRecoveryView() {
  const {
    activeProjectData,
    updateActuals,
    setActiveTab,
    showNotification
  } = useProject();

  const rawItems = activeProjectData?.items || [];
  const [formItems, setFormItems] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (rawItems && rawItems.length > 0) {
      setFormItems(rawItems.map(it => ({
        id: it.id,
        itemName: it.item_name || it.itemName,
        materialCategory: it.material_category || it.materialCategory || it.category,
        predictedQty: Number(it.predicted_qty || it.predictedQty || 0),
        actualRecoveredQty: Number(it.actual_recovered_qty || it.actualRecoveredQty || 0),
        damagedQty: Number(it.damaged_qty || it.damagedQty || 0),
        unit: it.unit,
        unitResaleValue: Number(it.unit_resale_value || it.unitResaleValue || 0),
        tippingFeePerUnit: Number(it.tipping_fee_per_unit || it.tippingFeeAvoidedPerUnit || 0),
        laborCostPerUnit: Number(it.labor_cost_per_unit || it.extractionLaborCostPerUnit || 0),
        notes: it.notes || ''
      })));
    }
  }, [rawItems]);

  const handleInputChange = (id, field, value) => {
    setFormItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: field === 'notes' ? value : Math.max(0, Number(value) || 0)
        };
      }
      return item;
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = formItems.map(item => ({
        id: item.id,
        actualRecoveredQty: item.actualRecoveredQty,
        damagedQty: item.damagedQty,
        notes: item.notes
      }));
      await updateActuals(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Compute live totals
  let totalPredicted = 0;
  let totalActual = 0;
  let totalDamaged = 0;
  let totalValueLost = 0;

  const enrichedItems = formItems.map(item => {
    const pred = item.predictedQty;
    const act = item.actualRecoveredQty;
    const dam = item.damagedQty;
    const unrecovered = Math.max(0, pred - act - dam);
    const recoveryGap = Math.max(0, pred - act);

    const unitNet = item.unitResaleValue + item.tippingFeePerUnit - item.laborCostPerUnit;
    const valueLost = recoveryGap * Math.max(0, unitNet);

    totalPredicted += pred;
    totalActual += act;
    totalDamaged += dam;
    totalValueLost += valueLost;

    return {
      ...item,
      unrecovered,
      recoveryGap,
      valueLost
    };
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 animate-in fade-in duration-300">
      
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
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 uppercase">
              Field Actuals
            </span>
            <span className="text-xs text-slate-400">• Recovery Gap Recording</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Actual Recovery & Gap Logging
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Record actual reclaimed quantities and broken assets to quantify the Recovery Gap and lost circular value.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Recalculating...' : 'Save Field Actuals'}
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Diagnose Lost Value</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Highlights of Field Performance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Predicted</span>
          <span className="text-2xl font-bold text-white mt-1 block">{totalPredicted}</span>
          <span className="text-[11px] text-slate-400">Projected units across streams</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-teal-500/30">
          <span className="text-[10px] uppercase font-bold text-teal-400 block">Actual Recovered</span>
          <span className="text-2xl font-bold text-teal-300 mt-1 block">{totalActual}</span>
          <span className="text-[11px] text-slate-400">
            {totalPredicted > 0 ? Math.round((totalActual / totalPredicted) * 100) : 0}% Yield rate
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/30">
          <span className="text-[10px] uppercase font-bold text-rose-400 block">Damaged In Situ</span>
          <span className="text-2xl font-bold text-rose-400 mt-1 block">{totalDamaged}</span>
          <span className="text-[11px] text-slate-400">Broken during extraction</span>
        </div>

        <div className="glass-panel-amber p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-amber-300 block">Potential Value Lost</span>
          <span className="text-2xl font-bold font-heading text-amber-400 mt-1 block">
            ₹{Math.round(totalValueLost).toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-amber-300/80">Opportunity forfeited</span>
        </div>
      </div>

      {/* Interactive Editable Actuals Table (PRD Screen 5) */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-white">
              Material Recovery Ledger & Recovery Gap
            </h2>
            <p className="text-xs text-slate-400">
              Input actual salvage results. Recovery Gap and Lost Value update in real time.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Recovery Gap = Predicted - Actual
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3.5 px-4">Material Stream</th>
                <th className="py-3.5 px-4 text-center">Predicted</th>
                <th className="py-3.5 px-4 text-center">Actual Recovered</th>
                <th className="py-3.5 px-4 text-center">Damaged</th>
                <th className="py-3.5 px-4 text-center">Unrecovered</th>
                <th className="py-3.5 px-4 text-center text-amber-400">Recovery Gap</th>
                <th className="py-3.5 px-4 text-right text-amber-400">Value Lost (₹)</th>
                <th className="py-3.5 px-4">Field Notes / Reasons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {enrichedItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{item.itemName}</span>
                    <span className="text-[10px] text-slate-400">{item.materialCategory}</span>
                  </td>

                  {/* Predicted */}
                  <td className="py-3.5 px-4 text-center font-mono font-medium text-white">
                    {item.predictedQty} <span className="text-[10px] text-slate-400">{item.unit}</span>
                  </td>

                  {/* Actual Recovered Input */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      <input
                        type="number"
                        min="0"
                        value={item.actualRecoveredQty}
                        onChange={(e) => handleInputChange(item.id, 'actualRecoveredQty', e.target.value)}
                        className="w-16 bg-transparent text-center font-mono font-bold text-teal-300 focus:outline-none text-xs"
                      />
                      <span className="text-[10px] text-slate-400 pr-1">{item.unit}</span>
                    </div>
                  </td>

                  {/* Damaged Input */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      <input
                        type="number"
                        min="0"
                        value={item.damagedQty}
                        onChange={(e) => handleInputChange(item.id, 'damagedQty', e.target.value)}
                        className="w-14 bg-transparent text-center font-mono font-bold text-rose-400 focus:outline-none text-xs"
                      />
                      <span className="text-[10px] text-slate-400 pr-1">{item.unit}</span>
                    </div>
                  </td>

                  {/* Unrecovered */}
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                    {item.unrecovered} {item.unit}
                  </td>

                  {/* Recovery Gap */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400">
                    {item.recoveryGap > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                        -{item.recoveryGap} {item.unit}
                      </span>
                    ) : (
                      <span className="text-emerald-400">0</span>
                    )}
                  </td>

                  {/* Potential Value Lost */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                    {item.valueLost > 0 ? (
                      <span>₹{Math.round(item.valueLost).toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-emerald-400">₹0</span>
                    )}
                  </td>

                  {/* Field Notes Input */}
                  <td className="py-3.5 px-4">
                    <input
                      type="text"
                      placeholder="e.g. Edge splintered, early vibration..."
                      value={item.notes}
                      onChange={(e) => handleInputChange(item.id, 'notes', e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Notice */}
      <SafetyDisclaimerNotice />

    </div>
  );
}
