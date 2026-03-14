import { aQ as getAdjacentHexIds, R as ReignMakerMapLayer, S as SceneManager, l as logger, aY as disableCanvasLayerInteractivity, aZ as provinces, x as get_store_value, P as PLAYER_KINGDOM, a_ as assignHexToProvince, a$ as restoreCanvasLayerInteractivity, y as kingdomData } from "./GameCommandUtils-D_sgs3NK.js";
function isContiguousAddition(existingHexIds, newHexId) {
  if (existingHexIds.length === 0) {
    return true;
  }
  const existingSet = new Set(existingHexIds);
  const neighbors = getAdjacentHexIds(newHexId);
  return neighbors.some((neighbor) => existingSet.has(neighbor));
}
const PROVINCE_COLORS = [
  5025616,
  // Green
  2201331,
  // Blue
  16750592,
  // Orange
  10233776,
  // Purple
  48340,
  // Cyan
  15277667,
  // Pink
  9159498,
  // Light Green
  4149685,
  // Indigo
  16771899,
  // Yellow
  7951688,
  // Brown
  6323595,
  // Blue Grey
  16007990
  // Red
];
class ProvinceEditorService {
  active = false;
  mapLayer;
  sceneManager;
  panelElement = null;
  panelComponent = null;
  selectedProvinceId = null;
  config = null;
  pointerDownHandler = null;
  pointerMoveHandler = null;
  pointerUpHandler = null;
  lastHoveredHexId = null;
  isPainting = false;
  paintedHexesThisDrag = /* @__PURE__ */ new Set();
  provincesUnsubscribe = null;
  previousActiveControl = null;
  previousTokenActiveTool = null;
  savedLayerInteractivity = /* @__PURE__ */ new Map();
  constructor() {
    this.mapLayer = ReignMakerMapLayer.getInstance();
    this.sceneManager = new SceneManager(this.mapLayer);
  }
  /**
   * Start province editing mode
   */
  async start(config) {
    if (this.active) {
      logger.warn("[ProvinceEditor] Already active");
      return;
    }
    this.config = config || {};
    this.active = true;
    this.selectedProvinceId = null;
    logger.info("[ProvinceEditor] Starting province editor");
    try {
      this.sceneManager.minimizeReignmakerApp();
      this.savedLayerInteractivity = disableCanvasLayerInteractivity();
      this.disableTokenSceneControl();
      await this.sceneManager.showRelevantOverlays("province-editing");
      this.mountPanel();
      this.attachCanvasListeners();
      this.provincesUnsubscribe = provinces.subscribe(() => {
        if (this.active && this.panelComponent) {
          this.panelComponent.$set({ provinces: this.getProvinces() });
        }
      });
      const ui = globalThis.ui;
      ui?.notifications?.info("Click hexes to assign them to the selected province");
    } catch (error) {
      logger.error("[ProvinceEditor] Failed to start:", error);
      this.cleanup();
    }
  }
  /**
   * Get the color for a province based on its index in the provinces array
   * Matches the color logic in ProvincesFillOverlay
   */
  getProvinceColor(provinceId) {
    const currentProvinces = this.getProvinces();
    const index = currentProvinces.findIndex((p) => p.id === provinceId);
    if (index === -1) return 8421504;
    return PROVINCE_COLORS[index % PROVINCE_COLORS.length];
  }
  /**
   * Stop province editing mode
   */
  async stop() {
    await this.cleanup();
    this.config?.onComplete?.();
  }
  /**
   * Cancel province editing mode
   */
  async cancel() {
    await this.cleanup();
    this.config?.onCancel?.();
  }
  /**
   * Set the currently selected province for painting
   */
  setSelectedProvince(provinceId) {
    this.selectedProvinceId = provinceId;
    if (this.panelComponent) {
      this.panelComponent.$set({ selectedProvinceId: provinceId });
    }
    logger.info(`[ProvinceEditor] Selected province: ${provinceId || "None"}`);
  }
  /**
   * Get current provinces from store
   */
  getProvinces() {
    return get_store_value(provinces);
  }
  /**
   * Disable Foundry scene controls to hide hex highlight outline
   * Sets activeControl to null rather than switching to another control
   */
  disableTokenSceneControl() {
    try {
      const ui = globalThis.ui;
      if (!ui?.controls?.control) {
        logger.warn("[ProvinceEditor] SceneControls not available");
        return;
      }
      const controls = ui.controls.control;
      this.previousActiveControl = controls.activeControl || null;
      const tokenControl = controls.controls?.["token"];
      if (tokenControl && this.previousActiveControl === "token") {
        this.previousTokenActiveTool = tokenControl.activeTool || null;
      } else {
        this.previousTokenActiveTool = null;
      }
      controls.activeControl = null;
      controls.render();
      logger.info("[ProvinceEditor] Disabled scene controls");
    } catch (error) {
      logger.warn("[ProvinceEditor] Failed to disable scene controls:", error);
    }
  }
  /**
   * Restore previous active scene control and tool
   */
  restoreTokenSceneControl() {
    try {
      const ui = globalThis.ui;
      if (!ui?.controls?.control) {
        logger.warn("[ProvinceEditor] SceneControls not available for restore");
        return;
      }
      const controls = ui.controls.control;
      if (this.previousActiveControl !== null) {
        controls.activeControl = this.previousActiveControl;
        if (this.previousActiveControl === "token" && this.previousTokenActiveTool !== null) {
          const tokenControl = controls.controls?.["token"];
          if (tokenControl) {
            tokenControl.activeTool = this.previousTokenActiveTool;
          }
        }
        controls.render();
        logger.info(`[ProvinceEditor] Restored previous active control: ${this.previousActiveControl}`);
      } else {
        controls.activeControl = null;
        controls.render();
        logger.info("[ProvinceEditor] Cleared active control (no previous state)");
      }
      this.previousActiveControl = null;
      this.previousTokenActiveTool = null;
    } catch (error) {
      logger.warn("[ProvinceEditor] Failed to restore token scene control:", error);
    }
  }
  /**
   * Mount the floating panel
   */
  mountPanel() {
    this.panelElement = document.createElement("div");
    this.panelElement.id = "province-editor-panel-mount";
    document.body.appendChild(this.panelElement);
    import("./ProvinceEditorPanel-yyGbFvIi.js").then(({ default: ProvinceEditorPanel }) => {
      this.panelComponent = new ProvinceEditorPanel({
        target: this.panelElement,
        props: {
          provinces: this.getProvinces(),
          selectedProvinceId: this.selectedProvinceId,
          onProvinceSelect: (id) => this.setSelectedProvince(id),
          onDone: () => this.stop(),
          onCancel: () => this.cancel()
        }
      });
    });
  }
  /**
   * Attach direct event listeners to canvas stage
   * Uses capture phase to intercept events BEFORE Foundry's handlers
   */
  attachCanvasListeners() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) {
      logger.warn("[ProvinceEditor] Canvas stage not available");
      return;
    }
    this.pointerDownHandler = this.handlePointerDown.bind(this);
    this.pointerMoveHandler = this.handlePointerMove.bind(this);
    this.pointerUpHandler = this.handlePointerUp.bind(this);
    canvas.stage.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
    canvas.stage.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    canvas.stage.addEventListener("pointerup", this.pointerUpHandler, { capture: true });
    logger.info("[ProvinceEditor] Attached direct event listeners");
  }
  /**
   * Detach canvas listeners
   */
  detachCanvasListeners() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) return;
    if (this.pointerDownHandler) {
      canvas.stage.removeEventListener("pointerdown", this.pointerDownHandler, { capture: true });
      this.pointerDownHandler = null;
    }
    if (this.pointerMoveHandler) {
      canvas.stage.removeEventListener("pointermove", this.pointerMoveHandler, { capture: true });
      this.pointerMoveHandler = null;
    }
    if (this.pointerUpHandler) {
      canvas.stage.removeEventListener("pointerup", this.pointerUpHandler, { capture: true });
      this.pointerUpHandler = null;
    }
    logger.info("[ProvinceEditor] Removed direct event listeners");
  }
  /**
   * Handle pointer down event
   */
  async handlePointerDown(event) {
    if (!this.active) return;
    if (event.button === 2) return;
    const target = event.target;
    if (target?.closest?.(".province-editor-panel")) {
      return;
    }
    event.stopImmediatePropagation();
    event.stopPropagation();
    const hexId = this.getHexIdFromPointerEvent(event);
    if (!hexId) return;
    this.isPainting = true;
    this.paintedHexesThisDrag.clear();
    await this.paintHex(hexId);
    this.paintedHexesThisDrag.add(hexId);
  }
  /**
   * Handle pointer move event
   */
  async handlePointerMove(event) {
    if (!this.active) return;
    if (event.buttons & 2) return;
    event.stopImmediatePropagation();
    event.stopPropagation();
    const hexId = this.getHexIdFromPointerEvent(event);
    if (this.isPainting && hexId && !this.paintedHexesThisDrag.has(hexId)) {
      await this.paintHex(hexId);
      this.paintedHexesThisDrag.add(hexId);
    }
    if (hexId !== this.lastHoveredHexId) {
      this.lastHoveredHexId = hexId;
      if (!hexId) {
        this.mapLayer.hideInteractiveHover();
        return;
      }
      const kingdom = get_store_value(kingdomData);
      const hex = kingdom.hexes.find((h) => h.id === hexId);
      if (!hex || hex.claimedBy !== PLAYER_KINGDOM) {
        this.mapLayer.showInteractiveHover(hexId, {
          fillColor: 16711680,
          fillAlpha: 0.2
        });
      } else if (this.selectedProvinceId === null) {
        this.mapLayer.showInteractiveHover(hexId, {
          fillColor: 8947848,
          fillAlpha: 0.1,
          borderColor: 8947848,
          borderAlpha: 0.5,
          borderWidth: 2
        });
      } else {
        const color = this.getProvinceColor(this.selectedProvinceId);
        this.mapLayer.showInteractiveHover(hexId, {
          fillColor: color,
          fillAlpha: 0.4,
          borderColor: color,
          borderAlpha: 0.8,
          borderWidth: 2
        });
      }
    }
  }
  /**
   * Handle pointer up event
   */
  handlePointerUp(event) {
    if (!this.active) return;
    if (event.button === 2) return;
    if (this.isPainting) {
      this.isPainting = false;
      this.paintedHexesThisDrag.clear();
    }
  }
  /**
   * Paint a hex with the selected province
   */
  async paintHex(hexId) {
    const kingdom = get_store_value(kingdomData);
    const hex = kingdom.hexes.find((h) => h.id === hexId);
    if (!hex || hex.claimedBy !== PLAYER_KINGDOM) {
      return;
    }
    if (this.selectedProvinceId) {
      const province = kingdom.provinces?.find((p) => p.id === this.selectedProvinceId);
      if (province && province.hexIds.length > 0 && !province.hexIds.includes(hexId)) {
        if (!isContiguousAddition(province.hexIds, hexId)) {
          return;
        }
      }
    }
    await assignHexToProvince(hexId, this.selectedProvinceId);
    logger.info(`[ProvinceEditor] Assigned hex ${hexId} to province ${this.selectedProvinceId || "None"}`);
  }
  /**
   * Get hex ID from pointer event
   */
  getHexIdFromPointerEvent(event) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return null;
    const point = { x: event.clientX, y: event.clientY };
    const canvasPos = canvas.canvasCoordinatesFromClient(point);
    if (!canvasPos) return null;
    const offset = canvas.grid.getOffset(canvasPos);
    if (!offset) return null;
    return `${offset.i}.${offset.j}`;
  }
  /**
   * Cleanup and restore state
   */
  async cleanup() {
    if (this.provincesUnsubscribe) {
      this.provincesUnsubscribe();
      this.provincesUnsubscribe = null;
    }
    this.detachCanvasListeners();
    this.mapLayer.hideInteractiveHover();
    await this.sceneManager.restoreOverlays();
    this.sceneManager.restoreReignmakerApp();
    if (this.panelComponent) {
      this.panelComponent.$destroy();
      this.panelComponent = null;
    }
    if (this.panelElement) {
      this.panelElement.remove();
      this.panelElement = null;
    }
    restoreCanvasLayerInteractivity(this.savedLayerInteractivity);
    this.savedLayerInteractivity.clear();
    this.restoreTokenSceneControl();
    this.active = false;
    this.config = null;
    this.selectedProvinceId = null;
    this.lastHoveredHexId = null;
    logger.info("[ProvinceEditor] Cleaned up");
  }
}
const provinceEditorService = new ProvinceEditorService();
export {
  ProvinceEditorService,
  provinceEditorService
};
