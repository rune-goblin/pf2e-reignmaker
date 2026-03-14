import { l as logger, T as TurnPhase } from "./GameCommandUtils-D_sgs3NK.js";
async function runPhaseSetup(phase, turnState, kingdom) {
  logger.info(`[PhaseSetupService] Running setup for ${phase}`);
  try {
    switch (phase) {
      case TurnPhase.STATUS:
        await runStatusPhaseSetup(turnState, kingdom);
        break;
      case TurnPhase.RESOURCES:
        await runResourcesPhaseSetup(turnState);
        break;
      case TurnPhase.UNREST:
        await runUnrestPhaseSetup(turnState, kingdom);
        break;
      case TurnPhase.EVENTS:
        await runEventsPhaseSetup(turnState, kingdom);
        break;
      case TurnPhase.ACTIONS:
        break;
      case TurnPhase.UPKEEP:
        break;
      default:
        logger.warn(`[PhaseSetupService] No setup defined for phase: ${phase}`);
    }
    logger.info(`[PhaseSetupService] Setup complete for ${phase}`);
  } catch (error) {
    logger.error(`[PhaseSetupService] Setup failed for ${phase}:`, error);
    throw error;
  }
}
async function runStatusPhaseSetup(turnState, kingdom) {
  const { createStatusPhaseController } = await import("./StatusPhaseController-CVLeF1s8.js");
  const controller = await createStatusPhaseController();
  const { TurnManager } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cp);
  await TurnManager.getInstance().ensureTurnInitialized();
  if (controller.applyPendingArmySupportChanges) {
    await controller.applyPendingArmySupportChanges();
  }
  if (controller.cleanupStaleDisplayModifiers) {
    await controller.cleanupStaleDisplayModifiers();
  }
  if (controller.clearAppliedOutcomes) {
    await controller.clearAppliedOutcomes();
  }
  if (controller.clearPreviousIncident) {
    await controller.clearPreviousIncident();
  }
  if (controller.clearCompletedProjects) {
    await controller.clearCompletedProjects();
  }
  if (controller.applyBaseUnrest) {
    await controller.applyBaseUnrest();
  }
  if (controller.applyDoctrinePenalties) {
    await controller.applyDoctrinePenalties();
  }
  if (controller.syncDoctrineAbilitiesToArmies) {
    await controller.syncDoctrineAbilitiesToArmies();
  }
  if (controller.checkDoctrineMilestones) {
    await controller.checkDoctrineMilestones();
  }
  if (controller.cleanupExpiredModifiers) {
    await controller.cleanupExpiredModifiers();
  }
  if (controller.applyPermanentModifiers) {
    await controller.applyPermanentModifiers();
  }
  if (controller.applyOngoingModifiers) {
    await controller.applyOngoingModifiers();
  }
  if (controller.applyAutomaticStructureEffects) {
    await controller.applyAutomaticStructureEffects();
  }
  let firstSettlementRequired = false;
  let cohesionRequired = false;
  if (controller.initializeFirstSettlementCheck) {
    firstSettlementRequired = await controller.initializeFirstSettlementCheck();
  }
  if (controller.initializeCohesionCheck) {
    cohesionRequired = await controller.initializeCohesionCheck();
  }
  if (!firstSettlementRequired && !cohesionRequired) {
    const { updateTurnState } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cq);
    const { completePhaseStepByIndex } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cy);
    const { StatusPhaseSteps } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cz);
    await updateTurnState((state) => {
      state.phaseOutcomes.statusPhase.completed = true;
    });
    await completePhaseStepByIndex(StatusPhaseSteps.STATUS);
    logger.info("[PhaseSetupService] STATUS phase auto-completed (no blocking conditions)");
  } else {
    if (firstSettlementRequired) {
      logger.info("[PhaseSetupService] STATUS phase waiting for first settlement");
    }
    if (cohesionRequired) {
      logger.info("[PhaseSetupService] STATUS phase waiting for cohesion check");
    }
  }
}
async function runResourcesPhaseSetup(turnState) {
}
async function runUnrestPhaseSetup(turnState, kingdom) {
  const { createOutcomePreviewService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cR);
  const outcomePreviewService = await createOutcomePreviewService();
  const currentTurnId = turnState.turnId || "";
  const { getPendingOutcomesByType } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cq);
  const allIncidents = getPendingOutcomesByType("incident");
  const outdatedIncidents = allIncidents.filter((i) => i.turnId && i.turnId !== currentTurnId);
  if (outdatedIncidents.length > 0) {
    logger.info(`[PhaseSetupService] Clearing ${outdatedIncidents.length} outdated incidents`);
    for (const incident of outdatedIncidents) {
      await outcomePreviewService.clearInstance(incident.previewId);
    }
  }
  const completedThisTurn = allIncidents.filter(
    (i) => i.turnId === currentTurnId && (i.status === "resolved" || i.status === "applied")
  );
  if (completedThisTurn.length > 0) {
    logger.info(`[PhaseSetupService] Clearing ${completedThisTurn.length} completed incidents`);
    for (const incident of completedThisTurn) {
      await outcomePreviewService.clearInstance(incident.previewId);
    }
  }
}
async function runEventsPhaseSetup(turnState, kingdom) {
  const { applyCustomModifiers } = await import("./CustomModifierService-BWMjqgCl.js");
  await applyCustomModifiers({ phase: "Events" });
  const { createOutcomePreviewService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cR);
  const outcomePreviewService = await createOutcomePreviewService();
  const currentTurn = turnState.turnNumber || 1;
  await outcomePreviewService.clearCompleted("event", currentTurn);
  await outcomePreviewService.clearOngoingResolutions("event");
  if (kingdom) {
    await checkDemandExpansionFulfilled(kingdom);
  }
  if (currentTurn === 1) {
    const { updateTurnState } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cq);
    await updateTurnState((s) => {
      s.phaseOutcomes.eventsPhase.eventRolled = true;
      s.phaseOutcomes.eventsPhase.eventRoll = 0;
      s.phaseOutcomes.eventsPhase.eventTriggered = false;
      s.phaseOutcomes.eventsPhase.eventId = null;
    });
  }
}
async function checkDemandExpansionFulfilled(kingdom) {
  const { PLAYER_KINGDOM } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cr);
  const { updateKingdom } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cx);
  const { updatePendingOutcome } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cq);
  const fulfilledHexes = kingdom.hexes?.filter(
    (hex) => hex.claimedBy === PLAYER_KINGDOM && hex.features?.some((f) => f.type === "demanded")
  ) || [];
  if (fulfilledHexes.length === 0) return;
  logger.info(`[PhaseSetupService] Found ${fulfilledHexes.length} fulfilled demand expansion(s)`);
  const eventInstanceIdsToResolve = [];
  await updateKingdom((k) => {
    for (const hex of fulfilledHexes) {
      const targetHex = k.hexes?.find((h) => h.id === hex.id);
      if (targetHex?.features) {
        const demandedFeature = targetHex.features.find((f) => f.type === "demanded");
        const eventInstanceId = demandedFeature?.eventInstanceId;
        targetHex.features = targetHex.features.filter((f) => f.type !== "demanded");
        if (eventInstanceId) {
          eventInstanceIdsToResolve.push(eventInstanceId);
        }
      }
    }
  });
  for (const eventInstanceId of eventInstanceIdsToResolve) {
    await updatePendingOutcome(eventInstanceId, (instance) => {
      instance.status = "resolved";
    });
  }
}
export {
  runPhaseSetup
};
