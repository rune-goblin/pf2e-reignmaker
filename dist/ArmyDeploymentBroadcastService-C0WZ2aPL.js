import { R as ReignMakerMapLayer, W as updateTurnState, l as logger, x as get_store_value, X as updateBroadcastHover, Y as appWindowManager, Z as turnStateData } from "./GameCommandUtils-D_sgs3NK.js";
const DEBOUNCE_MS = 100;
const HOVER_DEBOUNCE_MS = 50;
class ArmyDeploymentBroadcastService {
  mapLayer;
  // Observer mode state
  isObserving = false;
  // Debounce timers
  pathDebounceTimer = null;
  hoverDebounceTimer = null;
  constructor() {
    this.mapLayer = ReignMakerMapLayer.getInstance();
  }
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
   * Start broadcasting army deployment to other players
   */
  async startBroadcast(armyId, armyName) {
    const game = globalThis.game;
    await updateTurnState((ts) => {
      ts.activeBroadcast = {
        type: "armyDeployment",
        initiatorId: game.user.id,
        initiatorName: this.getCurrentUserDisplayName(),
        armyId,
        armyName,
        path: [],
        hoveredHex: null,
        panelState: "selection"
      };
    });
    logger.info("[ArmyDeploymentBroadcast] Started broadcast");
  }
  /**
   * Update the path (debounced)
   */
  updatePath(path) {
    if (this.pathDebounceTimer) {
      window.clearTimeout(this.pathDebounceTimer);
    }
    this.pathDebounceTimer = window.setTimeout(async () => {
      await this.doUpdatePath(path);
    }, DEBOUNCE_MS);
  }
  async doUpdatePath(path) {
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    if (ab?.type !== "armyDeployment") return;
    await updateTurnState((ts) => {
      const broadcast = ts.activeBroadcast;
      if (broadcast?.type !== "armyDeployment") return;
      broadcast.path = path;
    });
    logger.debug("[ArmyDeploymentBroadcast] Updated path:", path.length, "hexes");
  }
  /**
   * Update hovered hex (debounced, uses lightweight hover path)
   */
  updateHover(hexId) {
    if (this.hoverDebounceTimer) {
      window.clearTimeout(this.hoverDebounceTimer);
    }
    this.hoverDebounceTimer = window.setTimeout(async () => {
      await updateBroadcastHover({ hoveredHex: hexId });
      logger.debug("[ArmyDeploymentBroadcast] Updated hover:", hexId);
    }, HOVER_DEBOUNCE_MS);
  }
  /**
   * Update panel state
   */
  async updatePanelState(panelState, rollResult) {
    await updateTurnState((ts) => {
      const broadcast = ts.activeBroadcast;
      if (broadcast?.type !== "armyDeployment") return;
      broadcast.panelState = panelState;
      if (rollResult) broadcast.rollResult = rollResult;
    });
    logger.debug("[ArmyDeploymentBroadcast] Updated panel state:", panelState);
  }
  /**
   * End the broadcast
   */
  async endBroadcast() {
    if (this.pathDebounceTimer) {
      window.clearTimeout(this.pathDebounceTimer);
      this.pathDebounceTimer = null;
    }
    if (this.hoverDebounceTimer) {
      window.clearTimeout(this.hoverDebounceTimer);
      this.hoverDebounceTimer = null;
    }
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    if (ab?.type !== "armyDeployment") return;
    await updateTurnState((ts) => {
      ts.activeBroadcast = null;
    });
    logger.info("[ArmyDeploymentBroadcast] Ended broadcast");
  }
  // ===== OBSERVER RENDERING (called by BroadcastObserver.svelte) =====
  /**
   * Enter observer mode - set up map display for watching deployment
   */
  async enterObserverMode(state) {
    logger.info("[ArmyDeploymentBroadcast] Entering observer mode");
    this.isObserving = true;
    appWindowManager.enterMapMode("hide");
    this.mapLayer.showPixiContainer();
    this.renderObserverPath(state);
  }
  /**
   * Update observer display when broadcast state changes
   */
  async updateObserverDisplay(state, hover) {
    this.renderObserverPath(state, hover);
  }
  /**
   * Exit observer mode - clean up map display
   */
  async exitObserverMode() {
    logger.info("[ArmyDeploymentBroadcast] Exiting observer mode");
    this.isObserving = false;
    this.clearPathVisualization();
    appWindowManager.exitMapMode();
  }
  /**
   * Render path visualization for observer
   */
  renderObserverPath(state, hover) {
    this.clearPathVisualization();
    const pathStyle = { fillColor: 9498256, fillAlpha: 0.4 };
    for (let i = 0; i < state.path.length; i++) {
      const hexId = state.path[i];
      const isOrigin = i === 0;
      const isDestination = i === state.path.length - 1;
      if (isOrigin) {
        this.mapLayer.addHexToSelection(hexId, { fillColor: 16777215, fillAlpha: 0.3 });
      } else if (isDestination) {
        this.mapLayer.addHexToSelection(hexId, { fillColor: 5025616, fillAlpha: 0.5 });
      } else {
        this.mapLayer.addHexToSelection(hexId, pathStyle);
      }
    }
    const hoveredHex = hover?.hexId ?? state.hoveredHex;
    if (hoveredHex && !state.path.includes(hoveredHex)) {
      const hoverStyle = { fillColor: 9498256, fillAlpha: 0.2 };
      this.mapLayer.showInteractiveHover(hoveredHex, hoverStyle);
    } else {
      this.mapLayer.hideInteractiveHover();
    }
  }
  clearPathVisualization() {
    this.mapLayer.clearSelection();
    this.mapLayer.hideInteractiveHover();
  }
  // ===== UTILITY =====
  getCurrentState() {
    const state = get_store_value(turnStateData);
    const ab = state.activeBroadcast;
    return ab?.type === "armyDeployment" ? ab : null;
  }
  isInObserverMode() {
    return this.isObserving;
  }
}
const armyDeploymentBroadcastService = new ArmyDeploymentBroadcastService();
export {
  ArmyDeploymentBroadcastService,
  armyDeploymentBroadcastService
};
