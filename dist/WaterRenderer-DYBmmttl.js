import { au as writable, av as derived, y as kingdomData, l as logger, n as getHexCenter, o as getEdgeMidpoint, x as get_store_value } from "./GameCommandUtils-D_sgs3NK.js";
class WaterwayGeometryService {
  // Internal store for computed geometry
  geometryStore = writable({
    segments: [],
    isReady: false
  });
  // Derived stores for easy access
  segments = derived(this.geometryStore, ($g) => $g.segments);
  isReady = derived(this.geometryStore, ($g) => $g.isReady);
  unsubscribe = null;
  lastKingdomDataHash = "";
  constructor() {
    const riverDataStore = derived(kingdomData, ($kingdom) => ({
      kingdom: $kingdom,
      hash: this.getRiverDataHash($kingdom)
    }));
    this.unsubscribe = riverDataStore.subscribe(({ kingdom, hash }) => {
      if (hash !== this.lastKingdomDataHash) {
        this.rebuild(kingdom);
      }
    });
    logger.debug("[WaterwayGeometryService] Initialized with reactive river data subscription");
  }
  /**
   * Calculate hash of river data to detect changes
   */
  getRiverDataHash(kingdom) {
    const pathCount = kingdom.rivers?.paths?.length || 0;
    const pointCount = kingdom.rivers?.paths?.reduce((sum, p) => sum + p.points.length, 0) || 0;
    const crossingCount = kingdom.rivers?.crossings?.length || 0;
    const waterfallCount = kingdom.rivers?.waterfalls?.length || 0;
    return `r${pathCount}-p${pointCount}-c${crossingCount}-w${waterfallCount}`;
  }
  /**
   * Rebuild geometry from kingdom data
   * Called automatically when river data changes (not all kingdom data changes)
   */
  rebuild(kingdom) {
    const canvas = globalThis.canvas;
    if (!canvas?.grid) {
      logger.warn("[WaterwayGeometryService] Canvas not ready - geometry deferred. Waiting for canvas initialization.");
      this.geometryStore.set({
        segments: [],
        isReady: false
      });
      return;
    }
    const currentHash = this.getRiverDataHash(kingdom);
    this.lastKingdomDataHash = currentHash;
    const segments = this.computeSegments(kingdom, canvas);
    this.geometryStore.set({
      segments,
      isReady: true
    });
    logger.debug(`[WaterwayGeometryService] Geometry ready: ${segments.length} barrier segments`);
  }
  /**
   * Compute river segments with pixel coordinates
   */
  computeSegments(kingdom, canvas) {
    const segments = [];
    if (!kingdom.rivers?.paths) {
      return segments;
    }
    const crossingPointSet = /* @__PURE__ */ new Set();
    for (const crossing of kingdom.rivers.crossings || []) {
      const key = `${crossing.hexI},${crossing.hexJ},${crossing.edge || ""},${crossing.isCenter || false},${crossing.cornerIndex ?? ""}`;
      crossingPointSet.add(key);
    }
    const getPointKey = (point) => {
      return `${point.hexI},${point.hexJ},${point.edge || ""},${point.isCenter || false},${point.cornerIndex ?? ""}`;
    };
    for (const path of kingdom.rivers.paths) {
      const sortedPoints = [...path.points].sort((a, b) => a.order - b.order);
      for (let i = 0; i < sortedPoints.length - 1; i++) {
        const p1 = sortedPoints[i];
        const p2 = sortedPoints[i + 1];
        const pos1 = this.getConnectorPosition(p1, canvas);
        const pos2 = this.getConnectorPosition(p2, canvas);
        if (!pos1 || !pos2) continue;
        const hasCrossing = crossingPointSet.has(getPointKey(p1)) || crossingPointSet.has(getPointKey(p2));
        segments.push({
          pathId: path.id,
          segmentIndex: i,
          start: pos1,
          end: pos2,
          hasCrossing
        });
      }
    }
    return segments;
  }
  /**
   * Convert a RiverPathPoint into a pixel position using the unified
   * hex connection point model (center, edge, corner).
   */
  getConnectorPosition(point, canvas) {
    if (point.isCenter) {
      return getHexCenter(point.hexI, point.hexJ, canvas);
    }
    if (point.edge) {
      return getEdgeMidpoint(point.hexI, point.hexJ, point.edge, canvas);
    }
    if (point.cornerIndex !== void 0) {
      const vertices = canvas.grid.getVertices({ i: point.hexI, j: point.hexJ });
      if (!vertices || vertices.length <= point.cornerIndex) {
        return null;
      }
      const v = vertices[point.cornerIndex];
      return { x: v.x, y: v.y };
    }
    return null;
  }
  /**
   * Get all segments (for rendering and intersection checks)
   */
  getSegments() {
    return get_store_value(this.geometryStore).segments;
  }
  /**
   * Check if geometry is ready
   */
  isGeometryReady() {
    return get_store_value(this.geometryStore).isReady;
  }
  /**
   * Force rebuild (for editor use)
   */
  forceRebuild() {
    this.lastKingdomDataHash = "";
    const kingdom = get_store_value(kingdomData);
    this.rebuild(kingdom);
  }
  /**
   * Cleanup subscription
   */
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
new WaterwayGeometryService();
const RIVER_WIDTH = 20;
const RIVER_BORDER_WIDTH = 22;
const RIVER_ALPHA = 0.5;
const RIVER_BORDER_ALPHA = 0.5;
const FLOW_COLOR = 4886754;
const RIVER_BORDER_COLOR = 139;
const ARROW_SIZE = 24;
const ARROW_COLOR = 16777215;
const ARROW_ALPHA = 0.6;
const LAKE_COLOR = 4886754;
const LAKE_ALPHA = 0.4;
const SWAMP_COLOR = 7048739;
const SWAMP_ALPHA = 0.6;
const BRIDGE_COLOR = 9127187;
const FORD_COLOR = 4886754;
const WATERFALL_COLOR = 16777215;
function getConnectorPosition(point, canvas) {
  if (point.isCenter) {
    return getHexCenter(point.hexI, point.hexJ, canvas);
  }
  if (point.edge) {
    return getEdgeMidpoint(point.hexI, point.hexJ, point.edge, canvas);
  }
  if (point.cornerIndex !== void 0) {
    const vertices = canvas.grid.getVertices({ i: point.hexI, j: point.hexJ });
    if (!vertices || vertices.length <= point.cornerIndex) {
      return null;
    }
    const v = vertices[point.cornerIndex];
    return { x: v.x, y: v.y };
  }
  return null;
}
async function renderWaterConnections(layer, canvas, activePathId) {
  if (!canvas?.grid) {
    logger.warn("[WaterRenderer] Canvas grid not available");
    return;
  }
  const kingdom = get_store_value(kingdomData);
  if (!kingdom) {
    return;
  }
  if (kingdom.waterFeatures?.lakes && kingdom.waterFeatures.lakes.length > 0) {
    renderLakes(layer, canvas, kingdom.waterFeatures.lakes);
  }
  if (kingdom.waterFeatures?.swamps && kingdom.waterFeatures.swamps.length > 0) {
    renderSwamps(layer, canvas, kingdom.waterFeatures.swamps);
  }
  if (kingdom.rivers?.waterfalls && kingdom.rivers.waterfalls.length > 0) {
    renderWaterfalls(layer, canvas, kingdom.rivers.paths || [], kingdom.rivers.waterfalls);
  }
  if (!kingdom?.rivers?.paths) {
    return;
  }
  const paths = kingdom.rivers.paths;
  if (paths.length === 0) {
    return;
  }
  const borderGraphics = new PIXI.Graphics();
  borderGraphics.name = "RiverBorders";
  const riverGraphics = new PIXI.Graphics();
  riverGraphics.name = "Rivers";
  const arrowGraphics = new PIXI.Graphics();
  arrowGraphics.name = "RiverArrows";
  for (const path of paths) {
    const sortedPoints = [...path.points].sort((a, b) => a.order - b.order);
    const positions = [];
    for (const point of sortedPoints) {
      const pos = getConnectorPosition(point, canvas);
      if (pos) {
        positions.push(pos);
      }
    }
    if (positions.length < 2) continue;
    const isActive = !!activePathId && path.id === activePathId;
    const riverColor = isActive ? 6737151 : FLOW_COLOR;
    const riverAlpha = isActive ? Math.min(1, RIVER_ALPHA + 0.2) : RIVER_ALPHA;
    drawRiverPath(borderGraphics, positions, RIVER_BORDER_WIDTH, RIVER_BORDER_COLOR, RIVER_BORDER_ALPHA);
    drawRiverPath(riverGraphics, positions, RIVER_WIDTH, riverColor, riverAlpha);
    drawFlowArrows(arrowGraphics, positions);
  }
  layer.addChild(borderGraphics);
  layer.addChild(riverGraphics);
  layer.addChild(arrowGraphics);
  if (kingdom.rivers?.crossings && kingdom.rivers.crossings.length > 0) {
    renderCrossings(layer, canvas, kingdom.rivers.paths || [], kingdom.rivers.crossings);
  }
  logger.info(`[WaterRenderer] River rendering complete`);
}
function drawRiverPath(graphics, path, width, color, alpha) {
  if (path.length < 2) return;
  graphics.lineStyle({
    width,
    color,
    alpha,
    cap: PIXI.LINE_CAP.ROUND,
    join: PIXI.LINE_JOIN.ROUND
  });
  graphics.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    graphics.lineTo(path[i].x, path[i].y);
  }
}
function drawFlowArrows(graphics, path) {
  if (path.length < 2) return;
  let totalLength = 0;
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }
  const ARROW_SPACING = 100;
  const numArrows = Math.floor(totalLength / ARROW_SPACING);
  if (numArrows === 0) return;
  for (let arrowIndex = 0; arrowIndex < numArrows; arrowIndex++) {
    const targetDistance = (arrowIndex + 1) * ARROW_SPACING;
    let currentDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const p1 = path[i - 1];
      const p2 = path[i];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);
      if (currentDistance + segmentLength >= targetDistance) {
        const distanceAlongSegment = targetDistance - currentDistance;
        const t = distanceAlongSegment / segmentLength;
        const arrowX = p1.x + dx * t;
        const arrowY = p1.y + dy * t;
        const angle = Math.atan2(dy, dx);
        drawSingleArrow(graphics, arrowX, arrowY, angle);
        break;
      }
      currentDistance += segmentLength;
    }
  }
}
function drawSingleArrow(graphics, x, y, angle) {
  const arrowLength = ARROW_SIZE;
  const arrowWidth = ARROW_SIZE * 0.6;
  const tipX = x + Math.cos(angle) * arrowLength / 2;
  const tipY = y + Math.sin(angle) * arrowLength / 2;
  const baseX = x - Math.cos(angle) * arrowLength / 2;
  const baseY = y - Math.sin(angle) * arrowLength / 2;
  const leftX = baseX - Math.cos(angle + Math.PI / 2) * arrowWidth / 2;
  const leftY = baseY - Math.sin(angle + Math.PI / 2) * arrowWidth / 2;
  const rightX = baseX + Math.cos(angle + Math.PI / 2) * arrowWidth / 2;
  const rightY = baseY + Math.sin(angle + Math.PI / 2) * arrowWidth / 2;
  graphics.beginFill(ARROW_COLOR, ARROW_ALPHA);
  graphics.moveTo(tipX, tipY);
  graphics.lineTo(leftX, leftY);
  graphics.lineTo(rightX, rightY);
  graphics.lineTo(tipX, tipY);
  graphics.endFill();
}
function renderLakes(layer, canvas, lakes) {
  const lakeGraphics = new PIXI.Graphics();
  lakeGraphics.name = "Lakes";
  for (const lake of lakes) {
    drawHexFill(lakeGraphics, lake.hexI, lake.hexJ, canvas, LAKE_COLOR, LAKE_ALPHA, 0.8);
  }
  layer.addChild(lakeGraphics);
}
function renderSwamps(layer, canvas, swamps) {
  const swampGraphics = new PIXI.Graphics();
  swampGraphics.name = "Swamps";
  for (const swamp of swamps) {
    drawHexFill(swampGraphics, swamp.hexI, swamp.hexJ, canvas, SWAMP_COLOR, SWAMP_ALPHA, 0.8);
  }
  layer.addChild(swampGraphics);
}
function drawHexFill(graphics, hexI, hexJ, canvas, color, alpha, sizeScale = 1.02) {
  const center = canvas.grid.getCenterPoint({ i: hexI, j: hexJ });
  if (!center) return;
  const GridHex = globalThis.foundry.grid.GridHex;
  const hex = new GridHex({ i: hexI, j: hexJ }, canvas.grid);
  const relativeVertices = canvas.grid.getShape(hex.offset);
  if (!relativeVertices || relativeVertices.length === 0) {
    logger.warn(`[WaterRenderer] No vertices for hex (${hexI}, ${hexJ})`);
    return;
  }
  const scale = sizeScale;
  const worldVertices = relativeVertices.map((v) => ({
    x: center.x + v.x * scale,
    y: center.y + v.y * scale
  }));
  graphics.beginFill(color, alpha);
  graphics.drawPolygon(worldVertices.flatMap((v) => [v.x, v.y]));
  graphics.endFill();
}
function renderCrossings(layer, canvas, paths, crossings) {
  const crossingGraphics = new PIXI.Graphics();
  crossingGraphics.name = "RiverCrossings";
  for (const crossing of crossings) {
    const pos = getConnectorPosition(crossing, canvas);
    if (!pos) continue;
    if (crossing.type === "bridge") {
      drawBridgeBadge(crossingGraphics, pos.x, pos.y);
    } else if (crossing.type === "ford") {
      drawFordBadge(crossingGraphics, pos.x, pos.y);
    }
  }
  layer.addChild(crossingGraphics);
}
function drawBridgeBadge(graphics, x, y) {
  const badgeSize = 18;
  graphics.lineStyle(0);
  graphics.beginFill(BRIDGE_COLOR, 0.9);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
  graphics.endFill();
  graphics.lineStyle(2, 0, 0.8);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
}
function drawFordBadge(graphics, x, y) {
  const badgeSize = 18;
  graphics.lineStyle(0);
  graphics.beginFill(FORD_COLOR, 0.9);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
  graphics.endFill();
  graphics.lineStyle(2, 8900331, 0.8);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
}
function renderWaterfalls(layer, canvas, paths, waterfalls) {
  const waterfallGraphics = new PIXI.Graphics();
  waterfallGraphics.name = "Waterfalls";
  for (const waterfall of waterfalls) {
    const pos = getConnectorPosition(waterfall, canvas);
    if (!pos) continue;
    drawWaterfallBadge(waterfallGraphics, pos.x, pos.y);
  }
  layer.addChild(waterfallGraphics);
}
function drawWaterfallBadge(graphics, x, y) {
  const badgeSize = 18;
  graphics.lineStyle(0);
  graphics.beginFill(WATERFALL_COLOR, 0.9);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
  graphics.endFill();
  graphics.lineStyle(2, FLOW_COLOR, 0.8);
  graphics.moveTo(x, y - badgeSize);
  graphics.lineTo(x + badgeSize, y);
  graphics.lineTo(x, y + badgeSize);
  graphics.lineTo(x - badgeSize, y);
  graphics.closePath();
}
export {
  renderWaterConnections
};
