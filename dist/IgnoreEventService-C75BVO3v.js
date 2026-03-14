import { bf as convertModifiersToBadges, l as logger, bg as pipelineRegistry, L as getPendingOutcomesByType, x as get_store_value, bh as doctrineService, v as updatePendingOutcome, bi as updateEventsPhase, ae as currentTurn, bj as eventsPhase } from "./GameCommandUtils-D_sgs3NK.js";
async function buildIgnoredEventResolution(pipeline, actorName = "Event Ignored", approach) {
  const outcomeData = pipeline.outcomes?.failure;
  const approachOption = approach && pipeline.strategicChoice?.options ? pipeline.strategicChoice.options.find((opt) => opt.id === approach) : null;
  const approachBadges = approachOption?.outcomeBadges?.failure ? [...approachOption.outcomeBadges.failure] : [];
  const approachDescription = approachOption?.outcomeDescriptions?.failure;
  if (!outcomeData && approachBadges.length === 0) {
    return {
      resolution: {
        outcome: "failure",
        actorName,
        skillName: "",
        effect: "Event ignored.",
        modifiers: [],
        manualEffects: [],
        gameCommands: [],
        outcomeBadges: [],
        effectsApplied: false,
        isIgnored: true,
        shortfallResources: []
      },
      resolvedDice: {}
    };
  }
  const modifiers = outcomeData?.modifiers || [];
  const resolvedDice = {};
  for (let i = 0; i < modifiers.length; i++) {
    const mod = modifiers[i];
    if (mod.type === "dice" && mod.formula) {
      try {
        const Roll = globalThis.Roll;
        if (Roll) {
          const roll = new Roll(mod.formula);
          await roll.evaluate();
          resolvedDice[i] = roll.total || 0;
          console.log(`[IgnoredEventResolution] Pre-rolled dice ${i}: ${mod.formula} = ${roll.total}`);
        } else {
          console.warn("[IgnoredEventResolution] Roll class not available, using fallback");
          resolvedDice[i] = 1;
        }
      } catch (error) {
        console.error(`[IgnoredEventResolution] Failed to roll dice for modifier ${i}:`, error);
        resolvedDice[i] = 1;
      }
    }
  }
  for (const badge of approachBadges) {
    if (badge.value?.type === "dice" && badge.value.formula) {
      try {
        const Roll = globalThis.Roll;
        if (Roll) {
          const roll = new Roll(badge.value.formula);
          await roll.evaluate();
          badge.value.result = roll.total || 0;
          badge.value.resolvedText = String(roll.total || 0);
          console.log(`[IgnoredEventResolution] Pre-rolled approach badge: ${badge.value.formula} = ${roll.total}`);
        } else {
          badge.value.result = 1;
          badge.value.resolvedText = "1";
        }
      } catch (error) {
        console.error(`[IgnoredEventResolution] Failed to roll dice for approach badge:`, error);
        badge.value.result = 1;
        badge.value.resolvedText = "1";
      }
    }
  }
  const instanceMetadata = {
    resolvedDice: new Map(Object.entries(resolvedDice).map(([k, v]) => [parseInt(k), v]))
  };
  let outcomeBadges = convertModifiersToBadges(modifiers, instanceMetadata);
  if (outcomeData?.outcomeBadges && outcomeData.outcomeBadges.length > 0) {
    outcomeBadges = [...outcomeBadges, ...outcomeData.outcomeBadges];
  }
  if (approachBadges.length > 0) {
    outcomeBadges = [...outcomeBadges, ...approachBadges];
  }
  outcomeBadges = outcomeBadges.filter((badge) => badge !== null && badge !== void 0);
  const effect = approachDescription || outcomeData?.description || "Event ignored.";
  const resolution = {
    outcome: "failure",
    actorName,
    skillName: "",
    effect,
    modifiers,
    manualEffects: outcomeData?.manualEffects || [],
    gameCommands: outcomeData?.gameCommands || [],
    outcomeBadges,
    effectsApplied: false,
    isIgnored: true,
    shortfallResources: []
  };
  console.log("[IgnoredEventResolution] Built resolution:", {
    outcome: resolution.outcome,
    effect: resolution.effect,
    approach: approach || "none",
    modifiersCount: resolution.modifiers.length,
    badgesCount: resolution.outcomeBadges.length,
    diceRolled: Object.keys(resolvedDice).length
  });
  return {
    resolution,
    resolvedDice
  };
}
const ignoreEventService = {
  /**
   * Ignore an event by ID
   *
   * Builds the failure outcome (using dominant doctrine for choice-based events),
   * stores it on the instance, and clears the active event. The player's action
   * is preserved — that's the trade-off for accepting the failure.
   *
   * @param eventId - The event pipeline ID
   * @param options - Optional configuration
   * @returns Result with success/error status
   */
  async ignoreEvent(eventId, options = {}) {
    const { isDebugTest = false, actorName = "Event Ignored" } = options;
    logger.info(`[IgnoreEventService] Ignoring event: ${eventId}`, { isDebugTest });
    const event = pipelineRegistry.getPipeline(eventId);
    if (!event) {
      return { success: false, error: "Event not found" };
    }
    const outcomeData = event.outcomes?.failure;
    if (!outcomeData) {
      logger.warn("[IgnoreEventService] Event has no failure outcome, treating as neutral");
      return { success: true };
    }
    const isBeneficial = event.traits?.includes("beneficial");
    const isDangerous = event.traits?.includes("dangerous");
    logger.info(`[IgnoreEventService] Ignoring event (beneficial=${isBeneficial}, dangerous=${isDangerous})`);
    const eventInstances = getPendingOutcomesByType("event");
    const existingInstance = eventInstances.find(
      (i) => i.checkId === event.id && i.status === "pending"
    );
    let previewId;
    if (existingInstance) {
      previewId = existingInstance.previewId;
      logger.info("[IgnoreEventService] Using existing instance:", previewId);
    } else {
      const { createOutcomePreviewService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cR);
      const outcomePreviewService = await createOutcomePreviewService();
      const metadata = isDebugTest ? { isDebugTest: true } : void 0;
      const currentTurn$1 = get_store_value(currentTurn);
      previewId = await outcomePreviewService.createInstance(
        "event",
        event.id,
        event,
        currentTurn$1,
        metadata
      );
      logger.info("[IgnoreEventService] Created new instance:", previewId);
    }
    const approach = event.strategicChoice ? doctrineService.getDoctrineState().dominant : null;
    if (approach) {
      logger.info(`[IgnoreEventService] Using dominant doctrine as approach: ${approach}`);
    }
    const { resolution, resolvedDice } = await buildIgnoredEventResolution(event, actorName, approach);
    await updatePendingOutcome(previewId, (instance) => {
      instance.appliedOutcome = resolution;
      instance.status = "resolved";
      if (!instance.resolutionState) {
        instance.resolutionState = {
          selectedChoice: null,
          resolvedDice: {},
          selectedResources: {}
        };
      }
      instance.resolutionState.resolvedDice = resolvedDice;
      logger.info("[IgnoreEventService] Updated instance with failure resolution");
    });
    const currentEventsPhase = get_store_value(eventsPhase);
    if (currentEventsPhase?.eventId === eventId) {
      await updateEventsPhase((phase) => {
        phase.eventId = null;
        phase.eventInstanceId = null;
        phase.eventTriggered = false;
      });
    }
    return { success: true, previewId };
  }
};
export {
  ignoreEventService
};
