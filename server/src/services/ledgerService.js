/**
 * Economic & Circularity Ledger Calculation Service
 * Implements standard PRD formulas:
 * 
 * Gross Salvage Revenue = Σ(Recovered Quantity × Resale Value)
 * Disposal Cost Avoided = Σ(Diverted Material × Disposal Tipping Fee Avoided)
 * Recovery Cost = Σ(Extracted Quantity × Extraction Labor Cost)
 * Potential Net Recovery Value = Gross Salvage Revenue + Disposal Cost Avoided - Recovery Cost
 * 
 * Recovery Gap = Predicted Recoverable Quantity - Actual Recovered Quantity
 * Potential Value Lost = Predicted Net Value - Actual Net Value
 */

// Weight conversion factors for C&D waste estimation in metric tonnes
const CATEGORY_WEIGHT_TONNES = {
  'Structural Steel': 0.045, // tonnes per unit/linear meter
  'Steel & Rebar': 0.05,
  'Wood & Timber': 0.025,
  'Timber Doors': 0.035, // per door unit
  'Aluminium & Glass': 0.030,
  'Electrical & Fixtures': 0.005,
  'Plumbing & Ceramics': 0.020,
  'Masonry & Concrete': 0.150,
  'default': 0.020
};

export function calculateProjectLedger(items = []) {
  let predictedGrossRevenue = 0;
  let predictedDisposalSavings = 0;
  let predictedRecoveryCost = 0;

  let actualRevenue = 0;
  let actualDisposalSavings = 0;
  let actualRecoveryCost = 0;

  let totalPredictedQty = 0;
  let totalActualRecoveredQty = 0;
  let totalDamagedQty = 0;
  let wasteDivertedTonnes = 0;

  const itemCalculations = items.map(item => {
    const predQty = Number(item.predicted_qty || item.predictedQty || 0);
    const actQty = Number(item.actual_recovered_qty || item.actualRecoveredQty || 0);
    const damQty = Number(item.damaged_qty || item.damagedQty || 0);
    const resaleVal = Number(item.unit_resale_value || item.unitResaleValue || 0);
    const tippingFee = Number(item.tipping_fee_per_unit || item.tippingFeeAvoidedPerUnit || 0);
    const laborCost = Number(item.labor_cost_per_unit || item.extractionLaborCostPerUnit || 0);

    const itemPredRevenue = predQty * resaleVal;
    const itemPredSavings = predQty * tippingFee;
    const itemPredCost = predQty * laborCost;
    const itemPredNet = itemPredRevenue + itemPredSavings - itemPredCost;

    const itemActRevenue = actQty * resaleVal;
    const itemActSavings = actQty * tippingFee;
    // Labor cost spent on extraction attempts (recovered + damaged)
    const itemActCost = (actQty + (damQty * 0.75)) * laborCost;
    const itemActNet = itemActRevenue + itemActSavings - itemActCost;

    const recoveryGap = Math.max(0, predQty - actQty);
    const potentialValueLost = Math.max(0, itemPredNet - itemActNet);

    predictedGrossRevenue += itemPredRevenue;
    predictedDisposalSavings += itemPredSavings;
    predictedRecoveryCost += itemPredCost;

    actualRevenue += itemActRevenue;
    actualDisposalSavings += itemActSavings;
    actualRecoveryCost += itemActCost;

    totalPredictedQty += predQty;
    totalActualRecoveredQty += actQty;
    totalDamagedQty += damQty;

    const weightFactor = CATEGORY_WEIGHT_TONNES[item.material_category || item.category] || CATEGORY_WEIGHT_TONNES['default'];
    wasteDivertedTonnes += actQty * weightFactor;

    return {
      id: item.id,
      itemName: item.item_name || item.itemName,
      predictedQty: predQty,
      actualRecoveredQty: actQty,
      damagedQty: damQty,
      recoveryGap,
      potentialValueLost,
      predictedNet: itemPredNet,
      actualNet: itemActNet,
      divertedTonnes: Number((actQty * weightFactor).toFixed(2))
    };
  });

  const predictedNetValue = predictedGrossRevenue + predictedDisposalSavings - predictedRecoveryCost;
  const actualNetValue = actualRevenue + actualDisposalSavings - actualRecoveryCost;
  const profitGap = Math.max(0, predictedNetValue - actualNetValue);

  const recoveryAccuracy = predictedNetValue > 0
    ? Math.min(100, Math.max(0, Math.round((actualNetValue / predictedNetValue) * 100)))
    : 0;

  const materialDiversionRate = totalPredictedQty > 0
    ? Math.min(100, Math.max(0, Math.round((totalActualRecoveredQty / totalPredictedQty) * 100)))
    : 0;

  return {
    predictedGrossRevenue: Math.round(predictedGrossRevenue),
    predictedDisposalSavings: Math.round(predictedDisposalSavings),
    predictedRecoveryCost: Math.round(predictedRecoveryCost),
    predictedNetValue: Math.round(predictedNetValue),
    actualRevenue: Math.round(actualRevenue),
    actualDisposalSavings: Math.round(actualDisposalSavings),
    actualRecoveryCost: Math.round(actualRecoveryCost),
    actualNetValue: Math.round(actualNetValue),
    profitGap: Math.round(profitGap),
    wasteDivertedTonnes: Number(wasteDivertedTonnes.toFixed(2)),
    recoveryAccuracy,
    materialDiversionRate,
    totalPredictedQty,
    totalActualRecoveredQty,
    totalDamagedQty,
    itemCalculations
  };
}
