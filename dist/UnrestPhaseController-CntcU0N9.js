import { O as createOutcomePreviewService, x as get_store_value, ab as getUnrestTierInfo, ac as getUnrestStatus, g as getPartyActor, l as logger, s as getUnrestTier, y as kingdomData, Z as turnStateData, a5 as isStepCompletedByIndex, ad as UnrestPhaseSteps, ae as currentTurn, af as currentTurnId, W as updateTurnState, ag as getIncidentChance, a8 as completePhaseStepByIndex } from "./GameCommandUtils-D_sgs3NK.js";
async function createUnrestPhaseController() {
  const outcomePreviewService = await createOutcomePreviewService();
  return {
    // NOTE: startPhase() removed - step initialization now happens in advancePhase()
    // via PhaseStepService.computePhaseSteps(). Phase setup (clearing old incidents)
    // is handled by PhaseSetupService.runPhaseSetup() called from TurnManager.
    /**
     * Roll for incident occurrence based on current unrest level
     */
    async rollForIncident() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [UnrestPhaseController] No kingdom actor available");
        return { incidentTriggered: false };
      }
      if (await isStepCompletedByIndex(UnrestPhaseSteps.INCIDENT_CHECK)) {
        return { incidentTriggered: false };
      }
      const kingdom = get_store_value(kingdomData);
      const unrest = kingdom.unrest || 0;
      const tier = getUnrestTier(unrest);
      const incidentChance = getIncidentChance(unrest);
      const roll = Math.random();
      const incidentTriggered = roll < incidentChance;
      let incidentId = null;
      let instanceId = null;
      if (incidentTriggered) {
        try {
          const { pipelineRegistry } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cO);
          const severity = tier === 1 ? "minor" : tier === 2 ? "moderate" : "major";
          const allIncidents = pipelineRegistry.getPipelinesByType("incident");
          const incidentsForSeverity = allIncidents.filter((p) => p.severity === severity);
          const incident = incidentsForSeverity[Math.floor(Math.random() * incidentsForSeverity.length)];
          incidentId = incident?.id || null;
          if (incident) {
            const incidentTurn = get_store_value(currentTurn) || 1;
            const incidentTurnId = get_store_value(currentTurnId);
            if (!incidentTurnId) {
              throw new Error("[UnrestPhaseController] currentTurnId is empty — TurnStateStore not synced. Cannot create incident instance.");
            }
            instanceId = await outcomePreviewService.createInstance(
              "incident",
              incident.id,
              incident,
              incidentTurn,
              void 0,
              // metadata
              void 0,
              // expiryTurn
              incidentTurnId
              // turnId for proper namespacing
            );
            await updateTurnState((state) => {
              state.phaseOutcomes.unrestPhase.incidentRolled = true;
              state.phaseOutcomes.unrestPhase.incidentRoll = Math.round(roll * 100);
              state.phaseOutcomes.unrestPhase.incidentChance = Math.round(incidentChance * 100);
              state.phaseOutcomes.unrestPhase.incidentTriggered = true;
            });
          }
        } catch (error) {
          logger.error("❌ [UnrestPhaseController] Error loading incident:", error);
        }
      } else {
        await updateTurnState((state) => {
          state.phaseOutcomes.unrestPhase.incidentRolled = true;
          state.phaseOutcomes.unrestPhase.incidentRoll = Math.round(roll * 100);
          state.phaseOutcomes.unrestPhase.incidentChance = Math.round(incidentChance * 100);
          state.phaseOutcomes.unrestPhase.incidentTriggered = false;
        });
        await completePhaseStepByIndex(UnrestPhaseSteps.RESOLVE_INCIDENT);
      }
      await completePhaseStepByIndex(UnrestPhaseSteps.INCIDENT_CHECK);
      return {
        incidentTriggered,
        roll: Math.round(roll * 100),
        chance: Math.round(incidentChance * 100),
        incidentId,
        instanceId
        // Return instance ID for UI
      };
    },
    // Legacy methods removed - now handled by PipelineCoordinator:
    // - resolveIncident()
    // - storeIncidentResolution()
    // - markIncidentApplied()
    // - clearIncidentResolution()
    // - getIncidentModifiers()
    /**
     * Get display data for the UI (delegates to static helper)
     */
    getDisplayData() {
      const kingdom = get_store_value(kingdomData);
      const unrest = kingdom.unrest || 0;
      const tierInfo = getUnrestTierInfo(unrest);
      return {
        currentUnrest: unrest,
        incidentThreshold: tierInfo.incidentThreshold,
        incidentChance: tierInfo.incidentChance,
        incidentSeverity: tierInfo.incidentSeverity,
        status: getUnrestStatus(unrest)
      };
    },
    /**
     * Check if incident rolling is allowed (business logic)
     */
    canRollForIncident() {
      const kingdom = get_store_value(kingdomData);
      const unrest = kingdom.unrest || 0;
      const tier = getUnrestTier(unrest);
      if (tier === 0) {
        return { allowed: false, reason: "Unrest tier is 0 - no incidents occur" };
      }
      const currentTurnState = get_store_value(turnStateData);
      const stepComplete = currentTurnState?.phaseProgress?.currentPhaseSteps?.[1]?.completed === 1;
      if (stepComplete) {
        return { allowed: false, reason: "Incident check already completed" };
      }
      return { allowed: true };
    }
  };
}
export {
  createUnrestPhaseController,
  getUnrestStatus,
  getUnrestTierInfo
};
