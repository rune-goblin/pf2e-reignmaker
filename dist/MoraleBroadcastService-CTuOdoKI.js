import { W as updateTurnState, l as logger, p as getKingdomData, x as get_store_value, $ as MORALE_OUTCOMES, a0 as FRIGHTENED_DISBAND_THRESHOLD, Z as turnStateData } from "./GameCommandUtils-D_sgs3NK.js";
import { TokenHelpers } from "./TokenHelpers-BNpcGeKf.js";
class MoraleBroadcastService {
  /**
   * Get current user's display name
   */
  getCurrentUserDisplayName() {
    const game = globalThis.game;
    if (!game?.user) return "Unknown";
    const character = game.user.character;
    if (character?.name) return character.name;
    return game.user.name || "Unknown";
  }
  // ===== INITIATOR METHODS =====
  /**
   * Start broadcasting morale check to all players
   */
  async startBroadcast(armyIds, title = "Unsupported Armies") {
    const game = globalThis.game;
    const armyStatuses = await this.buildArmyStatuses(armyIds);
    const characterChecks = await this.buildCharacterChecks();
    await updateTurnState((ts) => {
      ts.activeBroadcast = {
        type: "morale",
        initiatorId: game.user.id,
        initiatorName: this.getCurrentUserDisplayName(),
        title,
        unsupportedArmyIds: armyIds,
        armyStatuses,
        characterChecks,
        autoFailedArmyIds: [],
        panelState: "selection",
        currentCheckingCharacterId: null,
        currentCheckingArmyId: null
      };
    });
    logger.info("[MoraleBroadcastService] Started broadcast:", {
      armies: armyIds.length,
      characters: Object.keys(characterChecks).length
    });
  }
  /**
   * Build army status list from army IDs
   */
  async buildArmyStatuses(armyIds) {
    const kingdom = getKingdomData();
    if (!kingdom?.armies) return [];
    const statuses = [];
    for (const armyId of armyIds) {
      const army = kingdom.armies.find((a) => a.id === armyId);
      if (!army) continue;
      let hexId = null;
      let tokenImage = null;
      if (army.actorId) {
        const token = TokenHelpers.findTokenByActor(army.actorId);
        if (token) {
          hexId = TokenHelpers.getTokenHexId(token);
          const game = globalThis.game;
          const armyActor = game?.actors?.get(army.actorId);
          tokenImage = armyActor?.img || token?.texture?.src || null;
        }
      }
      statuses.push({
        army,
        hexId,
        tokenImage,
        status: "pending"
      });
    }
    return statuses;
  }
  /**
   * Build character check states for all player characters
   */
  async buildCharacterChecks() {
    const { PF2eCharacterService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cB);
    const characterService = PF2eCharacterService.getInstance();
    const playerChars = characterService.getPlayerCharacters();
    const checks = {};
    for (const pc of playerChars) {
      const actor = pc.character;
      if (!actor?.skills) continue;
      const { skill, bonus } = this.getBestMoraleSkill(actor);
      checks[actor.id] = {
        characterId: actor.id,
        userId: pc.userId,
        characterName: actor.name,
        bonus,
        skill,
        armyId: null,
        result: void 0
      };
      logger.debug(`[MoraleBroadcastService] Added character: ${actor.name} (${skill} +${bonus})`);
    }
    return checks;
  }
  /**
   * Get the best morale skill for a character
   */
  getBestMoraleSkill(actor) {
    const skills = ["diplomacy", "intimidation"];
    let bestSkill = "diplomacy";
    let bestBonus = -Infinity;
    for (const skill of skills) {
      const skillData = actor.skills[skill];
      if (!skillData) continue;
      const bonus = skillData.totalModifier ?? skillData.mod ?? skillData.check?.mod ?? 0;
      if (bonus > bestBonus) {
        bestBonus = bonus;
        bestSkill = skill;
      }
    }
    return { skill: bestSkill, bonus: bestBonus === -Infinity ? 0 : bestBonus };
  }
  /**
   * Update state when a character starts checking an army
   */
  async startCharacterCheck(characterId, armyId) {
    await updateTurnState((ts) => {
      const ab = ts.activeBroadcast;
      if (ab?.type !== "morale") return;
      const armyStatus = ab.armyStatuses.find((a) => a.army.id === armyId);
      if (armyStatus) {
        armyStatus.status = "checking";
      }
      ab.currentCheckingCharacterId = characterId;
      ab.currentCheckingArmyId = armyId;
      ab.panelState = "waiting-for-roll";
    });
  }
  /**
   * Update state when a character completes their morale check
   */
  async completeCharacterCheck(characterId, armyId, result) {
    await updateTurnState((ts) => {
      const ab = ts.activeBroadcast;
      if (ab?.type !== "morale") return;
      const charCheck = ab.characterChecks[characterId];
      if (charCheck) {
        charCheck.armyId = armyId;
        charCheck.result = result;
      }
      const armyStatus = ab.armyStatuses.find((a) => a.army.id === armyId);
      if (armyStatus) {
        armyStatus.status = "completed";
        armyStatus.result = result;
      }
      ab.currentCheckingCharacterId = null;
      ab.currentCheckingArmyId = null;
      ab.panelState = "selection";
    });
    await this.checkAndAutoFail();
  }
  /**
   * Reset a check if cancelled
   */
  async cancelCheck(characterId, armyId) {
    await updateTurnState((ts) => {
      const ab = ts.activeBroadcast;
      if (ab?.type !== "morale") return;
      const armyStatus = ab.armyStatuses.find((a) => a.army.id === armyId);
      if (armyStatus) {
        armyStatus.status = "pending";
      }
      ab.currentCheckingCharacterId = null;
      ab.currentCheckingArmyId = null;
      ab.panelState = "selection";
    });
  }
  /**
   * Check if all available characters have been used and auto-fail remaining armies
   */
  async checkAndAutoFail() {
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    if (ab?.type !== "morale") return;
    const availableCharacters = Object.values(ab.characterChecks).filter((c) => c.armyId === null);
    const pendingArmies = ab.armyStatuses.filter(
      (a) => a.status === "pending" && !ab.autoFailedArmyIds.includes(a.army.id)
    );
    if (availableCharacters.length === 0 && pendingArmies.length > 0) {
      logger.info(`[MoraleBroadcastService] Auto-failing ${pendingArmies.length} remaining armies`);
      const autoFailIds = pendingArmies.map((a) => a.army.id);
      const { getArmyConditionValue } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cN);
      const frightenedValues = {};
      for (const armyStatus of pendingArmies) {
        if (armyStatus.army.actorId) {
          frightenedValues[armyStatus.army.id] = await getArmyConditionValue(armyStatus.army.actorId, "frightened");
        }
      }
      await updateTurnState((ts) => {
        const morale = ts.activeBroadcast;
        if (morale?.type !== "morale") return;
        for (const armyStatus of morale.armyStatuses) {
          if (autoFailIds.includes(armyStatus.army.id)) {
            const currentFrightened = frightenedValues[armyStatus.army.id] ?? 0;
            const frightenedChange = MORALE_OUTCOMES.failure.frightenedChange;
            const newFrightened = Math.max(0, currentFrightened + frightenedChange);
            const shouldDisband = newFrightened >= FRIGHTENED_DISBAND_THRESHOLD;
            armyStatus.status = "completed";
            armyStatus.result = {
              armyId: armyStatus.army.id,
              armyName: armyStatus.army.name,
              outcome: "failure",
              disbanded: shouldDisband,
              unrestGained: MORALE_OUTCOMES.failure.unrest,
              frightenedChange,
              currentFrightened: newFrightened,
              actorName: "Auto-fail",
              skillName: "none"
            };
          }
        }
        morale.autoFailedArmyIds = [...morale.autoFailedArmyIds, ...autoFailIds];
        morale.panelState = "completed";
      });
    }
    const updatedState = get_store_value(turnStateData);
    const updatedAb = updatedState.activeBroadcast;
    if (updatedAb?.type === "morale") {
      const allResolved = updatedAb.armyStatuses.every((a) => a.status === "completed");
      if (allResolved && updatedAb.panelState !== "completed") {
        await updateTurnState((ts) => {
          if (ts.activeBroadcast?.type === "morale") {
            ts.activeBroadcast.panelState = "completed";
          }
        });
      }
    }
  }
  /**
   * End the broadcast
   */
  async endBroadcast() {
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    if (ab?.type !== "morale") return;
    await updateTurnState((ts) => {
      ts.activeBroadcast = null;
    });
    logger.info("[MoraleBroadcastService] Ended broadcast");
  }
  /**
   * Get the current morale broadcast state (if active)
   */
  getCurrentState() {
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    return ab?.type === "morale" ? ab : null;
  }
  /**
   * Handle morale check click from observer panel.
   * Non-initiator players can trigger rolls for their own character.
   */
  async handleObserverCheckMorale(armyId) {
    const game = globalThis.game;
    const state = this.getCurrentState();
    if (!state) return;
    const userId = game?.user?.id;
    const myCharacter = Object.values(state.characterChecks).find((c) => c.userId === userId);
    if (!myCharacter) {
      const ui = globalThis.ui;
      ui?.notifications?.warn("You do not have an assigned character for this morale check");
      return;
    }
    if (myCharacter.armyId !== null) {
      const ui = globalThis.ui;
      ui?.notifications?.warn("You have already used your morale check this turn");
      return;
    }
    const { armyMoralePanel } = await import("./ArmyMoralePanel-ESmR0hO9.js");
    await armyMoralePanel.triggerObserverMoraleCheck(armyId, myCharacter);
  }
}
const moraleBroadcastService = new MoraleBroadcastService();
export {
  MoraleBroadcastService,
  moraleBroadcastService
};
