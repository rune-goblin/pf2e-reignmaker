import { l as logger, p as getKingdomData, Y as appWindowManager, $ as MORALE_OUTCOMES, q as updateKingdom, a0 as FRIGHTENED_DISBAND_THRESHOLD } from "./GameCommandUtils-D_sgs3NK.js";
import { TokenHelpers } from "./TokenHelpers-BNpcGeKf.js";
import { moraleBroadcastService } from "./MoraleBroadcastService-CTuOdoKI.js";
class ArmyMoralePanel {
  active = false;
  selectedSkill = "diplomacy";
  armyStatuses = [];
  currentArmyId = null;
  panelMountPoint = null;
  component = null;
  resolve = null;
  keyDownHandler = null;
  rollCompleteHandler = null;
  results = [];
  // Panel state machine
  panelState = "selection";
  // Hex highlighting
  highlightedHexId = null;
  // Custom panel title
  panelTitle = "Morale Check";
  // Pending disband - army waiting for user confirmation
  pendingDisbandArmy = null;
  // Multi-player character tracking
  characterChecks = {};
  currentUserCharacter = null;
  // Legacy: Best character for single-player fallback
  bestCharacterId = null;
  bestCharacterName = null;
  bestCharacterBonus = null;
  // Track if we're using broadcast mode (multi-player)
  useBroadcast = true;
  // Hook-based roll detection
  hookId = void 0;
  pendingRoll = null;
  /**
   * Check if this panel is currently running a morale check.
   * Used by BroadcastObserver to detect orphaned broadcasts after page refresh.
   */
  isActive() {
    return this.active;
  }
  /**
   * Main entry point - opens panel and returns results when all checks complete
   * @param armyIds - IDs of armies that need morale checks
   * @param options - Optional configuration (title for the panel)
   */
  async checkArmyMorale(armyIds, options) {
    if (this.active) {
      throw new Error("Morale check already in progress");
    }
    if (armyIds.length === 0) {
      return [];
    }
    return new Promise(async (resolve) => {
      this.resolve = resolve;
      this.active = true;
      this.panelState = "selection";
      this.results = [];
      this.currentArmyId = null;
      this.selectedSkill = "diplomacy";
      this.panelTitle = options?.title || "Morale Check";
      this.pendingDisbandArmy = null;
      this.characterChecks = {};
      try {
        await this.initializeArmyStatuses(armyIds);
        await this.initializeCharacterChecks();
        this.currentUserCharacter = this.findCurrentUserCharacter();
        await this.updateBestCharacterForSkill();
        if (this.armyStatuses.length === 0) {
          logger.warn("[ArmyMoralePanel] No valid armies found for morale check");
          resolve([]);
          return;
        }
        if (this.useBroadcast) {
          await moraleBroadcastService.startBroadcast(armyIds, this.panelTitle);
        }
        this.minimizeReignmakerApp();
        await this.mountPanel();
        this.attachRollCompleteListener();
        const ui = globalThis.ui;
        const charCount = Object.keys(this.characterChecks).length;
        ui?.notifications?.info(
          `Morale check required for ${this.armyStatuses.length} ${this.armyStatuses.length === 1 ? "army" : "armies"}. ${charCount} ${charCount === 1 ? "character" : "characters"} available.`
        );
      } catch (error) {
        logger.error("[ArmyMoralePanel] Failed to start morale check:", error);
        this.cleanup();
        resolve([]);
      }
    });
  }
  /**
   * Initialize character check states for all player characters
   */
  async initializeCharacterChecks() {
    const { PF2eCharacterService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cB);
    const characterService = PF2eCharacterService.getInstance();
    const playerChars = characterService.getPlayerCharacters();
    this.characterChecks = {};
    for (const pc of playerChars) {
      const actor = pc.character;
      if (!actor?.skills) continue;
      const { skill, bonus } = this.getBestMoraleSkill(actor);
      this.characterChecks[actor.id] = {
        characterId: actor.id,
        userId: pc.userId,
        characterName: actor.name,
        bonus,
        skill,
        armyId: null,
        result: void 0
      };
      logger.debug(`[ArmyMoralePanel] Added character: ${actor.name} (${skill} +${bonus})`);
    }
    logger.info(`[ArmyMoralePanel] Initialized ${Object.keys(this.characterChecks).length} characters for morale checks`);
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
   * Find the current user's character check state
   */
  findCurrentUserCharacter() {
    const game = globalThis.game;
    const userId = game?.user?.id;
    if (!userId) return null;
    for (const check of Object.values(this.characterChecks)) {
      if (check.userId === userId) {
        return check;
      }
    }
    return null;
  }
  /**
   * Initialize army status list from army IDs
   */
  async initializeArmyStatuses(armyIds) {
    const kingdom = getKingdomData();
    if (!kingdom?.armies) {
      this.armyStatuses = [];
      return;
    }
    this.armyStatuses = [];
    for (const armyId of armyIds) {
      const army = kingdom.armies.find((a) => a.id === armyId);
      if (!army) {
        logger.warn(`[ArmyMoralePanel] Army not found: ${armyId}`);
        continue;
      }
      let hexId = null;
      let tokenImage = null;
      if (army.actorId) {
        const token = TokenHelpers.findTokenByActor(army.actorId);
        if (token) {
          hexId = TokenHelpers.getTokenHexId(token);
          const game = globalThis.game;
          const actor = game?.actors?.get(army.actorId);
          tokenImage = actor?.img || token?.texture?.src || null;
        }
      }
      this.armyStatuses.push({
        army,
        hexId,
        tokenImage,
        status: "pending"
      });
    }
    logger.info(`[ArmyMoralePanel] Initialized ${this.armyStatuses.length} armies for morale check`);
  }
  /**
   * Minimize the Reignmaker Application window
   */
  minimizeReignmakerApp() {
    appWindowManager.enterMapMode("hide");
  }
  /**
   * Restore the Reignmaker Application window
   */
  restoreReignmakerApp() {
    appWindowManager.exitMapMode();
  }
  /**
   * Mount floating panel (Svelte component)
   */
  async mountPanel() {
    this.panelMountPoint = document.createElement("div");
    this.panelMountPoint.id = "army-morale-panel-mount";
    document.body.appendChild(this.panelMountPoint);
    const { default: ArmyMoralePanelComponent } = await import("./ArmyMoralePanel-OkTaUswz.js");
    const usedCount = Object.values(this.characterChecks).filter((c) => c.armyId !== null).length;
    const totalCount = Object.keys(this.characterChecks).length;
    this.component = new ArmyMoralePanelComponent({
      target: this.panelMountPoint,
      props: {
        title: this.panelTitle,
        skill: this.selectedSkill,
        armies: this.armyStatuses,
        panelState: this.panelState,
        currentArmyId: this.currentArmyId,
        pendingDisbandArmy: this.pendingDisbandArmy,
        // Current user's character info
        currentUserCharacter: this.currentUserCharacter,
        hasUsedCheck: this.currentUserCharacter?.armyId !== null && this.currentUserCharacter?.armyId !== void 0,
        // Character usage tracking
        characterChecks: this.characterChecks,
        usedCheckCount: usedCount,
        totalCharacterCount: totalCount,
        // Legacy props for backward compatibility
        bestCharacterName: this.currentUserCharacter?.characterName || this.bestCharacterName,
        bestCharacterBonus: this.currentUserCharacter?.bonus || this.bestCharacterBonus,
        // Callbacks
        onCheckMorale: (armyId) => this.handleCheckMorale(armyId),
        onDone: () => this.handleDone(),
        onDisbandConfirm: (armyId, deleteActor) => this.handleDisbandConfirm(armyId, deleteActor),
        onDisbandCancel: (armyId) => this.handleDisbandCancel(armyId)
      }
    });
    await this.makePanelDraggable();
  }
  /**
   * Make panel draggable by the header
   */
  async makePanelDraggable() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const panel = document.querySelector(".army-morale-panel");
    if (!panel) {
      logger.warn("[ArmyMoralePanel] Could not find panel element for dragging");
      return;
    }
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    const onMouseDown = (e) => {
      const target = e.target;
      const header = target.closest(".panel-header");
      if (!header || target.closest("button, input, select, a")) return;
      isDragging = true;
      const rect = panel.getBoundingClientRect();
      initialX = e.clientX - rect.left;
      initialY = e.clientY - rect.top;
      document.body.style.cursor = "grabbing";
      panel.querySelectorAll(".panel-header").forEach((h) => {
        h.style.cursor = "grabbing";
      });
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      const maxX = window.innerWidth - panel.offsetWidth;
      const maxY = window.innerHeight - panel.offsetHeight;
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));
      panel.style.left = `${currentX}px`;
      panel.style.top = `${currentY}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.transform = "none";
    };
    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = "";
        panel.querySelectorAll(".panel-header").forEach((h) => {
          h.style.cursor = "move";
        });
      }
    };
    panel.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    logger.info("[ArmyMoralePanel] Panel is now draggable");
  }
  /**
   * Attach roll completion listener using Foundry's createChatMessage hook
   * This is more reliable than callback-based detection
   */
  attachRollCompleteListener() {
    const Hooks = globalThis.Hooks;
    if (!Hooks) {
      logger.error("[ArmyMoralePanel] Foundry Hooks not available");
      return;
    }
    this.hookId = Hooks.on("createChatMessage", (message) => {
      this.handleChatMessage(message);
    });
    logger.info("[ArmyMoralePanel] Chat message hook attached");
  }
  /**
   * Handle incoming chat messages to detect roll completion
   */
  handleChatMessage(message) {
    if (!this.pendingRoll) return;
    const context = message.flags?.pf2e?.context;
    if (!context || context.type !== "skill-check") return;
    const actorId = message.speaker?.actor;
    if (actorId !== this.pendingRoll.characterId) return;
    const domains = context.domains || [];
    const expectedSkill = this.pendingRoll.skill;
    const isExpectedSkill = domains.includes(expectedSkill) || domains.includes(`${expectedSkill}-check`);
    if (!isExpectedSkill) {
      logger.debug(`[ArmyMoralePanel] Skill mismatch - expected ${expectedSkill}, domains:`, domains);
      return;
    }
    const outcome = context.outcome;
    if (!outcome) {
      logger.error("[ArmyMoralePanel] No outcome in message flags:", context);
      return;
    }
    logger.info(`[ArmyMoralePanel] Detected roll completion via hook: ${outcome}`);
    const rollDetails = {
      actorName: this.pendingRoll.characterName,
      skillName: this.pendingRoll.skill,
      characterId: this.pendingRoll.characterId,
      dc: context.dc?.value,
      total: message.rolls?.[0]?.total
    };
    const armyId = this.pendingRoll.armyId;
    this.pendingRoll = null;
    this.processRollResult(armyId, outcome, rollDetails);
  }
  /**
   * Handle skill dropdown change
   */
  /**
   * Find the best character AND skill combination and update state
   * Compares both Diplomacy and Intimidation across all characters
   */
  async updateBestCharacterForSkill() {
    const best = await this.findBestCharacterAndSkill();
    if (best) {
      this.selectedSkill = best.skill;
      this.bestCharacterId = best.actor.id;
      this.bestCharacterName = best.actor.name;
      this.bestCharacterBonus = best.bonus;
      logger.info(`[ArmyMoralePanel] Best combination: ${best.actor.name} using ${best.skill} (+${best.bonus})`);
    } else {
      this.bestCharacterId = null;
      this.bestCharacterName = null;
      this.bestCharacterBonus = null;
      logger.warn(`[ArmyMoralePanel] No character found with Diplomacy or Intimidation skill`);
    }
  }
  /**
   * Find the best character AND skill combination
   * Returns the character/skill pair with the highest bonus
   */
  async findBestCharacterAndSkill() {
    const { PF2eCharacterService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cB);
    const characterService = PF2eCharacterService.getInstance();
    const playerChars = characterService.getPlayerCharacters();
    if (!playerChars || playerChars.length === 0) {
      logger.warn("[ArmyMoralePanel] No player characters found");
      return null;
    }
    const skills = ["diplomacy", "intimidation"];
    let bestActor = null;
    let bestSkill = "diplomacy";
    let bestBonus = -Infinity;
    for (const pc of playerChars) {
      const actor = pc.character;
      if (!actor?.skills) continue;
      for (const skill of skills) {
        const skillData = actor.skills[skill];
        if (!skillData) continue;
        const bonus = skillData.totalModifier ?? skillData.mod ?? skillData.check?.mod ?? 0;
        logger.debug(`[ArmyMoralePanel] ${actor.name} ${skill}: +${bonus}`);
        if (bonus > bestBonus) {
          bestBonus = bonus;
          bestActor = actor;
          bestSkill = skill;
        }
      }
    }
    return bestActor ? { actor: bestActor, skill: bestSkill, bonus: bestBonus } : null;
  }
  /**
   * Handle "Check Morale" button click for an army
   */
  async handleCheckMorale(armyId) {
    logger.info(`[ArmyMoralePanel] Starting morale check for army: ${armyId}`);
    if (this.currentUserCharacter?.armyId !== null && this.currentUserCharacter?.armyId !== void 0) {
      const ui = globalThis.ui;
      ui?.notifications?.warn("You have already used your morale check this turn");
      return;
    }
    if (!this.currentUserCharacter) {
      const ui = globalThis.ui;
      ui?.notifications?.warn("You do not have an assigned character for morale checks");
      return;
    }
    const armyStatus = this.armyStatuses.find((s) => s.army.id === armyId);
    if (!armyStatus || armyStatus.status !== "pending") {
      logger.warn("[ArmyMoralePanel] Army not found or already checked");
      return;
    }
    this.currentArmyId = armyId;
    armyStatus.status = "checking";
    this.panelState = "waiting-for-roll";
    if (this.useBroadcast) {
      await moraleBroadcastService.startCharacterCheck(
        this.currentUserCharacter.characterId,
        armyId
      );
    }
    this.updateComponentProps();
    await this.highlightArmyHex(armyStatus.hexId);
    await this.triggerMoraleRollForCharacter(armyStatus.army, this.currentUserCharacter);
  }
  /**
   * Trigger morale check from observer panel (non-initiator player)
   * Public method called by MoraleBroadcastService
   */
  async triggerObserverMoraleCheck(armyId, characterCheck) {
    logger.info(`[ArmyMoralePanel] Observer triggering morale check for army: ${armyId}`);
    const kingdom = getKingdomData();
    const army = kingdom?.armies?.find((a) => a.id === armyId);
    if (!army) {
      logger.error(`[ArmyMoralePanel] Army not found: ${armyId}`);
      return;
    }
    this.currentArmyId = armyId;
    this.currentUserCharacter = characterCheck;
    if (this.hookId === void 0) {
      this.attachRollCompleteListener();
    }
    await this.triggerMoraleRollForCharacter(army, characterCheck);
  }
  /**
   * Trigger a morale check roll for a specific character
   * @param army - Army to check morale for
   * @param characterCheck - Character check state with skill and bonus info
   */
  async triggerMoraleRollForCharacter(army, characterCheck) {
    try {
      const { getPartyLevel, getLevelBasedDC } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cI);
      const { pf2eSkillService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cE);
      const game = globalThis.game;
      const actingCharacter = game?.actors?.get(characterCheck.characterId);
      if (!actingCharacter) {
        logger.error(`[ArmyMoralePanel] Character not found: ${characterCheck.characterId}`);
        const ui = globalThis.ui;
        ui?.notifications?.error(`Character ${characterCheck.characterName} not found`);
        this.resetCurrentArmyToSelection();
        return;
      }
      const skillSlug = characterCheck.skill;
      const skill = actingCharacter.skills?.[skillSlug];
      if (!skill) {
        logger.error(`[ArmyMoralePanel] Character ${actingCharacter.name} doesn't have ${skillSlug}`);
        const ui = globalThis.ui;
        ui?.notifications?.error(`${actingCharacter.name} doesn't have the ${skillSlug} skill`);
        this.resetCurrentArmyToSelection();
        return;
      }
      const characterLevel = actingCharacter.level || 1;
      const effectiveLevel = getPartyLevel(characterLevel);
      const dc = getLevelBasedDC(effectiveLevel);
      logger.info(`[ArmyMoralePanel] ${characterCheck.characterName} rolling ${skillSlug} (+${characterCheck.bonus}) for ${army.name}, DC ${dc}`);
      const { kingdomModifierService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cD);
      const modifiers = kingdomModifierService.getModifiersForCheck({
        skillName: skillSlug,
        checkType: "action"
      });
      this.pendingRoll = {
        armyId: army.id,
        characterId: characterCheck.characterId,
        characterName: characterCheck.characterName,
        skill: characterCheck.skill
      };
      await pf2eSkillService.executeSkillRoll({
        actor: actingCharacter,
        skill,
        dc,
        label: `Morale Check: ${army.name}`,
        modifiers,
        extraRollOptions: ["morale-check", `army:${army.id}`]
      });
    } catch (error) {
      logger.error("[ArmyMoralePanel] Failed to trigger morale roll:", error);
      const ui = globalThis.ui;
      ui?.notifications?.error("Failed to trigger morale roll");
      this.pendingRoll = null;
      this.resetCurrentArmyToSelection();
    }
  }
  /**
   * Process roll result and apply effects
   */
  async processRollResult(armyId, outcome, rollDetails) {
    const armyStatus = this.armyStatuses.find((s) => s.army.id === armyId);
    if (!armyStatus) {
      logger.error(`[ArmyMoralePanel] Army status not found for id: ${armyId}`);
      return;
    }
    const army = armyStatus.army;
    const outcomeData = MORALE_OUTCOMES[outcome];
    if (!outcomeData) {
      logger.error(`[ArmyMoralePanel] Invalid outcome: ${outcome}. Valid outcomes: ${Object.keys(MORALE_OUTCOMES).join(", ")}`);
      outcome = "failure";
    }
    const validOutcomeData = MORALE_OUTCOMES[outcome];
    logger.info(`[ArmyMoralePanel] Processing result for ${army.name}: ${outcome}`);
    const { getArmyConditionValue, applyArmyConditionExecution, decreaseArmyConditionExecution } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cN);
    let currentFrightened = 0;
    if (army.actorId) {
      currentFrightened = await getArmyConditionValue(army.actorId, "frightened");
    }
    const frightenedChange = validOutcomeData.frightenedChange;
    const newFrightened = Math.max(0, currentFrightened + frightenedChange);
    const shouldDisband = newFrightened >= FRIGHTENED_DISBAND_THRESHOLD;
    const result = {
      armyId: army.id,
      armyName: army.name,
      outcome,
      disbanded: shouldDisband,
      unrestGained: validOutcomeData.unrest,
      frightenedChange,
      currentFrightened: newFrightened,
      actorName: rollDetails.actorName || "Unknown",
      skillName: rollDetails.skillName || this.selectedSkill,
      rollBreakdown: rollDetails
    };
    armyStatus.status = "completed";
    armyStatus.result = result;
    this.results.push(result);
    const characterId = rollDetails.characterId || this.currentUserCharacter?.characterId;
    if (characterId && this.characterChecks[characterId]) {
      this.characterChecks[characterId].armyId = armyId;
      this.characterChecks[characterId].result = result;
    }
    this.currentArmyId = null;
    if (this.useBroadcast && characterId) {
      await moraleBroadcastService.completeCharacterCheck(characterId, armyId, result);
    }
    await this.clearHexHighlight();
    await this.applyMoraleResult(army, result);
    await this.checkCompletionState();
    this.updateComponentProps();
  }
  /**
   * Check if morale checks are complete and update panel state
   */
  async checkCompletionState() {
    const hasPendingDisband = this.pendingDisbandArmy !== null;
    if (hasPendingDisband) return;
    const pendingArmies = this.armyStatuses.filter((s) => s.status === "pending");
    const availableCharacters = Object.values(this.characterChecks).filter((c) => c.armyId === null);
    if (pendingArmies.length === 0) {
      this.panelState = "completed";
    } else if (availableCharacters.length === 0) {
      logger.info(`[ArmyMoralePanel] All characters used, auto-failing ${pendingArmies.length} remaining armies`);
      const { getArmyConditionValue } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cN);
      for (const armyStatus of pendingArmies) {
        let currentFrightened = 0;
        if (armyStatus.army.actorId) {
          currentFrightened = await getArmyConditionValue(armyStatus.army.actorId, "frightened");
        }
        const frightenedChange = MORALE_OUTCOMES.failure.frightenedChange;
        const newFrightened = Math.max(0, currentFrightened + frightenedChange);
        const shouldDisband = newFrightened >= FRIGHTENED_DISBAND_THRESHOLD;
        const autoFailResult = {
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
        armyStatus.status = "completed";
        armyStatus.result = autoFailResult;
        this.results.push(autoFailResult);
        await this.applyMoraleResult(armyStatus.army, autoFailResult);
      }
      this.panelState = "completed";
    } else {
      this.panelState = "selection";
    }
  }
  /**
   * Apply morale check result effects (except disband - that requires confirmation)
   */
  async applyMoraleResult(army, result) {
    const outcomeData = MORALE_OUTCOMES[result.outcome];
    if (army.actorId && result.frightenedChange !== 0) {
      const { applyArmyConditionExecution, decreaseArmyConditionExecution } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cN);
      if (result.frightenedChange > 0) {
        await applyArmyConditionExecution(army.actorId, "frightened", result.frightenedChange);
        logger.info(`[ArmyMoralePanel] Applied Frightened +${result.frightenedChange} to ${army.name} (now ${result.currentFrightened})`);
      } else if (result.frightenedChange < 0) {
        await decreaseArmyConditionExecution(army.actorId, "frightened", Math.abs(result.frightenedChange));
        logger.info(`[ArmyMoralePanel] Reduced Frightened by ${Math.abs(result.frightenedChange)} on ${army.name} (now ${result.currentFrightened})`);
      }
    } else if (!army.actorId && result.frightenedChange !== 0) {
      logger.warn(`[ArmyMoralePanel] Cannot apply Frightened change - army ${army.name} has no linked actor`);
    }
    if (result.frightenedChange !== 0) {
      await updateKingdom((kingdom) => {
        const armyToUpdate = kingdom.armies?.find((a) => a.id === army.id);
        if (armyToUpdate) armyToUpdate.frightened = result.currentFrightened;
      });
    }
    if (outcomeData.unrest > 0) {
      await updateKingdom((kingdom) => {
        kingdom.unrest = (kingdom.unrest || 0) + outcomeData.unrest;
      });
      logger.info(`[ArmyMoralePanel] Added ${outcomeData.unrest} unrest`);
    }
    if (outcomeData.resetUnsupported) {
      await updateKingdom((kingdom) => {
        const armyToUpdate = kingdom.armies?.find((a) => a.id === army.id);
        if (armyToUpdate) {
          armyToUpdate.turnsUnsupported = 0;
        }
      });
      logger.info(`[ArmyMoralePanel] Reset turnsUnsupported for ${army.name}`);
    }
    if (result.disbanded) {
      logger.info(`[ArmyMoralePanel] Showing disband dialog for: ${army.name} (Frightened ${result.currentFrightened})`);
      this.pendingDisbandArmy = army;
      this.updateComponentProps();
    }
  }
  /**
   * Handle user confirming army disband from dialog
   */
  async handleDisbandConfirm(armyId, deleteActor) {
    const army = this.pendingDisbandArmy;
    if (!army || army.id !== armyId) {
      logger.warn(`[ArmyMoralePanel] Disband confirm for unknown army: ${armyId}`);
      return;
    }
    logger.info(`[ArmyMoralePanel] User confirmed disband: ${army.name}, deleteActor: ${deleteActor}`);
    try {
      const { armyService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cA);
      const result = await armyService.disbandArmy(army.id, deleteActor);
      logger.info(`[ArmyMoralePanel] Disbanded army: ${army.name}, result:`, result);
      const ui = globalThis.ui;
      if (deleteActor && result?.actorId) {
        ui?.notifications?.info(`${result.armyName} disbanded and actor deleted`);
      } else {
        ui?.notifications?.info(`${result?.armyName || army.name} disbanded`);
      }
    } catch (error) {
      logger.error(`[ArmyMoralePanel] Failed to disband army ${army.name}:`, error);
      const ui = globalThis.ui;
      ui?.notifications?.error(`Failed to disband ${army.name}: ${error}`);
    }
    this.pendingDisbandArmy = null;
    this.updateComponentProps();
    await this.checkCompletionState();
    this.updateComponentProps();
  }
  /**
   * Handle user canceling army disband from dialog (X button)
   * Still disbands the army but keeps the actor (doesn't delete it)
   */
  async handleDisbandCancel(armyId) {
    const army = this.pendingDisbandArmy;
    if (!army || army.id !== armyId) {
      logger.warn(`[ArmyMoralePanel] Disband cancel for unknown army: ${armyId}`);
      return;
    }
    logger.info(`[ArmyMoralePanel] User canceled disband dialog for: ${army.name} - disbanding but keeping actor`);
    try {
      const { armyService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cA);
      const result = await armyService.disbandArmy(army.id, false);
      logger.info(`[ArmyMoralePanel] Disbanded army (kept actor): ${army.name}, result:`, result);
      const ui = globalThis.ui;
      ui?.notifications?.info(`${result?.armyName || army.name} disbanded (actor preserved)`);
    } catch (error) {
      logger.error(`[ArmyMoralePanel] Failed to disband army ${army.name}:`, error);
      const ui = globalThis.ui;
      ui?.notifications?.error(`Failed to disband ${army.name}: ${error}`);
    }
    this.pendingDisbandArmy = null;
    this.updateComponentProps();
    await this.checkCompletionState();
    this.updateComponentProps();
  }
  /**
   * Reset current army back to pending state (for cancelled rolls)
   */
  resetCurrentArmyToSelection() {
    if (this.currentArmyId) {
      const armyStatus = this.armyStatuses.find((s) => s.army.id === this.currentArmyId);
      if (armyStatus) {
        armyStatus.status = "pending";
      }
    }
    this.currentArmyId = null;
    this.panelState = "selection";
    this.updateComponentProps();
    this.clearHexHighlight();
  }
  /**
   * Highlight the hex where an army is located
   */
  async highlightArmyHex(hexId) {
    if (!hexId) return;
    try {
      await this.clearHexHighlight();
      const { ReignMakerMapLayer } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cP);
      const mapLayer = ReignMakerMapLayer.getInstance();
      if (mapLayer) {
        const style = {
          fillColor: 16753920,
          // Orange
          fillAlpha: 0.5,
          borderColor: 16753920,
          borderAlpha: 1,
          borderWidth: 3
        };
        mapLayer.drawHexes([hexId], style, "morale-check-highlight");
        this.highlightedHexId = hexId;
        logger.info(`[ArmyMoralePanel] Highlighted hex: ${hexId}`);
      }
    } catch (error) {
      logger.error("[ArmyMoralePanel] Failed to highlight hex:", error);
    }
  }
  /**
   * Clear hex highlight
   */
  async clearHexHighlight() {
    if (!this.highlightedHexId) return;
    try {
      const { ReignMakerMapLayer } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cP);
      const mapLayer = ReignMakerMapLayer.getInstance();
      if (mapLayer) {
        mapLayer.clearLayer("morale-check-highlight");
        this.highlightedHexId = null;
        logger.info("[ArmyMoralePanel] Cleared hex highlight");
      }
    } catch (error) {
      logger.error("[ArmyMoralePanel] Failed to clear hex highlight:", error);
    }
  }
  /**
   * Update component props when state changes
   */
  updateComponentProps() {
    if (!this.component) return;
    const usedCount = Object.values(this.characterChecks).filter((c) => c.armyId !== null).length;
    const totalCount = Object.keys(this.characterChecks).length;
    this.component.$set({
      skill: this.selectedSkill,
      armies: this.armyStatuses,
      panelState: this.panelState,
      currentArmyId: this.currentArmyId,
      pendingDisbandArmy: this.pendingDisbandArmy,
      // Current user's character info
      currentUserCharacter: this.currentUserCharacter,
      hasUsedCheck: this.currentUserCharacter?.armyId !== null && this.currentUserCharacter?.armyId !== void 0,
      // Character usage tracking
      characterChecks: this.characterChecks,
      usedCheckCount: usedCount,
      totalCharacterCount: totalCount,
      // Legacy props
      bestCharacterName: this.currentUserCharacter?.characterName || this.bestCharacterName,
      bestCharacterBonus: this.currentUserCharacter?.bonus || this.bestCharacterBonus
    });
  }
  /**
   * Handle Done button click
   */
  handleDone() {
    logger.info("[ArmyMoralePanel] Done clicked, completing morale check");
    const resolver = this.resolve;
    const results = [...this.results];
    this.cleanup();
    resolver?.(results);
  }
  /**
   * Cleanup and restore state
   */
  cleanup() {
    if (this.keyDownHandler) {
      document.removeEventListener("keydown", this.keyDownHandler);
      this.keyDownHandler = null;
    }
    if (this.hookId !== void 0) {
      const Hooks = globalThis.Hooks;
      if (Hooks) {
        Hooks.off("createChatMessage", this.hookId);
        logger.info("[ArmyMoralePanel] Chat message hook removed");
      }
      this.hookId = void 0;
    }
    this.pendingRoll = null;
    if (this.rollCompleteHandler) {
      window.removeEventListener("kingdomRollComplete", this.rollCompleteHandler);
      this.rollCompleteHandler = null;
    }
    if (this.useBroadcast) {
      moraleBroadcastService.endBroadcast();
    }
    this.clearHexHighlight();
    if (this.component) {
      this.component.$destroy();
      this.component = null;
    }
    if (this.panelMountPoint) {
      this.panelMountPoint.remove();
      this.panelMountPoint = null;
    }
    this.restoreReignmakerApp();
    this.active = false;
    this.selectedSkill = "diplomacy";
    this.armyStatuses = [];
    this.currentArmyId = null;
    this.resolve = null;
    this.panelState = "selection";
    this.results = [];
    this.characterChecks = {};
    this.currentUserCharacter = null;
  }
}
const armyMoralePanel = new ArmyMoralePanel();
export {
  ArmyMoralePanel,
  armyMoralePanel
};
