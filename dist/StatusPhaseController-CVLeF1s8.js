import { g as getPartyActor, l as logger, W as updateTurnState, a8 as completePhaseStepByIndex, ah as StatusPhaseSteps, x as get_store_value, ai as cohesionService, aj as isActorOwnerOnline, ae as currentTurn, Z as turnStateData, ak as ResourceService, al as SettlementTier } from "./GameCommandUtils-D_sgs3NK.js";
async function createStatusPhaseController() {
  return {
    // NOTE: startPhase() removed - step initialization now happens in advancePhase()
    // via PhaseStepService.computePhaseSteps(). Phase setup (clearing old data, applying
    // modifiers, checking blocking conditions) is handled by PhaseSetupService.runPhaseSetup()
    // called from TurnManager.
    /**
     * Clear applied outcomes from previous turn
     * Only clears when starting a NEW turn, not during phase navigation
     * This is now handled by TurnManager.endTurn() which resets turnState
     */
    async clearAppliedOutcomes() {
    },
    /**
     * Clear previous turn's incident data
     * Now handled by turnState reset in ensureTurnState()
     */
    async clearPreviousIncident() {
    },
    /**
     * Clean up stale and duplicate modifiers from displayModifiers
     *
     * This cleanup removes:
     * 1. Legacy stored base modifiers (now computed reactively in UI)
     * 2. Fame conversion modifiers (now handled in Upkeep Phase)
     * 3. Duplicate modifiers with the same ID (legacy data accumulation)
     */
    async cleanupStaleDisplayModifiers() {
      const turnState = get_store_value(turnStateData);
      if (!turnState?.phaseOutcomes?.statusPhase?.displayModifiers) return;
      await updateTurnState((state) => {
        const displayModifiers = state.phaseOutcomes.statusPhase.displayModifiers || [];
        let filtered = displayModifiers.filter(
          (m) => m.id && !m.id.startsWith("status-size") && !m.id.startsWith("status-metropolis") && !m.id.startsWith("fame-conversion")
        );
        const seen = /* @__PURE__ */ new Set();
        filtered = filtered.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        state.phaseOutcomes.statusPhase.displayModifiers = filtered;
      });
    },
    /**
     * Clear completed build projects from previous turn
     */
    async clearCompletedProjects() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      await actor.updateKingdomData((k) => {
        if (!k.buildQueue || k.buildQueue.length === 0) return;
        const beforeCount = k.buildQueue.length;
        k.buildQueue = k.buildQueue.filter((p) => !p.isCompleted);
        beforeCount - k.buildQueue.length;
      });
    },
    /**
     * Apply base unrest from kingdom size, metropolises, and demanded hexes
     * 
     * Base unrest sources (per Reignmaker rules):
     * - Kingdom size: +1 unrest per X hexes (configurable, default 8)
     * - Metropolis complexity: +1 unrest per Metropolis
     * - Citizens Demand Expansion: +1 unrest per unclaimed demanded hex
     */
    async applyBaseUnrest() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data available");
        return;
      }
      let hexesPerUnrest = 8;
      try {
        hexesPerUnrest = game.settings.get("pf2e-reignmaker", "hexesPerUnrest") || 8;
      } catch (error) {
        logger.warn("⚠️ [StatusPhaseController] Setting not available yet, using default (8)");
      }
      Math.floor(kingdom.size / hexesPerUnrest);
      kingdom.settlements.filter(
        (s) => s.tier === SettlementTier.METROPOLIS
      ).length;
      const PLAYER_KINGDOM = "player";
      const demandedHexCount = (kingdom.hexes || []).filter((h) => {
        const features = h.features || [];
        const hasDemanded = features.some((f) => f.type === "demanded");
        const notPlayerClaimed = !h.claimedBy || h.claimedBy !== PLAYER_KINGDOM;
        return hasDemanded && notPlayerClaimed;
      }).length;
      const totalBaseUnrest = demandedHexCount;
      if (totalBaseUnrest > 0) {
        await actor.updateKingdomData((k) => {
          k.unrest = (k.unrest || 0) + totalBaseUnrest;
        });
      }
      await updateTurnState((state) => {
        if (!state.phaseOutcomes.statusPhase.displayModifiers) {
          state.phaseOutcomes.statusPhase.displayModifiers = [];
        }
      });
    },
    /**
     * Apply doctrine penalties for extreme (Major+) doctrines
     *
     * Penalties at Major+ tier:
     * - Ruthless: +1 unrest per turn (fear-based rule breeds discontent)
     * - Virtuous: +1 gold consumption per turn (charitable obligations)
     * - Practical: -1 to non-aligned skills (handled in KingdomModifierService)
     */
    async applyDoctrinePenalties() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const { doctrineService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cC);
      const effects = doctrineService.getDoctrineEffects();
      if (effects.penalties.length === 0) {
        return;
      }
      let unrestPenalty = 0;
      let goldPenalty = 0;
      for (const penalty of effects.penalties) {
        if (penalty.type === "unrest") {
          unrestPenalty += typeof penalty.value === "number" ? penalty.value : 0;
        } else if (penalty.type === "gold") {
          if (typeof penalty.value === "string") {
            const roll = new Roll(penalty.value);
            await roll.evaluate();
            goldPenalty += roll.total || 0;
          } else {
            goldPenalty += penalty.value;
          }
        }
      }
      if (unrestPenalty > 0 || goldPenalty > 0) {
        const doctrineState = doctrineService.getDoctrineState();
        const doctrineLabel = doctrineState.dominant ? doctrineState.tierInfo[doctrineState.dominant].label : "Doctrine";
        await actor.updateKingdomData((k) => {
          if (unrestPenalty > 0) {
            k.unrest = (k.unrest || 0) + unrestPenalty;
          }
          if (goldPenalty > 0 && k.resources) {
            k.resources.gold = Math.max(0, (k.resources.gold || 0) - goldPenalty);
          }
        });
        await updateTurnState((state) => {
          if (!state.phaseOutcomes.statusPhase.displayModifiers) {
            state.phaseOutcomes.statusPhase.displayModifiers = [];
          }
          if (unrestPenalty > 0) {
            state.phaseOutcomes.statusPhase.displayModifiers.push({
              id: "doctrine-penalty-unrest",
              name: `${doctrineLabel} Penalty`,
              description: "Fear-based rule breeds discontent",
              sourceType: "doctrine",
              modifiers: [{
                type: "static",
                resource: "unrest",
                value: unrestPenalty,
                duration: "immediate"
              }]
            });
          }
          if (goldPenalty > 0) {
            state.phaseOutcomes.statusPhase.displayModifiers.push({
              id: "doctrine-penalty-gold",
              name: `${doctrineLabel} Penalty`,
              description: "Charitable obligations cost resources",
              sourceType: "doctrine",
              modifiers: [{
                type: "static",
                resource: "gold",
                value: -goldPenalty,
                duration: "immediate"
              }]
            });
          }
        });
        logger.info(`[StatusPhaseController] Applied doctrine penalties: unrest +${unrestPenalty}, gold -${goldPenalty}`);
      }
    },
    /**
     * Sync doctrine abilities to all player armies
     *
     * This ensures armies have the correct buffs based on the current dominant doctrine:
     * - Adds abilities that should be present (based on dominant doctrine tier)
     * - Removes abilities that should no longer be present (e.g., from a different doctrine)
     *
     * Only dominant doctrine abilities are applied - armies cannot double-dip across doctrine trees.
     */
    async syncDoctrineAbilitiesToArmies() {
      try {
        const { doctrineAbilityService } = await import("./DoctrineAbilityService-Dcwbh05e.js");
        await doctrineAbilityService.syncAbilitiesToAllArmies();
        logger.info("[StatusPhaseController] Synced doctrine abilities to all armies");
      } catch (error) {
        logger.error("[StatusPhaseController] Failed to sync doctrine abilities to armies:", error);
      }
    },
    /**
     * Check for doctrine milestones and emit notifications
     */
    async checkDoctrineMilestones() {
      const { doctrineService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cC);
      const newMilestones = await doctrineService.checkAndRecordMilestones();
      for (const milestone of newMilestones) {
        const doctrineCapitalized = milestone.doctrine.charAt(0).toUpperCase() + milestone.doctrine.slice(1);
        const tierCapitalized = milestone.tier.charAt(0).toUpperCase() + milestone.tier.slice(1);
        const message = `Milestone achieved: ${tierCapitalized} ${doctrineCapitalized} Doctrine!`;
        try {
          ui?.notifications?.info(message);
        } catch {
          logger.info(`[StatusPhaseController] ${message}`);
        }
      }
    },
    /**
     * Clean up expired modifiers
     */
    async cleanupExpiredModifiers() {
      const { createModifierService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cT);
      const modifierService = await createModifierService();
      await modifierService.cleanupExpiredModifiers();
    },
    /**
     * Apply permanent modifiers from structures
     * 
     * Permanent modifiers come from built structures and are applied each turn.
     * This is different from immediate/ongoing/turn-based modifiers from events/incidents.
     * 
     * Note: These use a legacy format with duration: 'permanent' (not part of typed EventModifier system)
     */
    async applyPermanentModifiers() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data available");
        return;
      }
      const permanentModifiers = (kingdom.activeModifiers || []).filter(
        (mod) => mod.modifiers?.some((m) => m.duration === "permanent")
      );
      if (permanentModifiers.length === 0) {
        return;
      }
      const resourceChanges = {};
      for (const modifier of permanentModifiers) {
        for (const mod of modifier.modifiers || []) {
          const legacyMod = mod;
          if (legacyMod.duration === "permanent") {
            const resource = legacyMod.resource;
            const value = typeof legacyMod.value === "string" ? parseInt(legacyMod.value, 10) : legacyMod.value;
            if (isNaN(value)) {
              logger.warn(`⚠️ [StatusPhaseController] Invalid permanent modifier value: ${legacyMod.value} for ${resource} (source: ${modifier.sourceType})`);
              continue;
            }
            resourceChanges[resource] = (resourceChanges[resource] || 0) + value;
          }
        }
      }
      if (Object.keys(resourceChanges).length > 0) {
        await actor.updateKingdomData((kingdom2) => {
          ResourceService.getInstance().applyResourceChanges(kingdom2, resourceChanges);
        });
      }
    },
    /**
     * Apply ongoing modifiers from custom sources (e.g., demand-structure event)
     * 
     * Ongoing modifiers generate their effects each turn until removed.
     * This is different from permanent modifiers (structures) and immediate/turn-based modifiers.
     */
    async applyOngoingModifiers() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data available");
        return;
      }
      const ongoingModifiers = (kingdom.activeModifiers || []).filter(
        (mod) => mod.modifiers?.some((m) => m.duration === "ongoing")
      );
      if (ongoingModifiers.length === 0) {
        return;
      }
      const resourceChanges = {};
      for (const modifier of ongoingModifiers) {
        for (const mod of modifier.modifiers || []) {
          if (mod.duration === "ongoing") {
            const resource = mod.resource;
            const value = typeof mod.value === "string" ? parseInt(mod.value, 10) : mod.value;
            if (isNaN(value)) {
              continue;
            }
            resourceChanges[resource] = (resourceChanges[resource] || 0) + value;
          }
        }
      }
      if (Object.keys(resourceChanges).length > 0) {
        await actor.updateKingdomData((k) => {
          if (!k.resources) {
            k.resources = {};
          }
          for (const [resource, change] of Object.entries(resourceChanges)) {
            const currentValue = k.resources[resource] || 0;
            k.resources[resource] = Math.max(0, currentValue + change);
          }
        });
      }
    },
    /**
     * Apply automatic structure effects (Donjon convert unrest, etc.)
     */
    async applyAutomaticStructureEffects() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data available");
        return;
      }
      const { structuresService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cv);
      const effects = structuresService.processAutomaticEffects(kingdom.settlements);
      if (effects.convertedUnrest > 0 && kingdom.unrest > 0) {
        let availableCapacity = 0;
        for (const settlement of kingdom.settlements) {
          const capacity = structuresService.calculateImprisonedUnrestCapacity(settlement);
          const current = settlement.imprisonedUnrest || 0;
          availableCapacity += Math.max(0, capacity - current);
        }
        if (availableCapacity > 0) {
          const amountToConvert = Math.min(
            effects.convertedUnrest,
            // How much Donjon can convert
            kingdom.unrest,
            // How much unrest we have
            availableCapacity
            // How much capacity we have
          );
          const { applyGameModifiers } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cG);
          await actor.updateKingdomData((k) => {
            k.unrest = (k.unrest || 0) - amountToConvert;
          });
          await updateTurnState((state) => {
            if (!state.phaseOutcomes.statusPhase.displayModifiers) {
              state.phaseOutcomes.statusPhase.displayModifiers = [];
            }
            state.phaseOutcomes.statusPhase.displayModifiers.push({
              id: "donjon-conversion",
              name: "Donjon Automatic Conversion",
              description: `Your Donjon automatically converted ${amountToConvert} regular unrest to imprisoned unrest`,
              sourceType: "structure",
              modifiers: [
                {
                  type: "static",
                  resource: "unrest",
                  value: -amountToConvert,
                  duration: "immediate"
                },
                {
                  type: "static",
                  resource: "imprisonedUnrest",
                  value: amountToConvert,
                  duration: "immediate"
                }
              ]
            });
          });
          await applyGameModifiers(
            [{ resource: "imprisonedUnrest", value: amountToConvert }],
            { source: "Donjon Auto-Convert" }
          );
        } else {
          await updateTurnState((state) => {
            if (!state.phaseOutcomes.statusPhase.displayModifiers) {
              state.phaseOutcomes.statusPhase.displayModifiers = [];
            }
            state.phaseOutcomes.statusPhase.displayModifiers.push({
              id: "donjon-capacity-full",
              name: "Donjon Conversion Failed",
              description: "Your Donjon could not convert unrest - all prisons are at full capacity",
              sourceType: "structure",
              modifiers: []
            });
          });
        }
      }
    },
    /**
     * Initialize first settlement check (Turn 1 only)
     * Returns true if first settlement is required (blocks auto-complete)
     */
    async initializeFirstSettlementCheck() {
      const turnState = get_store_value(turnStateData);
      const turnNumber = turnState?.turnNumber;
      if (typeof turnNumber !== "number" || turnNumber < 1) {
        logger.error(`[StatusPhaseController] Invalid turn number: ${turnNumber}. Skipping first settlement check.`);
        return false;
      }
      if (turnNumber !== 1) {
        return false;
      }
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available for first settlement check");
        return false;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data for first settlement check");
        return false;
      }
      const existingSettlements = (kingdom.settlements || []).filter(
        (s) => s.location && (s.location.x > 0 || s.location.y > 0)
      );
      if (existingSettlements.length > 0) {
        logger.info("[StatusPhaseController] First settlement not required - settlements already exist");
        return false;
      }
      await updateTurnState((state) => {
        state.phaseOutcomes.statusPhase.firstSettlementRequired = true;
        state.phaseOutcomes.statusPhase.firstSettlementCompleted = false;
      });
      logger.info("[StatusPhaseController] First settlement required - Turn 1 with no settlements");
      return true;
    },
    /**
     * Complete the first settlement establishment
     * Called from StatusPhase.svelte after user establishes their first settlement
     *
     * @returns Whether the phase is now complete
     */
    async completeFirstSettlement() {
      await updateTurnState((state) => {
        state.phaseOutcomes.statusPhase.firstSettlementCompleted = true;
        state.phaseOutcomes.statusPhase.completed = true;
      });
      const result = await completePhaseStepByIndex(StatusPhaseSteps.STATUS);
      logger.info(`[StatusPhaseController] First settlement completed, phaseComplete=${result.phaseComplete}`);
      return { phaseComplete: result.phaseComplete };
    },
    /**
     * Initialize cohesion check if kingdom size exceeds threshold
     * Returns true if cohesion check is required (blocks auto-complete)
     *
     * The active leader index is calculated server-side using online statuses
     * and stored in TurnState, ensuring all clients see the same highlighted leader.
     */
    async initializeCohesionCheck() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available for cohesion check");
        return false;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data for cohesion check");
        return false;
      }
      const cohesionResult = cohesionService.checkCohesionRequirements(kingdom);
      if (!cohesionResult.required) {
        logger.info(`[StatusPhaseController] Cohesion check not required (${cohesionResult.hexCount} hexes, threshold is 20)`);
        await updateTurnState((state) => {
          state.phaseOutcomes.statusPhase.cohesionInitialized = true;
          state.phaseOutcomes.statusPhase.cohesionCheckRequired = false;
        });
        return false;
      }
      if (!kingdom.cohesionIntroduced) {
        const { mountSvelteDialog } = await import("./SvelteDialog-0KpXw8ZO.js");
        const { default: CohesionIntroDialog } = await import("./CohesionIntroDialog-C357PrwC.js");
        const celebrationImageIndex = kingdom.celebrationImageIndex || 1;
        const celebrationImagePath = `modules/pf2e-reignmaker/img/new-kingdom/new-kingdom${celebrationImageIndex}.webp`;
        await mountSvelteDialog(CohesionIntroDialog, {
          kingdomName: kingdom.name || "The Kingdom",
          celebrationImagePath
        });
        await actor.updateKingdomData((k) => {
          k.cohesionIntroduced = true;
        });
      }
      const game2 = globalThis.game;
      const partyActor = game2?.actors?.find((a) => a.type === "party");
      const members = partyActor?.members ? Array.from(partyActor.members) : [];
      const leaders = members.filter((a) => a.type === "character");
      if (leaders.length === 0) {
        logger.warn("[StatusPhaseController] No leaders found in party for cohesion check");
        return false;
      }
      const leaderOnlineStatuses = leaders.map((leader) => isActorOwnerOnline(leader));
      const turnNumber = get_store_value(currentTurn) || 1;
      const activeLeaderIndex = cohesionService.getActiveLeaderIndex(
        turnNumber,
        leaders.length,
        leaderOnlineStatuses
      );
      if (activeLeaderIndex === -1) {
        logger.warn("[StatusPhaseController] Cohesion check: no online leaders available");
        await updateTurnState((state) => {
          state.phaseOutcomes.statusPhase.cohesionInitialized = true;
          state.phaseOutcomes.statusPhase.cohesionCheckRequired = true;
          state.phaseOutcomes.statusPhase.cohesionPenalty = cohesionResult.penalty;
          state.phaseOutcomes.statusPhase.cohesionCheckCompleted = false;
          state.phaseOutcomes.statusPhase.cohesionActiveLeaderActorId = null;
        });
        return true;
      }
      const activeLeader = leaders[activeLeaderIndex];
      const activeLeaderActorId = activeLeader?.id;
      await updateTurnState((state) => {
        state.phaseOutcomes.statusPhase.cohesionInitialized = true;
        state.phaseOutcomes.statusPhase.cohesionCheckRequired = true;
        state.phaseOutcomes.statusPhase.cohesionPenalty = cohesionResult.penalty;
        state.phaseOutcomes.statusPhase.cohesionCheckCompleted = false;
        state.phaseOutcomes.statusPhase.cohesionActiveLeaderActorId = activeLeaderActorId;
      });
      logger.info(`[StatusPhaseController] Cohesion check initialized: ${cohesionResult.hexCount} hexes, penalty -${cohesionResult.penalty}, leaderActorId ${activeLeaderActorId}`);
      return true;
    },
    /**
     * Apply pending army support changes from the previous turn
     *
     * When capacity changed last turn (structure built/destroyed):
     * - ASSIGN: Set army.supportedBySettlementId, reset turnsUnsupported
     * - REMOVE: Set army.supportedBySettlementId = null
     *
     * Also snapshots current capacity to previousArmyCapacity for next turn's comparison.
     */
    async applyPendingArmySupportChanges() {
      const actor = getPartyActor();
      if (!actor) {
        logger.error("❌ [StatusPhaseController] No KingdomActor available");
        return;
      }
      const kingdom = actor.getKingdomData();
      if (!kingdom) {
        logger.error("❌ [StatusPhaseController] No kingdom data available");
        return;
      }
      const pendingChanges = kingdom.pendingArmySupportChanges || [];
      const pendingCapacityChange = kingdom.pendingCapacityChange;
      if (pendingChanges.length === 0 && !pendingCapacityChange) {
        await this.snapshotArmyCapacity();
        return;
      }
      if (pendingChanges.length > 0) {
        logger.info(`[StatusPhaseController] Applying ${pendingChanges.length} pending army support change(s)`);
      }
      if (pendingCapacityChange) {
        const change = pendingCapacityChange.newCapacity - pendingCapacityChange.previousCapacity;
        logger.info(`[StatusPhaseController] Military capacity changed: ${pendingCapacityChange.previousCapacity} → ${pendingCapacityChange.newCapacity} (${change > 0 ? "+" : ""}${change})`);
      }
      const { PLAYER_KINGDOM } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cr);
      const appliedChanges = [];
      await actor.updateKingdomData((k) => {
        const hexes = k.hexes || [];
        const playerSettlements = (k.settlements || []).filter((s) => {
          const hex = hexes.find((h) => h.row === s.location.x && h.col === s.location.y);
          return hex?.claimedBy === PLAYER_KINGDOM;
        });
        const currentCapacity = playerSettlements.reduce((total, settlement) => {
          return total + (settlement.armySupport || 0);
        }, 0);
        (k.armies || []).filter(
          (a) => a.ledBy === PLAYER_KINGDOM && !a.exemptFromUpkeep && !!a.supportedBySettlementId
        ).length;
        for (const change of pendingChanges) {
          const army = k.armies.find((a) => a.id === change.armyId);
          if (!army) {
            logger.warn(`[StatusPhaseController] Army ${change.armyName} not found (may have been disbanded)`);
            continue;
          }
          if (change.changeType === "assign") {
            const willBeSupportedCount = (k.armies || []).filter(
              (a) => a.ledBy === PLAYER_KINGDOM && !a.exemptFromUpkeep && !!a.supportedBySettlementId && a.id !== army.id
            ).length + 1;
            if (willBeSupportedCount > currentCapacity) {
              logger.warn(`[StatusPhaseController] Cannot assign ${army.name} - capacity full (${currentCapacity})`);
              continue;
            }
            army.supportedBySettlementId = change.settlementId;
            army.turnsUnsupported = 0;
            appliedChanges.push({
              armyId: army.id,
              armyName: army.name,
              armyLevel: army.level || 1,
              changeType: "assigned",
              settlementId: change.settlementId,
              settlementName: change.settlementName,
              structureName: change.structureName
            });
            logger.info(`[StatusPhaseController] Applied assignment: ${army.name} to ${change.settlementName}`);
          } else if (change.changeType === "remove") {
            army.supportedBySettlementId = null;
            appliedChanges.push({
              armyId: army.id,
              armyName: army.name,
              armyLevel: army.level || 1,
              changeType: "removed",
              settlementId: change.settlementId,
              settlementName: change.settlementName,
              structureName: change.structureName,
              reason: change.reason
            });
            logger.info(`[StatusPhaseController] Applied removal: ${army.name} lost support (${change.reason || "capacity reduced"})`);
          }
        }
        k.pendingArmySupportChanges = [];
        k.pendingCapacityChange = null;
        const newCapacity = playerSettlements.reduce((total, settlement) => {
          return total + (settlement.armySupport || 0);
        }, 0);
        k.previousArmyCapacity = newCapacity;
      });
      await updateTurnState((state) => {
        if (appliedChanges.length > 0) {
          state.phaseOutcomes.statusPhase.appliedArmySupportChanges = appliedChanges;
        }
        if (pendingCapacityChange) {
          const change = pendingCapacityChange.newCapacity - pendingCapacityChange.previousCapacity;
          state.phaseOutcomes.statusPhase.militaryCapacityChange = {
            previousCapacity: pendingCapacityChange.previousCapacity,
            newCapacity: pendingCapacityChange.newCapacity,
            change,
            structureChanges: pendingCapacityChange.structureChanges
          };
        }
      });
    },
    /**
     * Snapshot current army capacity for next turn's comparison
     * Called at the end of status phase setup
     */
    async snapshotArmyCapacity() {
      const actor = getPartyActor();
      if (!actor) return;
      const { PLAYER_KINGDOM } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cr);
      const kingdom = actor.getKingdomData();
      if (!kingdom) return;
      const hexes = kingdom.hexes || [];
      const playerSettlements = (kingdom.settlements || []).filter((s) => {
        const hex = hexes.find((h) => h.row === s.location.x && h.col === s.location.y);
        return hex?.claimedBy === PLAYER_KINGDOM;
      });
      const currentCapacity = playerSettlements.reduce((total, settlement) => {
        return total + (settlement.armySupport || 0);
      }, 0);
      await actor.updateKingdomData((k) => {
        k.previousArmyCapacity = currentCapacity;
      });
      logger.debug(`[StatusPhaseController] Snapshotted army capacity: ${currentCapacity}`);
    }
  };
}
export {
  createStatusPhaseController
};
