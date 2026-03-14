import { S as SceneManager, R as ReignMakerMapLayer, l as logger, p as getKingdomData, H as positionToOffset, J as hexToKingmakerId, K as armyMovementMode, L as getPendingOutcomesByType, M as canRerollWithFame, N as deductFameForReroll, O as createOutcomePreviewService, Q as restoreFameAfterFailedReroll, g as getPartyActor, x as get_store_value, U as actionsPhase } from "./GameCommandUtils-D_sgs3NK.js";
import { armyDeploymentBroadcastService } from "./ArmyDeploymentBroadcastService-C0WZ2aPL.js";
class ArmyDeploymentPanel {
  active = false;
  skill = "";
  selectedArmyId = null;
  plottedPath = [];
  panelMountPoint = null;
  component = null;
  resolve = null;
  tokenClickHandler = null;
  keyDownHandler = null;
  rollCompleteHandler = null;
  rollCancelledHandler = null;
  onRollTrigger = null;
  sceneManager = null;
  // Panel state machine
  panelState = "selection";
  rollResult = null;
  /**
   * Check if this panel is currently running a deployment.
   * Used by BroadcastObserver to detect orphaned broadcasts after page refresh.
   */
  isActive() {
    return this.active;
  }
  /**
   * Main entry point - returns Promise that resolves when deployment complete
   * @param skill - The skill being used for the deployment roll
   * @param onRollTrigger - Callback to trigger the roll (called when Done is clicked)
   */
  async selectArmyAndPlotPath(skill, onRollTrigger) {
    if (this.active) {
      throw new Error("Army deployment already in progress");
    }
    return new Promise(async (resolve) => {
      this.resolve = resolve;
      this.skill = skill;
      this.selectedArmyId = null;
      this.plottedPath = [];
      this.active = true;
      this.onRollTrigger = onRollTrigger;
      this.panelState = "selection";
      this.rollResult = null;
      try {
        this.sceneManager = new SceneManager(ReignMakerMapLayer.getInstance());
        this.sceneManager.minimizeReignmakerApp();
        ReignMakerMapLayer.getInstance().showPixiContainer();
        await this.sceneManager.showRelevantOverlays("movement");
        await this.mountPanel();
        this.attachTokenClickListener();
        this.attachKeyListener();
        this.attachRollCompleteListener();
        this.attachRollCancelledListener();
        const ui = globalThis.ui;
        ui?.notifications?.info(`Select an army from the panel or click an army token on the map`);
      } catch (error) {
        logger.error("[ArmyDeploymentPanel] Failed to start deployment:", error);
        await this.cleanup();
        resolve(null);
      }
    });
  }
  /**
   * Get all armies that have tokens on the current scene
   * Filters out armies that have already been deployed this turn
   */
  async getArmiesOnMap() {
    const kingdom = getKingdomData();
    if (!kingdom?.armies) return [];
    const canvas = globalThis.canvas;
    if (!canvas?.scene) return [];
    const deployedArmyIds = get_store_value(actionsPhase)?.deployedArmyIds || [];
    const { TokenHelpers } = await import("./TokenHelpers-BNpcGeKf.js");
    const result = [];
    for (const army of kingdom.armies) {
      if (!army.actorId) continue;
      const token = TokenHelpers.findTokenByActor(army.actorId);
      if (token) {
        const hexId = TokenHelpers.getTokenHexId(token);
        const deployed = deployedArmyIds.includes(army.id);
        result.push({ army, hexId, deployed });
      }
    }
    return result;
  }
  /**
   * Get hex ID from token position
   */
  getTokenHexId(tokenDoc) {
    try {
      const canvas = globalThis.canvas;
      const gridSize = canvas?.grid?.size || 100;
      const centerX = tokenDoc.x + tokenDoc.width * gridSize / 2;
      const centerY = tokenDoc.y + tokenDoc.height * gridSize / 2;
      const offset = positionToOffset(centerX, centerY);
      return hexToKingmakerId(offset);
    } catch (error) {
      logger.error("[ArmyDeploymentPanel] Failed to get token hex:", error);
      return null;
    }
  }
  /**
   * Attach canvas token click listener
   */
  attachTokenClickListener() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) {
      logger.error("[ArmyDeploymentPanel] Canvas not available");
      return;
    }
    this.tokenClickHandler = async (event) => {
      const token = this.findTokenUnderPointer(event);
      if (token) {
        const armyId = await this.getArmyIdFromToken(token);
        if (armyId) {
          logger.info("[ArmyDeploymentPanel] Clicked army token:", armyId);
          if (event.stopPropagation) {
            event.stopPropagation();
          }
          if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
          }
          await this.selectArmy(armyId);
          return;
        }
      }
    };
    canvas.stage.on("pointerdown", this.tokenClickHandler);
    logger.info("[ArmyDeploymentPanel] Token click listener attached (pointerdown)");
  }
  /**
   * Find token under pointer event
   * Uses multiple methods to reliably detect token clicks
   */
  findTokenUnderPointer(event) {
    const canvas = globalThis.canvas;
    if (!canvas?.tokens?.placeables) return null;
    let current = event.target;
    while (current) {
      if (current.document?.documentName === "Token") {
        return current;
      }
      if (current.constructor?.name === "Token" || current.isToken) {
        return current;
      }
      current = current.parent;
    }
    let pointer;
    if (event.data) {
      const stage = canvas.stage;
      const localPos = event.data.getLocalPosition(stage);
      pointer = { x: localPos.x, y: localPos.y };
    } else if (event.clientX !== void 0) {
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient?.(point) || point;
      pointer = canvasPos;
    } else {
      return null;
    }
    const tokensAtPoint = canvas.tokens.placeables.filter((token) => {
      if (!token || !token.visible) return false;
      try {
        if (token.hitArea && typeof token.hitArea.contains === "function") {
          const localPoint = token.toLocal?.(pointer) || pointer;
          return token.hitArea.contains(localPoint.x, localPoint.y);
        }
      } catch (e) {
      }
      const bounds = token.bounds;
      if (bounds) {
        return pointer.x >= bounds.x && pointer.x <= bounds.x + bounds.width && pointer.y >= bounds.y && pointer.y <= bounds.y + bounds.height;
      }
      return false;
    });
    if (tokensAtPoint.length > 0) {
      tokensAtPoint.sort((a, b) => {
        const aElevation = a.document?.elevation ?? a.document?.z ?? 0;
        const bElevation = b.document?.elevation ?? b.document?.z ?? 0;
        return bElevation - aElevation;
      });
      return tokensAtPoint[0];
    }
    return null;
  }
  /**
   * Get army ID from token document
   */
  async getArmyIdFromToken(token) {
    try {
      const tokenDoc = token.document || token;
      if (!tokenDoc) return null;
      const actor = tokenDoc.actor;
      if (actor) {
        const armyMetadata = await actor.getFlag("pf2e-reignmaker", "army-metadata");
        if (armyMetadata?.armyId) {
          return armyMetadata.armyId;
        }
      }
      const actorId = tokenDoc.actorId || tokenDoc.actor?.id;
      if (actorId) {
        const kingdom = getKingdomData();
        const army = kingdom?.armies?.find((a) => a.actorId === actorId);
        if (army) {
          return army.id;
        }
      }
      return null;
    } catch (error) {
      logger.error("[ArmyDeploymentPanel] Error getting army ID from token:", error);
      return null;
    }
  }
  /**
   * Attach keyboard listener for Escape key
   */
  attachKeyListener() {
    this.keyDownHandler = (event) => {
      if (event.key === "Escape") {
        logger.info("[ArmyDeploymentPanel] Escape pressed - cancelling");
        this.handleCancel().catch((err) => logger.error("[ArmyDeploymentPanel] Error in cancel handler:", err));
      }
    };
    document.addEventListener("keydown", this.keyDownHandler);
  }
  /**
   * Attach roll completion listener
   */
  attachRollCompleteListener() {
    this.rollCompleteHandler = async (event) => {
      const { checkId, outcome, actorName, skillName, rollBreakdown } = event.detail;
      if (checkId !== "deploy-army") return;
      if (this.panelState !== "waiting-for-roll") return;
      logger.info("[ArmyDeploymentPanel] Roll complete:", { outcome, actorName });
      this.rollResult = {
        outcome,
        actorName,
        skillName,
        rollBreakdown
      };
      this.panelState = "showing-result";
      await this.updateComponentProps();
      await armyDeploymentBroadcastService.updatePanelState("showing-result", { outcome, actorName });
    };
    window.addEventListener("kingdomRollComplete", this.rollCompleteHandler);
    logger.info("[ArmyDeploymentPanel] Roll completion listener attached");
  }
  /**
   * Attach roll cancellation listener
   */
  attachRollCancelledListener() {
    this.rollCancelledHandler = async (event) => {
      const { checkId } = event.detail;
      if (checkId !== "deploy-army") return;
      if (this.panelState !== "waiting-for-roll") return;
      logger.info("[ArmyDeploymentPanel] Roll cancelled by user");
      if (this.selectedArmyId) {
        const armiesOnMap = await this.getArmiesOnMap();
        const armyData = armiesOnMap.find((a) => a.army.id === this.selectedArmyId);
        if (armyData?.hexId) {
          await armyMovementMode.activateForArmy(this.selectedArmyId, armyData.hexId, { skipOverlayManagement: true });
          armyMovementMode.setPathChangedCallback((path) => {
            this.plottedPath = path;
            this.updateComponentProps();
          });
          armyMovementMode.setPathCompleteCallback(async () => {
            logger.info("[ArmyDeploymentPanel] Path auto-completed, triggering roll");
            await this.handleDone();
          });
        }
      }
      this.panelState = "selection";
      await this.updateComponentProps();
      const ui = globalThis.ui;
      ui?.notifications?.info("Deployment cancelled. Select a path and try again.");
    };
    window.addEventListener("kingdomRollCancelled", this.rollCancelledHandler);
    logger.info("[ArmyDeploymentPanel] Roll cancellation listener attached");
  }
  /**
   * Select an army (from panel click or token click)
   */
  async selectArmy(armyId) {
    logger.info("[ArmyDeploymentPanel] Selecting army:", armyId);
    const armiesOnMap = await this.getArmiesOnMap();
    const armyData = armiesOnMap.find((a) => a.army.id === armyId);
    if (!armyData) {
      logger.error("[ArmyDeploymentPanel] Army not found on map");
      const ui = globalThis.ui;
      ui?.notifications?.error("Army not found on map");
      return;
    }
    if (armyData.deployed) {
      logger.warn("[ArmyDeploymentPanel] Army already deployed this turn:", armyData.army.name);
      const ui = globalThis.ui;
      ui?.notifications?.warn(`${armyData.army.name} has already moved this turn`);
      return;
    }
    if (!armyData.hexId) {
      logger.error("[ArmyDeploymentPanel] Could not find army hex");
      const ui = globalThis.ui;
      ui?.notifications?.error("Could not determine army location");
      return;
    }
    if (armyMovementMode.isActive()) {
      armyMovementMode.deactivate();
    }
    this.selectedArmyId = armyId;
    this.plottedPath = [];
    await armyMovementMode.activateForArmy(armyId, armyData.hexId, { skipOverlayManagement: true });
    await armyDeploymentBroadcastService.startBroadcast(armyId, armyData.army.name);
    armyMovementMode.setPathChangedCallback((path) => {
      this.plottedPath = path;
      this.updateComponentProps();
      armyDeploymentBroadcastService.updatePath(path);
    });
    armyMovementMode.setPathCompleteCallback(async () => {
      logger.info("[ArmyDeploymentPanel] Path auto-completed, triggering roll");
      await this.handleDone();
    });
    await this.updateComponentProps();
  }
  /**
   * Mount floating panel (Svelte component)
   */
  async mountPanel() {
    this.panelMountPoint = document.createElement("div");
    this.panelMountPoint.id = "army-deployment-panel-mount";
    document.body.appendChild(this.panelMountPoint);
    const { default: ArmyDeploymentPanelComponent } = await import("./ArmyDeploymentPanel-Dpxc4-N5.js");
    const armiesOnMap = await this.getArmiesOnMap();
    this.component = new ArmyDeploymentPanelComponent({
      target: this.panelMountPoint,
      props: {
        skill: this.skill,
        selectedArmyId: this.selectedArmyId,
        plottedPath: this.plottedPath,
        panelState: this.panelState,
        rollResult: this.rollResult,
        armiesOnMap,
        onCancel: () => {
          this.handleCancel().catch((err) => logger.error("[ArmyDeploymentPanel] Error in cancel handler:", err));
        },
        onDone: () => this.handleDone(),
        onConfirm: () => this.handleResultConfirm(),
        onOk: () => {
          this.handleCompletedOk().catch((err) => logger.error("[ArmyDeploymentPanel] Error in completed OK handler:", err));
        },
        onSelectArmy: (armyId) => this.selectArmy(armyId),
        onReroll: () => this.handleReroll(),
        currentFame: await this.getCurrentFame()
      }
    });
    await this.makePanelDraggable();
  }
  /**
   * Make panel draggable by the header
   */
  async makePanelDraggable() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const panel = document.querySelector(".army-deployment-panel");
    if (!panel) {
      logger.warn("[ArmyDeploymentPanel] Could not find panel element for dragging");
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
    logger.info("[ArmyDeploymentPanel] Panel is now draggable");
  }
  /**
   * Update component props when state changes
   */
  async updateComponentProps() {
    if (!this.component) return;
    const armiesOnMap = await this.getArmiesOnMap();
    const currentFame = await this.getCurrentFame();
    this.component.$set({
      selectedArmyId: this.selectedArmyId,
      plottedPath: this.plottedPath,
      panelState: this.panelState,
      rollResult: this.rollResult,
      armiesOnMap,
      currentFame
    });
  }
  /**
   * Get current kingdom fame
   */
  async getCurrentFame() {
    const kingdom = getKingdomData();
    return kingdom?.fame || 0;
  }
  /**
   * Get instance ID from pending outcomes in TurnStateStore
   */
  getInstanceId() {
    const actionInstances = getPendingOutcomesByType("action");
    const instance = actionInstances.find(
      (i) => i.checkId === "deploy-army"
    );
    return instance?.previewId || null;
  }
  /**
   * Handle reroll with fame
   */
  async handleReroll() {
    if (!this.selectedArmyId || !this.plottedPath || this.plottedPath.length < 2) {
      logger.error("[ArmyDeploymentPanel] Cannot reroll - missing army or path");
      return;
    }
    const fameCheck = await canRerollWithFame();
    if (!fameCheck.canReroll) {
      const ui = globalThis.ui;
      ui?.notifications?.warn(fameCheck.error || "Not enough fame to reroll");
      return;
    }
    const deductResult = await deductFameForReroll();
    if (!deductResult.success) {
      const ui = globalThis.ui;
      ui?.notifications?.error(deductResult.error || "Failed to deduct fame");
      return;
    }
    logger.info("[ArmyDeploymentPanel] Rerolling with fame, clearing instance and resetting to waiting state");
    const instanceId = this.getInstanceId();
    if (instanceId) {
      try {
        const checkInstanceService = await createOutcomePreviewService();
        await checkInstanceService.clearInstance(instanceId);
        logger.info("[ArmyDeploymentPanel] Cleared pipeline instance for reroll:", instanceId);
      } catch (error) {
        logger.error("[ArmyDeploymentPanel] Failed to clear instance before reroll:", error);
      }
    }
    this.panelState = "waiting-for-roll";
    this.rollResult = null;
    await this.updateComponentProps();
    try {
      const { getPipelineCoordinator } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cS);
      const { getCurrentUserCharacter, showCharacterSelectionDialog } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cF);
      const pipelineCoordinator = await getPipelineCoordinator();
      let actingCharacter = getCurrentUserCharacter();
      if (!actingCharacter) {
        actingCharacter = await showCharacterSelectionDialog();
        if (!actingCharacter) {
          if (deductResult.previousFame !== void 0) {
            await restoreFameAfterFailedReroll(deductResult.previousFame);
          }
          this.panelState = "showing-result";
          await this.updateComponentProps();
          return;
        }
      }
      const kingdom = getKingdomData();
      const army = kingdom?.armies?.find((a) => a.id === this.selectedArmyId);
      logger.info("[ArmyDeploymentPanel] Re-executing pipeline for reroll", {
        skill: this.skill,
        armyId: this.selectedArmyId,
        pathLength: this.plottedPath.length
      });
      await pipelineCoordinator.executePipeline("deploy-army", {
        actor: {
          selectedSkill: this.skill,
          fullActor: actingCharacter,
          actorName: actingCharacter.name,
          actorId: actingCharacter.id,
          level: actingCharacter.level || 1,
          proficiencyRank: 0
          // TODO: Get from actor
        },
        metadata: {
          armyId: this.selectedArmyId || void 0,
          path: this.plottedPath,
          deploymentArmyName: army?.name || "Unknown"
        }
      });
      logger.info("[ArmyDeploymentPanel] Pipeline reroll complete - Foundry dialog should have opened");
    } catch (error) {
      logger.error("[ArmyDeploymentPanel] Error during reroll:", error);
      if (deductResult.previousFame !== void 0) {
        await restoreFameAfterFailedReroll(deductResult.previousFame);
      }
      const ui = globalThis.ui;
      ui?.notifications?.error("Failed to reroll. Fame has been restored.");
      this.panelState = "showing-result";
      await this.updateComponentProps();
    }
  }
  /**
   * Handle OK button click in completed state
   */
  async handleCompletedOk() {
    logger.info("[ArmyDeploymentPanel] OK clicked, completing deployment");
    const instanceId = this.getInstanceId();
    if (instanceId) {
      try {
        const checkInstanceService = await createOutcomePreviewService();
        await checkInstanceService.clearInstance(instanceId);
        logger.info("[ArmyDeploymentPanel] Cleared pipeline instance:", instanceId);
      } catch (error) {
        logger.error("[ArmyDeploymentPanel] Failed to clear instance:", error);
      }
    }
    const finalNavCell = armyMovementMode.getFinalNavCell();
    const deploymentResult = {
      armyId: this.selectedArmyId,
      path: this.plottedPath,
      skill: this.skill,
      finalNavCell: finalNavCell ?? void 0
    };
    const resolver_callback = this.resolve;
    await this.cleanup();
    resolver_callback?.(deploymentResult);
  }
  /**
   * Handle Done button click - triggers roll instead of completing
   */
  async handleDone() {
    if (!this.selectedArmyId || this.plottedPath.length < 2) {
      return;
    }
    logger.info("[ArmyDeploymentPanel] Done clicked, triggering roll:", {
      armyId: this.selectedArmyId,
      pathLength: this.plottedPath.length,
      skill: this.skill
    });
    if (armyMovementMode.isActive()) {
      armyMovementMode.deactivate();
    }
    await this.sceneManager?.showRelevantOverlays("movement");
    this.panelState = "waiting-for-roll";
    await this.updateComponentProps();
    await armyDeploymentBroadcastService.updatePanelState("waiting-for-roll");
    if (this.onRollTrigger) {
      try {
        await this.onRollTrigger(this.skill, this.selectedArmyId, this.plottedPath);
      } catch (error) {
        logger.error("[ArmyDeploymentPanel] Roll trigger failed:", error);
        this.panelState = "selection";
        await this.updateComponentProps();
        const ui = globalThis.ui;
        ui?.notifications?.error("Failed to trigger roll");
      }
    }
  }
  /**
   * Handle result confirmation - apply effects, animate, restore app
   */
  async handleResultConfirm() {
    if (!this.selectedArmyId || !this.rollResult) {
      return;
    }
    logger.info("[ArmyDeploymentPanel] Result confirmed, applying effects and animating");
    this.panelState = "animating";
    await this.updateComponentProps();
    await armyDeploymentBroadcastService.updatePanelState("animating");
    try {
      const actionData = await this.getDeployActionData();
      if (!actionData) {
        throw new Error("Failed to load deploy army action data");
      }
      const effect = actionData.effects?.[this.rollResult.outcome];
      const gameCommand = effect?.gameCommands?.find((cmd) => cmd.type === "deployArmy");
      const conditionsToApply = gameCommand?.conditionsToApply || [];
      const { getGameCommandRegistry } = await import("./GameCommandHandlerRegistry-BSE8WDpR.js");
      const registry = getGameCommandRegistry();
      const kingdom = getPartyActor()?.getKingdomData();
      const preparedCommand = await registry.process(
        {
          type: "deployArmy",
          armyId: this.selectedArmyId,
          path: this.plottedPath,
          conditionsToApply
        },
        {
          kingdom,
          outcome: this.rollResult.outcome,
          metadata: {},
          actionId: "deploy-army",
          pendingActions: [],
          pendingState: {}
        }
      );
      if (!preparedCommand) {
        throw new Error("Failed to prepare army deployment");
      }
      if (preparedCommand.commit) {
        await preparedCommand.commit();
      }
      const game = globalThis.game;
      const userId = game?.user?.id;
      const userName = game?.user?.name;
      if (userId && userName) {
        const { createGameCommandsService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cH);
        const gameCommandsService = await createGameCommandsService();
        const { TurnPhase } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.co);
        const actorName = this.rollResult.actorName || "Unknown";
        const actionNameWithOutcome = `deploy-army-${this.rollResult.outcome}`;
        await gameCommandsService.trackPlayerAction(
          userId,
          userName,
          actorName,
          actionNameWithOutcome,
          TurnPhase.ACTIONS
        );
      }
      logger.info("[ArmyDeploymentPanel] Effects applied, switching to completed state");
      this.panelState = "completed";
      await this.updateComponentProps();
      await armyDeploymentBroadcastService.updatePanelState("completed");
    } catch (error) {
      logger.error("[ArmyDeploymentPanel] Failed to apply effects:", error);
      const ui = globalThis.ui;
      ui?.notifications?.error(`Deployment failed: ${error}`);
      this.panelState = "selection";
      await this.updateComponentProps();
    }
  }
  /**
   * Get deploy army action data
   */
  async getDeployActionData() {
    try {
      const { pipelineRegistry } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cO);
      const action = pipelineRegistry.getPipeline("deploy-army");
      return action;
    } catch (error) {
      logger.error("[ArmyDeploymentPanel] Failed to load action data:", error);
      return null;
    }
  }
  /**
   * Handle Cancel button click
   */
  async handleCancel() {
    logger.info("[ArmyDeploymentPanel] Deployment cancelled");
    if (this.panelState === "showing-result" || this.panelState === "animating" || this.panelState === "completed") {
      const instanceId = this.getInstanceId();
      if (instanceId) {
        try {
          const checkInstanceService = await createOutcomePreviewService();
          await checkInstanceService.clearInstance(instanceId);
          logger.info("[ArmyDeploymentPanel] Cleared pipeline instance:", instanceId);
        } catch (error) {
          logger.error("[ArmyDeploymentPanel] Failed to clear instance:", error);
        }
      }
    }
    const resolver = this.resolve;
    await this.cleanup();
    resolver?.(null);
  }
  /**
   * Cleanup and restore state
   */
  async cleanup() {
    const canvas = globalThis.canvas;
    if (this.tokenClickHandler) {
      canvas?.stage?.off("pointerdown", this.tokenClickHandler);
      this.tokenClickHandler = null;
    }
    if (this.keyDownHandler) {
      document.removeEventListener("keydown", this.keyDownHandler);
      this.keyDownHandler = null;
    }
    if (this.rollCompleteHandler) {
      window.removeEventListener("kingdomRollComplete", this.rollCompleteHandler);
      this.rollCompleteHandler = null;
    }
    if (this.rollCancelledHandler) {
      window.removeEventListener("kingdomRollCancelled", this.rollCancelledHandler);
      this.rollCancelledHandler = null;
    }
    armyDeploymentBroadcastService.endBroadcast().catch(
      (err) => logger.error("[ArmyDeploymentPanel] Failed to end broadcast:", err)
    );
    if (armyMovementMode.isActive()) {
      armyMovementMode.deactivate();
    }
    if (this.component) {
      this.component.$destroy();
      this.component = null;
    }
    if (this.panelMountPoint) {
      this.panelMountPoint.remove();
      this.panelMountPoint = null;
    }
    if (this.sceneManager) {
      await this.sceneManager.restoreOverlays();
      this.sceneManager.restoreReignmakerApp();
      this.sceneManager = null;
    }
    this.active = false;
    this.skill = "";
    this.selectedArmyId = null;
    this.plottedPath = [];
    this.resolve = null;
    this.onRollTrigger = null;
    this.panelState = "selection";
    this.rollResult = null;
  }
}
const armyDeploymentPanel = new ArmyDeploymentPanel();
export {
  ArmyDeploymentPanel,
  armyDeploymentPanel
};
