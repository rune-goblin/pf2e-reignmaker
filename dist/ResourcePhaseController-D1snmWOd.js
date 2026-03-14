import { x as get_store_value, a4 as resourceService, a5 as isStepCompletedByIndex, a6 as ResourcesPhaseSteps, l as logger, g as getPartyActor, y as kingdomData, a7 as createPhaseResult, a8 as completePhaseStepByIndex, a9 as getTierMaterialStorage, aa as reportPhaseError } from "./GameCommandUtils-D_sgs3NK.js";
async function createResourcePhaseController() {
  return {
    // NOTE: startPhase() removed - step initialization now happens in advancePhase()
    // via PhaseStepService.computePhaseSteps(). Phase setup is handled by
    // PhaseSetupService.runPhaseSetup() called from TurnManager.
    /**
     * Single-step resource collection using resource service
     * Any player can complete this once per turn
     *
     * Resources are distributed to settlements based on worksite proximity and road connectivity:
     * - Materials (lumber, stone, ore) use tier-based storage
     * - Food uses structure-based storage (Granary)
     * - Gold goes to kingdom treasury
     */
    async collectResources() {
      const actor = getPartyActor();
      const MODULE_ID = "pf2e-reignmaker";
      const flagState = actor?.getFlag(MODULE_ID, "turn-state");
      if (flagState?.phaseOutcomes?.resourcesPhase?.resourcesCollected) {
        logger.debug("[ResourcePhaseController] Idempotency: resources already collected, silently ignoring");
        return createPhaseResult(false);
      }
      try {
        const kingdom = get_store_value(kingdomData);
        if (!actor) {
          return createPhaseResult(false, "No kingdom actor available");
        }
        const result = resourceService.collectTurnResources({
          hexes: kingdom.hexes || [],
          settlements: kingdom.settlements || [],
          isAtWar: kingdom.isAtWar || false,
          kingdom
        });
        logger.info("[ResourcePhase] Production result:", {
          territoryResources: Object.fromEntries(result.resourceCollection.territoryResources),
          hexCount: result.details.hexCount,
          byHex: result.details.productionByHex.map((h) => ({
            id: h.hexId,
            terrain: h.terrain,
            production: Object.fromEntries(h.production)
          }))
        });
        const { worksiteAssignmentService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cw);
        const { tradeNetworkService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cs);
        tradeNetworkService.clearCache();
        const distribution = worksiteAssignmentService.distributeResourcesToSettlements(
          kingdom,
          result.worksiteProduction
        );
        logger.info("[ResourcePhase] Resource distribution:", {
          allocations: Object.fromEntries(
            Array.from(distribution.settlementAllocations.entries()).map(([id, alloc]) => [id, alloc])
          ),
          resourcesLost: distribution.resourcesLost,
          details: distribution.details.map((d) => ({
            worksite: d.worksiteHexId,
            settlement: d.settlementName,
            stored: d.stored,
            lost: d.lost
          }))
        });
        await actor.updateKingdomData((kingdom2) => {
          logger.info("[ResourcePhase] Resources BEFORE collection:", JSON.stringify(kingdom2.resources));
          worksiteAssignmentService.applyDistributionToSettlements(
            kingdom2.settlements || [],
            distribution.settlementAllocations
          );
          const playerSettlements = resourceService.getPlayerSettlements(kingdom2);
          resourceService.redistributeWithinNetworks(playerSettlements, kingdom2);
          playerSettlements.forEach((settlement) => {
            if ((settlement.currentLumber ?? 0) > 0 || (settlement.storedLumber ?? 0) > 0 || (settlement.currentStone ?? 0) > 0 || (settlement.storedStone ?? 0) > 0 || (settlement.currentOre ?? 0) > 0 || (settlement.storedOre ?? 0) > 0 || (settlement.storedFood ?? 0) > 0 || (settlement.currentFood ?? 0) > 0) {
              logger.info(`[ResourcePhase] Settlement "${settlement.name}" storage: CF=${settlement.currentFood ?? 0}, SF=${settlement.storedFood ?? 0}, CL=${settlement.currentLumber ?? 0}, SL=${settlement.storedLumber ?? 0}, CS=${settlement.currentStone ?? 0}, SS=${settlement.storedStone ?? 0}, CO=${settlement.currentOre ?? 0}, SO=${settlement.storedOre ?? 0}`);
            }
          });
          worksiteAssignmentService.updateSettlementConnectedWorksites(kingdom2);
          const settlementGold = result.resourceCollection.settlementGold;
          if (settlementGold > 0) {
            const autoTax = Math.floor(settlementGold * 0.35);
            const current = kingdom2.resources.gold || 0;
            kingdom2.resources.gold = current + autoTax;
            logger.info(`[ResourcePhase] Wealth: ${settlementGold}, Auto-tax (35%): ${autoTax}, Gold: ${current} -> ${kingdom2.resources.gold}`);
          }
          if (distribution.resourcesLost.lumber > 0 || distribution.resourcesLost.stone > 0 || distribution.resourcesLost.ore > 0 || distribution.resourcesLost.food > 0) {
            logger.warn(`[ResourcePhase] Resources LOST (no settlement in range): F=${distribution.resourcesLost.food}, L=${distribution.resourcesLost.lumber}, S=${distribution.resourcesLost.stone}, O=${distribution.resourcesLost.ore}`);
          }
          logger.info("[ResourcePhase] Resources AFTER collection:", JSON.stringify(kingdom2.resources));
        });
        const updatedKingdom = actor.getFlag(MODULE_ID, "kingdom-data");
        const updatedPlayerSettlements = resourceService.getPlayerSettlements(updatedKingdom);
        const atRiskResult = resourceService.getResourcesAtRisk(updatedPlayerSettlements, updatedKingdom);
        const resourcesAtRisk = atRiskResult.total;
        if (resourcesAtRisk.lumber > 0 || resourcesAtRisk.stone > 0 || resourcesAtRisk.ore > 0 || resourcesAtRisk.food > 0) {
          logger.info(`[ResourcePhase] Resources AT RISK (exceed storage, will be lost at end of turn if not spent): F=${resourcesAtRisk.food}, L=${resourcesAtRisk.lumber}, S=${resourcesAtRisk.stone}, O=${resourcesAtRisk.ore}`);
        }
        const { applyCustomModifiers } = await import("./CustomModifierService-BWMjqgCl.js");
        logger.info("[ResourcePhase] Applying custom modifiers...");
        await applyCustomModifiers({ phase: "Resources" });
        logger.info("[ResourcePhase] Custom modifiers applied");
        await completePhaseStepByIndex(ResourcesPhaseSteps.COLLECT_RESOURCES);
        return {
          success: true,
          allocation: {
            // Seasonal food production info
            season: result.season,
            seasonalFoodMultiplier: result.seasonalFoodMultiplier,
            // Resource allocations by worksite (includes food and materials)
            worksiteAllocations: distribution.details.map((d) => ({
              worksiteHexId: d.worksiteHexId,
              worksiteType: updatedKingdom.hexes?.find((h) => h.id === d.worksiteHexId)?.worksite?.type || "Unknown",
              terrain: updatedKingdom.hexes?.find((h) => h.id === d.worksiteHexId)?.terrain || "Unknown",
              settlementId: d.settlementId,
              settlementName: d.settlementName,
              connectionType: d.connectionType,
              production: d.production,
              stored: d.stored,
              lost: d.lost
            })),
            // Wealth generated from settlements (economic output)
            wealthGenerated: result.resourceCollection.settlementGold,
            // Auto-tax revenue (35% of wealth, goes to kingdom treasury)
            autoTaxCollected: Math.floor(result.resourceCollection.settlementGold * 0.35),
            // Gold from settlements (auto-tax amount for backward compat)
            goldCollected: Math.floor(result.resourceCollection.settlementGold * 0.35),
            // Total resources lost (no settlement in range)
            resourcesLost: distribution.resourcesLost,
            // Total resources at risk (exceeds storage - will be lost at end of turn if not spent)
            // Calculated using ResourceService which considers road-connected settlement pooling
            resourcesAtRisk,
            // Settlement storage summary (after allocation)
            settlementStorage: updatedPlayerSettlements.map((s) => ({
              id: s.id,
              name: s.name,
              currentFood: s.currentFood ?? 0,
              storedFood: s.storedFood ?? 0,
              currentLumber: s.currentLumber ?? 0,
              currentStone: s.currentStone ?? 0,
              currentOre: s.currentOre ?? 0,
              storedLumber: s.storedLumber ?? 0,
              storedStone: s.storedStone ?? 0,
              storedOre: s.storedOre ?? 0,
              materialCapacity: getTierMaterialStorage(s.tier),
              foodCapacity: s.foodStorageCapacity ?? 0
            }))
          }
        };
      } catch (error) {
        reportPhaseError("ResourcePhaseController Collection", error instanceof Error ? error : new Error(String(error)));
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
      }
    },
    /**
     * Get preview of what would be collected using resource service (for UI display)
     * This should match exactly what collectResources() will actually collect
     */
    async getPreviewData() {
      const kingdom = get_store_value(kingdomData);
      const hexes = kingdom.hexes || [];
      const settlements = kingdom.settlements || [];
      try {
        const result = resourceService.collectTurnResources({
          hexes,
          settlements,
          isAtWar: kingdom.isAtWar || false,
          kingdom
        });
        return {
          // Territory production breakdown
          territoryProduction: result.resourceCollection.territoryResources,
          worksiteDetails: result.details.productionByHex.map((hex) => ({
            hexName: hex.hexName,
            terrain: hex.terrain,
            production: hex.production
          })),
          // Settlement wealth (economic output) and auto-tax
          wealthGenerated: result.resourceCollection.settlementGold,
          autoTaxCollected: Math.floor(result.resourceCollection.settlementGold * 0.35),
          goldIncome: Math.floor(result.resourceCollection.settlementGold * 0.35),
          fedCount: result.fedSettlementsCount,
          unfedCount: result.unfedSettlementsCount,
          totalSettlements: settlements.length,
          // Seasonal display info (resolved by service)
          seasonalLabel: result.seasonalLabel,
          seasonalMultiplier: result.seasonalFoodMultiplier,
          seasonalDescription: result.seasonalDescription,
          // Combined total for verification
          totalCollected: result.totalCollected,
          // Collection status
          isCollected: await isStepCompletedByIndex(ResourcesPhaseSteps.COLLECT_RESOURCES)
        };
      } catch (error) {
        logger.error("❌ [ResourcePhaseController] Error in preview calculation:", error);
        return {
          territoryProduction: /* @__PURE__ */ new Map(),
          worksiteDetails: [],
          goldIncome: 0,
          fedCount: 0,
          unfedCount: 0,
          totalSettlements: settlements.length,
          totalCollected: /* @__PURE__ */ new Map(),
          isCollected: await isStepCompletedByIndex(ResourcesPhaseSteps.COLLECT_RESOURCES)
        };
      }
    }
  };
}
export {
  createResourcePhaseController
};
