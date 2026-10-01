import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  Save,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { SafetyDisclaimerNotice } from './AiSafetyBadge';

export default function ActualRecoveryView() {
  const {
    activeProjectData,
    updateActualRecovery,
    setActiveTab,
    showNotification
  } = useProject();

  const project = activeProjectData?.project;
  const items = activeProjectData?.items || [];
  const ledger = activeProjectData?.ledger;

  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      const initial = {};
      items.forEach((item) => {
        initial[item.id] = {
          actualRecoveredQty: item.actual_recovered_qty ?? item.actualRecoveredQty ?? 0,
          damagedQty: item.damaged_qty ?? item.damagedQty ?? 0,
          notes: item.notes ?? ''
        };
      });
      setFormData(initial);
    }
  }, [items]);

  const handleInputChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === 'notes' ? value : Math.max(0, Number(value) || 0)
      }
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updates = Object.keys(formData).map((itemId) => ({
        itemId,
        actualRecoveredQty: formData[itemId].actualRecoveredQty,
        damagedQty: formData[itemId].damagedQty,
        notes: formData[itemId].notes
      }));

      await updateActualRecovery(updates);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const tableRows = items.map((item) => {
    const input = formData[item.id] || { actualRecoveredQty: 0, damagedQty: 0, notes: '' };
    const predicted = Number(item.predicted_qty || item.predictedQty || 0);
    const recovered = Number(input.actualRecoveredQty);
    const damaged = Number(input.damagedQty);
    const unrecovered = Math.max(0, predicted - recovered);
    const recoveryGap = Math.max(0, predicted - recovered);
    const unitPrice = Number(item.unit_resale_value || item.unitResaleValue || 0);
    const tipping = Number(item.tipping_fee_per_unit || item.tippingFeeAvoidedPerUnit || 0);
    const valueLost = recoveryGap * (unitPrice + tipping);

    return {
      ...item,
      recovered,
      damaged,
      unrecovered,
      recoveryGap,
      notes: input.notes,
      valueLost
    };
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 font-sans animate-fade-in-up">
      
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
              Field Actuals
            </span>
            <span className="text-xs text-gray-500">• Recovery Gap Recording</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Actual Recovery & Gap Logging
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Record actual reclaimed quantities and broken assets to quantify the Recovery Gap and lost circular value.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-petrol-primary text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Recalculating...' : 'Save Field Actuals'}</span>
          </button>
          <button
            onClick={() => setActiveTab('gap')}
            className="btn-outline-secondary text-xs"
          >
            <span>View Gap Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field Actuals Interactive Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-gray-900">
              Material Reconciliation Ledger
            </h2>
            <p className="text-xs text-gray-500">
              Input field results to contrast actual yield against pre-demolition AI projections
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Autosave on submit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3.5 px-4">Material Asset</th>
                <th className="py-3.5 px-4 text-center">Predicted Target</th>
                <th className="py-3.5 px-4 text-center">Actual Recovered</th>
                <th className="py-3.5 px-4 text-center">Damaged / Broken</th>
                <th className="py-3.5 px-4 text-center">Unrecovered</th>
                <th className="py-3.5 px-4 text-center text-amber-700">Recovery Gap</th>
                <th className="py-3.5 px-4 text-right text-amber-700">Value Lost</th>
                <th className="py-3.5 px-4 min-w-[200px]">Field Notes / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {tableRows.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">
                    <div>{item.item_name || item.itemName}</div>
                    <div className="text-[10px] text-gray-400 font-normal">Grade {item.condition_rating || item.conditionRating} • {item.material_category || item.category}</div>
                  </td>

                  {/* Predicted */}
                  <td className="py-3.5 px-4 text-center font-mono font-medium text-gray-600">
                    {item.predicted_qty || item.predictedQty} {item.unit}
                  </td>

                  {/* Actual Recovered Input */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        value={item.recovered}
                        onChange={(e) => handleInputChange(item.id, 'actualRecoveredQty', e.target.value)}
                        className="w-20 bg-white border border-gray-300 rounded-md px-2 py-1 text-center font-mono text-xs text-gray-900 font-bold focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E]"
                      />
                      <span className="text-gray-400 text-[11px]">{item.unit}</span>
                    </div>
                  </td>

                  {/* Damaged Input */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        value={item.damaged}
                        onChange={(e) => handleInputChange(item.id, 'damagedQty', e.target.value)}
                        className="w-16 bg-white border border-rose-300 rounded-md px-2 py-1 text-center font-mono text-xs text-rose-700 font-bold focus:outline-none focus:border-rose-500"
                      />
                      <span className="text-gray-400 text-[11px]">{item.unit}</span>
                    </div>
                  </td>

                  {/* Unrecovered */}
                  <td className="py-3.5 px-4 text-center font-mono text-gray-500">
                    {item.unrecovered} {item.unit}
                  </td>

                  {/* Recovery Gap */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-700">
                    {item.recoveryGap > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-xs">
                        -{item.recoveryGap} {item.unit}
                      </span>
                    ) : (
                      <span className="text-[#0D3B5E]">0</span>
                    )}
                  </td>

                  {/* Potential Value Lost */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-700">
                    {item.valueLost > 0 ? (
                      <span>₹{Math.round(item.valueLost).toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-[#0D3B5E]">₹0</span>
                    )}
                  </td>

                  {/* Field Notes Input */}
                  <td className="py-3.5 px-4">
                    <input
                      type="text"
                      placeholder="e.g. Edge splintered, early vibration..."
                      value={item.notes}
                      onChange={(e) => handleInputChange(item.id, 'notes', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1 text-xs text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
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
