import { B as BaseGameCommandHandler, bK as giveActorGold, bL as recruitArmy, l as logger, g as getPartyActor, q as updateKingdom, bM as outfitArmy, bN as RecruitArmyDialog, bO as OutfitArmyResolution, bP as updateActionsPhase, bQ as isHexExplored, bR as calculateRandomNearbyHex, w as escapeHtml, x as get_store_value, bS as textBadge, bT as structuresService, z as settlementService, y as kingdomData, bU as AdjustFactionHandler, bV as DestroyWorksiteHandler, bW as DamageStructureHandler, bX as DestroyStructureHandler, bY as RemoveBorderHexesHandler, bZ as ReduceImprisonedHandler, b_ as ReduceSettlementLevelHandler, b$ as IncreaseSettlementLevelHandler, c0 as SeizeHexesHandler, c1 as TransferSettlementHandler, c2 as DefectArmiesHandler, c3 as ConvertUnrestToImprisonedHandler, c4 as RandomArmyEquipmentHandler, c5 as AddImprisonedHandler, c6 as ApplyArmyConditionHandler } from "./GameCommandUtils-D_sgs3NK.js";
import { SpendPlayerActionHandler } from "./SpendPlayerActionHandler-CqB-koq6.js";
import { ReleaseImprisonedHandler } from "./ReleaseImprisonedHandler-CKAkHEJO.js";
import { SpawnEnemyArmyHandler } from "./SpawnEnemyArmyHandler-BfAPnhjB.js";
class GiveActorGoldHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "giveActorGold";
  }
  async prepare(command, ctx) {
    const settlementId = command.settlementId || ctx.pendingState?.settlementId;
    if (!settlementId) {
      console.error("[GiveActorGoldHandler] No settlement selected for gold distribution");
      throw new Error("Gold distribution requires settlement selection - ensure settlement context is provided");
    }
    const multiplier = parseFloat(command.multiplier) || 1;
    const result = await giveActorGold(multiplier, settlementId);
    return this.normalizeResult(result, "Gold distributed to actor");
  }
}
class RecruitArmyHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "recruitArmy";
  }
  async prepare(command, ctx) {
    let level = 1;
    if (command.level === "kingdom-level") {
      level = ctx.kingdom.partyLevel || 1;
    } else if (typeof command.level === "number") {
      level = command.level;
    }
    const exemptFromUpkeep = command.exemptFromUpkeep === true;
    const recruitmentData = command.recruitmentData || ctx.pendingState?.recruitmentData;
    if (!recruitmentData) {
      console.error("[RecruitArmyHandler] No recruitment data in command or context");
      throw new Error("Army recruitment requires recruitment data - ensure army details are provided");
    }
    const supportedBy = recruitmentData.supportedBy || ctx.pendingState?.factionName;
    if (exemptFromUpkeep && !supportedBy && !ctx.pendingState?.factionId) {
      console.error("[RecruitArmyHandler] Allied army recruitment requires faction context");
      throw new Error("Allied army recruitment requires faction context - ensure faction is selected before recruitment");
    }
    const result = await recruitArmy(level, {
      name: recruitmentData.name,
      armyType: recruitmentData.armyType,
      settlementId: recruitmentData.settlementId || null,
      supportedBy: exemptFromUpkeep ? supportedBy : void 0
    }, exemptFromUpkeep);
    return this.normalizeResult(result, "Army recruited");
  }
}
async function foundSettlement(name, location = { x: 0, y: 0 }, grantFreeStructure = false) {
  logger.info(`🏘️ [foundSettlement] PREPARING to found ${name}`);
  const actor = getPartyActor();
  if (!actor) {
    throw new Error("No kingdom actor available");
  }
  if (name.trim().length === 0) {
    throw new Error("Settlement name is required");
  }
  const { createSettlement, SettlementTier } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cu);
  const trimmedName = name.trim();
  const newSettlement = createSettlement(trimmedName, location, SettlementTier.VILLAGE);
  logger.info(`🏘️ [foundSettlement] PREPARED: Will found ${trimmedName} at ${location.x},${location.y}`);
  return {
    outcomeBadge: {
      icon: "fa-home",
      template: `Founded {{name}}${grantFreeStructure ? " +1 free structure" : ""}`,
      context: { name: `${trimmedName} (Village)` },
      variant: "positive"
    },
    commit: async () => {
      logger.info(`🏘️ [foundSettlement] COMMITTING: Creating ${trimmedName}`);
      await updateKingdom((kingdom) => {
        if (!kingdom.settlements) {
          kingdom.settlements = [];
        }
        kingdom.settlements.push(newSettlement);
      });
      logger.info(`✅ [foundSettlement] Successfully founded ${trimmedName}`);
    }
  };
}
class FoundSettlementHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "foundSettlement";
  }
  async prepare(command, ctx) {
    const grantFreeStructure = ctx.outcome === "criticalSuccess";
    const result = await foundSettlement(
      command.name || "New Settlement",
      command.location || { x: 0, y: 0 },
      grantFreeStructure
    );
    return this.normalizeResult(result, "Settlement founded");
  }
}
class OutfitArmyHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "outfitArmy";
  }
  async prepare(command, ctx) {
    const armyId = command.armyId;
    const equipmentType = command.equipmentType || "armor";
    const fallbackToGold = command.fallbackToGold === true;
    const outcome = ctx.outcome === "criticalSuccess" ? "criticalSuccess" : ctx.outcome === "success" ? "success" : ctx.outcome === "failure" ? "failure" : "criticalFailure";
    const result = await outfitArmy(armyId, equipmentType, outcome, fallbackToGold);
    return this.normalizeResult(result, "Army outfitted");
  }
}
class RequestMilitaryAidHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "requestMilitaryAidRecruitment" || command.type === "requestMilitaryAidEquipment";
  }
  async prepare(command, ctx) {
    if (command.type === "requestMilitaryAidRecruitment") {
      return this.handleRecruitment(command, ctx);
    } else {
      return this.handleEquipment(command, ctx);
    }
  }
  /**
   * Handle allied army recruitment (critical success)
   */
  async handleRecruitment(command, ctx) {
    let level = 1;
    if (command.level === "kingdom-level") {
      level = ctx.kingdom.partyLevel || 1;
    } else if (typeof command.level === "number") {
      level = command.level;
    }
    const exemptFromUpkeep = command.exemptFromUpkeep === true;
    const recruitmentData = await new Promise((resolve) => {
      let dialogComponent;
      const mount = document.createElement("div");
      document.body.appendChild(mount);
      dialogComponent = new RecruitArmyDialog({
        target: mount,
        props: {
          show: true,
          exemptFromUpkeep
          // Hide settlement selector
        }
      });
      dialogComponent.$on("confirm", (event) => {
        dialogComponent.$destroy();
        mount.remove();
        resolve(event.detail);
      });
      dialogComponent.$on("cancel", () => {
        dialogComponent.$destroy();
        mount.remove();
        resolve(null);
      });
    });
    if (!recruitmentData) {
      return null;
    }
    return await recruitArmy(level, recruitmentData, exemptFromUpkeep);
  }
  /**
   * Handle equipment selection (success)
   */
  async handleEquipment(command, ctx) {
    const availableArmies = (ctx.kingdom.armies || []).filter((a) => {
      if (!a.actorId) return false;
      const validTypes = ["armor", "runes", "weapons", "equipment"];
      return validTypes.some((type) => !a.equipment?.[type]);
    });
    if (availableArmies.length === 0) {
      console.log("[RequestMilitaryAidHandler] No armies available to outfit - PREPARING to grant 1 gold");
      return {
        outcomeBadges: [{
          icon: "fa-coins",
          template: "Received 1 Gold (no armies to outfit)",
          variant: "info"
        }],
        commit: async () => {
          console.log("[RequestMilitaryAidHandler] COMMITTING: Adding 1 gold");
          await updateKingdom((k) => {
            k.resources.gold = (k.resources.gold || 0) + 1;
          });
          console.log("[RequestMilitaryAidHandler] Gold fallback applied successfully");
        }
      };
    }
    const selection = await new Promise((resolve) => {
      let dialogComponent;
      const mount = document.createElement("div");
      document.body.appendChild(mount);
      dialogComponent = new OutfitArmyResolution({
        target: mount,
        props: {
          outcome: "success",
          // Always success for Request Military Aid
          applied: false
        }
      });
      dialogComponent.$on("selection", (event) => {
        dialogComponent.$destroy();
        mount.remove();
        resolve(event.detail);
      });
      dialogComponent.$on("cancel", () => {
        dialogComponent.$destroy();
        mount.remove();
        resolve(null);
      });
    });
    if (!selection) {
      return null;
    }
    const result = await outfitArmy(
      selection.armyId,
      selection.equipmentType,
      "success",
      // Always success for Request Military Aid
      false
      // No fallback to gold
    );
    return result;
  }
}
async function deployArmyExecution(deployment) {
  logger.info(`🚀 [deployArmyExecution] Deploying army ${deployment.armyId}`);
  const actor = getPartyActor();
  if (!actor) {
    throw new Error("No kingdom actor available");
  }
  const kingdom = actor.getKingdomData();
  if (!kingdom) {
    throw new Error("No kingdom data available");
  }
  const army = kingdom.armies?.find((a) => a.id === deployment.armyId);
  if (!army) {
    throw new Error(`Army ${deployment.armyId} not found`);
  }
  if (!army.actorId) {
    throw new Error(`${army.name} has no linked NPC actor`);
  }
  try {
    const { getArmyToken, animateTokenAlongPath } = await import("./tokenAnimation-DJqbQrzw.js");
    const tokenDoc = await getArmyToken(deployment.armyId);
    if (tokenDoc) {
      logger.info(`🎬 [deployArmyExecution] Animating ${army.name} along ${deployment.path.length} hexes`);
      await animateTokenAlongPath(tokenDoc, deployment.path, deployment.animationSpeed || 100);
    } else {
      logger.warn(`⚠️ [deployArmyExecution] No token found for ${army.name} - skipping animation`);
    }
  } catch (error) {
    logger.error("❌ [deployArmyExecution] Animation failed:", error);
  }
  if (deployment.conditionsToApply && deployment.conditionsToApply.length > 0) {
    try {
      const game = globalThis.game;
      const armyActor = game.actors.get(army.actorId);
      if (armyActor) {
        const { applyConditionToActor } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cL);
        for (const conditionString of deployment.conditionsToApply) {
          await applyConditionToActor(armyActor, conditionString);
        }
        logger.info(`✅ [deployArmyExecution] Applied ${deployment.conditionsToApply.length} conditions to ${army.name}`);
      } else {
        logger.warn(`⚠️ [deployArmyExecution] Could not find actor for ${army.name}`);
      }
    } catch (error) {
      logger.error("❌ [deployArmyExecution] Failed to apply conditions:", error);
    }
  }
  await updateActionsPhase((phase) => {
    if (!phase.deployedArmyIds) {
      phase.deployedArmyIds = [];
    }
    if (!phase.deployedArmyIds.includes(deployment.armyId)) {
      phase.deployedArmyIds = [...phase.deployedArmyIds, deployment.armyId];
    }
  });
  if (deployment.finalNavCell) {
    await updateKingdom((k) => {
      if (k.armies) {
        const armyIndex = k.armies.findIndex((a) => a.id === deployment.armyId);
        if (armyIndex !== -1) {
          k.armies[armyIndex].navCellX = deployment.finalNavCell.x;
          k.armies[armyIndex].navCellY = deployment.finalNavCell.y;
          logger.info(`📍 [deployArmyExecution] Saved navCell (${deployment.finalNavCell.x}, ${deployment.finalNavCell.y}) for ${k.armies[armyIndex].name}`);
        }
      }
    });
  }
  logger.info(`✅ [deployArmyExecution] Marked ${army.name} as deployed this turn`);
  logger.info(`✅ [deployArmyExecution] Successfully deployed ${army.name} to ${deployment.path[deployment.path.length - 1]}`);
}
class DeployArmyHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "deployArmy";
  }
  async prepare(command, ctx) {
    const armyId = command.armyId;
    const path = command.path || [];
    const outcome = command.outcome || ctx.outcome;
    const conditionsToApply = command.conditionsToApply || [];
    logger.info(`[DeployArmyHandler] Preparing to deploy army ${armyId}`);
    if (!armyId) {
      logger.error("[DeployArmyHandler] No army ID provided");
      return null;
    }
    if (!path || path.length < 2) {
      logger.error("[DeployArmyHandler] Invalid path - must have at least 2 hexes");
      return null;
    }
    const unexploredHex = path.find((hexId) => !isHexExplored(hexId));
    if (unexploredHex) {
      logger.error(`[DeployArmyHandler] Path contains unexplored hex: ${unexploredHex}`);
      return null;
    }
    const actor = getPartyActor();
    if (!actor) {
      logger.error("[DeployArmyHandler] No kingdom actor available");
      return null;
    }
    const kingdom = actor.getKingdomData();
    if (!kingdom) {
      logger.error("[DeployArmyHandler] No kingdom data available");
      return null;
    }
    const army = kingdom.armies?.find((a) => a.id === armyId);
    if (!army) {
      logger.error(`[DeployArmyHandler] Army ${armyId} not found`);
      return null;
    }
    if (!army.actorId) {
      logger.error(`[DeployArmyHandler] ${army.name} has no linked NPC actor`);
      return null;
    }
    let finalPath = path;
    let redirectMessage = "";
    if (outcome === "criticalFailure") {
      const destinationHex = path[path.length - 1];
      const randomHex = calculateRandomNearbyHex(destinationHex, 2);
      if (!isHexExplored(randomHex)) {
        finalPath = path;
      } else {
        finalPath = [...path.slice(0, -1), randomHex];
      }
      redirectMessage = ` (got lost, arrived at ${finalPath[finalPath.length - 1]} instead of ${destinationHex})`;
      logger.info(`[DeployArmyHandler] Critical failure - redirecting to hex ${finalPath[finalPath.length - 1]} near destination ${destinationHex}`);
    }
    const finalHex = finalPath[finalPath.length - 1];
    const movementCost = finalPath.length - 1;
    let badgeText = `${army.name} will deploy to ${finalHex} (${movementCost} movement)${redirectMessage}`;
    if (conditionsToApply.length > 0) {
      const conditionsList = conditionsToApply.join(", ");
      badgeText += ` with conditions: ${conditionsList}`;
    }
    logger.info(`[DeployArmyHandler] Preview: ${badgeText}`);
    return {
      outcomeBadges: [{
        icon: "fa-flag",
        template: badgeText,
        variant: outcome === "criticalFailure" ? "negative" : "positive"
      }],
      commit: async () => {
        logger.info(`[DeployArmyHandler] Deploying ${army.name}`);
        await deployArmyExecution({
          armyId,
          path: finalPath,
          conditionsToApply,
          animationSpeed: 100,
          finalNavCell: command.finalNavCell
          // Pass nav cell for future pathfinding
        });
        const message = `<p><strong>Army Deployed:</strong> ${escapeHtml(army.name)} deployed to ${escapeHtml(finalHex)} (${movementCost} movement)${escapeHtml(redirectMessage)}</p>`;
        ChatMessage.create({
          content: message,
          speaker: { alias: "Kingdom Management" }
        });
        logger.info(`[DeployArmyHandler] Successfully deployed ${army.name}`);
      }
    };
  }
}
const PLAYER_KINGDOM = "player";
class GrantStructureHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "grantStructure" || command.type === "buildKnowledgeStructure";
  }
  async prepare(command, ctx) {
    const kingdom = get_store_value(kingdomData);
    const settlements = kingdom.settlements?.filter((s) => s.ledBy === PLAYER_KINGDOM) || [];
    if (settlements.length === 0) {
      logger.info("[GrantStructureHandler] No settlements available");
      return {
        outcomeBadges: [textBadge("No settlements available", "fas fa-times", "neutral")],
        commit: async () => {
          logger.info("[GrantStructureHandler] No settlements to build in");
        }
      };
    }
    const count = command.count || 1;
    const selections = [];
    const usedSettlements = /* @__PURE__ */ new Set();
    const category = command.type === "buildKnowledgeStructure" ? "knowledge-magic" : command.category;
    for (let i = 0; i < count; i++) {
      const selection = await this.selectStructureAndSettlement(
        command,
        settlements,
        usedSettlements,
        structuresService,
        category
      );
      if (selection) {
        selections.push(selection);
        if (!command.allowMultiplePerSettlement) {
          usedSettlements.add(selection.settlementId);
        }
      }
    }
    if (selections.length === 0) {
      return {
        outcomeBadges: [textBadge("No suitable structures available", "fas fa-times", "neutral")],
        commit: async () => {
          logger.info("[GrantStructureHandler] No structures could be granted");
        }
      };
    }
    const outcomeBadges = selections.map(
      ({ structureName, settlementName }) => textBadge(`${settlementName} gains ${structureName}`, "fas fa-building", "positive")
    );
    return {
      outcomeBadges,
      commit: async () => {
        for (const { structureId, structureName, settlementId, settlementName } of selections) {
          await settlementService.addStructure(settlementId, structureId);
          logger.info(`[GrantStructureHandler] Added ${structureName} to ${settlementName}`);
        }
        const ui = globalThis.ui;
        if (selections.length === 1) {
          ui?.notifications?.info(`${selections[0].settlementName} gains ${selections[0].structureName}`);
        } else {
          ui?.notifications?.info(`Granted ${selections.length} structures to settlements`);
        }
      }
    };
  }
  async selectStructureAndSettlement(command, settlements, usedSettlements, structuresService2, category) {
    let targetSettlement;
    if (command.settlementId && command.settlementId !== "random") {
      targetSettlement = settlements.find((s) => s.id === command.settlementId);
      if (!targetSettlement) {
        logger.warn(`[GrantStructureHandler] Settlement not found: ${command.settlementId}`);
        return null;
      }
    } else {
      const availableSettlements = settlements.filter((s) => !usedSettlements.has(s.id));
      if (availableSettlements.length === 0) {
        return null;
      }
      targetSettlement = availableSettlements[Math.floor(Math.random() * availableSettlements.length)];
    }
    let structure;
    if (command.structureId) {
      structure = structuresService2.getStructure(command.structureId);
      if (!structure) {
        logger.warn(`[GrantStructureHandler] Structure not found: ${command.structureId}`);
        return null;
      }
      if (targetSettlement.structureIds?.includes(structure.id)) {
        logger.info(`[GrantStructureHandler] ${structure.name} already built in ${targetSettlement.name}`);
        return null;
      }
    } else if (category) {
      structure = this.selectFromCategory(
        category,
        targetSettlement,
        structuresService2,
        command.useProgression !== false
      );
    } else {
      structure = this.selectRandomStructure(targetSettlement, structuresService2);
    }
    if (!structure) {
      return null;
    }
    return {
      structureId: structure.id,
      structureName: structure.name,
      settlementId: targetSettlement.id,
      settlementName: targetSettlement.name
    };
  }
  selectFromCategory(category, settlement, structuresService2, useProgression) {
    const categoryStructures = structuresService2.getAllStructures().filter((s) => s.category === category).sort((a, b) => a.tier - b.tier);
    if (categoryStructures.length === 0) {
      logger.warn(`[GrantStructureHandler] No structures found in category: ${category}`);
      return null;
    }
    if (useProgression) {
      for (const structure of categoryStructures) {
        if (structure.minLevel && settlement.level < structure.minLevel) {
          continue;
        }
        if (settlement.structureIds?.includes(structure.id)) {
          continue;
        }
        return structure;
      }
      logger.info(`[GrantStructureHandler] All ${category} structures built or settlement level too low`);
      return null;
    } else {
      const available = categoryStructures.filter((s) => {
        if (s.minLevel && settlement.level < s.minLevel) return false;
        if (settlement.structureIds?.includes(s.id)) return false;
        return true;
      });
      if (available.length === 0) {
        return null;
      }
      return available[Math.floor(Math.random() * available.length)];
    }
  }
  selectRandomStructure(settlement, structuresService2) {
    const allStructures = structuresService2.getBaseStructures().filter((s) => {
      if (s.minLevel && settlement.level < s.minLevel) return false;
      if (settlement.structureIds?.includes(s.id)) return false;
      return true;
    });
    if (allStructures.length === 0) {
      const higherTier = structuresService2.getAllStructures().filter((s) => {
        if (s.tier <= 1) return false;
        if (s.minLevel && settlement.level < s.minLevel) return false;
        if (settlement.structureIds?.includes(s.id)) return false;
        return true;
      });
      if (higherTier.length === 0) {
        logger.info(`[GrantStructureHandler] No available structures for ${settlement.name}`);
        return null;
      }
      return higherTier[Math.floor(Math.random() * higherTier.length)];
    }
    return allStructures[Math.floor(Math.random() * allStructures.length)];
  }
}
class GameCommandHandlerRegistry {
  handlers = [
    new GiveActorGoldHandler(),
    new RecruitArmyHandler(),
    new FoundSettlementHandler(),
    new AdjustFactionHandler(),
    new OutfitArmyHandler(),
    new RequestMilitaryAidHandler(),
    new DestroyWorksiteHandler(),
    new SpendPlayerActionHandler(),
    new DamageStructureHandler(),
    new DestroyStructureHandler(),
    new ReleaseImprisonedHandler(),
    new RemoveBorderHexesHandler(),
    new ReduceImprisonedHandler(),
    new DeployArmyHandler(),
    new ReduceSettlementLevelHandler(),
    new IncreaseSettlementLevelHandler(),
    new SeizeHexesHandler(),
    new SpawnEnemyArmyHandler(),
    new TransferSettlementHandler(),
    new DefectArmiesHandler(),
    new ConvertUnrestToImprisonedHandler(),
    new RandomArmyEquipmentHandler(),
    new GrantStructureHandler(),
    new AddImprisonedHandler(),
    new ApplyArmyConditionHandler()
  ];
  /**
   * Process a game command through registered handlers
   * 
   * @param command - Game command from action outcome
   * @param ctx - Context with kingdom data, outcome, metadata
   * @returns PreparedCommand with preview and commit, or null to skip
   */
  async process(command, ctx) {
    const handler = this.handlers.find((h) => h.canHandle(command));
    if (!handler) {
      console.warn(`[GameCommandHandlerRegistry] No handler found for command type: ${command.type}`);
      return null;
    }
    try {
      logger.debug(`[GameCommandHandlerRegistry] Processing command: ${command.type}`);
      const result = await handler.prepare(command, ctx);
      if (result) {
        logger.debug(`[GameCommandHandlerRegistry] Command prepared successfully: ${command.type}`);
      } else {
        logger.debug(`[GameCommandHandlerRegistry] Command returned null (user cancelled or no-op): ${command.type}`);
      }
      return result;
    } catch (error) {
      console.error(`[GameCommandHandlerRegistry] Handler failed for ${command.type}:`, error);
      throw error;
    }
  }
  /**
   * Execute a game command immediately (process + commit)
   * 
   * Use this method when commands should execute automatically without
   * user preview/confirmation. Typically used by:
   * - UnifiedCheckHandler for `pipeline.outcomes.gameCommands`
   * - Any automatic outcome effect
   * 
   * For interactive commands that need user preview/selection,
   * use process() instead and call commit() after user confirms.
   * 
   * @param command - Game command from action outcome
   * @param ctx - Context with kingdom data, outcome, metadata
   * @returns Result with success status
   */
  async executeCommand(command, ctx) {
    try {
      const prepared = await this.process(command, ctx);
      if (!prepared) {
        return { success: true, skipped: true };
      }
      await prepared.commit();
      logger.debug(`[GameCommandHandlerRegistry] Command executed successfully: ${command.type}`);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[GameCommandHandlerRegistry] Command execution failed: ${command.type}`, error);
      return { success: false, error: errorMessage };
    }
  }
  getHandlerCount() {
    return this.handlers.length;
  }
}
let registryInstance = null;
function getGameCommandRegistry() {
  if (!registryInstance) {
    registryInstance = new GameCommandHandlerRegistry();
    logger.debug(`[GameCommandHandlerRegistry] Registry initialized with ${registryInstance.getHandlerCount()} handlers`);
  }
  return registryInstance;
}
export {
  GameCommandHandlerRegistry,
  getGameCommandRegistry
};
