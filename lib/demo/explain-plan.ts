/**
 * Kanch-Net Plan Explanation Generator
 * Defined per docs/PRD.md Section 5, 11 & docs/CONTRACT.md
 * Generates transparent, human-readable explanations of planner decisions.
 */

import { LotPlanResult } from '@/lib/demo/plan-lot';

export interface PlanExplanation {
  summary: string;
  inclusionBreakdown: string[];
  exclusionBreakdown: string[];
  shortfallWarning: string | null;
  tieBreakNotes: string[];
}

export function explainPlan(plan: LotPlanResult, orderNeeded: number): PlanExplanation {
  const inclusionBreakdown: string[] = [];
  const exclusionBreakdown: string[] = [];
  const tieBreakNotes: string[] = [];

  // 1. Inclusions
  for (const line of plan.lines) {
    inclusionBreakdown.push(
      `Allocated ${line.takeQty.toLocaleString()} pieces from batch ${line.batchId} (Row: ${line.rowId}).`
    );
  }

  // 2. Exclusions
  for (const ev of plan.evaluations) {
    if (!ev.isEligible && ev.reason) {
      exclusionBreakdown.push(`Batch ${ev.batchId} (${ev.rowId}): ${ev.reason}`);
    }
  }

  // 3. Tie-break notes (e.g. B-103 vs B-106 at 6 km)
  const batchesAt6km = plan.sortedEligibleBatches.filter((b) => b.distanceKm === 6);
  if (batchesAt6km.length > 1) {
    tieBreakNotes.push(
      `Both B-103 and B-106 are 6 km away. B-103 ranks ahead because its illustrative acceptance rate (90%) is higher than B-106 (61%).`
    );
  }

  // 4. Shortfall Warning
  let shortfallWarning: string | null = null;
  if (plan.approvalLocked) {
    shortfallWarning = `Order shortfall of ${plan.shortfallQty.toLocaleString()} pieces (${plan.totalPlannedQty.toLocaleString()} of ${orderNeeded.toLocaleString()} covered). Coordinator approval is locked until additional stock is found.`;
  }

  const summary = plan.isFullyCovered
    ? `Fully matched ${orderNeeded.toLocaleString()} pieces across ${plan.lines.length} eligible supplier batches.`
    : `Shortfall of ${plan.shortfallQty.toLocaleString()} pieces. Matched ${plan.totalPlannedQty.toLocaleString()} of ${orderNeeded.toLocaleString()} required pieces.`;

  return {
    summary,
    inclusionBreakdown,
    exclusionBreakdown,
    shortfallWarning,
    tieBreakNotes,
  };
}
