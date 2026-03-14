import { au as writable, av as derived, x as get_store_value, l as logger, p as getKingdomData, c7 as getAdjacentHexes, q as updateKingdom, c8 as getConnectorAtPosition, c9 as syncTradeNetwork, ca as createSettlement, al as SettlementTier, ae as currentTurn, R as ReignMakerMapLayer, aY as disableCanvasLayerInteractivity, a$ as restoreCanvasLayerInteractivity } from "./GameCommandUtils-D_sgs3NK.js";
import { computeBarrierSegments } from "./barrierSegmentUtils-DMoiIGfR.js";
const CELL_LAKE_LAYERS = {
  grid: "cell-lake-grid",
  // Background point grid (optional)
  editor: "cell-lake-editor",
  // Current lake cells
  preview: "cell-lake-preview"
  // Brush preview
};
const CELL_LAKE_Z_INDICES = {
  // Background grid (below river grid)
  editor: 44,
  // Below river editor
  preview: 47
  // Above editor layers for visibility
};
const CELL_SIZE$2 = 8;
const activeEditorSection = writable(null);
function setActiveEditorSection(section) {
  activeEditorSection.set(section);
}
function clearActiveEditorSection() {
  activeEditorSection.set(null);
}
const WIZARD_STEPS = [
  "terrain",
  "rivers",
  "water",
  "crossings",
  "roads",
  "bounty",
  "worksites",
  "settlements",
  "fortifications",
  "territory"
];
const WIZARD_STEP_CONFIG = {
  terrain: {
    title: "Terrain Types",
    description: "Paint the terrain for each hex. Terrain affects travel speed and resource collection.",
    tips: [
      "Click a terrain type, then click or drag on hexes to paint",
      "Forests provide lumber, hills provide stone, mountains provide ore",
      "Only mark hexes that are completely filled with water as water terrain."
    ],
    icon: "fa-mountain",
    editorMode: "terrain"
  },
  rivers: {
    title: "Rivers",
    description: "Draw rivers across your map. Rivers block movement unless crossed at bridges or fords.",
    tips: [
      "Click and drag to draw a river path",
      "Rivers flow in the direction they are drawn, use the flip direction on a selected river to switch it"
    ],
    icon: "fa-water",
    editorMode: "rivers"
  },
  water: {
    title: "Water",
    description: "Paint water features on your map. Rivers you drew in the previous step are shown here. Use the water brush to add lakes and expand water areas.",
    tips: [
      "Click and drag to paint water areas",
      "Rivers from the previous step are shown in blue"
    ],
    icon: "fa-water",
    editorMode: "water"
  },
  crossings: {
    title: "River Crossings",
    description: "Place bridges and fords where paths cross rivers. Without crossings, armies cannot pass.",
    tips: [
      "Paint crossing cells on river edges",
      "Crossings allow movement across rivers"
    ],
    icon: "fa-bridge",
    editorMode: "crossings"
  },
  roads: {
    title: "Roads",
    description: "Draw the road network. Roads speed up travel and are required for trade routes.",
    tips: [
      "Click hexes to toggle roads",
      "Roads automatically connect to adjacent road hexes",
      "Use scissors tool to remove road connections"
    ],
    icon: "fa-road",
    editorMode: "roads"
  },
  bounty: {
    title: "Resource Bounties",
    description: "Mark hexes with natural resource deposits. These provide bonuses when claimed.",
    tips: [
      "Food (wheat) - bonus food production",
      "Lumber (tree) - bonus building materials",
      "Stone/Ore/Gold - special resource deposits"
    ],
    icon: "fa-gem",
    editorMode: "bounty"
  },
  worksites: {
    title: "Worksites",
    description: "Place resource-gathering locations. Each worksite type has terrain requirements.",
    tips: [
      "Farms: plains or hills",
      "Logging camps: forest hexes only",
      "Mines: mountains or swamps",
      "Quarries: hills or mountains"
    ],
    icon: "fa-hammer",
    editorMode: "worksites",
    optional: true
  },
  settlements: {
    title: "Settlements",
    description: "Settlement hexes show settlement location and basic information like name, level, and ownership. Additional details can be created on the Settlements tab.",
    tips: [
      "Click to place or edit a settlement",
      "Settlements are owned by whatever faction claims that hex.",
      "You don't need to detail an entire settlement if name and level are enough.",
      "Settlements can be upgraded over time"
    ],
    icon: "fa-city",
    editorMode: "settlements",
    optional: true
  },
  fortifications: {
    title: "Fortifications",
    description: "Place defensive structures to protect your borders. Higher tiers provide better defense. Structures beyond earthworks have maintenance cost for full effectiveness.",
    tips: [
      "Tier 1: Earthworks (basic defense)",
      "Tier 2: Wooden Tower (improved)",
      "Tier 3: Stone Tower (strong)",
      "Tier 4: Fortress (maximum defense)"
    ],
    icon: "fa-chess-rook",
    editorMode: "fortifications",
    optional: true
  },
  territory: {
    title: "Territory Claims",
    description: "Paint which hexes belong to the Players kingdom, other factions, or unclaimed wilderness.",
    tips: [
      "Select owner from dropdown, then paint hexes",
      "Player Kingdom is your domain",
      "Create factions for rival nations or monsters"
    ],
    icon: "fa-flag",
    editorMode: "territory",
    optional: true
  }
};
const initialState = {
  active: false,
  currentStep: null,
  stepIndex: -1,
  completedSteps: [],
  skippedSteps: []
};
const wizardState = writable(initialState);
const isWizardActive = derived(wizardState, ($state) => $state.active);
derived(wizardState, ($state) => $state.currentStep);
const wizardStepIndex = derived(wizardState, ($state) => $state.stepIndex);
const totalWizardSteps = WIZARD_STEPS.length;
const currentStepConfig = derived(wizardState, ($state) => {
  if (!$state.currentStep) return null;
  return WIZARD_STEP_CONFIG[$state.currentStep];
});
function startWizard() {
  wizardState.set({
    active: true,
    currentStep: WIZARD_STEPS[0],
    stepIndex: 0,
    completedSteps: [],
    skippedSteps: []
  });
}
function nextStep() {
  wizardState.update((state) => {
    if (!state.active || state.currentStep === null) return state;
    const newCompleted = [...state.completedSteps];
    if (!newCompleted.includes(state.currentStep)) {
      newCompleted.push(state.currentStep);
    }
    const nextIndex = state.stepIndex + 1;
    if (nextIndex >= WIZARD_STEPS.length) {
      return {
        ...state,
        active: false,
        currentStep: null,
        stepIndex: -1,
        completedSteps: newCompleted
      };
    }
    return {
      ...state,
      currentStep: WIZARD_STEPS[nextIndex],
      stepIndex: nextIndex,
      completedSteps: newCompleted
    };
  });
}
function previousStep() {
  wizardState.update((state) => {
    if (!state.active || state.stepIndex <= 0) return state;
    const prevIndex = state.stepIndex - 1;
    const newCompleted = state.completedSteps.filter((s) => s !== WIZARD_STEPS[prevIndex]);
    const newSkipped = state.skippedSteps.filter((s) => s !== WIZARD_STEPS[prevIndex]);
    return {
      ...state,
      currentStep: WIZARD_STEPS[prevIndex],
      stepIndex: prevIndex,
      completedSteps: newCompleted,
      skippedSteps: newSkipped
    };
  });
}
function finishWizard() {
  wizardState.update((state) => {
    const allSkipped = [...state.skippedSteps];
    for (let i = state.stepIndex; i < WIZARD_STEPS.length; i++) {
      const step = WIZARD_STEPS[i];
      if (!state.completedSteps.includes(step) && !allSkipped.includes(step)) {
        allSkipped.push(step);
      }
    }
    return {
      ...initialState,
      completedSteps: state.completedSteps,
      skippedSteps: allSkipped
    };
  });
}
const guidedModePositions = writable({});
function setGuidedModePositions(positions) {
  guidedModePositions.set(positions);
}
function clearGuidedModePositions() {
  guidedModePositions.set({});
}
function getGuidedModePosition(panel) {
  return get_store_value(guidedModePositions)[panel];
}
class EditorDebugHandlers {
  debugHexMode = false;
  debugNeighborsMode = false;
  debugClickHandler = null;
  /**
   * Toggle hex debug mode
   */
  toggleDebugHex() {
    this.debugHexMode = !this.debugHexMode;
    const status = this.debugHexMode ? "enabled" : "disabled";
    this.updateDebugListener();
    console.log(`%c🐛 Hex Debug: ${status.toUpperCase()}`, "font-size: 14px; font-weight: bold; color: " + (this.debugHexMode ? "#00FF00" : "#FF0000"));
    return this.debugHexMode;
  }
  /**
   * Toggle neighbors debug mode
   */
  toggleDebugNeighbors() {
    this.debugNeighborsMode = !this.debugNeighborsMode;
    const status = this.debugNeighborsMode ? "enabled" : "disabled";
    this.updateDebugListener();
    console.log(`%c🐛 Neighbors Debug: ${status.toUpperCase()}`, "font-size: 14px; font-weight: bold; color: " + (this.debugNeighborsMode ? "#00FF00" : "#FF0000"));
    return this.debugNeighborsMode;
  }
  /**
   * Check if hex debug mode is active
   */
  isDebugHexMode() {
    return this.debugHexMode;
  }
  /**
   * Check if neighbors debug mode is active
   */
  isDebugNeighborsMode() {
    return this.debugNeighborsMode;
  }
  /**
   * Update debug listener based on active modes
   */
  updateDebugListener() {
    this.removeDebugListener();
    if (this.debugHexMode || this.debugNeighborsMode) {
      this.attachDebugListener();
    }
  }
  /**
   * Attach global debug click listener
   */
  attachDebugListener() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) {
      logger.warn("[EditorDebugHandlers] Cannot attach debug listener - canvas not available");
      return;
    }
    this.debugClickHandler = async (event) => {
      if (event.button !== 0) return;
      const canvas2 = globalThis.canvas;
      if (!canvas2?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas2.canvasCoordinatesFromClient(point);
      const offset = canvas2.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (this.debugHexMode) {
        console.log(`%c🗺️ Clicked Hex: ${hexId} [${offset.i}:${offset.j}]`, "font-size: 12px; color: #00BFFF; font-weight: bold;");
        try {
          const kingdom = getKingdomData();
          const hex = kingdom.hexes.find((h) => h.id === hexId);
          if (hex) {
            const hexAny = hex;
            console.group(`%c📋 Hex ${hexId} Data`, "color: #00BFFF;");
            console.log("Terrain:", hex.terrain || "unknown", " | Travel:", hexAny.travel || "unknown");
            console.log("Claimed By:", hexAny.claimedBy === null ? "Wilderness" : hexAny.claimedBy);
            console.log("Has Road:", hex.hasRoad || false, " | Fortified:", hex.fortified || 0);
            console.log("Name:", hex.name || "(unnamed)");
            if (hex.worksite) {
              console.log("Worksite:", hex.worksite.type);
            }
            if (hexAny.commodities && Object.keys(hexAny.commodities).length > 0) {
              console.log("Commodities:", hexAny.commodities);
            }
            if (hexAny.features && hexAny.features.length > 0) {
              console.group("Features:");
              hexAny.features.forEach((f, i) => {
                const parts = [f.type];
                if (f.name) parts.push(`name="${f.name}"`);
                if (f.tier) parts.push(`tier=${f.tier}`);
                if (f.settlementId) parts.push(`settlement=${f.settlementId}`);
                console.log(`[${i}]`, parts.join(" | "));
              });
              console.groupEnd();
            }
            if (hex.fortified) {
              console.log("Fortification:", hex.fortified);
            }
            console.groupCollapsed("Raw hex object");
            console.log(hex);
            console.groupEnd();
            console.groupEnd();
          } else {
            console.log(`%c⚠️ Hex ${hexId} not found in kingdom data`, "color: #FFA500;");
          }
        } catch {
        }
      }
      if (this.debugNeighborsMode) {
        const neighbors = getAdjacentHexes(offset.i, offset.j);
        if (neighbors) {
          const neighborStrs = neighbors.map((n) => `${n.i}:${n.j}`);
          console.log(`%c🔗 Neighbors of ${hexId}: [${neighborStrs.join(", ")}]`, "font-size: 12px; color: #FF69B4; font-weight: bold;");
        }
      }
    };
    canvas.stage.addEventListener("pointerdown", this.debugClickHandler, { capture: true });
  }
  /**
   * Remove debug listener
   */
  removeDebugListener() {
    if (!this.debugClickHandler) return;
    const canvas = globalThis.canvas;
    if (canvas?.stage) {
      canvas.stage.removeEventListener("pointerdown", this.debugClickHandler, { capture: true });
    }
    this.debugClickHandler = null;
  }
}
class RegionReportHandler {
  active = false;
  firstHex = null;
  clickHandler = null;
  /**
   * Toggle region report mode on/off
   */
  toggle() {
    this.active = !this.active;
    this.firstHex = null;
    if (this.active) {
      this.attachListener();
      console.log("%c🗺️ Region Report: ENABLED — click first hex", "font-size: 14px; font-weight: bold; color: #00FF00");
    } else {
      this.removeListener();
      console.log("%c🗺️ Region Report: DISABLED", "font-size: 14px; font-weight: bold; color: #FF0000");
    }
    return this.active;
  }
  /**
   * Check if region report mode is active
   */
  isActive() {
    return this.active;
  }
  /**
   * Attach pointerdown listener on canvas.stage
   */
  attachListener() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) {
      logger.warn("[RegionReportHandler] Cannot attach listener - canvas not available");
      return;
    }
    this.clickHandler = (event) => {
      if (event.button !== 0) return;
      const canvas2 = globalThis.canvas;
      if (!canvas2?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas2.canvasCoordinatesFromClient(point);
      const offset = canvas2.grid.getOffset(canvasPos);
      if (!this.firstHex) {
        this.firstHex = { row: offset.i, col: offset.j };
        console.log(
          `%c🗺️ Region Report: First hex ${offset.i}.${offset.j} selected — click second hex`,
          "font-size: 12px; color: #00BFFF; font-weight: bold;"
        );
      } else {
        const minRow = Math.min(this.firstHex.row, offset.i);
        const maxRow = Math.max(this.firstHex.row, offset.i);
        const minCol = Math.min(this.firstHex.col, offset.j);
        const maxCol = Math.max(this.firstHex.col, offset.j);
        try {
          const kingdom = getKingdomData();
          const hexes = kingdom.hexes.filter((h) => {
            const parts = h.id.split(".");
            const row = parseInt(parts[0], 10);
            const col = parseInt(parts[1], 10);
            return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
          });
          console.group(
            `%c🗺️ Region Report: [${minRow},${minCol}] → [${maxRow},${maxCol}]`,
            "font-size: 14px; font-weight: bold; color: #FFD700;"
          );
          console.log("Bounds:", { minRow, maxRow, minCol, maxCol });
          console.log("Hex Count:", hexes.length);
          console.log("Hexes:", hexes);
          console.groupEnd();
        } catch {
          console.warn("🗺️ Region Report: Could not access kingdom data");
        }
        this.firstHex = null;
      }
    };
    canvas.stage.addEventListener("pointerdown", this.clickHandler, { capture: true });
  }
  /**
   * Remove listener
   */
  removeListener() {
    if (!this.clickHandler) return;
    const canvas = globalThis.canvas;
    if (canvas?.stage) {
      canvas.stage.removeEventListener("pointerdown", this.clickHandler, { capture: true });
    }
    this.clickHandler = null;
  }
}
class WaterFeatureService {
  /**
   * Ensure all hexes with terrain='swamp' have swamp features
   * Called on kingdom load and after terrain changes
   */
  async ensureSwampFeatures() {
    const kingdom = getKingdomData();
    if (!kingdom.hexes) return;
    logger.info("[WaterFeatureService] Ensuring swamp features for terrain=swamp hexes");
    const swampHexes = kingdom.hexes.filter((h) => h.terrain === "swamp");
    if (swampHexes.length === 0) {
      logger.info("[WaterFeatureService] No swamp terrain hexes found");
      return;
    }
    await updateKingdom((kingdom2) => {
      if (!kingdom2.waterFeatures) {
        kingdom2.waterFeatures = { lakes: [], swamps: [] };
      }
      let added = 0;
      for (const hex of swampHexes) {
        const hasSwamp = kingdom2.waterFeatures.swamps.some(
          (s) => s.hexI === hex.row && s.hexJ === hex.col
        );
        if (!hasSwamp) {
          kingdom2.waterFeatures.swamps.push({
            id: crypto.randomUUID(),
            hexI: hex.row,
            hexJ: hex.col
          });
          added++;
        }
      }
      if (added > 0) {
        logger.info(`[WaterFeatureService] ✅ Added ${added} swamp features`);
      } else {
        logger.info("[WaterFeatureService] All swamp terrain hexes already have features");
      }
    });
  }
  /**
   * Toggle lake feature on a hex
   * Removes swamp if present (mutually exclusive)
   * 
   * @param hexI - Hex row coordinate
   * @param hexJ - Hex column coordinate
   * @param forceRemove - If true, always remove (Ctrl+click behavior)
   * @returns true if lake was added, false if removed
   */
  async toggleLake(hexI, hexJ, forceRemove = false) {
    let wasAdded = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.waterFeatures) {
        kingdom.waterFeatures = { lakes: [], swamps: [] };
      }
      const existingIndex = kingdom.waterFeatures.lakes.findIndex(
        (l) => l.hexI === hexI && l.hexJ === hexJ
      );
      if (existingIndex !== -1 || forceRemove) {
        if (existingIndex !== -1) {
          kingdom.waterFeatures.lakes = kingdom.waterFeatures.lakes.filter((_, i) => i !== existingIndex);
          logger.info(`[WaterFeatureService] ❌ Removed lake at (${hexI}, ${hexJ})`);
        }
        if (forceRemove) {
          const swampIndex = kingdom.waterFeatures.swamps.findIndex(
            (s) => s.hexI === hexI && s.hexJ === hexJ
          );
          if (swampIndex !== -1) {
            const hex = kingdom.hexes.find((h) => h.row === hexI && h.col === hexJ);
            if (hex?.terrain !== "swamp") {
              kingdom.waterFeatures.swamps = kingdom.waterFeatures.swamps.filter((_, i) => i !== swampIndex);
              logger.info(`[WaterFeatureService] ❌ Removed swamp at (${hexI}, ${hexJ}) (Ctrl+click)`);
            }
          }
        }
        wasAdded = false;
      } else {
        const swampIndex = kingdom.waterFeatures.swamps.findIndex(
          (s) => s.hexI === hexI && s.hexJ === hexJ
        );
        if (swampIndex !== -1) {
          const hex = kingdom.hexes.find((h) => h.row === hexI && h.col === hexJ);
          if (hex?.terrain === "swamp") {
            logger.warn("[WaterFeatureService] Cannot remove swamp feature from terrain=swamp hex");
            return;
          }
          kingdom.waterFeatures.swamps.splice(swampIndex, 1);
          logger.info(`[WaterFeatureService] ⚠️ Removed swamp at (${hexI}, ${hexJ}) (replaced by lake)`);
        }
        kingdom.waterFeatures.lakes.push({
          id: crypto.randomUUID(),
          hexI,
          hexJ
        });
        logger.info(`[WaterFeatureService] ✅ Added lake at (${hexI}, ${hexJ})`);
        wasAdded = true;
      }
    });
    return wasAdded;
  }
  /**
   * Toggle swamp feature on a hex
   * Removes lake if present (mutually exclusive)
   * Locked if terrain='swamp' (cannot remove unless forceRemove)
   * 
   * @param hexI - Hex row coordinate
   * @param hexJ - Hex column coordinate
   * @param forceRemove - If true, always remove (Ctrl+click behavior)
   * @returns true if swamp was added, false if removed (or locked)
   */
  async toggleSwamp(hexI, hexJ, forceRemove = false) {
    let wasAdded = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.waterFeatures) {
        kingdom.waterFeatures = { lakes: [], swamps: [] };
      }
      const hex = kingdom.hexes.find((h) => h.row === hexI && h.col === hexJ);
      const isSwampTerrain = hex?.terrain === "swamp";
      const existingIndex = kingdom.waterFeatures.swamps.findIndex(
        (s) => s.hexI === hexI && s.hexJ === hexJ
      );
      if (existingIndex !== -1 || forceRemove) {
        if (isSwampTerrain && !forceRemove) {
          logger.warn("[WaterFeatureService] ⚠️ Cannot remove swamp feature from terrain=swamp hex (locked)");
          wasAdded = true;
          return;
        }
        if (existingIndex !== -1) {
          kingdom.waterFeatures.swamps.splice(existingIndex, 1);
          logger.info(`[WaterFeatureService] ❌ Removed swamp at (${hexI}, ${hexJ})`);
        }
        if (forceRemove) {
          const lakeIndex = kingdom.waterFeatures.lakes.findIndex(
            (l) => l.hexI === hexI && l.hexJ === hexJ
          );
          if (lakeIndex !== -1) {
            kingdom.waterFeatures.lakes.splice(lakeIndex, 1);
            logger.info(`[WaterFeatureService] ❌ Removed lake at (${hexI}, ${hexJ}) (Ctrl+click)`);
          }
        }
        wasAdded = false;
      } else {
        const lakeIndex = kingdom.waterFeatures.lakes.findIndex(
          (l) => l.hexI === hexI && l.hexJ === hexJ
        );
        if (lakeIndex !== -1) {
          kingdom.waterFeatures.lakes.splice(lakeIndex, 1);
          logger.info(`[WaterFeatureService] ⚠️ Removed lake at (${hexI}, ${hexJ}) (replaced by swamp)`);
        }
        kingdom.waterFeatures.swamps.push({
          id: crypto.randomUUID(),
          hexI,
          hexJ
        });
        logger.info(`[WaterFeatureService] ✅ Added swamp at (${hexI}, ${hexJ})`);
        wasAdded = true;
      }
    });
    return wasAdded;
  }
  /**
   * Check if a hex has a lake feature
   */
  hasLake(hexI, hexJ) {
    const kingdom = getKingdomData();
    return kingdom.waterFeatures?.lakes.some(
      (l) => l.hexI === hexI && l.hexJ === hexJ
    ) ?? false;
  }
  /**
   * Check if a hex has a swamp feature
   */
  hasSwamp(hexI, hexJ) {
    const kingdom = getKingdomData();
    return kingdom.waterFeatures?.swamps.some(
      (s) => s.hexI === hexI && s.hexJ === hexJ
    ) ?? false;
  }
  /**
   * Toggle waterfall on a connection point
   * Waterfalls block naval travel but not swimmers
   * Uses connector detection (same as river editing)
   * 
   * @param hexId - Hex ID (e.g., "5.10")
   * @param clickPos - Click position { x, y }
   * @returns true if waterfall was added, false if removed, null if no connector found
   */
  async toggleWaterfall(hexId, clickPos) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return null;
    const parts = hexId.split(".");
    if (parts.length !== 2) return null;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return null;
    const connector = getConnectorAtPosition(hexI, hexJ, clickPos, canvas);
    if (!connector) {
      logger.info("[WaterFeatureService] ❌ No connector at click position for waterfall");
      return null;
    }
    let isCenter = false;
    let edge;
    let cornerIndex;
    if ("center" in connector) {
      isCenter = true;
    } else if ("edge" in connector) {
      edge = connector.edge;
    } else if ("cornerIndex" in connector) {
      cornerIndex = connector.cornerIndex;
    }
    let wasAdded = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers) {
        kingdom.rivers = { paths: [], crossings: [], waterfalls: [] };
      }
      if (!kingdom.rivers.waterfalls) {
        kingdom.rivers.waterfalls = [];
      }
      const existingIndex = kingdom.rivers.waterfalls.findIndex(
        (w) => w.hexI === hexI && w.hexJ === hexJ && w.edge === edge && w.isCenter === isCenter && w.cornerIndex === cornerIndex
      );
      if (existingIndex !== -1) {
        kingdom.rivers.waterfalls = kingdom.rivers.waterfalls.filter((_, i) => i !== existingIndex);
        logger.info(
          `[WaterFeatureService] ❌ Removed waterfall from (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = false;
      } else {
        kingdom.rivers.waterfalls.push({
          id: crypto.randomUUID(),
          hexI,
          hexJ,
          edge,
          isCenter,
          cornerIndex
        });
        logger.info(
          `[WaterFeatureService] ✅ Added waterfall at (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = true;
      }
    });
    return wasAdded;
  }
  /**
   * Toggle bridge crossing on a connection point
   * Bridges allow grounded armies to cross water
   * Uses connector detection (same as river editing)
   * 
   * @param hexId - Hex ID (e.g., "5.10")
   * @param clickPos - Click position { x, y }
   * @returns true if bridge was added, false if removed, null if no connector found
   */
  async toggleBridge(hexId, clickPos) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return null;
    const parts = hexId.split(".");
    if (parts.length !== 2) return null;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return null;
    const connector = getConnectorAtPosition(hexI, hexJ, clickPos, canvas);
    if (!connector) {
      logger.info("[WaterFeatureService] ❌ No connector at click position");
      return null;
    }
    let isCenter = false;
    let edge;
    let cornerIndex;
    if ("center" in connector) {
      isCenter = true;
    } else if ("edge" in connector) {
      edge = connector.edge;
    } else if ("cornerIndex" in connector) {
      cornerIndex = connector.cornerIndex;
    }
    let wasAdded = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers) {
        kingdom.rivers = { paths: [], crossings: [] };
      }
      if (!kingdom.rivers.crossings) {
        kingdom.rivers.crossings = [];
      }
      const existingIndex = kingdom.rivers.crossings.findIndex(
        (c) => c.hexI === hexI && c.hexJ === hexJ && c.edge === edge && c.isCenter === isCenter && c.cornerIndex === cornerIndex && c.type === "bridge"
      );
      if (existingIndex !== -1) {
        kingdom.rivers.crossings = kingdom.rivers.crossings.filter((_, i) => i !== existingIndex);
        logger.info(
          `[WaterFeatureService] ❌ Removed bridge from (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = false;
      } else {
        const fordIndex = kingdom.rivers.crossings.findIndex(
          (c) => c.hexI === hexI && c.hexJ === hexJ && c.edge === edge && c.isCenter === isCenter && c.cornerIndex === cornerIndex && c.type === "ford"
        );
        if (fordIndex !== -1) {
          kingdom.rivers.crossings.splice(fordIndex, 1);
          logger.info(
            `[WaterFeatureService] ⚠️ Removed ford from (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`} (replaced by bridge)`
          );
        }
        kingdom.rivers.crossings.push({
          id: crypto.randomUUID(),
          hexI,
          hexJ,
          edge,
          isCenter,
          cornerIndex,
          type: "bridge"
        });
        logger.info(
          `[WaterFeatureService] ✅ Added bridge at (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = true;
      }
    });
    return wasAdded;
  }
  /**
   * Toggle ford crossing on a connection point
   * Fords allow grounded armies to cross water (natural shallow crossing)
   * Uses connector detection (same as river editing)
   * 
   * @param hexId - Hex ID (e.g., "5.10")
   * @param clickPos - Click position { x, y }
   * @returns true if ford was added, false if removed, null if no connector found
   */
  async toggleFord(hexId, clickPos) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return null;
    const parts = hexId.split(".");
    if (parts.length !== 2) return null;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return null;
    const connector = getConnectorAtPosition(hexI, hexJ, clickPos, canvas);
    if (!connector) {
      logger.info("[WaterFeatureService] ❌ No connector at click position");
      return null;
    }
    let isCenter = false;
    let edge;
    let cornerIndex;
    if ("center" in connector) {
      isCenter = true;
    } else if ("edge" in connector) {
      edge = connector.edge;
    } else if ("cornerIndex" in connector) {
      cornerIndex = connector.cornerIndex;
    }
    let wasAdded = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers) {
        kingdom.rivers = { paths: [], crossings: [] };
      }
      if (!kingdom.rivers.crossings) {
        kingdom.rivers.crossings = [];
      }
      const existingIndex = kingdom.rivers.crossings.findIndex(
        (c) => c.hexI === hexI && c.hexJ === hexJ && c.edge === edge && c.isCenter === isCenter && c.cornerIndex === cornerIndex && c.type === "ford"
      );
      if (existingIndex !== -1) {
        kingdom.rivers.crossings = kingdom.rivers.crossings.filter((_, i) => i !== existingIndex);
        logger.info(
          `[WaterFeatureService] ❌ Removed ford from (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = false;
      } else {
        const bridgeIndex = kingdom.rivers.crossings.findIndex(
          (c) => c.hexI === hexI && c.hexJ === hexJ && c.edge === edge && c.isCenter === isCenter && c.cornerIndex === cornerIndex && c.type === "bridge"
        );
        if (bridgeIndex !== -1) {
          kingdom.rivers.crossings.splice(bridgeIndex, 1);
          logger.info(
            `[WaterFeatureService] ⚠️ Removed bridge from (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`} (replaced by ford)`
          );
        }
        kingdom.rivers.crossings.push({
          id: crypto.randomUUID(),
          hexI,
          hexJ,
          edge,
          isCenter,
          cornerIndex,
          type: "ford"
        });
        logger.info(
          `[WaterFeatureService] ✅ Added ford at (${hexI},${hexJ}) ${isCenter ? "center" : edge || `corner ${cornerIndex}`}`
        );
        wasAdded = true;
      }
    });
    return wasAdded;
  }
}
const waterFeatureService = new WaterFeatureService();
class CrossingEditorHandlers {
  /**
   * Handle waterfall click - toggle waterfall on connection point
   * Waterfalls block naval travel but not swimmers
   * Uses connector detection (same as river editing)
   */
  async handleWaterfallClick(hexId, position) {
    logger.info(`[CrossingEditorHandlers] 💧 Toggling waterfall at hex ${hexId}, position (${position.x}, ${position.y})`);
    const result = await waterFeatureService.toggleWaterfall(hexId, position);
    const ui2 = globalThis.ui;
    if (result === null) {
      ui2?.notifications?.warn("Click on a connector dot to place a waterfall");
    } else if (result) {
      ui2?.notifications?.info("Waterfall added (blocks boats)");
    } else {
      ui2?.notifications?.info("Waterfall removed");
    }
  }
  /**
   * Handle bridge click - toggle bridge crossing on connection point
   * Bridges allow grounded armies to cross water
   * Uses connector detection (same as river editing)
   */
  async handleBridgeClick(hexId, position) {
    logger.info(`[CrossingEditorHandlers] 🌉 Toggling bridge at hex ${hexId}, position (${position.x}, ${position.y})`);
    const result = await waterFeatureService.toggleBridge(hexId, position);
    const ui2 = globalThis.ui;
    if (result === null) {
      ui2?.notifications?.warn("Click on a connector dot to place a bridge");
    } else if (result) {
      ui2?.notifications?.info("Bridge added (allows crossing)");
    } else {
      ui2?.notifications?.info("Bridge removed");
    }
    if (result !== null) {
      await this.updateBarrierSegments();
    }
  }
  /**
   * Handle ford click - toggle ford crossing on connection point
   * Fords allow grounded armies to cross water (natural shallow crossing)
   * Uses connector detection (same as river editing)
   */
  async handleFordClick(hexId, position) {
    logger.info(`[CrossingEditorHandlers] 🚶 Toggling ford at hex ${hexId}, position (${position.x}, ${position.y})`);
    const result = await waterFeatureService.toggleFord(hexId, position);
    const ui2 = globalThis.ui;
    if (result === null) {
      ui2?.notifications?.warn("Click on a connector dot to place a ford");
    } else if (result) {
      ui2?.notifications?.info("Ford added (allows crossing)");
    } else {
      ui2?.notifications?.info("Ford removed");
    }
    if (result !== null) {
      await this.updateBarrierSegments();
    }
  }
  /**
   * Recompute and save barrier segments after crossing changes
   */
  async updateBarrierSegments() {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) {
      logger.warn("[CrossingEditorHandlers] Cannot update barrier segments - canvas not ready");
      return;
    }
    const kingdom = getKingdomData();
    const paths = kingdom.rivers?.paths || [];
    const crossings = kingdom.rivers?.crossings;
    const segments = computeBarrierSegments(paths, crossings, canvas);
    await updateKingdom((k) => {
      if (!k.rivers) k.rivers = { paths: [] };
      k.rivers.barrierSegments = segments;
    });
    logger.info(`[CrossingEditorHandlers] Updated ${segments.length} barrier segments`);
  }
}
class RoadEditorHandlers {
  /**
   * Handle road toggle - Click to add road, Ctrl+Click to remove
   */
  async handleRoadToggle(hexId, isCtrlPressed) {
    const parts = hexId.split(".");
    if (parts.length !== 2) return;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return;
    const kingdom = getKingdomData();
    const hex = kingdom.hexes?.find((h) => h.row === hexI && h.col === hexJ);
    if (!hex) {
      logger.warn(`[RoadEditorHandlers] Hex not found: ${hexId}`);
      return;
    }
    const currentState = hex.hasRoad || false;
    const newState = isCtrlPressed ? false : true;
    if (newState && hex.terrain === "water") {
      logger.info(`[RoadEditorHandlers] Cannot place road on water hex: ${hexId}`);
      return;
    }
    if (currentState === newState) {
      logger.info(`[RoadEditorHandlers] Road already ${newState ? "exists" : "removed"} at ${hexId}`);
      return;
    }
    await updateKingdom((kingdom2) => {
      const hex2 = kingdom2.hexes?.find((h) => h.row === hexI && h.col === hexJ);
      if (!hex2) return;
      hex2.hasRoad = newState;
      syncTradeNetwork(kingdom2);
      logger.info(`[RoadEditorHandlers] ${newState ? "✅ Added" : "🗑️ Removed"} road at ${hexId}`);
    });
  }
  /**
   * Handle scissor click - cuts a road segment between two hexes
   * Finds the closest road segment and adds it to the blocked connections list
   */
  async handleScissorClick(position) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return { success: false };
    const kingdom = getKingdomData();
    const roadHexes = kingdom.hexes?.filter((h) => h.hasRoad) || [];
    if (roadHexes.length === 0) {
      logger.info("[RoadEditorHandlers] ✂️ No roads to cut");
      return { success: false };
    }
    let closestSegment = null;
    const CLICK_THRESHOLD = 30;
    for (const hex of roadHexes) {
      const hexCenter = canvas.grid.getCenterPoint({ i: hex.row, j: hex.col });
      const neighbors = getAdjacentHexes(hex.row, hex.col);
      for (const neighbor of neighbors) {
        const neighborI = neighbor.i;
        const neighborJ = neighbor.j;
        const neighborHex = kingdom.hexes?.find((h) => h.row === neighborI && h.col === neighborJ);
        if (!neighborHex?.hasRoad) continue;
        const neighborCenter = canvas.grid.getCenterPoint({ i: neighborI, j: neighborJ });
        const distance = this.distanceToSegment(position, hexCenter, neighborCenter);
        if (distance < CLICK_THRESHOLD && (!closestSegment || distance < closestSegment.distance)) {
          const hex1Id = `${hex.row}.${hex.col}`;
          const hex2Id = `${neighborI}.${neighborJ}`;
          const isBlocked = this.isConnectionBlocked(hex1Id, hex2Id, kingdom.roads?.blockedConnections || []);
          if (!isBlocked) {
            closestSegment = {
              hex1: hex1Id,
              hex2: hex2Id,
              distance
            };
          }
        }
      }
    }
    if (!closestSegment) {
      logger.info("[RoadEditorHandlers] ✂️ No road segment found near click position");
      return { success: false };
    }
    const blockedConnection = {
      id: crypto.randomUUID(),
      hex1: closestSegment.hex1,
      hex2: closestSegment.hex2
    };
    await updateKingdom((kingdom2) => {
      if (!kingdom2.roads) kingdom2.roads = {};
      if (!kingdom2.roads.blockedConnections) kingdom2.roads.blockedConnections = [];
      kingdom2.roads.blockedConnections.push(blockedConnection);
      syncTradeNetwork(kingdom2);
      logger.info(`[RoadEditorHandlers] ✂️ Cut road segment: ${blockedConnection.hex1} <-> ${blockedConnection.hex2}`);
    });
    return { success: true };
  }
  /**
   * Check if a connection is already blocked
   */
  isConnectionBlocked(hex1, hex2, blockedConnections) {
    return blockedConnections.some(
      (conn) => conn.hex1 === hex1 && conn.hex2 === hex2 || conn.hex1 === hex2 && conn.hex2 === hex1
    );
  }
  /**
   * Calculate distance from point to line segment
   */
  distanceToSegment(point, lineStart, lineEnd) {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) {
      const pdx = point.x - lineStart.x;
      const pdy = point.y - lineStart.y;
      return Math.sqrt(pdx * pdx + pdy * pdy);
    }
    let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSquared;
    t = Math.max(0, Math.min(1, t));
    const closestX = lineStart.x + t * dx;
    const closestY = lineStart.y + t * dy;
    const distX = point.x - closestX;
    const distY = point.y - closestY;
    return Math.sqrt(distX * distX + distY * distY);
  }
}
class TerrainEditorHandlers {
  /**
   * Paint terrain onto a hex
   */
  async paintTerrain(hexId, terrainType) {
    const parts = hexId.split(".");
    if (parts.length !== 2) return;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return;
    const kingdom = getKingdomData();
    const hex = kingdom.hexes?.find((h) => h.row === hexI && h.col === hexJ);
    if (!hex) {
      logger.warn(`[TerrainEditorHandlers] Hex not found: ${hexId}`);
      return;
    }
    const currentTerrain = hex.terrain;
    if (currentTerrain === terrainType) {
      return;
    }
    await updateKingdom((kingdom2) => {
      const hex2 = kingdom2.hexes?.find((h) => h.row === hexI && h.col === hexJ);
      if (!hex2) return;
      hex2.terrain = terrainType;
      logger.info(`[TerrainEditorHandlers] 🎨 Painted ${terrainType} at ${hexId} (was ${currentTerrain})`);
    });
  }
}
const WORKSITE_TERRAIN_RULES = {
  "Farmstead": ["plains", "forest", "hills", "swamp", "desert", "water"],
  // Universal - works on any terrain
  "Logging Camp": ["forest"],
  // Forest only
  "Quarry": ["hills", "mountains"],
  // Hills or Mountains only
  "Mine": ["mountains", "swamp"]
  // Mountains or Swamp only (auto-converts to Bog Mine on swamp)
};
class WorksiteEditorHandlers {
  /**
   * Place a worksite on a hex
   * - Validates terrain compatibility
   * - Auto-converts Mine to Bog Mine on swamp terrain
   * - Shows error if placement is invalid
   */
  async placeWorksite(hexId, worksiteType) {
    logger.info(`[WorksiteEditorHandlers] Placing ${worksiteType} on hex ${hexId}`);
    await updateKingdom((kingdom) => {
      const hex = kingdom.hexes.find((h) => h.id === hexId);
      if (!hex) {
        logger.warn(`[WorksiteEditorHandlers] Hex ${hexId} not found`);
        return;
      }
      const isValid = this.validateWorksitePlacement(hex.terrain, worksiteType);
      if (!isValid) {
        const terrainName = hex.terrain || "unknown";
        const errorMsg = this.getInvalidPlacementMessage(worksiteType, terrainName);
        logger.warn(`[WorksiteEditorHandlers] ${errorMsg}`);
        ui.notifications?.warn(errorMsg);
        return;
      }
      if (hex.worksite) {
        logger.info(`[WorksiteEditorHandlers] Replacing existing ${hex.worksite.type} with ${worksiteType}`);
      }
      let finalWorksiteType = worksiteType;
      if (worksiteType === "Mine" && hex.terrain === "swamp") {
        finalWorksiteType = "Bog Mine";
        logger.info(`[WorksiteEditorHandlers] Auto-converted to Bog Mine on swamp terrain`);
      }
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId) {
          return { ...h, worksite: { type: finalWorksiteType } };
        }
        return h;
      });
      syncTradeNetwork(kingdom);
      logger.info(`[WorksiteEditorHandlers] Placed ${finalWorksiteType} on hex ${hexId}`);
    });
  }
  /**
   * Remove worksite from a hex
   * - Works regardless of which tool is active
   * - Removes any worksite type
   */
  async removeWorksite(hexId) {
    logger.info(`[WorksiteEditorHandlers] Removing worksite from hex ${hexId}`);
    await updateKingdom((kingdom) => {
      const hex = kingdom.hexes.find((h) => h.id === hexId);
      if (!hex) {
        logger.warn(`[WorksiteEditorHandlers] Hex ${hexId} not found`);
        return;
      }
      if (!hex.worksite) {
        logger.warn(`[WorksiteEditorHandlers] No worksite to remove from hex ${hexId}`);
        return;
      }
      const removedType = hex.worksite.type;
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId) {
          return { ...h, worksite: null };
        }
        return h;
      });
      syncTradeNetwork(kingdom);
      logger.info(`[WorksiteEditorHandlers] Removed ${removedType} from hex ${hexId}`);
    });
  }
  /**
   * Validate if a worksite type can be placed on specific terrain
   * 
   * @param terrain - Terrain type of the hex
   * @param worksiteType - Type of worksite to place
   * @returns True if placement is valid
   */
  validateWorksitePlacement(terrain, worksiteType) {
    const allowedTerrains = WORKSITE_TERRAIN_RULES[worksiteType];
    return allowedTerrains.includes(terrain);
  }
  /**
   * Get user-friendly error message for invalid placement
   * 
   * @param worksiteType - Type of worksite
   * @param terrain - Terrain type
   * @returns Error message string
   */
  getInvalidPlacementMessage(worksiteType, terrain) {
    switch (worksiteType) {
      case "Logging Camp":
        return `Logging camps require forest terrain (this hex is ${terrain})`;
      case "Quarry":
        return `Quarries require hills or mountains (this hex is ${terrain})`;
      case "Mine":
        return `Mines require mountains or swamp terrain (this hex is ${terrain})`;
      case "Farmstead":
        return `Cannot place farmstead on ${terrain} terrain`;
      default:
        return `Cannot place ${worksiteType} on ${terrain} terrain`;
    }
  }
}
function createSettlementEditorDialogStore() {
  const { subscribe, set, update } = writable({
    show: false,
    hexId: null,
    existingSettlement: null,
    resolve: null
  });
  return {
    subscribe,
    /**
     * Open dialog for new settlement and wait for user input
     * Returns a promise that resolves with settlement data or null if canceled
     */
    prompt(hexId) {
      return new Promise((resolve) => {
        set({
          show: true,
          hexId,
          existingSettlement: null,
          resolve
        });
      });
    },
    /**
     * Open dialog for editing existing settlement
     * Returns a promise that resolves with updated data or null if canceled
     */
    edit(hexId, settlement) {
      return new Promise((resolve) => {
        set({
          show: true,
          hexId,
          existingSettlement: settlement,
          resolve
        });
      });
    },
    /**
     * Confirm with settlement data
     */
    confirm(data) {
      update((state) => {
        if (state.resolve) {
          state.resolve(data);
        }
        return {
          show: false,
          hexId: null,
          existingSettlement: null,
          resolve: null
        };
      });
    },
    /**
     * Cancel dialog
     */
    cancel() {
      update((state) => {
        if (state.resolve) {
          state.resolve(null);
        }
        return {
          show: false,
          hexId: null,
          existingSettlement: null,
          resolve: null
        };
      });
    }
  };
}
const settlementEditorDialog = createSettlementEditorDialogStore();
class FeatureEditorHandlers {
  /**
   * Get settlement feature at hex location (if any)
   * Returns hex feature data directly - does NOT require kingdom.settlements entry
   */
  getSettlementFeature(hexId) {
    const kingdom = getKingdomData();
    const hex = kingdom.hexes.find((h) => h.id === hexId);
    if (!hex?.features) return null;
    const settlementFeature = hex.features.find((f) => f.type === "settlement");
    return settlementFeature || null;
  }
  /**
   * Get full settlement data from kingdom.settlements (if it exists)
   */
  getLinkedSettlement(settlementFeature) {
    const kingdom = getKingdomData();
    if (settlementFeature.settlementId) {
      const settlement = kingdom.settlements.find((s) => s.id === settlementFeature.settlementId);
      if (settlement) return settlement;
    }
    if (settlementFeature.name) {
      const settlement = kingdom.settlements.find((s) => s.name === settlementFeature.name);
      if (settlement) return settlement;
    }
    return null;
  }
  /**
   * Place or edit a settlement on a hex
   * Prompts for settlement properties using enhanced dialog
   */
  async placeSettlement(hexId) {
    logger.info(`[FeatureEditorHandlers] Placing/editing settlement on hex ${hexId}`);
    const parts = hexId.split(".");
    if (parts.length !== 2) {
      logger.error(`[FeatureEditorHandlers] Invalid hex ID: ${hexId}`);
      return;
    }
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) {
      logger.error(`[FeatureEditorHandlers] Invalid hex coordinates: ${hexId}`);
      return;
    }
    const existingFeature = this.getSettlementFeature(hexId);
    if (existingFeature) {
      logger.info(`[FeatureEditorHandlers] Editing existing settlement feature: ${existingFeature.name || "unnamed"}`);
      const linkedSettlement = this.getLinkedSettlement(existingFeature);
      const settlementForDialog = linkedSettlement || createSettlement(
        existingFeature.name || "Unnamed Settlement",
        { x: hexI, y: hexJ },
        existingFeature.tier || SettlementTier.VILLAGE
      );
      const data2 = await settlementEditorDialog.edit(hexId, settlementForDialog);
      if (!data2) {
        logger.info(`[FeatureEditorHandlers] Settlement edit canceled`);
        return;
      }
      await updateKingdom((kingdom) => {
        const hex = kingdom.hexes.find((h) => h.id === hexId);
        if (hex?.features) {
          const feature = hex.features.find((f) => f.type === "settlement");
          if (feature) {
            feature.name = data2.name;
            feature.tier = data2.tier;
          }
        }
        if (linkedSettlement) {
          const settlement = kingdom.settlements.find((s) => s.id === linkedSettlement.id);
          if (settlement) {
            settlement.name = data2.name;
            settlement.tier = data2.tier;
          }
        }
      });
      ui.notifications?.info(`Updated settlement "${data2.name}" on hex ${hexId}`);
      logger.info(`[FeatureEditorHandlers] Updated settlement "${data2.name}" on hex ${hexId}`);
      return;
    }
    const data = await settlementEditorDialog.prompt(hexId);
    if (!data) {
      logger.info(`[FeatureEditorHandlers] Settlement placement canceled`);
      return;
    }
    await updateKingdom((kingdom) => {
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId) {
          const features = h.features || [];
          return {
            ...h,
            features: [
              ...features,
              {
                type: "settlement",
                name: data.name,
                tier: data.tier,
                linked: false
                // Not linked to full settlement data
              }
            ]
          };
        }
        return h;
      });
      syncTradeNetwork(kingdom);
    });
    ui.notifications?.info(`Placed settlement "${data.name}" on hex ${hexId}`);
    logger.info(`[FeatureEditorHandlers] Placed settlement "${data.name}" on hex ${hexId}`);
  }
  /**
   * Remove settlement feature from a hex (preserves settlement data by unlinking)
   * This removes the map marker but keeps all settlement data intact
   */
  async removeSettlementFeature(hexId) {
    logger.info(`[FeatureEditorHandlers] Removing settlement feature from hex ${hexId}`);
    const existingFeature = this.getSettlementFeature(hexId);
    if (!existingFeature) {
      ui.notifications?.warn(`No settlement found on hex ${hexId}`);
      logger.warn(`[FeatureEditorHandlers] No settlement feature found on hex ${hexId}`);
      return;
    }
    const linkedSettlement = this.getLinkedSettlement(existingFeature);
    await updateKingdom((kingdom) => {
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId && h.features) {
          const features = h.features.filter((f) => f.type !== "settlement");
          return { ...h, features };
        }
        return h;
      });
      if (linkedSettlement) {
        const settlement = kingdom.settlements.find((s) => s.id === linkedSettlement.id);
        if (settlement) {
          settlement.location.x = 0;
          settlement.location.y = 0;
          logger.info(`[FeatureEditorHandlers] Unlinked settlement "${settlement.name}" (ID: ${settlement.id})`);
        }
      }
      syncTradeNetwork(kingdom);
    });
    if (linkedSettlement) {
      ui.notifications?.info(`Removed settlement marker from hex ${hexId} - settlement "${linkedSettlement.name}" preserved`);
    } else {
      ui.notifications?.info(`Removed settlement marker from hex ${hexId}`);
    }
    logger.info(`[FeatureEditorHandlers] Removed settlement feature from hex ${hexId}`);
  }
  /**
   * Place or upgrade fortification on a hex
   * @param hexId - Hex ID to fortify
   * @param tier - Fortification tier (1-4)
   */
  async placeFortification(hexId, tier) {
    logger.info(`[FeatureEditorHandlers] Placing tier ${tier} fortification on hex ${hexId}`);
    const currentTurn$1 = get_store_value(currentTurn);
    await updateKingdom((kingdom) => {
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId) {
          return {
            ...h,
            fortification: {
              tier,
              maintenancePaid: true,
              turnBuilt: currentTurn$1
            }
          };
        }
        return h;
      });
    });
    const tierNames = ["", "Earthworks", "Wooden Tower", "Stone Tower", "Fortress"];
    ui.notifications?.info(`Placed ${tierNames[tier]} on hex ${hexId}`);
    logger.info(`[FeatureEditorHandlers] Placed tier ${tier} fortification on hex ${hexId}`);
  }
  /**
   * Remove fortification from a hex
   */
  async removeFortification(hexId) {
    logger.info(`[FeatureEditorHandlers] Removing fortification from hex ${hexId}`);
    await updateKingdom((kingdom) => {
      kingdom.hexes = kingdom.hexes.map((h) => {
        if (h.id === hexId && h.fortification) {
          const newHex = { ...h };
          delete newHex.fortification;
          return newHex;
        }
        return h;
      });
    });
    ui.notifications?.info(`Removed fortification from hex ${hexId}`);
    logger.info(`[FeatureEditorHandlers] Removed fortification from hex ${hexId}`);
  }
}
class ClaimedByEditorHandlers {
  /**
   * Claim a hex for a specific faction or player
   * 
   * @param hexId - Hex ID (e.g., "5.8")
   * @param claimedBy - Faction ID ("player" for player kingdom, faction ID, or null for unclaimed)
   */
  async claimHex(hexId, claimedBy) {
    const parts = hexId.split(".");
    if (parts.length !== 2) return;
    const hexI = parseInt(parts[0], 10);
    const hexJ = parseInt(parts[1], 10);
    if (isNaN(hexI) || isNaN(hexJ)) return;
    const kingdom = getKingdomData();
    const hex = kingdom.hexes?.find((h) => h.row === hexI && h.col === hexJ);
    if (!hex) {
      logger.warn(`[ClaimedByEditorHandlers] Hex not found: ${hexId}`);
      return;
    }
    const currentClaim = hex.claimedBy;
    if (currentClaim === claimedBy) {
      return;
    }
    await updateKingdom((kingdom2) => {
      const hex2 = kingdom2.hexes?.find((h) => h.row === hexI && h.col === hexJ);
      if (!hex2) return;
      hex2.claimedBy = claimedBy;
      const claimLabel = claimedBy === null ? "unclaimed" : claimedBy === "player" ? "player kingdom" : `faction ${claimedBy}`;
      const previousLabel = currentClaim === null ? "unclaimed" : currentClaim === "player" ? "player kingdom" : `faction ${currentClaim}`;
      logger.info(`[ClaimedByEditorHandlers] 🏴 Hex ${hexId} now claimed by ${claimLabel} (was ${previousLabel})`);
    });
  }
  /**
   * Remove claim from a hex (set to null/wilderness)
   * 
   * @param hexId - Hex ID (e.g., "5.8")
   */
  async removeHexClaim(hexId) {
    await this.claimHex(hexId, null);
  }
}
const CELL_RIVER_LAYERS = {
  grid: "cell-river-grid",
  // Background point grid
  editor: "cell-river-editor",
  // Current river paths
  preview: "cell-river-preview"
  // Hover preview
};
const CELL_RIVER_Z_INDICES = {
  grid: 40,
  // Background grid (lowest)
  editor: 45,
  // Below movement paths
  preview: 46
  // Above editor layer for visibility
};
const CELL_SIZE$1 = 8;
const RIVER_WIDTH_CELLS = 2;
const CELL_RIVER_COLORS = {
  // Existing river cells (editor mode)
  river: 4886754,
  // Medium blue
  riverAlpha: 0.7,
  // Active/editing path (clearly distinguishable)
  activeRiver: 16738740,
  // Hot pink
  activeRiverAlpha: 0.8,
  // River path stroke (shows actual raster width)
  pathStroke: 4886754,
  // Medium blue (same as river fill)
  pathStrokeAlpha: 0.5,
  activePathStroke: 16738740,
  // Hot pink
  activePathStrokeAlpha: 0.6,
  // Flow line (connects cells to show path direction)
  flowLine: 49151,
  // Deep sky blue
  flowLineAlpha: 0.9,
  flowLineWidth: 2,
  activeFlowLine: 16716947,
  // Deep pink
  activeFlowLineAlpha: 1,
  // Flow arrow
  arrow: 65535,
  // Cyan
  arrowAlpha: 1,
  activeArrow: 16777215,
  // White (stands out on pink)
  activeArrowAlpha: 1,
  // Preview cells (during editing)
  preview: 65535,
  // Cyan
  previewAlpha: 0.5
};
function renderCellRiverPaths(layer, cellPaths, cellSize, activePathId) {
  if (!cellPaths || cellPaths.length === 0) {
    return;
  }
  const graphics = new PIXI.Graphics();
  graphics.name = "CellRiverPaths";
  graphics.visible = true;
  let cellCount = 0;
  const halfCell = cellSize / 2;
  const riverWidth = RIVER_WIDTH_CELLS * cellSize;
  const inactivePaths = cellPaths.filter((p) => p.id !== activePathId);
  const activePath = cellPaths.find((p) => p.id === activePathId);
  graphics.beginFill(CELL_RIVER_COLORS.river, CELL_RIVER_COLORS.riverAlpha);
  for (const path of inactivePaths) {
    for (const cell of path.cells) {
      const x = cell.x * cellSize;
      const y = cell.y * cellSize;
      graphics.drawRect(x, y, cellSize, cellSize);
      cellCount++;
    }
  }
  graphics.endFill();
  graphics.lineStyle(1, 139, 0.5);
  for (const path of inactivePaths) {
    for (const cell of path.cells) {
      const x = cell.x * cellSize;
      const y = cell.y * cellSize;
      graphics.drawRect(x, y, cellSize, cellSize);
    }
  }
  for (const path of inactivePaths) {
    if (path.cells.length < 2) continue;
    const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
    graphics.lineStyle(riverWidth, CELL_RIVER_COLORS.pathStroke, CELL_RIVER_COLORS.pathStrokeAlpha);
    graphics.moveTo(sortedCells[0].x * cellSize + halfCell, sortedCells[0].y * cellSize + halfCell);
    for (let i = 1; i < sortedCells.length; i++) {
      graphics.lineTo(sortedCells[i].x * cellSize + halfCell, sortedCells[i].y * cellSize + halfCell);
    }
  }
  for (const path of inactivePaths) {
    if (path.cells.length < 2) continue;
    const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
    graphics.lineStyle(CELL_RIVER_COLORS.flowLineWidth, CELL_RIVER_COLORS.flowLine, CELL_RIVER_COLORS.flowLineAlpha);
    graphics.moveTo(sortedCells[0].x * cellSize + halfCell, sortedCells[0].y * cellSize + halfCell);
    for (let i = 1; i < sortedCells.length; i++) {
      graphics.lineTo(sortedCells[i].x * cellSize + halfCell, sortedCells[i].y * cellSize + halfCell);
    }
    drawFlowArrows(graphics, sortedCells, cellSize, false);
  }
  if (activePath) {
    graphics.beginFill(CELL_RIVER_COLORS.activeRiver, CELL_RIVER_COLORS.activeRiverAlpha);
    for (const cell of activePath.cells) {
      const x = cell.x * cellSize;
      const y = cell.y * cellSize;
      graphics.drawRect(x, y, cellSize, cellSize);
      cellCount++;
    }
    graphics.endFill();
    graphics.lineStyle(1, 13047173, 0.7);
    for (const cell of activePath.cells) {
      const x = cell.x * cellSize;
      const y = cell.y * cellSize;
      graphics.drawRect(x, y, cellSize, cellSize);
    }
    if (activePath.cells.length >= 2) {
      const sortedCells = [...activePath.cells].sort((a, b) => a.order - b.order);
      graphics.lineStyle(riverWidth, CELL_RIVER_COLORS.activePathStroke, CELL_RIVER_COLORS.activePathStrokeAlpha);
      graphics.moveTo(sortedCells[0].x * cellSize + halfCell, sortedCells[0].y * cellSize + halfCell);
      for (let i = 1; i < sortedCells.length; i++) {
        graphics.lineTo(sortedCells[i].x * cellSize + halfCell, sortedCells[i].y * cellSize + halfCell);
      }
      graphics.lineStyle(CELL_RIVER_COLORS.flowLineWidth, CELL_RIVER_COLORS.activeFlowLine, CELL_RIVER_COLORS.activeFlowLineAlpha);
      graphics.moveTo(sortedCells[0].x * cellSize + halfCell, sortedCells[0].y * cellSize + halfCell);
      for (let i = 1; i < sortedCells.length; i++) {
        graphics.lineTo(sortedCells[i].x * cellSize + halfCell, sortedCells[i].y * cellSize + halfCell);
      }
      drawFlowArrows(graphics, sortedCells, cellSize, true);
    }
  }
  layer.addChild(graphics);
  logger.debug(`[CellRiverRenderer] Rendered ${cellCount} cells from ${cellPaths.length} paths (active: ${activePathId || "none"})`);
}
function drawFlowArrows(graphics, sortedCells, cellSize, isActive = false) {
  if (sortedCells.length < 2) return;
  const halfCell = cellSize / 2;
  const arrowSize = cellSize * 1.2;
  const arrowInterval = 5;
  for (let i = 1; i < sortedCells.length; i++) {
    if (i % arrowInterval !== 0 && i !== sortedCells.length - 1) continue;
    const prevCell = sortedCells[i - 1];
    const currCell = sortedCells[i];
    const prevX = prevCell.x * cellSize + halfCell;
    const prevY = prevCell.y * cellSize + halfCell;
    const currX = currCell.x * cellSize + halfCell;
    const currY = currCell.y * cellSize + halfCell;
    const dx = currX - prevX;
    const dy = currY - prevY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) continue;
    const nx = dx / length;
    const ny = dy / length;
    const tipX = currX;
    const tipY = currY;
    const wingX = -ny * arrowSize * 0.5;
    const wingY = nx * arrowSize * 0.5;
    const baseX = tipX - nx * arrowSize;
    const baseY = tipY - ny * arrowSize;
    graphics.lineStyle(0);
    const arrowColor = isActive ? CELL_RIVER_COLORS.activeArrow : CELL_RIVER_COLORS.arrow;
    const arrowAlpha = isActive ? CELL_RIVER_COLORS.activeArrowAlpha : CELL_RIVER_COLORS.arrowAlpha;
    graphics.beginFill(arrowColor, arrowAlpha);
    graphics.moveTo(tipX, tipY);
    graphics.lineTo(baseX + wingX, baseY + wingY);
    graphics.lineTo(baseX - wingX, baseY - wingY);
    graphics.lineTo(tipX, tipY);
    graphics.endFill();
  }
}
function renderCellPreview(layer, cells, cellSize, color = CELL_RIVER_COLORS.preview, alpha = CELL_RIVER_COLORS.previewAlpha) {
  if (!cells || cells.length === 0) {
    return;
  }
  const graphics = new PIXI.Graphics();
  graphics.name = "CellPreview";
  graphics.visible = true;
  graphics.beginFill(color, alpha);
  for (const cell of cells) {
    const x = cell.x * cellSize;
    const y = cell.y * cellSize;
    graphics.drawRect(x, y, cellSize, cellSize);
  }
  graphics.endFill();
  graphics.lineStyle(2, color, 1);
  for (const cell of cells) {
    const x = cell.x * cellSize;
    const y = cell.y * cellSize;
    graphics.drawRect(x, y, cellSize, cellSize);
  }
  layer.addChild(graphics);
}
function pixelToCell(pixelX, pixelY, cellSize) {
  return {
    x: Math.floor(pixelX / cellSize),
    y: Math.floor(pixelY / cellSize)
  };
}
function renderCellPointGrid(layer, cellSize, viewportBounds) {
  const graphics = new PIXI.Graphics();
  graphics.name = "CellPointGrid";
  graphics.visible = true;
  const dotRadius = 1.5;
  const dotColor = 4886754;
  const dotAlpha = 0.4;
  const startCellX = Math.floor(viewportBounds.x / cellSize);
  const startCellY = Math.floor(viewportBounds.y / cellSize);
  const endCellX = Math.ceil((viewportBounds.x + viewportBounds.width) / cellSize);
  const endCellY = Math.ceil((viewportBounds.y + viewportBounds.height) / cellSize);
  const halfCell = cellSize / 2;
  graphics.beginFill(dotColor, dotAlpha);
  for (let cellX = startCellX; cellX <= endCellX; cellX++) {
    for (let cellY = startCellY; cellY <= endCellY; cellY++) {
      const x = cellX * cellSize + halfCell;
      const y = cellY * cellSize + halfCell;
      graphics.drawCircle(x, y, dotRadius);
    }
  }
  graphics.endFill();
  layer.addChild(graphics);
  logger.debug(`[CellRiverRenderer] Rendered point grid: ${(endCellX - startCellX) * (endCellY - startCellY)} points`);
}
class CellRiverEditorHandlers {
  // Current path being drawn
  currentPathId = null;
  currentPathOrder = 0;
  // Reshape mode state
  reshapingPathId = null;
  reshapeInsertAfterOrder = 0;
  reshapeInsertBeforeOrder = 0;
  reshapePointCount = 0;
  // Vertex move state
  movingVertexPathId = null;
  movingVertexOrder = 0;
  movingVertexOriginalX = 0;
  movingVertexOriginalY = 0;
  // Map layer reference
  mapLayer = null;
  /**
   * Get map layer instance (lazy loaded)
   */
  getMapLayer() {
    if (!this.mapLayer) {
      this.mapLayer = ReignMakerMapLayer.getInstance();
    }
    return this.mapLayer;
  }
  /**
   * Handle cell river click - adds a single point to the current polyline path
   * Note: Endpoint detection is now handled in EditorModeService before this is called
   */
  async handleCellRiverClick(pixelX, pixelY) {
    const cell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    logger.info(`[CellRiverEditor] Click at pixel (${pixelX}, ${pixelY}) -> cell (${cell.x}, ${cell.y})`);
    if (!this.currentPathId) {
      this.startNewPath();
    }
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers) {
        kingdom.rivers = { paths: [] };
      }
      if (!kingdom.rivers.cellPaths) {
        kingdom.rivers.cellPaths = [];
      }
      let path = kingdom.rivers.cellPaths.find((p) => p.id === this.currentPathId);
      if (!path) {
        path = {
          id: this.currentPathId,
          cells: [],
          navigable: true
        };
        kingdom.rivers.cellPaths.push(path);
      }
      const exists = path.cells.some((c) => c.x === cell.x && c.y === cell.y);
      if (!exists) {
        this.currentPathOrder += 10;
        path.cells.push({
          x: cell.x,
          y: cell.y,
          order: this.currentPathOrder
        });
        logger.info(`[CellRiverEditor] Added point to path ${this.currentPathId}, total points: ${path.cells.length}`);
      }
    });
    this.renderEditorLayer();
  }
  /**
   * Handle mouse move - show hover preview (single cell + line from last point)
   */
  handleCellRiverMove(pixelX, pixelY) {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.preview);
    const hoverCell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    const previewLayer = mapLayer.createLayer(
      CELL_RIVER_LAYERS.preview,
      CELL_RIVER_Z_INDICES.preview
    );
    renderCellPreview(previewLayer, [hoverCell], CELL_SIZE$1, 65535, 0.4);
    if (this.currentPathId) {
      const kingdom = getKingdomData();
      const path = kingdom.rivers?.cellPaths?.find((p) => p.id === this.currentPathId);
      if (path && path.cells.length > 0) {
        const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
        const lastCell = sortedCells[sortedCells.length - 1];
        const graphics = new PIXI.Graphics();
        graphics.name = "PreviewLine";
        const halfCell = CELL_SIZE$1 / 2;
        const lastX = lastCell.x * CELL_SIZE$1 + halfCell;
        const lastY = lastCell.y * CELL_SIZE$1 + halfCell;
        const hoverX = hoverCell.x * CELL_SIZE$1 + halfCell;
        const hoverY = hoverCell.y * CELL_SIZE$1 + halfCell;
        graphics.lineStyle(2, 65535, 0.6);
        graphics.moveTo(lastX, lastY);
        graphics.lineTo(hoverX, hoverY);
        previewLayer.addChild(graphics);
      }
    }
    mapLayer.showLayer(CELL_RIVER_LAYERS.preview);
  }
  /**
   * Clear hover preview
   */
  clearHoverPreview() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.preview);
  }
  /**
   * Find a nearby endpoint of an existing path
   * Returns path info if cursor is within threshold of a path's start or end point
   */
  findNearbyEndpoint(pixelX, pixelY, threshold = 12) {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let closest = null;
    let minDistance = Infinity;
    for (const path of cellPaths) {
      if (path.cells.length === 0) continue;
      const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
      const pathMinOrder = sortedCells[0].order;
      const pathMaxOrder = sortedCells[sortedCells.length - 1].order;
      const startCell = sortedCells[0];
      const startPixelX = startCell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const startPixelY = startCell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const startDist = Math.sqrt((pixelX - startPixelX) ** 2 + (pixelY - startPixelY) ** 2);
      if (startDist < threshold && startDist < minDistance) {
        minDistance = startDist;
        closest = {
          pathId: path.id,
          endpoint: "start",
          minOrder: pathMinOrder,
          maxOrder: pathMaxOrder
        };
      }
      const endCell = sortedCells[sortedCells.length - 1];
      const endPixelX = endCell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const endPixelY = endCell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const endDist = Math.sqrt((pixelX - endPixelX) ** 2 + (pixelY - endPixelY) ** 2);
      if (endDist < threshold && endDist < minDistance) {
        minDistance = endDist;
        closest = {
          pathId: path.id,
          endpoint: "end",
          minOrder: pathMinOrder,
          maxOrder: pathMaxOrder
        };
      }
    }
    return closest;
  }
  /**
   * Continue drawing from an existing endpoint
   * If extending from the END, new points get higher order values
   * If extending from the START, we reverse the path first so new points append correctly
   */
  async continueFromEndpoint(endpoint) {
    this.currentPathId = endpoint.pathId;
    if (endpoint.endpoint === "end") {
      this.currentPathOrder = endpoint.maxOrder;
      logger.info(`[CellRiverEditor] Continuing from END of path ${endpoint.pathId}, order starts at ${this.currentPathOrder}`);
    } else {
      await this.reversePathOrder(endpoint.pathId);
      this.currentPathOrder = endpoint.maxOrder;
      logger.info(`[CellRiverEditor] Continuing from START of path ${endpoint.pathId} (reversed), order starts at ${this.currentPathOrder}`);
    }
  }
  /**
   * Reverse the order of all points in a path
   * Used when extending from the start endpoint
   */
  async reversePathOrder(pathId) {
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers?.cellPaths) return;
      const path = kingdom.rivers.cellPaths.find((p) => p.id === pathId);
      if (!path || path.cells.length === 0) return;
      const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
      const orders = sortedCells.map((c) => c.order);
      for (let i = 0; i < sortedCells.length; i++) {
        const cell = path.cells.find((c) => c.x === sortedCells[i].x && c.y === sortedCells[i].y);
        if (cell) {
          cell.order = orders[sortedCells.length - 1 - i];
        }
      }
    });
    this.renderEditorLayer();
  }
  /**
   * Find a nearby segment of an existing path
   * Returns segment info if cursor is within threshold of a path segment
   */
  findNearbySegment(pixelX, pixelY, threshold = 12) {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let closest = null;
    let minDistance = Infinity;
    for (const path of cellPaths) {
      if (path.cells.length < 2) continue;
      const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
      for (let i = 0; i < sortedCells.length - 1; i++) {
        const p1 = sortedCells[i];
        const p2 = sortedCells[i + 1];
        const dist = this.pointToSegmentDistance(
          pixelX,
          pixelY,
          p1.x * CELL_SIZE$1 + CELL_SIZE$1 / 2,
          p1.y * CELL_SIZE$1 + CELL_SIZE$1 / 2,
          p2.x * CELL_SIZE$1 + CELL_SIZE$1 / 2,
          p2.y * CELL_SIZE$1 + CELL_SIZE$1 / 2
        );
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          closest = {
            pathId: path.id,
            insertAfterOrder: p1.order,
            insertBeforeOrder: p2.order
          };
        }
      }
    }
    return closest;
  }
  /**
   * Calculate distance from a point to a line segment
   */
  pointToSegmentDistance(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    return Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
  }
  /**
   * Find any path near the given position (for click-to-select)
   * Returns the path ID if cursor is within threshold of any path
   */
  findNearbyPath(pixelX, pixelY, threshold = 16) {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let closestPathId = null;
    let minDistance = Infinity;
    for (const path of cellPaths) {
      for (const cell of path.cells) {
        const cellCenterX = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const cellCenterY = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const dist = Math.sqrt((pixelX - cellCenterX) ** 2 + (pixelY - cellCenterY) ** 2);
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          closestPathId = path.id;
        }
      }
    }
    return closestPathId;
  }
  /**
   * Select a path without starting to draw
   * Used for click-to-select functionality
   */
  selectPath(pathId) {
    this.currentPathId = pathId;
    const kingdom = getKingdomData();
    const path = kingdom.rivers?.cellPaths?.find((p) => p.id === pathId);
    if (path && path.cells.length > 0) {
      const maxOrder = Math.max(...path.cells.map((c) => c.order));
      this.currentPathOrder = maxOrder;
    } else {
      this.currentPathOrder = 0;
    }
    logger.info(`[CellRiverEditor] Selected path ${pathId}`);
    this.renderEditorLayer();
  }
  /**
   * Deselect the current path (click on empty space)
   */
  deselectPath() {
    if (this.currentPathId) {
      logger.info(`[CellRiverEditor] Deselected path ${this.currentPathId}`);
      this.currentPathId = null;
      this.currentPathOrder = 0;
      this.renderEditorLayer();
    }
  }
  /**
   * Find a vertex near the given position on the active path
   * Returns vertex info if cursor is within threshold of a vertex
   */
  findNearbyVertex(pixelX, pixelY, threshold = 12) {
    if (!this.currentPathId) return null;
    const kingdom = getKingdomData();
    const path = kingdom.rivers?.cellPaths?.find((p) => p.id === this.currentPathId);
    if (!path) return null;
    let closest = null;
    let minDistance = Infinity;
    for (const cell of path.cells) {
      const cellCenterX = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const cellCenterY = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
      const dist = Math.sqrt((pixelX - cellCenterX) ** 2 + (pixelY - cellCenterY) ** 2);
      if (dist < threshold && dist < minDistance) {
        minDistance = dist;
        closest = {
          pathId: this.currentPathId,
          cellX: cell.x,
          cellY: cell.y,
          order: cell.order
        };
      }
    }
    return closest;
  }
  /**
   * Start moving a vertex
   */
  startVertexMove(vertex) {
    this.movingVertexPathId = vertex.pathId;
    this.movingVertexOrder = vertex.order;
    this.movingVertexOriginalX = vertex.cellX;
    this.movingVertexOriginalY = vertex.cellY;
    logger.info(`[CellRiverEditor] Started moving vertex at (${vertex.cellX}, ${vertex.cellY})`);
  }
  /**
   * Check if currently moving a vertex
   */
  isMovingVertex() {
    return this.movingVertexPathId !== null;
  }
  /**
   * Update vertex position during drag
   */
  async updateVertexPosition(pixelX, pixelY) {
    if (!this.movingVertexPathId) return;
    const newCell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers?.cellPaths) return;
      const path = kingdom.rivers.cellPaths.find((p) => p.id === this.movingVertexPathId);
      if (!path) return;
      const vertex = path.cells.find((c) => c.order === this.movingVertexOrder);
      if (vertex) {
        vertex.x = newCell.x;
        vertex.y = newCell.y;
      }
    });
    this.renderEditorLayer();
  }
  /**
   * Finish moving a vertex
   */
  finishVertexMove() {
    if (this.movingVertexPathId) {
      logger.info(`[CellRiverEditor] Finished moving vertex`);
    }
    this.movingVertexPathId = null;
    this.movingVertexOrder = 0;
    this.movingVertexOriginalX = 0;
    this.movingVertexOriginalY = 0;
  }
  /**
   * Start reshaping a segment - removes cells between two points
   * and prepares to insert new cells
   */
  async startReshapeSegment(pathId, afterOrder, beforeOrder) {
    this.reshapingPathId = pathId;
    this.reshapeInsertAfterOrder = afterOrder;
    this.reshapeInsertBeforeOrder = beforeOrder;
    this.reshapePointCount = 0;
    await updateKingdom((kingdom) => {
      const path = kingdom.rivers?.cellPaths?.find((p) => p.id === pathId);
      if (path) {
        path.cells = path.cells.filter(
          (c) => c.order <= afterOrder || c.order >= beforeOrder
        );
      }
    });
    logger.info(`[CellRiverEditor] Started reshape on path ${pathId}, segment ${afterOrder}-${beforeOrder}`);
    this.renderEditorLayer();
  }
  /**
   * Add a point during reshape mode
   * Calculates order value between the segment endpoints
   */
  async addReshapePoint(pixelX, pixelY) {
    if (!this.reshapingPathId) return;
    const cell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    this.reshapePointCount++;
    const totalRange = this.reshapeInsertBeforeOrder - this.reshapeInsertAfterOrder;
    const fraction = this.reshapePointCount / (this.reshapePointCount + 1);
    const newOrder = this.reshapeInsertAfterOrder + totalRange * fraction;
    await updateKingdom((kingdom) => {
      const path = kingdom.rivers?.cellPaths?.find((p) => p.id === this.reshapingPathId);
      if (!path) return;
      const exists = path.cells.some((c) => c.x === cell.x && c.y === cell.y);
      if (!exists) {
        path.cells.push({
          x: cell.x,
          y: cell.y,
          order: newOrder
        });
      }
    });
    this.renderEditorLayer();
  }
  /**
   * Check if currently in reshape mode
   */
  isReshaping() {
    return this.reshapingPathId !== null;
  }
  /**
   * Finish reshaping and clean up state
   */
  finishReshape() {
    if (this.reshapingPathId) {
      logger.info(`[CellRiverEditor] Finished reshape on path ${this.reshapingPathId}`);
    }
    this.reshapingPathId = null;
    this.reshapeInsertAfterOrder = 0;
    this.reshapeInsertBeforeOrder = 0;
    this.reshapePointCount = 0;
  }
  /**
   * Remove the last point from a path near the given position
   * Used with Alt/Cmd+Click to undo points
   */
  async removeLastPointNear(pixelX, pixelY) {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let closestPath = null;
    let minDistance = Infinity;
    const threshold = CELL_SIZE$1 * 2;
    for (const path of cellPaths) {
      for (const cell of path.cells) {
        const cellX2 = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const cellY2 = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const dist = Math.sqrt((pixelX - cellX2) ** 2 + (pixelY - cellY2) ** 2);
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          closestPath = path;
        }
      }
    }
    if (!closestPath || closestPath.cells.length === 0) {
      return false;
    }
    const pathId = closestPath.id;
    const sortedCells = [...closestPath.cells].sort((a, b) => a.order - b.order);
    const lastCell = sortedCells[sortedCells.length - 1];
    const cellX = lastCell.x;
    const cellY = lastCell.y;
    const cellOrder = lastCell.order;
    await updateKingdom((kingdom2) => {
      if (!kingdom2.rivers?.cellPaths) return;
      kingdom2.rivers.cellPaths = kingdom2.rivers.cellPaths.map((p) => {
        if (p.id !== pathId) return p;
        const newCells = p.cells.filter(
          (c) => !(c.x === cellX && c.y === cellY && c.order === cellOrder)
        );
        return { ...p, cells: newCells };
      }).filter((p) => p.cells.length > 0);
    });
    this.renderEditorLayer();
    logger.info(`[CellRiverEditor] Removed last point from path ${pathId}`);
    return true;
  }
  /**
   * Remove the specific point that was clicked
   * Used with Ctrl+Click to remove a specific point from the path
   * Returns true if a point was removed
   */
  async removePointAt(pixelX, pixelY) {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let closestPathId = null;
    let closestCell = null;
    let minDistance = Infinity;
    const threshold = CELL_SIZE$1 * 1.5;
    for (const path of cellPaths) {
      for (const cell of path.cells) {
        const cellX2 = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const cellY2 = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const dist = Math.sqrt((pixelX - cellX2) ** 2 + (pixelY - cellY2) ** 2);
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          closestPathId = path.id;
          closestCell = cell;
        }
      }
    }
    if (!closestPathId || !closestCell) {
      return false;
    }
    const pathId = closestPathId;
    const cellX = closestCell.x;
    const cellY = closestCell.y;
    const cellOrder = closestCell.order;
    await updateKingdom((kingdom2) => {
      if (!kingdom2.rivers?.cellPaths) return;
      kingdom2.rivers.cellPaths = kingdom2.rivers.cellPaths.map((p) => {
        if (p.id !== pathId) return p;
        const newCells = p.cells.filter(
          (c) => !(c.x === cellX && c.y === cellY && c.order === cellOrder)
        );
        return { ...p, cells: newCells };
      }).filter((p) => p.cells.length > 0);
    });
    this.renderEditorLayer();
    logger.info(`[CellRiverEditor] Removed point (${cellX}, ${cellY}) from path ${pathId}`);
    return true;
  }
  /**
   * Undo the last point added to the current path
   * Used with Ctrl+Z during drawing
   */
  async undoLastPoint() {
    if (!this.currentPathId) {
      return false;
    }
    const pathId = this.currentPathId;
    let removed = false;
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers?.cellPaths) return;
      kingdom.rivers.cellPaths = kingdom.rivers.cellPaths.map((p) => {
        if (p.id !== pathId) return p;
        if (p.cells.length === 0) return p;
        const sortedCells = [...p.cells].sort((a, b) => a.order - b.order);
        const lastCell = sortedCells[sortedCells.length - 1];
        if (sortedCells.length > 1) {
          this.currentPathOrder = sortedCells[sortedCells.length - 2].order;
        } else {
          this.currentPathOrder = 0;
        }
        const newCells = p.cells.filter(
          (c) => !(c.x === lastCell.x && c.y === lastCell.y && c.order === lastCell.order)
        );
        removed = true;
        return { ...p, cells: newCells };
      }).filter((p) => p.cells.length > 0);
      const pathStillExists = kingdom.rivers.cellPaths.some((p) => p.id === pathId);
      if (!pathStillExists) {
        this.currentPathId = null;
        this.currentPathOrder = 0;
      }
    });
    if (removed) {
      this.renderEditorLayer();
      logger.info(`[CellRiverEditor] Undo: removed last point from path ${pathId}`);
    }
    return removed;
  }
  /**
   * Get the currently active path ID (for highlighting in the renderer)
   */
  getCurrentPathId() {
    return this.currentPathId;
  }
  /**
   * Start a new river path
   */
  startNewPath() {
    this.currentPathId = crypto.randomUUID();
    this.currentPathOrder = 0;
    logger.info(`[CellRiverEditor] Started new path: ${this.currentPathId}`);
  }
  /**
   * Finish current path and start fresh
   */
  finishPath() {
    if (this.currentPathId) {
      logger.info(`[CellRiverEditor] Finished path: ${this.currentPathId}`);
    }
    this.currentPathId = null;
    this.currentPathOrder = 0;
  }
  /**
   * Render the editor layer with current cell paths
   * Passes the active path ID to highlight it in pink
   */
  renderEditorLayer() {
    const mapLayer = this.getMapLayer();
    const kingdom = getKingdomData();
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.editor);
    const cellPaths = kingdom.rivers?.cellPaths || [];
    if (cellPaths.length === 0) {
      return;
    }
    const editorLayer = mapLayer.createLayer(
      CELL_RIVER_LAYERS.editor,
      CELL_RIVER_Z_INDICES.editor
    );
    renderCellRiverPaths(editorLayer, cellPaths, CELL_SIZE$1, this.currentPathId);
    mapLayer.showLayer(CELL_RIVER_LAYERS.editor);
  }
  /**
   * Initialize editor - show existing cell paths and point grid
   * Note: Overlay configuration is handled by EditorModeService.setEditorMode()
   */
  initialize() {
    logger.info("[CellRiverEditor] Initializing");
    this.renderPointGrid();
    this.renderEditorLayer();
  }
  /**
   * Render the point grid showing clickable positions
   */
  renderPointGrid() {
    const mapLayer = this.getMapLayer();
    const canvas = globalThis.canvas;
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.grid);
    const viewportBounds = {
      x: 0,
      y: 0,
      width: canvas?.dimensions?.sceneWidth || 4e3,
      height: canvas?.dimensions?.sceneHeight || 4e3
    };
    const gridLayer = mapLayer.createLayer(
      CELL_RIVER_LAYERS.grid,
      CELL_RIVER_Z_INDICES.grid
    );
    renderCellPointGrid(gridLayer, CELL_SIZE$1, viewportBounds);
    mapLayer.showLayer(CELL_RIVER_LAYERS.grid);
  }
  /**
   * Cleanup - clear and hide editor layers
   * Note: Overlay restoration is handled by EditorModeService.exitEditorMode()
   */
  cleanup() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.grid);
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.editor);
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.preview);
    mapLayer.hideLayer(CELL_RIVER_LAYERS.grid);
    mapLayer.hideLayer(CELL_RIVER_LAYERS.editor);
    mapLayer.hideLayer(CELL_RIVER_LAYERS.preview);
    this.currentPathId = null;
    this.currentPathOrder = 0;
    logger.info("[CellRiverEditor] Cleaned up");
  }
  /** Current eraser radius in pixels */
  eraserRadius = 16;
  // Default 16 pixels (2 cells)
  /**
   * Set the eraser radius
   */
  setEraserRadius(radius) {
    this.eraserRadius = radius;
    logger.info(`[CellRiverEditor] Eraser radius set to ${radius}px`);
  }
  /**
   * Get the current eraser radius
   */
  getEraserRadius() {
    return this.eraserRadius;
  }
  /**
   * Erase river path at position - removes the entire path that contains the clicked cell
   */
  async handleCellRiverErase(pixelX, pixelY) {
    const clickedCell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    logger.info(`[CellRiverEditor] Erase at cell (${clickedCell.x}, ${clickedCell.y})`);
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let pathToRemove = null;
    const clickX = clickedCell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
    const clickY = clickedCell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
    let minDistance = Infinity;
    const threshold = CELL_SIZE$1 * 2;
    for (const path of cellPaths) {
      for (const cell of path.cells) {
        const cellX = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const cellY = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const dist = Math.sqrt((clickX - cellX) ** 2 + (clickY - cellY) ** 2);
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          pathToRemove = path.id;
        }
      }
    }
    if (pathToRemove) {
      await updateKingdom((kingdom2) => {
        if (!kingdom2.rivers?.cellPaths) return;
        kingdom2.rivers.cellPaths = kingdom2.rivers.cellPaths.filter((p) => p.id !== pathToRemove);
      });
      const ui2 = globalThis.ui;
      ui2?.notifications?.info("River path removed");
      logger.info(`[CellRiverEditor] Removed path ${pathToRemove}`);
    } else {
      const ui2 = globalThis.ui;
      ui2?.notifications?.warn("No river path found at that location");
    }
    this.renderEditorLayer();
  }
  /**
   * Area erase - removes all river points within a circular radius
   * Unlike handleCellRiverErase which removes entire paths, this removes individual points
   */
  async handleAreaErase(pixelX, pixelY) {
    const radius = this.eraserRadius;
    const radiusSq = radius * radius;
    logger.info(`[CellRiverEditor] Area erase at (${pixelX}, ${pixelY}) with radius ${radius}px`);
    let totalRemoved = 0;
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers?.cellPaths) return;
      kingdom.rivers.cellPaths = kingdom.rivers.cellPaths.map((path) => {
        const originalCount = path.cells.length;
        const newCells = path.cells.filter((cell) => {
          const cellCenterX = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
          const cellCenterY = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
          const distSq = (pixelX - cellCenterX) ** 2 + (pixelY - cellCenterY) ** 2;
          return distSq > radiusSq;
        });
        totalRemoved += originalCount - newCells.length;
        return { ...path, cells: newCells };
      }).filter((path) => path.cells.length > 0);
    });
    if (totalRemoved > 0) {
      logger.info(`[CellRiverEditor] Area erase removed ${totalRemoved} points`);
    }
    this.renderEditorLayer();
  }
  /**
   * Show eraser preview circle at the given position
   */
  showEraserPreview(pixelX, pixelY) {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_RIVER_LAYERS.preview);
    const previewLayer = mapLayer.createLayer(
      CELL_RIVER_LAYERS.preview,
      CELL_RIVER_Z_INDICES.preview
    );
    const graphics = new PIXI.Graphics();
    graphics.name = "EraserPreview";
    graphics.lineStyle(2, 16737894, 0.8);
    graphics.beginFill(16711680, 0.15);
    graphics.drawCircle(pixelX, pixelY, this.eraserRadius);
    graphics.endFill();
    previewLayer.addChild(graphics);
    mapLayer.showLayer(CELL_RIVER_LAYERS.preview);
  }
  /**
   * Flip river direction at position - reverses the order of cells in the path
   */
  async handleCellRiverFlip(pixelX, pixelY) {
    const clickedCell = pixelToCell(pixelX, pixelY, CELL_SIZE$1);
    logger.info(`[CellRiverEditor] Flip at cell (${clickedCell.x}, ${clickedCell.y})`);
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    let pathToFlip = null;
    const clickX = clickedCell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
    const clickY = clickedCell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
    let minDistance = Infinity;
    const threshold = CELL_SIZE$1 * 2;
    for (const path of cellPaths) {
      for (const cell of path.cells) {
        const cellX = cell.x * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const cellY = cell.y * CELL_SIZE$1 + CELL_SIZE$1 / 2;
        const dist = Math.sqrt((clickX - cellX) ** 2 + (clickY - cellY) ** 2);
        if (dist < threshold && dist < minDistance) {
          minDistance = dist;
          pathToFlip = path.id;
        }
      }
    }
    if (pathToFlip) {
      await updateKingdom((kingdom2) => {
        if (!kingdom2.rivers?.cellPaths) return;
        const path = kingdom2.rivers.cellPaths.find((p) => p.id === pathToFlip);
        if (!path) return;
        const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
        const maxOrder = sortedCells.length * 10;
        for (let i = 0; i < sortedCells.length; i++) {
          const cell = path.cells.find((c) => c.x === sortedCells[i].x && c.y === sortedCells[i].y);
          if (cell) {
            cell.order = maxOrder - i * 10;
          }
        }
      });
      const ui2 = globalThis.ui;
      ui2?.notifications?.info("River direction reversed");
      logger.info(`[CellRiverEditor] Flipped path ${pathToFlip}`);
    } else {
      const ui2 = globalThis.ui;
      ui2?.notifications?.warn("No river path found at that location");
    }
    this.renderEditorLayer();
  }
  /**
   * Clear all river paths - wipe everything clean
   */
  async clearAll() {
    logger.info("[CellRiverEditor] Clearing all river paths");
    await updateKingdom((kingdom) => {
      if (!kingdom.rivers) return;
      kingdom.rivers.cellPaths = [];
      kingdom.rivers.rasterizedCells = [];
    });
    this.currentPathId = null;
    this.currentPathOrder = 0;
    this.renderEditorLayer();
    const ui2 = globalThis.ui;
    ui2?.notifications?.info("All river paths cleared");
  }
  /** River width in cells (should match RIVER_WIDTH_CELLS in CellRiverRenderer) */
  static RIVER_WIDTH_CELLS = 2;
  /**
   * Compute rasterized cells from all polyline paths
   * Uses Bresenham's algorithm to rasterize lines between consecutive vertices
   * Adds thickness by including perpendicular neighbor cells
   */
  computeRasterizedCells(cellPaths) {
    const cellSet = /* @__PURE__ */ new Set();
    for (const path of cellPaths) {
      if (path.cells.length === 0) continue;
      const sortedCells = [...path.cells].sort((a, b) => a.order - b.order);
      if (sortedCells.length === 1) {
        this.addCellWithThickness(cellSet, sortedCells[0].x, sortedCells[0].y, 0, 0);
        continue;
      }
      for (let i = 0; i < sortedCells.length - 1; i++) {
        const p1 = sortedCells[i];
        const p2 = sortedCells[i + 1];
        const lineCells = this.rasterizeLine(p1.x, p1.y, p2.x, p2.y);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        for (const cell of lineCells) {
          this.addCellWithThickness(cellSet, cell.x, cell.y, dx, dy);
        }
      }
    }
    const result = [];
    for (const key of cellSet) {
      const [x, y] = key.split(",").map(Number);
      result.push({ x, y });
    }
    logger.info(`[CellRiverEditor] Computed ${result.length} rasterized cells from ${cellPaths.length} paths`);
    return result;
  }
  /**
   * Add a cell and its perpendicular neighbors for river thickness
   */
  addCellWithThickness(cellSet, x, y, dx, dy) {
    cellSet.add(`${x},${y}`);
    const halfWidth = Math.floor(CellRiverEditorHandlers.RIVER_WIDTH_CELLS / 2);
    if (halfWidth === 0) return;
    if (dx === 0 && dy === 0) {
      for (let d = 1; d <= halfWidth; d++) {
        cellSet.add(`${x + d},${y}`);
        cellSet.add(`${x - d},${y}`);
        cellSet.add(`${x},${y + d}`);
        cellSet.add(`${x},${y - d}`);
      }
    } else if (Math.abs(dx) > Math.abs(dy)) {
      for (let d = 1; d <= halfWidth; d++) {
        cellSet.add(`${x},${y + d}`);
        cellSet.add(`${x},${y - d}`);
      }
    } else {
      for (let d = 1; d <= halfWidth; d++) {
        cellSet.add(`${x + d},${y}`);
        cellSet.add(`${x - d},${y}`);
      }
    }
  }
  /**
   * Rasterize a line between two cell coordinates using Bresenham's algorithm
   */
  rasterizeLine(x0, y0, x1, y1) {
    const cells = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let x = x0;
    let y = y0;
    while (true) {
      cells.push({ x, y });
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
    return cells;
  }
  /**
   * Rasterize all polylines and store the result
   * Call this when saving the editor
   */
  async rasterizeOnSave() {
    const kingdom = getKingdomData();
    const cellPaths = kingdom.rivers?.cellPaths || [];
    const rasterizedCells = this.computeRasterizedCells(cellPaths);
    await updateKingdom((kingdom2) => {
      if (!kingdom2.rivers) {
        kingdom2.rivers = { paths: [] };
      }
      kingdom2.rivers.rasterizedCells = rasterizedCells;
    });
    logger.info(`[CellRiverEditor] Saved ${rasterizedCells.length} rasterized cells`);
  }
}
const cellRiverEditorHandlers = new CellRiverEditorHandlers();
const CELL_LAKE_COLORS = {
  // Lake cells (editor mode)
  lake: 2142890,
  // Light sea green (slightly different from river blue)
  lakeAlpha: 0.6,
  // Lake cell border
  lakeBorder: 35723,
  // Dark cyan
  lakeBorderAlpha: 0.4,
  // Preview cells (brush preview)
  preview: 52945,
  // Erase preview
  erasePreview: 16737894
};
function renderLakeCells(layer, cells, cellSize) {
  if (!cells || cells.length === 0) {
    return;
  }
  const graphics = new PIXI.Graphics();
  graphics.name = "LakeCells";
  graphics.visible = true;
  graphics.beginFill(CELL_LAKE_COLORS.lake, CELL_LAKE_COLORS.lakeAlpha);
  for (const cell of cells) {
    const x = cell.x * cellSize;
    const y = cell.y * cellSize;
    graphics.drawRect(x, y, cellSize, cellSize);
  }
  graphics.endFill();
  graphics.lineStyle(1, CELL_LAKE_COLORS.lakeBorder, CELL_LAKE_COLORS.lakeBorderAlpha);
  for (const cell of cells) {
    const x = cell.x * cellSize;
    const y = cell.y * cellSize;
    graphics.drawRect(x, y, cellSize, cellSize);
  }
  graphics.lineStyle(0);
  layer.addChild(graphics);
}
function renderBrushCircle(layer, centerX, centerY, radius, isErasing = false) {
  const graphics = new PIXI.Graphics();
  graphics.name = "BrushCircle";
  graphics.visible = true;
  const color = isErasing ? 16711680 : 65535;
  graphics.lineStyle(2, color, 0.8);
  graphics.drawCircle(centerX, centerY, radius);
  graphics.lineStyle(0);
  const fillColor = isErasing ? CELL_LAKE_COLORS.erasePreview : CELL_LAKE_COLORS.preview;
  const fillAlpha = isErasing ? 0.15 : 0.2;
  graphics.beginFill(fillColor, fillAlpha);
  graphics.drawCircle(centerX, centerY, radius);
  graphics.endFill();
  layer.addChild(graphics);
}
function getCellsInRadius(centerPixelX, centerPixelY, radius, cellSize) {
  const cells = [];
  const radiusSq = radius * radius;
  const minCellX = Math.floor((centerPixelX - radius) / cellSize);
  const maxCellX = Math.ceil((centerPixelX + radius) / cellSize);
  const minCellY = Math.floor((centerPixelY - radius) / cellSize);
  const maxCellY = Math.ceil((centerPixelY + radius) / cellSize);
  for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
    for (let cellY = minCellY; cellY <= maxCellY; cellY++) {
      const cellCenterX = cellX * cellSize + cellSize / 2;
      const cellCenterY = cellY * cellSize + cellSize / 2;
      const distSq = (centerPixelX - cellCenterX) ** 2 + (centerPixelY - cellCenterY) ** 2;
      if (distSq <= radiusSq) {
        cells.push({ x: cellX, y: cellY });
      }
    }
  }
  return cells;
}
class CellLakeEditorHandlers {
  /** Current brush radius in pixels */
  brushRadius = 24;
  // Default 24 pixels (3 cells)
  /** Track cells painted in current drag to avoid redundant updates */
  currentDragCells = /* @__PURE__ */ new Set();
  /** Pending cells to add during drag (batched for performance) */
  pendingAddCells = /* @__PURE__ */ new Set();
  /** Pending cells to remove during drag (batched for performance) */
  pendingRemoveCells = /* @__PURE__ */ new Set();
  /** Is currently dragging (painting) */
  isDragging = false;
  /** Last cursor position for hover preview */
  lastCursorX = 0;
  lastCursorY = 0;
  /** Map layer reference */
  mapLayer = null;
  /**
   * Get map layer instance (lazy loaded)
   */
  getMapLayer() {
    if (!this.mapLayer) {
      this.mapLayer = ReignMakerMapLayer.getInstance();
    }
    return this.mapLayer;
  }
  /**
   * Set the brush radius
   */
  setBrushRadius(radius) {
    this.brushRadius = Math.max(8, Math.min(64, radius));
    logger.info(`[CellLakeEditor] Brush radius set to ${this.brushRadius}px`);
    if (this.lastCursorX || this.lastCursorY) {
      this.handleMouseMove(this.lastCursorX, this.lastCursorY, false);
    }
  }
  /**
   * Adjust the brush radius by a delta amount
   * Returns the new radius
   */
  adjustBrushRadius(delta) {
    this.setBrushRadius(this.brushRadius + delta);
    return this.brushRadius;
  }
  /**
   * Get the current brush radius
   */
  getBrushRadius() {
    return this.brushRadius;
  }
  /**
   * Start painting - called on mousedown
   */
  startPainting() {
    this.isDragging = true;
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
  }
  /**
   * Stop painting - called on mouseup
   * Commits all pending cells to the kingdom data
   */
  async stopPainting() {
    this.isDragging = false;
    if (this.pendingAddCells.size > 0) {
      const cellsToAdd = Array.from(this.pendingAddCells).map((key) => {
        const [x, y] = key.split(",").map(Number);
        return { x, y };
      });
      await updateKingdom((kingdom) => {
        if (!kingdom.waterFeatures) {
          kingdom.waterFeatures = { lakes: [], swamps: [] };
        }
        if (!kingdom.waterFeatures.lakeCells) {
          kingdom.waterFeatures.lakeCells = [];
        }
        const existingCells = new Set(
          kingdom.waterFeatures.lakeCells.map((c) => `${c.x},${c.y}`)
        );
        for (const cell of cellsToAdd) {
          const key = `${cell.x},${cell.y}`;
          if (!existingCells.has(key)) {
            kingdom.waterFeatures.lakeCells.push({ x: cell.x, y: cell.y });
            existingCells.add(key);
          }
        }
      });
      logger.info(`[CellLakeEditor] Committed ${cellsToAdd.length} cells`);
    }
    if (this.pendingRemoveCells.size > 0) {
      await updateKingdom((kingdom) => {
        if (!kingdom.waterFeatures?.lakeCells) return;
        kingdom.waterFeatures.lakeCells = kingdom.waterFeatures.lakeCells.filter(
          (c) => !this.pendingRemoveCells.has(`${c.x},${c.y}`)
        );
      });
      logger.info(`[CellLakeEditor] Removed ${this.pendingRemoveCells.size} cells`);
    }
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.renderEditorLayer();
  }
  /**
   * Handle lake paint - adds cells within brush radius
   * During drag, cells are batched for performance and rendered as preview
   */
  async handleLakePaint(pixelX, pixelY) {
    const cellsToAdd = getCellsInRadius(pixelX, pixelY, this.brushRadius, CELL_SIZE$2);
    if (cellsToAdd.length === 0) return;
    const newCells = cellsToAdd.filter((c) => {
      const key = `${c.x},${c.y}`;
      if (this.currentDragCells.has(key)) return false;
      this.currentDragCells.add(key);
      return true;
    });
    if (newCells.length === 0) return;
    for (const cell of newCells) {
      const key = `${cell.x},${cell.y}`;
      this.pendingAddCells.add(key);
      this.pendingRemoveCells.delete(key);
    }
    this.renderEditorLayerWithPending();
  }
  /**
   * Handle lake erase - removes cells within brush radius
   * During drag, cells are batched for performance
   */
  async handleLakeErase(pixelX, pixelY) {
    const cellsToRemove = getCellsInRadius(pixelX, pixelY, this.brushRadius, CELL_SIZE$2);
    if (cellsToRemove.length === 0) return;
    const newCells = cellsToRemove.filter((c) => {
      const key = `${c.x},${c.y}`;
      if (this.currentDragCells.has(key)) return false;
      this.currentDragCells.add(key);
      return true;
    });
    if (newCells.length === 0) return;
    for (const cell of newCells) {
      const key = `${cell.x},${cell.y}`;
      this.pendingRemoveCells.add(key);
      this.pendingAddCells.delete(key);
    }
    this.renderEditorLayerWithPending();
  }
  /**
   * Handle mouse move - show brush preview with size indicator
   */
  handleMouseMove(pixelX, pixelY, isErasing = false) {
    this.lastCursorX = pixelX;
    this.lastCursorY = pixelY;
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.preview);
    const previewLayer = mapLayer.createLayer(
      CELL_LAKE_LAYERS.preview,
      CELL_LAKE_Z_INDICES.preview
    );
    renderBrushCircle(previewLayer, pixelX, pixelY, this.brushRadius, isErasing);
    const brushSizeText = new PIXI.Text(`${Math.round(this.brushRadius / CELL_SIZE$2)} cells`, {
      fontFamily: "Arial",
      fontSize: 12,
      fill: isErasing ? 16737894 : 65535,
      stroke: 0,
      strokeThickness: 2
    });
    brushSizeText.anchor.set(0.5, 0);
    brushSizeText.position.set(pixelX, pixelY + this.brushRadius + 4);
    previewLayer.addChild(brushSizeText);
    mapLayer.showLayer(CELL_LAKE_LAYERS.preview);
  }
  /**
   * Clear hover preview
   */
  clearHoverPreview() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.preview);
  }
  /**
   * Render the editor layer with current lake cells
   */
  renderEditorLayer() {
    const mapLayer = this.getMapLayer();
    const kingdom = getKingdomData();
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.editor);
    const lakeCells = kingdom.waterFeatures?.lakeCells || [];
    if (lakeCells.length === 0) {
      return;
    }
    const editorLayer = mapLayer.createLayer(
      CELL_LAKE_LAYERS.editor,
      CELL_LAKE_Z_INDICES.editor
    );
    renderLakeCells(editorLayer, lakeCells, CELL_SIZE$2);
    mapLayer.showLayer(CELL_LAKE_LAYERS.editor);
  }
  /**
   * Render the editor layer with current lake cells AND pending cells from drag
   * This provides immediate visual feedback during drag painting without waiting for async updates
   */
  renderEditorLayerWithPending() {
    const mapLayer = this.getMapLayer();
    const kingdom = getKingdomData();
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.editor);
    let lakeCells = kingdom.waterFeatures?.lakeCells || [];
    if (this.pendingRemoveCells.size > 0) {
      lakeCells = lakeCells.filter((c) => !this.pendingRemoveCells.has(`${c.x},${c.y}`));
    }
    const existingSet = new Set(lakeCells.map((c) => `${c.x},${c.y}`));
    const pendingAddArray = [];
    for (const key of this.pendingAddCells) {
      if (!existingSet.has(key)) {
        const [x, y] = key.split(",").map(Number);
        pendingAddArray.push({ x, y });
      }
    }
    const allCells = [...lakeCells, ...pendingAddArray];
    if (allCells.length === 0) {
      return;
    }
    const editorLayer = mapLayer.createLayer(
      CELL_LAKE_LAYERS.editor,
      CELL_LAKE_Z_INDICES.editor
    );
    renderLakeCells(editorLayer, allCells, CELL_SIZE$2);
    mapLayer.showLayer(CELL_LAKE_LAYERS.editor);
  }
  /**
   * Initialize editor - show existing lake cells
   */
  initialize() {
    logger.info("[CellLakeEditor] Initializing");
    this.renderEditorLayer();
  }
  /**
   * Cleanup - clear and hide editor layers
   */
  cleanup() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.grid);
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.editor);
    mapLayer.clearLayerContent(CELL_LAKE_LAYERS.preview);
    mapLayer.hideLayer(CELL_LAKE_LAYERS.grid);
    mapLayer.hideLayer(CELL_LAKE_LAYERS.editor);
    mapLayer.hideLayer(CELL_LAKE_LAYERS.preview);
    this.isDragging = false;
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.lastCursorX = 0;
    this.lastCursorY = 0;
    logger.info("[CellLakeEditor] Cleaned up");
  }
  /**
   * Clear all lake cells
   */
  async clearAll() {
    logger.info("[CellLakeEditor] Clearing all lake cells");
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.currentDragCells.clear();
    await updateKingdom((kingdom) => {
      if (!kingdom.waterFeatures) return;
      kingdom.waterFeatures.lakeCells = [];
    });
    this.renderEditorLayer();
    const ui2 = globalThis.ui;
    ui2?.notifications?.info("All lake cells cleared");
  }
  /**
   * Get the count of lake cells
   */
  getLakeCellCount() {
    const kingdom = getKingdomData();
    return kingdom.waterFeatures?.lakeCells?.length || 0;
  }
  /**
   * Check if currently dragging/painting
   */
  isPainting() {
    return this.isDragging;
  }
}
const cellLakeEditorHandlers = new CellLakeEditorHandlers();
const CELL_CROSSING_LAYERS = {
  editor: "cell-crossing-editor",
  preview: "cell-crossing-preview",
  grid: "cell-crossing-grid"
};
const CELL_CROSSING_Z_INDICES = {
  editor: 9991,
  preview: 9995
};
const CELL_SIZE = 8;
class CellCrossingEditorHandlers {
  /** Current brush radius in pixels */
  brushRadius = 24;
  // Default 24 pixels (3 cells)
  /** Track cells painted in current drag to avoid redundant updates */
  currentDragCells = /* @__PURE__ */ new Set();
  /** Pending cells to add during drag (batched for performance) */
  pendingAddCells = /* @__PURE__ */ new Set();
  /** Pending cells to remove during drag (batched for performance) */
  pendingRemoveCells = /* @__PURE__ */ new Set();
  /** Is currently dragging (painting) */
  isDragging = false;
  /** Last cursor position for hover preview */
  lastCursorX = 0;
  lastCursorY = 0;
  /** Map layer reference */
  mapLayer = null;
  /**
   * Get map layer instance (lazy loaded)
   */
  getMapLayer() {
    if (!this.mapLayer) {
      this.mapLayer = ReignMakerMapLayer.getInstance();
    }
    return this.mapLayer;
  }
  /**
   * Set the brush radius
   */
  setBrushRadius(radius) {
    this.brushRadius = Math.max(8, Math.min(64, radius));
    logger.info(`[CellCrossingEditor] Brush radius set to ${this.brushRadius}px`);
    if (this.lastCursorX || this.lastCursorY) {
      this.handleMouseMove(this.lastCursorX, this.lastCursorY, false);
    }
  }
  /**
   * Adjust the brush radius by a delta amount
   * Returns the new radius
   */
  adjustBrushRadius(delta) {
    this.setBrushRadius(this.brushRadius + delta);
    return this.brushRadius;
  }
  /**
   * Get the current brush radius
   */
  getBrushRadius() {
    return this.brushRadius;
  }
  /**
   * Start painting - called on mousedown
   */
  startPainting() {
    this.isDragging = true;
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
  }
  /**
   * Stop painting - called on mouseup
   * Commits all pending cells to the kingdom data
   */
  async stopPainting() {
    this.isDragging = false;
    if (this.pendingAddCells.size > 0) {
      const cellsToAdd = Array.from(this.pendingAddCells).map((key) => {
        const [x, y] = key.split(",").map(Number);
        return { x, y };
      });
      await updateKingdom((kingdom) => {
        if (!kingdom.waterFeatures) {
          kingdom.waterFeatures = { lakes: [], swamps: [] };
        }
        if (!kingdom.waterFeatures.passageCells) {
          kingdom.waterFeatures.passageCells = [];
        }
        const existingCells = new Set(
          kingdom.waterFeatures.passageCells.map((c) => `${c.x},${c.y}`)
        );
        for (const cell of cellsToAdd) {
          const key = `${cell.x},${cell.y}`;
          if (!existingCells.has(key)) {
            kingdom.waterFeatures.passageCells.push({ x: cell.x, y: cell.y });
            existingCells.add(key);
          }
        }
      });
      logger.info(`[CellCrossingEditor] Committed ${cellsToAdd.length} passage cells`);
    }
    if (this.pendingRemoveCells.size > 0) {
      await updateKingdom((kingdom) => {
        if (!kingdom.waterFeatures?.passageCells) return;
        kingdom.waterFeatures.passageCells = kingdom.waterFeatures.passageCells.filter(
          (c) => !this.pendingRemoveCells.has(`${c.x},${c.y}`)
        );
      });
      logger.info(`[CellCrossingEditor] Removed ${this.pendingRemoveCells.size} passage cells`);
    }
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.renderEditorLayer();
  }
  /**
   * Handle crossing paint - adds cells within brush radius
   * During drag, cells are batched for performance and rendered as preview
   */
  async handleCrossingPaint(pixelX, pixelY) {
    const cellsToAdd = this.getCellsInRadius(pixelX, pixelY, this.brushRadius);
    if (cellsToAdd.length === 0) return;
    const newCells = cellsToAdd.filter((c) => {
      const key = `${c.x},${c.y}`;
      if (this.currentDragCells.has(key)) return false;
      this.currentDragCells.add(key);
      return true;
    });
    if (newCells.length === 0) return;
    for (const cell of newCells) {
      const key = `${cell.x},${cell.y}`;
      this.pendingAddCells.add(key);
      this.pendingRemoveCells.delete(key);
    }
    this.renderEditorLayerWithPending();
  }
  /**
   * Handle crossing erase - removes cells within brush radius
   * During drag, cells are batched for performance
   */
  async handleCrossingErase(pixelX, pixelY) {
    const cellsToRemove = this.getCellsInRadius(pixelX, pixelY, this.brushRadius);
    if (cellsToRemove.length === 0) return;
    const newCells = cellsToRemove.filter((c) => {
      const key = `${c.x},${c.y}`;
      if (this.currentDragCells.has(key)) return false;
      this.currentDragCells.add(key);
      return true;
    });
    if (newCells.length === 0) return;
    for (const cell of newCells) {
      const key = `${cell.x},${cell.y}`;
      this.pendingRemoveCells.add(key);
      this.pendingAddCells.delete(key);
    }
    this.renderEditorLayerWithPending();
  }
  /**
   * Handle mouse move - show brush preview with size indicator
   */
  handleMouseMove(pixelX, pixelY, isErasing = false) {
    this.lastCursorX = pixelX;
    this.lastCursorY = pixelY;
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.preview);
    const previewLayer = mapLayer.createLayer(
      CELL_CROSSING_LAYERS.preview,
      CELL_CROSSING_Z_INDICES.preview
    );
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, isErasing ? 16737894 : 65280, 0.8);
    graphics.drawCircle(pixelX, pixelY, this.brushRadius);
    graphics.endFill();
    previewLayer.addChild(graphics);
    const brushSizeText = new PIXI.Text(`${Math.round(this.brushRadius / CELL_SIZE)} cells`, {
      fontFamily: "Arial",
      fontSize: 12,
      fill: isErasing ? 16737894 : 65280,
      stroke: 0,
      strokeThickness: 2
    });
    brushSizeText.anchor.set(0.5, 0);
    brushSizeText.position.set(pixelX, pixelY + this.brushRadius + 4);
    previewLayer.addChild(brushSizeText);
    mapLayer.showLayer(CELL_CROSSING_LAYERS.preview);
  }
  /**
   * Clear hover preview
   */
  clearHoverPreview() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.preview);
  }
  /**
   * Render the editor layer with current passage cells
   */
  renderEditorLayer() {
    const mapLayer = this.getMapLayer();
    const kingdom = getKingdomData();
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.editor);
    const passageCells = kingdom.waterFeatures?.passageCells || [];
    if (passageCells.length === 0) {
      return;
    }
    const editorLayer = mapLayer.createLayer(
      CELL_CROSSING_LAYERS.editor,
      CELL_CROSSING_Z_INDICES.editor
    );
    this.renderCells(editorLayer, passageCells);
    mapLayer.showLayer(CELL_CROSSING_LAYERS.editor);
  }
  /**
   * Render the editor layer with current passage cells AND pending cells from drag
   * This provides immediate visual feedback during drag painting without waiting for async updates
   */
  renderEditorLayerWithPending() {
    const mapLayer = this.getMapLayer();
    const kingdom = getKingdomData();
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.editor);
    let passageCells = kingdom.waterFeatures?.passageCells || [];
    if (this.pendingRemoveCells.size > 0) {
      passageCells = passageCells.filter((c) => !this.pendingRemoveCells.has(`${c.x},${c.y}`));
    }
    const existingSet = new Set(passageCells.map((c) => `${c.x},${c.y}`));
    const pendingAddArray = [];
    for (const key of this.pendingAddCells) {
      if (!existingSet.has(key)) {
        const [x, y] = key.split(",").map(Number);
        pendingAddArray.push({ x, y });
      }
    }
    const allCells = [...passageCells, ...pendingAddArray];
    if (allCells.length === 0) {
      return;
    }
    const editorLayer = mapLayer.createLayer(
      CELL_CROSSING_LAYERS.editor,
      CELL_CROSSING_Z_INDICES.editor
    );
    this.renderCells(editorLayer, allCells);
    mapLayer.showLayer(CELL_CROSSING_LAYERS.editor);
  }
  /**
   * Render passage cells as green squares
   */
  renderCells(layer, cells) {
    const graphics = new PIXI.Graphics();
    graphics.name = "PassageCells";
    for (const cell of cells) {
      const pixelX = cell.x * CELL_SIZE;
      const pixelY = cell.y * CELL_SIZE;
      graphics.beginFill(65280, 0.5);
      graphics.drawRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);
      graphics.endFill();
    }
    layer.addChild(graphics);
  }
  /**
   * Get cells within a radius of a point
   */
  getCellsInRadius(pixelX, pixelY, radius) {
    const cells = [];
    const centerCellX = Math.floor(pixelX / CELL_SIZE);
    const centerCellY = Math.floor(pixelY / CELL_SIZE);
    const cellRadius = Math.ceil(radius / CELL_SIZE);
    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        const cellX = centerCellX + dx;
        const cellY = centerCellY + dy;
        const cellCenterX = cellX * CELL_SIZE + CELL_SIZE / 2;
        const cellCenterY = cellY * CELL_SIZE + CELL_SIZE / 2;
        const distance = Math.sqrt(
          Math.pow(cellCenterX - pixelX, 2) + Math.pow(cellCenterY - pixelY, 2)
        );
        if (distance <= radius) {
          cells.push({ x: cellX, y: cellY });
        }
      }
    }
    return cells;
  }
  /**
   * Initialize editor - show existing passage cells
   */
  initialize() {
    logger.info("[CellCrossingEditor] Initializing");
    this.renderEditorLayer();
  }
  /**
   * Cleanup - clear and hide editor layers
   */
  cleanup() {
    const mapLayer = this.getMapLayer();
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.grid);
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.editor);
    mapLayer.clearLayerContent(CELL_CROSSING_LAYERS.preview);
    mapLayer.hideLayer(CELL_CROSSING_LAYERS.grid);
    mapLayer.hideLayer(CELL_CROSSING_LAYERS.editor);
    mapLayer.hideLayer(CELL_CROSSING_LAYERS.preview);
    this.isDragging = false;
    this.currentDragCells.clear();
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.lastCursorX = 0;
    this.lastCursorY = 0;
    logger.info("[CellCrossingEditor] Cleaned up");
  }
  /**
   * Clear all passage cells
   */
  async clearAll() {
    logger.info("[CellCrossingEditor] Clearing all passage cells");
    this.pendingAddCells.clear();
    this.pendingRemoveCells.clear();
    this.currentDragCells.clear();
    await updateKingdom((kingdom) => {
      if (!kingdom.waterFeatures) return;
      kingdom.waterFeatures.passageCells = [];
    });
    this.renderEditorLayer();
    const ui2 = globalThis.ui;
    ui2?.notifications?.info("All passage cells cleared");
  }
  /**
   * Get the count of passage cells
   */
  getPassageCellCount() {
    const kingdom = getKingdomData();
    return kingdom.waterFeatures?.passageCells?.length || 0;
  }
  /**
   * Check if currently dragging/painting
   */
  isPainting() {
    return this.isDragging;
  }
}
const cellCrossingEditorHandlers = new CellCrossingEditorHandlers();
const EDITOR_MODE_OVERLAYS = {
  "rivers": ["rivers"],
  // Cell-based river editing - show rivers overlay
  "water": ["rivers"],
  // Cell-based water/lake editing - show rivers overlay (includes lakes)
  "crossings": ["rivers", "navigation-grid-debug"],
  // Show rivers and nav grid for crossing placement
  "roads": ["roads", "territories", "settlements"],
  "terrain": ["terrain", "territories", "settlements", "roads"],
  // Show context while painting terrain
  "bounty": ["resources", "terrain", "territories"],
  // Show context while editing bounty
  "worksites": ["worksites", "terrain", "territories"],
  "settlements": ["settlement-hacks", "settlements", "territories"],
  "fortifications": ["fortifications", "territories"],
  "territory": ["territories"]
  // Composite overlay includes fills, borders, and provinces
};
class EditorModeService {
  static instance = null;
  active = false;
  currentTool = "inactive";
  currentMode = null;
  backupKingdomData = null;
  isDragging = false;
  // Direct PIXI event handlers for canvas events during editor mode
  pointerDownHandler = null;
  pointerMoveHandler = null;
  pointerUpHandler = null;
  dblClickHandler = null;
  keyDownHandler = null;
  // Store layer interactivity state for restoration
  savedLayerInteractivity = /* @__PURE__ */ new Map();
  // Store previous active scene control for restoration
  previousActiveControl = null;
  previousTokenActiveTool = null;
  // Road painting state (drag-to-paint)
  isRoadPainting = false;
  paintedHexesThisDrag = /* @__PURE__ */ new Set();
  isErasing = false;
  // Terrain painting state (drag-to-paint)
  isTerrainPainting = false;
  paintedTerrainHexes = /* @__PURE__ */ new Set();
  currentTerrainType = null;
  // Claimed-by painting state (drag-to-paint)
  isClaimPainting = false;
  paintedClaimHexes = /* @__PURE__ */ new Set();
  currentClaimOwner = null;
  // 'player' or faction ID
  paintingClaimOwner = null;
  // Owner being painted during current drag
  // Bounty painting state (drag-to-paint)
  isBountyPainting = false;
  paintedBountyHexes = /* @__PURE__ */ new Set();
  // Worksite painting state (drag-to-paint)
  isWorksitePainting = false;
  paintedWorksiteHexes = /* @__PURE__ */ new Set();
  // Cell river drawing state (drag-to-draw)
  isRiverDrawing = false;
  drawnRiverCells = /* @__PURE__ */ new Set();
  // Cell river reshape state (drag-to-reshape segment)
  isRiverReshaping = false;
  reshapedRiverCells = /* @__PURE__ */ new Set();
  // Cell river click position (for detecting drag after selection)
  riverClickPos = null;
  // Cell river area erase state (drag-to-erase)
  isAreaErasing = false;
  // Cell river vertex move state (shift+drag-to-move)
  isVertexMoving = false;
  // Cell lake painting state (drag-to-paint brush mode)
  isLakePainting = false;
  isLakeErasing = false;
  // Cell crossing painting state (drag-to-paint brush mode)
  isCrossingPainting = false;
  isCrossingErasing = false;
  // Handler modules
  debugHandlers = new EditorDebugHandlers();
  regionReportHandler = new RegionReportHandler();
  crossingHandlers = new CrossingEditorHandlers();
  roadHandlers = new RoadEditorHandlers();
  terrainHandlers = new TerrainEditorHandlers();
  bountyHandlers = null;
  // Lazy loaded
  worksiteHandlers = new WorksiteEditorHandlers();
  featureHandlers = new FeatureEditorHandlers();
  claimedByHandlers = new ClaimedByEditorHandlers();
  constructor() {
  }
  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!EditorModeService.instance) {
      EditorModeService.instance = new EditorModeService();
    }
    return EditorModeService.instance;
  }
  /**
   * Toggle hex debug mode (logs hex IDs on click anywhere on canvas)
   */
  toggleDebugHex() {
    return this.debugHandlers.toggleDebugHex();
  }
  /**
   * Toggle region report mode (select two hexes to export hex data in region)
   */
  toggleRegionReport() {
    return this.regionReportHandler.toggle();
  }
  /**
   * Check if hex debug mode is active
   */
  isDebugHexMode() {
    return this.debugHandlers.isDebugHexMode();
  }
  /**
   * Check if region report mode is active
   */
  isRegionReportMode() {
    return this.regionReportHandler.isActive();
  }
  /**
   * Toggle neighbors debug mode (logs neighbor hex IDs on click)
   */
  toggleDebugNeighbors() {
    return this.debugHandlers.toggleDebugNeighbors();
  }
  /**
   * Check if neighbors debug mode is active
   */
  isDebugNeighborsMode() {
    return this.debugHandlers.isDebugNeighborsMode();
  }
  /**
   * Enter editor mode - backup kingdom data and take control of mouse interactions
   *
   * OVERLAY MANAGEMENT:
   * - Preserves user's current overlay state via overlay stack
   * - Clears all graphics layers for clean slate
   * - Does NOT set default overlays yet - wait for setEditorMode() call
   */
  async enterEditorMode() {
    if (this.active) {
      logger.warn("[EditorModeService] Already in editor mode");
      return;
    }
    const canvas = globalThis.canvas;
    if (!canvas?.stage || !canvas?.grid) {
      logger.error("[EditorModeService] Cannot enter editor mode - canvas not ready");
      const ui2 = globalThis.ui;
      ui2?.notifications?.error("Cannot open map editor - canvas not ready. Please wait for the scene to fully load.");
      throw new Error("Canvas not ready for editor mode");
    }
    logger.info("[EditorModeService] Entering editor mode");
    const kingdom = getKingdomData();
    this.backupKingdomData = structuredClone(kingdom);
    this.currentTool = "inactive";
    this.currentMode = null;
    this.savedLayerInteractivity = disableCanvasLayerInteractivity();
    this.disableTokenSceneControl();
    this.attachDirectEventListeners();
    this.active = true;
  }
  /**
   * Exit editor mode - restore original mouse manager and user's overlay state
   *
   * OVERLAY MANAGEMENT:
   * - Restores user's pre-editor overlay configuration via overlay stack
   * - Cleans up editor-only graphics layers
   * - Refreshes active overlays to ensure proper rendering
   */
  async exitEditorMode() {
    if (!this.active) return;
    logger.info("[EditorModeService] Exiting editor mode");
    cellRiverEditorHandlers.cleanup();
    this.removeDirectEventListeners();
    restoreCanvasLayerInteractivity(this.savedLayerInteractivity);
    this.savedLayerInteractivity.clear();
    this.restoreTokenSceneControl();
    const { getOverlayManager } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cQ);
    const overlayManager = getOverlayManager();
    await overlayManager.restoreUserPreferences();
    logger.info("[EditorModeService] Restored user overlay preferences from localStorage");
    this.active = false;
    this.currentTool = "inactive";
    this.currentMode = null;
    this.backupKingdomData = null;
    this.isDragging = false;
  }
  /**
   * Set editor mode - applies default overlay configuration for the mode
   * This is the high-level mode change (e.g., switching from waterways to roads)
   *
   * @param mode - The editor mode to activate
   */
  async setEditorMode(mode) {
    logger.info(`[EditorModeService] Setting editor mode: ${mode}`);
    this.currentMode = mode;
    const { getOverlayManager } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cQ);
    const overlayManager = getOverlayManager();
    const defaultOverlays = EDITOR_MODE_OVERLAYS[mode] || [];
    await overlayManager.setActiveOverlays(defaultOverlays, false);
    logger.info(`[EditorModeService] Applied default overlays for ${mode}:`, defaultOverlays);
  }
  /**
   * Set current editing tool
   * This is a fine-grained tool change within a mode (e.g., cell-river-edit to cell-river-erase)
   * 
   * OVERLAY BEHAVIOR:
   * - Ensures required overlays for the tool are ON (additive)
   * - Does NOT hide other overlays (respects user toggles)
   */
  async setTool(tool) {
    logger.info(`[EditorModeService] Setting tool: ${tool}`);
    this.currentTool = tool;
    await this.ensureToolOverlaysVisible(tool);
    const isCellRiverTool = tool === "cell-river-edit" || tool === "cell-river-erase" || tool === "cell-river-area-erase" || tool === "cell-river-flip";
    if (isCellRiverTool) {
      cellRiverEditorHandlers.initialize();
    } else {
      cellRiverEditorHandlers.cleanup();
    }
    const isCellLakeTool = tool === "cell-lake-paint" || tool === "cell-lake-erase";
    if (isCellLakeTool) {
      cellLakeEditorHandlers.initialize();
    } else {
      cellLakeEditorHandlers.cleanup();
    }
    const isCellCrossingTool = tool === "cell-crossing-paint" || tool === "cell-crossing-erase";
    if (isCellCrossingTool) {
      cellCrossingEditorHandlers.initialize();
    } else {
      cellCrossingEditorHandlers.cleanup();
    }
  }
  /**
   * Get current tool
   */
  getCurrentTool() {
    return this.currentTool;
  }
  /**
   * Check if editor mode is active
   */
  isActive() {
    return this.active;
  }
  /**
   * Save changes - commit to kingdom actor
   * @param silent - If true, skip the success notification
   */
  async save(silent = false) {
    if (!this.active) {
      logger.warn("[EditorModeService] Cannot save - not in editor mode");
      return;
    }
    logger.info("[EditorModeService] Saving changes");
    await cellRiverEditorHandlers.rasterizeOnSave();
    await updateKingdom((kingdom) => {
      kingdom.hexes = [...kingdom.hexes];
    });
    this.backupKingdomData = null;
    this.exitEditorMode();
    if (!silent) {
      const ui2 = globalThis.ui;
      ui2?.notifications?.info("Map changes saved");
    }
  }
  /**
   * Commit the current step's changes without exiting editor mode
   * Used by wizard to save progress between steps
   * @param stepName - The step being completed (for step-specific processing)
   */
  async commitStep(stepName) {
    if (!this.active) {
      logger.warn("[EditorModeService] Cannot commit step - not in editor mode");
      return;
    }
    logger.info(`[EditorModeService] Committing step: ${stepName}`);
    if (stepName === "rivers") {
      await cellRiverEditorHandlers.rasterizeOnSave();
    }
    const kingdom = getKingdomData();
    this.backupKingdomData = structuredClone(kingdom);
    logger.info(`[EditorModeService] Step ${stepName} committed, backup updated`);
  }
  /**
   * Cancel changes - restore from backup
   */
  async cancel() {
    if (!this.active) {
      logger.warn("[EditorModeService] Cannot cancel - not in editor mode");
      return;
    }
    logger.info("[EditorModeService] Canceling changes");
    if (this.backupKingdomData) {
      const backup = this.backupKingdomData;
      await updateKingdom((kingdom) => {
        Object.assign(kingdom, backup);
      });
      this.backupKingdomData = null;
      const ui2 = globalThis.ui;
      ui2?.notifications?.info("Map changes discarded");
    }
    this.exitEditorMode();
  }
  /**
   * Attach direct PIXI event listeners to canvas stage
   * Uses capture phase to intercept events BEFORE Foundry's handlers
   * @throws Error if canvas is not available
   */
  attachDirectEventListeners() {
    const canvas = globalThis.canvas;
    if (!canvas?.stage) {
      throw new Error("Cannot attach event listeners - canvas not available");
    }
    this.pointerDownHandler = this.handlePointerDown.bind(this);
    this.pointerMoveHandler = this.handlePointerMove.bind(this);
    this.pointerUpHandler = this.handlePointerUp.bind(this);
    this.dblClickHandler = this.handleDoubleClick.bind(this);
    this.keyDownHandler = this.handleKeyDown.bind(this);
    canvas.stage.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
    canvas.stage.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    canvas.stage.addEventListener("pointerup", this.pointerUpHandler, { capture: true });
    canvas.stage.addEventListener("dblclick", this.dblClickHandler, { capture: true });
    document.addEventListener("keydown", this.keyDownHandler, { capture: true });
    logger.info("[EditorModeService] ✅ Attached direct event listeners (marquee selection blocked)");
  }
  /**
   * Remove direct PIXI event listeners
   */
  removeDirectEventListeners() {
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
    if (this.dblClickHandler) {
      canvas.stage.removeEventListener("dblclick", this.dblClickHandler, { capture: true });
      this.dblClickHandler = null;
    }
    if (this.keyDownHandler) {
      document.removeEventListener("keydown", this.keyDownHandler, { capture: true });
      this.keyDownHandler = null;
    }
    logger.info("[EditorModeService] ✅ Removed direct event listeners");
  }
  /**
   * Disable Foundry token scene control by activating a different control group
   * Based on Foundry v13 API: SceneControl interface with activeTool property
   * Reference: https://foundryvtt.com/api/interfaces/foundry.SceneControl.html
   */
  disableTokenSceneControl() {
    try {
      const game = globalThis.game;
      const ui2 = globalThis.ui;
      if (!game || !ui2?.controls) {
        logger.warn("[EditorModeService] SceneControls not available");
        return;
      }
      const sceneControls = ui2.controls;
      const controlConfig = sceneControls.control;
      if (!controlConfig) {
        logger.warn("[EditorModeService] SceneControls config not available");
        return;
      }
      this.previousActiveControl = controlConfig.activeControl || null;
      const tokenControl = controlConfig.controls?.["token"];
      if (tokenControl && this.previousActiveControl === "token") {
        this.previousTokenActiveTool = tokenControl.activeTool || null;
      } else {
        this.previousTokenActiveTool = null;
      }
      const fallbackControls = ["tiles", "walls", "lighting", "sounds"];
      let activated = false;
      for (const controlName of fallbackControls) {
        if (controlConfig.controls?.[controlName]) {
          controlConfig.activeControl = controlName;
          if (typeof sceneControls.render === "function") {
            sceneControls.render();
          }
          activated = true;
          logger.info(`[EditorModeService] ✅ Disabled token scene control (switched to: ${controlName}, previous: ${this.previousActiveControl || "none"})`);
          break;
        }
      }
      if (!activated) {
        controlConfig.activeControl = null;
        if (typeof sceneControls.render === "function") {
          sceneControls.render();
        }
        logger.info(`[EditorModeService] ✅ Disabled token scene control (cleared activeControl, previous: ${this.previousActiveControl || "none"})`);
      }
    } catch (error) {
      logger.warn("[EditorModeService] Failed to disable token scene control:", error);
    }
  }
  /**
   * Restore previous active scene control and tool
   * Based on Foundry v13 API: SceneControl interface with activeTool property
   * Reference: https://foundryvtt.com/api/interfaces/foundry.SceneControl.html
   */
  restoreTokenSceneControl() {
    try {
      const game = globalThis.game;
      const ui2 = globalThis.ui;
      if (!game || !ui2?.controls) {
        logger.warn("[EditorModeService] SceneControls not available for restore");
        return;
      }
      const sceneControls = ui2.controls;
      const controlConfig = sceneControls.control;
      if (!controlConfig) {
        logger.warn("[EditorModeService] SceneControls config not available for restore");
        return;
      }
      if (this.previousActiveControl !== null) {
        controlConfig.activeControl = this.previousActiveControl;
        if (this.previousActiveControl === "token" && this.previousTokenActiveTool !== null) {
          const tokenControl = controlConfig.controls?.["token"];
          if (tokenControl) {
            tokenControl.activeTool = this.previousTokenActiveTool;
          }
        }
        if (typeof sceneControls.render === "function") {
          sceneControls.render();
        }
        logger.info(`[EditorModeService] ✅ Restored previous active control: ${this.previousActiveControl}${this.previousTokenActiveTool ? ` (tool: ${this.previousTokenActiveTool})` : ""}`);
      } else {
        controlConfig.activeControl = null;
        if (typeof sceneControls.render === "function") {
          sceneControls.render();
        }
        logger.info("[EditorModeService] ✅ Cleared active control (no previous state)");
      }
      this.previousActiveControl = null;
      this.previousTokenActiveTool = null;
    } catch (error) {
      logger.warn("[EditorModeService] Failed to restore token scene control:", error);
    }
  }
  /**
   * Handle pointer down event (left or right click)
   */
  async handlePointerDown(event) {
    if (!this.active) return;
    if (event.button === 2) return;
    const target = event.target;
    if (target?.closest?.(".editor-mode-panel")) {
      return;
    }
    event.stopImmediatePropagation();
    event.stopPropagation();
    const canvas = globalThis.canvas;
    if (!canvas?.grid) return;
    const point = { x: event.clientX, y: event.clientY };
    const canvasPos = canvas.canvasCoordinatesFromClient(point);
    const offset = canvas.grid.getOffset(canvasPos);
    const hexId = `${offset.i}.${offset.j}`;
    if (this.currentTool === "inactive") return;
    if (event.button === 0) {
      logger.info(`[EditorModeService] 🖱️ Left-click on hex ${hexId} with tool ${this.currentTool}`);
      if (this.currentTool === "cell-river-edit") {
        if (event.altKey || event.metaKey) {
          cellRiverEditorHandlers.finishPath();
        } else if (event.ctrlKey) {
          await cellRiverEditorHandlers.removePointAt(canvasPos.x, canvasPos.y);
        } else if (event.shiftKey) {
          const vertex = cellRiverEditorHandlers.findNearbyVertex(canvasPos.x, canvasPos.y);
          if (vertex) {
            this.isVertexMoving = true;
            cellRiverEditorHandlers.startVertexMove(vertex);
            logger.info(`[EditorModeService] Started moving vertex at (${vertex.cellX}, ${vertex.cellY})`);
          } else {
            cellRiverEditorHandlers.deselectPath();
          }
        } else {
          const nearbyPathId = cellRiverEditorHandlers.findNearbyPath(canvasPos.x, canvasPos.y);
          if (nearbyPathId) {
            cellRiverEditorHandlers.selectPath(nearbyPathId);
            logger.info(`[EditorModeService] Selected path ${nearbyPathId}`);
            this.riverClickPos = { x: canvasPos.x, y: canvasPos.y };
          } else {
            cellRiverEditorHandlers.deselectPath();
            this.isRiverDrawing = true;
            this.drawnRiverCells.clear();
            await cellRiverEditorHandlers.handleCellRiverClick(canvasPos.x, canvasPos.y);
            const cellX = Math.floor(canvasPos.x / 8);
            const cellY = Math.floor(canvasPos.y / 8);
            this.drawnRiverCells.add(`${cellX},${cellY}`);
          }
        }
      } else if (this.currentTool === "cell-river-erase") {
        await cellRiverEditorHandlers.handleCellRiverErase(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-river-area-erase") {
        this.isAreaErasing = true;
        await cellRiverEditorHandlers.handleAreaErase(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-river-flip") {
        await cellRiverEditorHandlers.handleCellRiverFlip(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-lake-paint") {
        this.isLakePainting = true;
        cellLakeEditorHandlers.startPainting();
        await cellLakeEditorHandlers.handleLakePaint(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-lake-erase") {
        this.isLakeErasing = true;
        cellLakeEditorHandlers.startPainting();
        await cellLakeEditorHandlers.handleLakeErase(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-crossing-paint") {
        this.isCrossingPainting = true;
        cellCrossingEditorHandlers.startPainting();
        await cellCrossingEditorHandlers.handleCrossingPaint(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "cell-crossing-erase") {
        this.isCrossingErasing = true;
        cellCrossingEditorHandlers.startPainting();
        await cellCrossingEditorHandlers.handleCrossingErase(canvasPos.x, canvasPos.y);
      } else if (this.currentTool === "waterfall-toggle") {
        this.handleWaterfallToggle(hexId, canvasPos);
      } else if (this.currentTool === "bridge-toggle") {
        this.handleBridgeToggle(hexId, canvasPos);
      } else if (this.currentTool === "ford-toggle") {
        this.handleFordToggle(hexId, canvasPos);
      } else if (this.currentTool === "road-edit") {
        this.isRoadPainting = true;
        this.isErasing = event.ctrlKey;
        this.paintedHexesThisDrag.clear();
        this.handleRoadToggle(hexId, event.ctrlKey);
        this.paintedHexesThisDrag.add(hexId);
      } else if (this.currentTool === "road-scissors") {
        this.handleRoadScissorClick(canvasPos);
      } else if (this.currentTool.startsWith("terrain-")) {
        const terrainType = this.currentTool.replace("terrain-", "");
        this.currentTerrainType = terrainType;
        this.isTerrainPainting = true;
        this.paintedTerrainHexes.clear();
        await this.terrainHandlers.paintTerrain(hexId, terrainType);
        this.paintedTerrainHexes.add(hexId);
      } else if (this.currentTool.startsWith("bounty-")) {
        this.isBountyPainting = true;
        this.paintedBountyHexes.clear();
        await this.handleBountyEdit(hexId, event.ctrlKey);
        this.paintedBountyHexes.add(hexId);
      } else if (this.currentTool.startsWith("worksite-")) {
        this.isWorksitePainting = true;
        this.paintedWorksiteHexes.clear();
        await this.handleWorksiteEdit(hexId, event.ctrlKey);
        this.paintedWorksiteHexes.add(hexId);
      } else if (this.currentTool === "settlement-place") {
        await this.handleSettlementEdit(hexId, false);
      } else if (this.currentTool === "settlement-minus") {
        await this.handleSettlementEdit(hexId, true);
      } else if (this.currentTool.startsWith("fortification-")) {
        await this.handleFortificationEdit(hexId, event.ctrlKey);
      } else if (this.currentTool === "claimed-by") {
        this.isClaimPainting = true;
        this.paintedClaimHexes.clear();
        this.paintingClaimOwner = event.ctrlKey ? null : this.currentClaimOwner;
        await this.handleClaimEdit(hexId, this.paintingClaimOwner);
        this.paintedClaimHexes.add(hexId);
      }
    }
  }
  /**
   * Handle pointer move event
   */
  async handlePointerMove(event) {
    if (event.buttons & 2) return;
    if (!this.active) return;
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (this.currentTool === "cell-river-edit") {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      if (this.isVertexMoving) {
        await cellRiverEditorHandlers.updateVertexPosition(canvasPos.x, canvasPos.y);
      } else if (this.isRiverReshaping) {
        cellRiverEditorHandlers.handleCellRiverMove(canvasPos.x, canvasPos.y);
        const cellX = Math.floor(canvasPos.x / 8);
        const cellY = Math.floor(canvasPos.y / 8);
        const cellKey = `${cellX},${cellY}`;
        if (!this.reshapedRiverCells.has(cellKey)) {
          this.reshapedRiverCells.add(cellKey);
          cellRiverEditorHandlers.addReshapePoint(canvasPos.x, canvasPos.y);
        }
      } else if (this.riverClickPos && !this.isRiverDrawing) {
        const dx = canvasPos.x - this.riverClickPos.x;
        const dy = canvasPos.y - this.riverClickPos.y;
        const dragDistance = Math.sqrt(dx * dx + dy * dy);
        if (dragDistance > 5) {
          const endpoint = cellRiverEditorHandlers.findNearbyEndpoint(
            this.riverClickPos.x,
            this.riverClickPos.y
          );
          if (endpoint) {
            this.isRiverDrawing = true;
            this.drawnRiverCells.clear();
            cellRiverEditorHandlers.continueFromEndpoint(endpoint);
            logger.info(`[EditorModeService] Drag-continue from ${endpoint.endpoint} of path ${endpoint.pathId}`);
          } else {
            const segment = cellRiverEditorHandlers.findNearbySegment(
              this.riverClickPos.x,
              this.riverClickPos.y
            );
            if (segment) {
              this.isRiverReshaping = true;
              this.reshapedRiverCells.clear();
              await cellRiverEditorHandlers.startReshapeSegment(
                segment.pathId,
                segment.insertAfterOrder,
                segment.insertBeforeOrder
              );
              logger.info(`[EditorModeService] Drag-reshape segment ${segment.insertAfterOrder}-${segment.insertBeforeOrder}`);
            }
          }
          this.riverClickPos = null;
        }
      } else if (this.isRiverDrawing) {
        cellRiverEditorHandlers.handleCellRiverMove(canvasPos.x, canvasPos.y);
        const cellX = Math.floor(canvasPos.x / 8);
        const cellY = Math.floor(canvasPos.y / 8);
        const cellKey = `${cellX},${cellY}`;
        if (!this.drawnRiverCells.has(cellKey)) {
          this.drawnRiverCells.add(cellKey);
          cellRiverEditorHandlers.handleCellRiverClick(canvasPos.x, canvasPos.y);
        }
      } else {
        cellRiverEditorHandlers.handleCellRiverMove(canvasPos.x, canvasPos.y);
      }
    }
    if (this.currentTool === "cell-river-area-erase") {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      cellRiverEditorHandlers.showEraserPreview(canvasPos.x, canvasPos.y);
      if (this.isAreaErasing) {
        cellRiverEditorHandlers.handleAreaErase(canvasPos.x, canvasPos.y);
      }
    }
    if (this.currentTool === "cell-lake-paint" || this.currentTool === "cell-lake-erase") {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const isErasing = this.currentTool === "cell-lake-erase";
      cellLakeEditorHandlers.handleMouseMove(canvasPos.x, canvasPos.y, isErasing);
      if (this.isLakePainting) {
        await cellLakeEditorHandlers.handleLakePaint(canvasPos.x, canvasPos.y);
      } else if (this.isLakeErasing) {
        await cellLakeEditorHandlers.handleLakeErase(canvasPos.x, canvasPos.y);
      }
    }
    if (this.currentTool === "cell-crossing-paint" || this.currentTool === "cell-crossing-erase") {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const isErasing = this.currentTool === "cell-crossing-erase";
      cellCrossingEditorHandlers.handleMouseMove(canvasPos.x, canvasPos.y, isErasing);
      if (this.isCrossingPainting) {
        await cellCrossingEditorHandlers.handleCrossingPaint(canvasPos.x, canvasPos.y);
      } else if (this.isCrossingErasing) {
        await cellCrossingEditorHandlers.handleCrossingErase(canvasPos.x, canvasPos.y);
      }
    }
    if (this.isRoadPainting && this.currentTool === "road-edit") {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const offset = canvas.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (!this.paintedHexesThisDrag.has(hexId)) {
        this.handleRoadToggle(hexId, this.isErasing);
        this.paintedHexesThisDrag.add(hexId);
      }
    }
    if (this.isTerrainPainting && this.currentTerrainType) {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const offset = canvas.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (!this.paintedTerrainHexes.has(hexId)) {
        await this.terrainHandlers.paintTerrain(hexId, this.currentTerrainType);
        this.paintedTerrainHexes.add(hexId);
      }
    }
    if (this.isClaimPainting) {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const offset = canvas.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (!this.paintedClaimHexes.has(hexId)) {
        await this.handleClaimEdit(hexId, this.paintingClaimOwner);
        this.paintedClaimHexes.add(hexId);
      }
    }
    if (this.isBountyPainting && this.currentTool.startsWith("bounty-")) {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const offset = canvas.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (!this.paintedBountyHexes.has(hexId)) {
        await this.handleBountyEdit(hexId, false);
        this.paintedBountyHexes.add(hexId);
      }
    }
    if (this.isWorksitePainting && this.currentTool.startsWith("worksite-")) {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasPos = canvas.canvasCoordinatesFromClient(point);
      const offset = canvas.grid.getOffset(canvasPos);
      const hexId = `${offset.i}.${offset.j}`;
      if (!this.paintedWorksiteHexes.has(hexId)) {
        await this.handleWorksiteEdit(hexId, false);
        this.paintedWorksiteHexes.add(hexId);
      }
    }
  }
  /**
   * Handle pointer up event
   */
  handlePointerUp(event) {
    if (!this.active) return;
    this.riverClickPos = null;
    if (this.isVertexMoving) {
      this.isVertexMoving = false;
      cellRiverEditorHandlers.finishVertexMove();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Vertex move ended");
      return;
    }
    if (this.isAreaErasing) {
      this.isAreaErasing = false;
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Area erase ended");
      return;
    }
    if (this.isRiverReshaping) {
      this.isRiverReshaping = false;
      this.reshapedRiverCells.clear();
      cellRiverEditorHandlers.finishReshape();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ River reshape ended");
      return;
    }
    if (this.isRiverDrawing) {
      this.isRiverDrawing = false;
      this.drawnRiverCells.clear();
      cellRiverEditorHandlers.finishPath();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ River drawing ended");
      return;
    }
    if (this.isLakePainting || this.isLakeErasing) {
      this.isLakePainting = false;
      this.isLakeErasing = false;
      cellLakeEditorHandlers.stopPainting();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Lake painting ended");
      return;
    }
    if (this.isCrossingPainting || this.isCrossingErasing) {
      this.isCrossingPainting = false;
      this.isCrossingErasing = false;
      cellCrossingEditorHandlers.stopPainting();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Crossing painting ended");
      return;
    }
    if (this.isRoadPainting) {
      this.isRoadPainting = false;
      this.paintedHexesThisDrag.clear();
      this.isErasing = false;
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Road painting ended");
      return;
    }
    if (this.isTerrainPainting) {
      this.isTerrainPainting = false;
      this.paintedTerrainHexes.clear();
      this.currentTerrainType = null;
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Terrain painting ended");
      return;
    }
    if (this.isClaimPainting) {
      this.isClaimPainting = false;
      this.paintedClaimHexes.clear();
      this.paintingClaimOwner = null;
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Claim painting ended");
      return;
    }
    if (this.isBountyPainting) {
      this.isBountyPainting = false;
      this.paintedBountyHexes.clear();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Bounty painting ended");
      return;
    }
    if (this.isWorksitePainting) {
      this.isWorksitePainting = false;
      this.paintedWorksiteHexes.clear();
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Worksite painting ended");
      return;
    }
    if (this.isDragging) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      logger.info("[EditorModeService] 🖱️ Pointer up - drag ended");
      this.isDragging = false;
    }
  }
  /**
   * Handle double-click event - used to finish river paths
   */
  handleDoubleClick(event) {
    if (!this.active) return;
    if (this.currentTool !== "cell-river-edit") return;
    event.stopImmediatePropagation();
    event.stopPropagation();
    cellRiverEditorHandlers.finishPath();
    logger.info("[EditorModeService] 🖱️ Double-click - finished river path");
  }
  /**
   * Handle keyboard events - used for Ctrl+Z undo in river editing and brush size in lake editing
   */
  async handleKeyDown(event) {
    if (!this.active) return;
    if (this.currentTool === "cell-river-edit" && (event.ctrlKey || event.metaKey) && event.key === "z") {
      event.preventDefault();
      event.stopPropagation();
      const removed = await cellRiverEditorHandlers.undoLastPoint();
      if (removed) {
        logger.info("[EditorModeService] ⌨️ Ctrl+Z - undid last river point");
      }
    }
    const isLakeTool = this.currentTool === "cell-lake-paint" || this.currentTool === "cell-lake-erase";
    if (isLakeTool) {
      if (event.key === "[") {
        event.preventDefault();
        event.stopPropagation();
        const newRadius = cellLakeEditorHandlers.adjustBrushRadius(-8);
        logger.info(`[EditorModeService] ⌨️ [ - decreased brush radius to ${newRadius}px`);
      } else if (event.key === "]") {
        event.preventDefault();
        event.stopPropagation();
        const newRadius = cellLakeEditorHandlers.adjustBrushRadius(8);
        logger.info(`[EditorModeService] ⌨️ ] - increased brush radius to ${newRadius}px`);
      } else if (event.key === "x" || event.key === "X") {
        event.preventDefault();
        event.stopPropagation();
        const newTool = this.currentTool === "cell-lake-paint" ? "cell-lake-erase" : "cell-lake-paint";
        this.setTool(newTool);
        logger.info(`[EditorModeService] ⌨️ X - switched to ${newTool}`);
      }
    }
    const isCrossingTool = this.currentTool === "cell-crossing-paint" || this.currentTool === "cell-crossing-erase";
    if (isCrossingTool) {
      if (event.key === "[") {
        event.preventDefault();
        event.stopPropagation();
        const newRadius = cellCrossingEditorHandlers.adjustBrushRadius(-8);
        logger.info(`[EditorModeService] ⌨️ [ - decreased crossing brush radius to ${newRadius}px`);
      } else if (event.key === "]") {
        event.preventDefault();
        event.stopPropagation();
        const newRadius = cellCrossingEditorHandlers.adjustBrushRadius(8);
        logger.info(`[EditorModeService] ⌨️ ] - increased crossing brush radius to ${newRadius}px`);
      } else if (event.key === "x" || event.key === "X") {
        event.preventDefault();
        event.stopPropagation();
        const newTool = this.currentTool === "cell-crossing-paint" ? "cell-crossing-erase" : "cell-crossing-paint";
        this.setTool(newTool);
        logger.info(`[EditorModeService] ⌨️ X - switched to ${newTool}`);
      }
    }
  }
  /**
   * Handle waterfall toggle - add/remove waterfall on hex edge
   */
  async handleWaterfallToggle(hexId, position) {
    await this.crossingHandlers.handleWaterfallClick(hexId, position);
  }
  /**
   * Handle bridge toggle - add/remove bridge crossing on hex edge
   */
  async handleBridgeToggle(hexId, position) {
    await this.crossingHandlers.handleBridgeClick(hexId, position);
  }
  /**
   * Handle ford toggle - add/remove ford crossing on hex edge
   */
  async handleFordToggle(hexId, position) {
    await this.crossingHandlers.handleFordClick(hexId, position);
  }
  /**
   * Handle road toggle - add/remove road on hex center
   */
  async handleRoadToggle(hexId, isCtrlPressed) {
    await this.roadHandlers.handleRoadToggle(hexId, isCtrlPressed);
  }
  /**
   * Handle road scissor click - cuts a road segment at click position
   */
  async handleRoadScissorClick(position) {
    const result = await this.roadHandlers.handleScissorClick(position);
    if (!result.success) {
      const ui2 = globalThis.ui;
      ui2?.notifications?.warn("No road segment found at click position");
    }
  }
  /**
   * Handle bounty edit - add/subtract commodity on hex
   * - Normal click: Add commodity
   * - Ctrl+Click: Subtract commodity
   * - Minus tool: Always subtract (regardless of Ctrl)
   * Overlay automatically updates via reactive subscription
   */
  async handleBountyEdit(hexId, isCtrlPressed) {
    if (!this.bountyHandlers) {
      const { BountyEditorHandlers } = await import("./BountyEditorHandlers-iHbqQ-gL.js");
      this.bountyHandlers = new BountyEditorHandlers();
    }
    const isSubtracting = this.currentTool === "bounty-minus" || isCtrlPressed;
    if (isSubtracting) {
      await this.bountyHandlers.clearCommodities(hexId);
    } else {
      const commodityType = this.currentTool.replace("bounty-", "");
      await this.bountyHandlers.addCommodity(hexId, commodityType);
    }
  }
  /**
   * Handle worksite edit - place/remove worksite on hex
   * - Normal click: Place worksite (validates terrain)
   * - Ctrl+Click: Remove worksite
   * - Minus tool: Always remove (regardless of Ctrl)
   * Overlay automatically updates via reactive subscription
   */
  async handleWorksiteEdit(hexId, isCtrlPressed) {
    const isRemoving = this.currentTool === "worksite-minus" || isCtrlPressed;
    if (isRemoving) {
      await this.worksiteHandlers.removeWorksite(hexId);
    } else {
      const worksiteTypeMap = {
        "worksite-farm": "Farmstead",
        "worksite-lumber-mill": "Logging Camp",
        "worksite-mine": "Mine",
        "worksite-quarry": "Quarry"
      };
      const worksiteType = worksiteTypeMap[this.currentTool];
      if (worksiteType) {
        await this.worksiteHandlers.placeWorksite(hexId, worksiteType);
      }
    }
  }
  /**
   * Handle settlement edit - place/edit/remove settlement
   * - Place tool: Create new settlement or edit existing
   * - Minus tool: Remove settlement feature (preserves settlement data by unlinking)
   */
  async handleSettlementEdit(hexId, isRemoving) {
    if (isRemoving) {
      await this.featureHandlers.removeSettlementFeature(hexId);
    } else {
      await this.featureHandlers.placeSettlement(hexId);
    }
  }
  /**
   * Handle fortification edit - place/remove fortification
   * - Normal click: Place fortification at selected tier
   * - Ctrl+Click: Remove fortification
   */
  async handleFortificationEdit(hexId, isCtrlPressed) {
    if (isCtrlPressed) {
      await this.featureHandlers.removeFortification(hexId);
    } else {
      const tierMap = {
        "fortification-tier1": 1,
        "fortification-tier2": 2,
        "fortification-tier3": 3,
        "fortification-tier4": 4
      };
      const tier = tierMap[this.currentTool];
      if (tier) {
        await this.featureHandlers.placeFortification(hexId, tier);
      }
    }
  }
  /**
   * Handle claim edit - claim/unclaim hex for player or faction
   * - Normal click/drag: Claim for selected owner (player or faction)
   * - Ctrl+Click/drag: Remove claim (set to null)
   * Overlay automatically updates via reactive subscription
   */
  async handleClaimEdit(hexId, claimOwner) {
    await this.claimedByHandlers.claimHex(hexId, claimOwner);
  }
  /**
   * Set the current claim owner for the claimed-by tool
   * @param owner - 'player' for player kingdom, faction ID, or null for unclaimed
   */
  setClaimOwner(owner) {
    this.currentClaimOwner = owner;
    logger.info(`[EditorModeService] Set claim owner: ${owner || "unclaimed"}`);
  }
  /**
   * Get the current claim owner
   */
  getClaimOwner() {
    return this.currentClaimOwner;
  }
  // NOTE: refreshWaterLayer and refreshRoadLayer removed
  // Overlays now update automatically via reactive store subscriptions
  // This ensures visibility is controlled solely by OverlayManager
  /**
   * Ensure required overlays for a tool are visible (additive, not exclusive)
   * This does NOT hide other overlays - it only ensures the tool's overlays are ON
   * Users can still toggle overlays freely via the toolbar
   *
   * Exception: Cell-river tools hide conflicting overlays (water, rivers) to prevent
   * visual clutter while editing.
   */
  async ensureToolOverlaysVisible(tool) {
    try {
      const { getOverlayManager } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cQ);
      const overlayManager = getOverlayManager();
      const toolRequiredOverlays = {
        "road-edit": ["roads"],
        "road-scissors": ["roads"],
        "cell-river-edit": ["rivers"],
        // Cell-based river editing - show rivers overlay
        "cell-river-erase": ["rivers"],
        "cell-river-area-erase": ["rivers"],
        "cell-river-flip": ["rivers"],
        "cell-lake-paint": ["rivers"],
        // Cell-based lake painting - show rivers overlay (includes lakes)
        "cell-lake-erase": ["rivers"],
        "cell-crossing-paint": ["rivers", "navigation-grid-debug"],
        // Show rivers and nav grid for crossing placement
        "cell-crossing-erase": ["rivers", "navigation-grid-debug"],
        "waterfall-toggle": ["rivers"],
        "bridge-toggle": ["rivers"],
        "ford-toggle": ["rivers"],
        "terrain-plains": ["terrain"],
        "terrain-forest": ["terrain"],
        "terrain-hills": ["terrain"],
        "terrain-mountains": ["terrain"],
        "terrain-swamp": ["terrain"],
        "terrain-desert": ["terrain"],
        "terrain-water": ["terrain"],
        "bounty-food": ["resources"],
        "bounty-lumber": ["resources"],
        "bounty-stone": ["resources"],
        "bounty-ore": ["resources"],
        "bounty-gold": ["resources"],
        "bounty-minus": ["resources"],
        "worksite-farm": ["worksites"],
        "worksite-lumber-mill": ["worksites"],
        "worksite-mine": ["worksites"],
        "worksite-quarry": ["worksites"],
        "worksite-minus": ["worksites"],
        "settlement-place": ["settlement-hacks", "settlements"],
        "settlement-minus": ["settlement-hacks", "settlements"],
        "fortification-tier1": ["fortifications"],
        "fortification-tier2": ["fortifications"],
        "fortification-tier3": ["fortifications"],
        "fortification-tier4": ["fortifications"],
        "claimed-by": ["territories"]
      };
      const requiredOverlays = toolRequiredOverlays[tool];
      if (requiredOverlays) {
        for (const overlayId of requiredOverlays) {
          if (!overlayManager.isOverlayActive(overlayId)) {
            await overlayManager.showOverlay(overlayId, true);
            logger.info(`[EditorModeService] Ensured overlay visible for tool: ${overlayId}`);
          }
        }
      }
    } catch (error) {
      logger.error("[EditorModeService] ❌ Failed to ensure tool overlays visible:", error);
    }
  }
}
function getEditorModeService() {
  return EditorModeService.getInstance();
}
export {
  WIZARD_STEPS as W,
  wizardStepIndex as a,
  clearActiveEditorSection as b,
  currentStepConfig as c,
  setGuidedModePositions as d,
  startWizard as e,
  clearGuidedModePositions as f,
  getEditorModeService as g,
  finishWizard as h,
  isWizardActive as i,
  getGuidedModePosition as j,
  activeEditorSection as k,
  settlementEditorDialog as l,
  cellRiverEditorHandlers as m,
  nextStep as n,
  cellLakeEditorHandlers as o,
  previousStep as p,
  cellCrossingEditorHandlers as q,
  setActiveEditorSection as s,
  totalWizardSteps as t,
  wizardState as w
};
