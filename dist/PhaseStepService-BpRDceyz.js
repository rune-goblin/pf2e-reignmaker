import { l as logger, T as TurnPhase, s as getUnrestTier } from "./GameCommandUtils-D_sgs3NK.js";
function computePhaseSteps(phase, turnState, kingdom) {
  switch (phase) {
    case TurnPhase.STATUS:
      return computeStatusPhaseSteps(turnState);
    case TurnPhase.RESOURCES:
      return computeResourcesPhaseSteps(turnState);
    case TurnPhase.UNREST:
      return computeUnrestPhaseSteps(turnState, kingdom);
    case TurnPhase.EVENTS:
      return computeEventsPhaseSteps(turnState);
    case TurnPhase.ACTIONS:
      return computeActionsPhaseSteps();
    case TurnPhase.UPKEEP:
      return computeUpkeepPhaseSteps(turnState, kingdom);
    default:
      logger.warn(`[PhaseStepService] Unknown phase: ${phase}`);
      return [{ name: "Unknown", completed: 0 }];
  }
}
function computeStatusPhaseSteps(turnState, kingdom) {
  const completed = turnState.phaseOutcomes?.statusPhase?.completed ?? false;
  return [{ name: "Status", completed: completed ? 1 : 0 }];
}
function computeResourcesPhaseSteps(turnState) {
  const resourcesCollected = turnState.phaseOutcomes?.resourcesPhase?.resourcesCollected ?? false;
  return [{ name: "Resources", completed: resourcesCollected ? 1 : 0 }];
}
function computeUnrestPhaseSteps(turnState, kingdom) {
  const unrest = kingdom?.unrest ?? 0;
  const isStable = getUnrestTier(unrest) === 0;
  const incidentRolled = turnState.phaseOutcomes?.unrestPhase?.incidentRolled ?? false;
  const incidentTriggered = turnState.phaseOutcomes?.unrestPhase?.incidentTriggered ?? false;
  const incidentResolved = turnState.phaseOutcomes?.unrestPhase?.incidentResolved ?? false;
  return [
    { name: "Calculate Unrest", completed: 1 },
    // Always auto-complete (informational)
    { name: "Incident Check", completed: isStable || incidentRolled ? 1 : 0 },
    { name: "Resolve Incident", completed: isStable || incidentRolled && !incidentTriggered || incidentResolved ? 1 : 0 }
  ];
}
function computeEventsPhaseSteps(turnState) {
  const currentTurn = turnState.turnNumber || 1;
  if (currentTurn === 1) {
    return [
      { name: "Event Roll", completed: 1 },
      { name: "Resolve Event", completed: 1 },
      { name: "Apply Modifiers", completed: 1 }
    ];
  }
  const eventRolled = turnState.phaseOutcomes?.eventsPhase?.eventRolled ?? false;
  const eventTriggered = turnState.phaseOutcomes?.eventsPhase?.eventTriggered ?? false;
  const eventResolved = turnState.phaseOutcomes?.eventsPhase?.eventResolved ?? false;
  return [
    { name: "Event Roll", completed: eventRolled ? 1 : 0 },
    { name: "Resolve Event", completed: eventRolled && !eventTriggered || eventResolved ? 1 : 0 },
    { name: "Apply Modifiers", completed: eventRolled && !eventTriggered || eventResolved ? 1 : 0 }
  ];
}
function computeActionsPhaseSteps() {
  return [{ name: "Actions", completed: 1 }];
}
function computeUpkeepPhaseSteps(turnState, kingdom) {
  const PLAYER_KINGDOM = "player";
  const armies = kingdom?.armies ?? [];
  const hasArmies = armies.some(
    (a) => a.ledBy === PLAYER_KINGDOM && !a.exemptFromUpkeep
  );
  const hexes = kingdom?.hexes ?? [];
  const currentTurn = turnState.turnNumber || 1;
  const hasFortifications = hexes.some(
    (hex) => hex.claimedBy === PLAYER_KINGDOM && hex.fortification && hex.fortification.tier > 0 && hex.fortification.turnBuilt !== currentTurn
    // Skip fortifications built this turn
  );
  const buildQueueEmpty = (kingdom?.buildQueue?.length ?? 0) === 0;
  const upkeepOutcome = turnState.phaseOutcomes?.upkeepPhase;
  const consumptionPaid = upkeepOutcome?.consumptionPaid ?? false;
  const militarySupported = upkeepOutcome?.militarySupportPaid ?? false;
  const buildsProcessed = upkeepOutcome?.buildProjectsAdvanced ?? false;
  return [
    { name: "Feed Settlements", completed: consumptionPaid ? 1 : 0 },
    { name: "Support Military", completed: militarySupported || !hasArmies && !hasFortifications ? 1 : 0 },
    { name: "Build Queue", completed: buildsProcessed || buildQueueEmpty ? 1 : 0 }
  ];
}
function areAllStepsComplete(steps) {
  return steps.length > 0 && steps.every((s) => s.completed === 1);
}
function getFirstIncompleteStepIndex(steps) {
  return steps.findIndex((s) => s.completed === 0);
}
export {
  areAllStepsComplete,
  computePhaseSteps,
  getFirstIncompleteStepIndex
};
